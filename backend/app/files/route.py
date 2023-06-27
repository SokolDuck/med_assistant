from collections import namedtuple

from aiohttp import web

from app.files.views import get_file_list, file_upload

Route = namedtuple('Route', ["method", "path", "handler"])

PREFIX = "/api/files"

ROUTES = [
    Route("POST", PREFIX, file_upload),
    Route("GET", PREFIX, get_file_list),
]

def setup_route(app: web.Application) -> list:
    resource_routes = []

    for route in ROUTES:
        resource_routes.append(app.router.add_route(
            route.method,
            route.path,
            route.handler,
        ))

    return resource_routes
