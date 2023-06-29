from collections import namedtuple

from aiohttp import web
from app.user.views import register_user, sign_in, google_auth, google_login
from app.authz import unauthorized


Route = namedtuple('Route', ["method", "path", "handler", "no_user"], defaults=("GET", "", None, True))

PREFIX = "/api/user/"

ROUTES = [
    Route("POST", f"{PREFIX}registration", register_user),
    Route("POST", f"{PREFIX}login", sign_in),
    Route("GET", f"{PREFIX}glogin", google_login),
    Route("GET", f"{PREFIX}glogin/complete", google_auth)
]

def setup_route(app: web.Application) -> list:
    resource_routes = []

    for route in ROUTES:
        resource_routes.append(app.router.add_route(
            route.method,
            route.path,
            route.handler,
        ))

        if route.no_user:
            unauthorized(route.path)

    return resource_routes
