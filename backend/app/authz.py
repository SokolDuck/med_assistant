import jwt
import sqlalchemy as sa

from typing import Awaitable, Callable
from aiohttp import web
from aiohttp_sqlalchemy.constants import SA_DEFAULT_KEY
import aiohttp_sqlalchemy as ahsa


from app.models import User
from app.settings import config


UNAUTHORIZED_HANDLERS = []

def unauthorized(func):
    UNAUTHORIZED_HANDLERS.append(func)

    return func



async def jwt_decode(jwt_token):
    try:
        payload = jwt.decode(jwt_token, config["secret_key"], algorithms=[config.get("JWT_ALGORITHM", 'HS256')])
    except (jwt.DecodeError, jwt.ExpiredSignatureError):
        raise web.HTTPUnauthorized()

    return payload


SAVE_METHODS = ('OPTIONS')

@web.middleware
async def user_middleware(request: web.Request,
                     handler: Callable[[web.Request], Awaitable[web.Response]]):
    if handler not in UNAUTHORIZED_HANDLERS and request.method not in SAVE_METHODS:
        if 'Authorization' not in request.headers:
            raise web.HTTPUnauthorized()

        token = request.headers['Authorization'].split(' ')[1]
        payload = await jwt_decode(token)
        user_id = payload.get('user_id')

        if user_id is None:
            raise web.HTTPUnauthorized()
        else:
            sa_session = ahsa.get_session(request)
            async with sa_session.begin():
                result = await sa_session.execute(sa.select(User.disabled).filter_by(id=int(user_id)))
                disabled: User = result.scalars().first()

            if disabled:
                raise web.HTTPUnauthorized(reason="User was disabled")

            request.user_id = user_id

    resp = await handler(request)
    return resp
