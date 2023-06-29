from datetime import datetime, timedelta
import os
from typing import Optional
from aiohttp import web
import jwt
import sqlalchemy as sa
from passlib.context import CryptContext

from aioauth_client import GoogleClient


from app.db import get_session
from app.models import User
from app.settings import config


pwd_context = CryptContext(schemes=["sha256_crypt"])

JWT_SECRET = config["secret_key"]
JWT_ALGORITHM = config.get("JWT_ALGORITHM", 'HS256')
JWT_EXP_DELTA_SECONDS = config.get("JWT_EXP_DELTA_SECONDS", 3600)


# Users API
# @unauthorized
async def register_user(request: web.Request):
   
    data = await request.json()
    email = data['email']
    password = data['password']
    
    sa_session = get_session(request)
    async with sa_session.begin():
        result = await sa_session.execute(sa.select(User.id).filter_by(email=email))
        user = result.scalar()

        if user:
            return web.json_response({"error": 'User with this email already exists'})

        hashed_password = pwd_context.hash(password)

        user = User(email=email, passwd=hashed_password, disabled=False)
        sa_session.add(user)

    return web.json_response({"text": 'User registered successfully'})


# @unauthorized
async def sign_in(request: web.Request):
    
    data = await request.json()
    email = data['email']
    password = data['password']

    sa_session = get_session(request)
    async with sa_session.begin():
        result = await sa_session.execute(sa.select(User).filter_by(email=email))
        user: Optional[User] = result.scalars().first()

        if not user:
            return web.json_response({"error": 'User not found'})

        if not pwd_context.verify(password, user.passwd):
            return web.json_response({"error": 'Incorrect password'})

        payload = {
            'user_id': user.id,
            'email': user.email,
            'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)


    response = web.json_response({"text": "login successfully"})
    response.set_cookie("token", jwt_token)
    return response


google_client_id = os.environ["OAUTH_CLIENT_ID"].strip()
google_client_secret = os.environ["OAUTH_CLIENT_SECRET"].strip()

# @unauthorized
async def google_login(request):
    client_id = google_client_id
    client_secret = google_client_secret
    redirect_uri = 'http://localhost/api/user/glogin/complete'
    scope = 'email profile'
    
    client = GoogleClient(client_id=client_id, client_secret=client_secret, 
                          redirect_uri=redirect_uri)
    uri = client.get_authorize_url(scope=scope)

    # session = await get_session(request)
    # session['oauth_state'] = state
    # session['oauth_redirect_uri'] = redirect_uri

    raise web.HTTPFound(location=uri)

# @unauthorized
async def google_auth(request):
    # session = await get_session(request)
    
    client_id = google_client_id
    client_secret = google_client_secret
    # redirect_uri = session['oauth_redirect_uri']
    redirect_uri = 'http://localhost/api/user/glogin/complete'

    client = GoogleClient(client_id=client_id, client_secret=client_secret,
                          redirect_uri=redirect_uri)
    print("CC", client_id, client_secret)
    code = request.query.get('code')
    await client.get_access_token(code)
    
    user, info = await client.user_info()
    email = user.email
    name = info["name"]

    sa_session = get_session(request)
    async with sa_session.begin():
        result = await sa_session.execute(sa.select(User).where(User.email == email))
        user = result.scalar()

        if not user:
            user = User(email=email, fullname=name, disabled=False)
            sa_session.add(user)

            sa_session.flush()

    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
    }
    jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

    response = web.HTTPFound("/")
    response.set_cookie("token", jwt_token)
    
    return response
