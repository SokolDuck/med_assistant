import boto3
import os
from botocore.exceptions import NoCredentialsError
from aiohttp.web import HTTPBadRequest

from app.settings import config


def get_s3_client():

    client = boto3.client('s3',
        aws_access_key_id=os.environ["ACCESS_KEY"],
        aws_secret_access_key=os.environ["SECRET_KEY"]
    )

    return client


async def store_file_to_s3(file, filename, content_type):
    s3 = get_s3_client()

    try:
        s3.upload_fileobj(
            file,
            config["s3"]["bucket_name"],
            filename,
            ExtraArgs={
                'ContentType': content_type
            }
        )
    except NoCredentialsError:
        raise HTTPBadRequest(reason="Could not upload to S3: No credentials")
    
    return filename


async def fetch_file_list_from_s3():
    s3 = get_s3_client()

    try:
        response = s3.list_objects(Bucket=config["s3"]["bucket_name"])
    except NoCredentialsError:
        raise HTTPBadRequest(reason="Could not fetch from S3: No credentials")

    return response.get('Contents', [])
