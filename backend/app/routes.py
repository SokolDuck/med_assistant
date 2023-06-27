from aiohttp import web
import aiohttp_cors

from app.views import index
from app.user.route import setup_route as setup_user_routes
from app.files.route import setup_route as setup_files_routes


def setup_routes(app: web.Application):
    
    
    # app.router.add_route('POST', '/api/files', file_upload, name='upload_file')
    # app.router.add_get('/', index)
    # routes.get("/")(index)
    # app.router.add_route('GET', '/api/files', get_file_list, name='files')

    # app.router.add_route('POST', '/api/user/register', register_user)
    # app.router.add_route('POST', '/api/user/sign_in', sign_in)
    # app.router.add_route('POST', '/api/user/sign_out', sign_out)
    # app.router.add_route('POST', '/api/user/update', update_user)

    setup_user_routes(app)
    setup_files_routes(app)

    app.router.add_route("GET", "/", index)


def setup_cors(app: web.Application):
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
            )
    })

    # Configure CORS on all routes.
    for route in list(app.router.routes()):
        cors.add(route)
