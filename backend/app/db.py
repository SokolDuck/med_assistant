import sqlalchemy as sa
from aiohttp import web
from sqlalchemy import orm

import aiohttp_sqlalchemy as ahsa

from app.settings import config

metadata = sa.MetaData()
Base = orm.declarative_base(metadata=metadata)


async def setup_db(app: web.Application):
    # https://github.com/ri-gilfanov/aiohttp-sqlalchemy
    ahsa.setup(app, [
        ahsa.bind(f"{config['database']['schema']}://{config['database']['name']}"),
    ])
