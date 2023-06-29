
from aiohttp import web

from app.models import User
from app.authz import unauthorized

# Create a routing table
routes = web.RouteTableDef()

# Create a password context for hashing


@routes.get("/")
# @unauthorized
async def index(request: web.Request):
    """
    ---
    description: This end-point allow to test that service is up.
    tags:
    - Health check
    responses:
        "200":
            description: successful operation. Return "Hello" text
    """
    return web.json_response({"text": "Hello"})




async def update_user(request):
    user = await check_authorized(request)
    data = await request.json()
    new_email = data.get('email')
    new_password = data.get('password')
    
    password_hash = await hash_password(new_password) if new_password else None
    
    async with request.app['db'].acquire() as conn:
        if new_email:
            await conn.execute(User.update().where(User.username == user.username).values(email=new_email))
        if password_hash:
            await conn.execute(User.update().where(User.username == user.username).values(password=password_hash))

    return web.Response(text='Profile updated successfully')

async def sign_out(request):
    response = web.Response(text='Logged out successfully')
    await forget(request, response)
    return response
