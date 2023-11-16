from database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Integer, Boolean, String, Column, ForeignKey


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String)
    password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    middle_initial = Column(String)
    contact = Column(String)
    status = Column(String)
    department = Column(String)
    course = Column(String)

    notes = relationship('Note', back_populates='owner')

class Note(Base):
    __tablename__ = 'notes'

    id = Column(Integer, primary_key=True, index=True)
    note_description = Column(String)
    note_owner = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="notes")