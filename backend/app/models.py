from sqlalchemy import Column, Integer, String, DateTime, Float


from app.db import Base


class File(Base):
    __tablename__ = 'files'

    id = Column(Integer, primary_key=True)
    original_filename = Column(String)
    storage_filename = Column(String)
    upload_date = Column(DateTime)
    content_type = Column(String)
    size = Column(Float)
