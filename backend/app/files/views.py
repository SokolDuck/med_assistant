import sqlalchemy as sa
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from typing import List
from aiohttp import web
import aiohttp_sqlalchemy as ahsa

from app.models import File
from app.utils import store_file_to_s3


async def file_upload(request: web.Request):
    """
    ---
    description: This endpoint allows to upload file.
    tags:
    - Files
    requestBody:
      content:
        multipart/form-data:
          schema:
            type: object
            properties:
              filename:
                type: string
                format: binary
    responses:
        "200":
            description: successful operation. Return "signed in" message.

    """
    data = await request.post()
    file = data['file']
    original_filename = file.filename
    content_type = file.content_type
    storage_filename = f"{request.user_id}/{original_filename}"

    storage_filename = await store_file_to_s3(file.file, storage_filename, content_type)

    new_file = File(
        original_filename=original_filename,
        storage_filename=storage_filename,
        upload_date=datetime.utcnow(),
        user_id=request.user_id
    )


    sa_session: AsyncSession = ahsa.get_session(request)
    async with sa_session.begin():
        sa_session.add(new_file)

    return web.Response(text='File uploaded successfully.')


async def get_file_list(request: web.Request):
    """
    ---
    description: This end-point allow to test that service is up.
    tags:
    - Health check
    produces:
    - text/plain
    responses:
        "200":
            description: successful operation. Return "pong" text
        "405":
            description: invalid HTTP Method
    """
    sa_session = ahsa.get_session(request)
    async with sa_session.begin():
        result = await sa_session.execute(sa.select(File).where(File.user_id == request.user_id))
        result: List[File] = result.scalars()

    file_list = [
        {"id": instance.id, "original_filename": instance.original_filename}
        for instance in result
    ]

    print(file_list)
    return web.json_response({"files": file_list, "count": len(file_list)})
