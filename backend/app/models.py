from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship

from app.db import Base


class File(Base):
    __tablename__ = 'files'

    id = Column(Integer, primary_key=True)
    original_filename = Column(String)
    storage_filename = Column(String)
    upload_date = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    user = relationship("User", back_populates="files")


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String(256), nullable=False)
    fullname = Column(String, nullable=True)
    passwd = Column(String(256), nullable=True)

    disabled = Column(Boolean)

    files = relationship(
        "File", back_populates="user", cascade="all, delete-orphan"
    )
