import datetime
from typing import List
from aiohttp import web
from app.models import File
from app.utils import store_file_to_s3, fetch_file_list_from_s3
import sqlalchemy as sa

import aiohttp_sqlalchemy as ahsa


async def file_upload(request: web.Request):
    data = await request.post()
    file = data['file']
    original_filename = file.filename
    content_type = file.content_type

    storage_filename = await store_file_to_s3(file.file, original_filename, content_type)

    new_file = File(
        original_filename=original_filename,
        storage_filename=storage_filename,
        upload_date=datetime.datetime.utcnow(),
        content_type=content_type,
        size=0
    )


    sa_session = ahsa.get_session(request)
    async with sa_session.begin():
        sa_session.add(new_file)

    return web.Response(text='File uploaded successfully.')

async def get_file_list(request: web.Request):
    # Use a helper function to fetch the file list from your S3 bucket.
    # file_list = await fetch_file_list_from_s3()
    # for file in file_list:
    #     file["LastModified"] = str(file["LastModified"])

    sa_session = ahsa.get_session(request)
    async with sa_session.begin():
        result = await sa_session.execute(sa.select(File))
        result: List[File] = result.scalars()

    file_list = [
        {"id": instance.id, "original_filename": instance.original_filename}
        for instance in result
    ]

    print(file_list)
    return web.json_response(file_list)

async def index(request: web.Request):
    return web.Response(text="Hello")
