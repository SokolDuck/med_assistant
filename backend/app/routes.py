from aiohttp import web
import aiohttp_cors

from app.views import file_upload, get_file_list, index


def setup_routes(app: web.Application):
    app.router.add_route('POST', '/api/files', file_upload, name='upload_file')
    app.router.add_route('GET', '/', index)
    app.router.add_route('GET', '/api/files', get_file_list, name='files')


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
