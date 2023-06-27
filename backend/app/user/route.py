from collections import namedtuple

from aiohttp import web
from app.user.views import register_user, sign_in


Route = namedtuple('Route', ["method", "path", "handler"])

PREFIX = "/api/user/"

ROUTES = [
    Route("POST", f"{PREFIX}registration", register_user),
    Route("POST", f"{PREFIX}login", sign_in)
    
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
