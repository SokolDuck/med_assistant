
import asyncio
import logging
from aiohttp import web

from app.routes import setup_routes, setup_cors
from app.settings import get_config
from app.db import setup_db


async def init():
    conf = get_config()

    app = web.Application()

    setup_routes(app)
    # https://github.com/aio-libs/aiohttp-cors
    setup_cors(app)
    await setup_db(app)
    host, port = conf['host'], conf['port']
    return app, host, port


async def get_app():
    """Used by aiohttp-devtools for local development."""
    
    app, _, _ = await init()
    
    return app


def main():
    logging.basicConfig(level=logging.DEBUG)

    loop = asyncio.get_event_loop()
    app, host, port = loop.run_until_complete(init())
    web.run_app(app, host=host, port=port)


if __name__ == '__main__':
    main()
