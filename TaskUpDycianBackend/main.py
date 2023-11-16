from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from pydantic import Field, BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import models


app = FastAPI()
models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    student_id: str
    password: str
    first_name: str
    last_name: str
    middle_initial: str
    status: str
    department: str
    course: str

class LoginData(BaseModel):
    student_id: str
    password: str

class Note(BaseModel):
    note_description: str
    note_owner: int


def get_db():
    try:
        db = SessionLocal(bind=engine)
        yield db
    finally:
        db.close()

@app.post('/register')
async def register(user: User, db: Session = Depends(get_db)):
    new_user = models.User()

    try:
        new_user.student_id = user.student_id
        new_user.password = user.password
        new_user.first_name = user.first_name
        new_user.last_name = user.last_name
        new_user.middle_initial = user.middle_initial
        new_user.status = user.status
        new_user.department = user.department
        new_user.course = user.course

        db.add(new_user)
        db.commit()

    finally:
        db.close()

    return {'response': 'success'}


@app.post('/login')
async def login(student: LoginData, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.student_id == student.student_id).first()
    print(user)

    if user.password == student.password:
        return {'response': 'login success', 'user_id': user.id}
    else:
        return {'response': 'login failed'}
    

@app.get('/get_notes')
async def get_notes(id: str, db: Session = Depends(get_db)):
    try:
        all_notes = db.query(models.Note).filter(models.Note.note_owner == id).all()

        return {'response': 'retrieval complete.', 'notes': all_notes}
    except:
        print('Retrieval failed.')
        return {'response': 'retrieval failed.', 'notes': all_notes}


@app.post('/create_note')
async def create_note(note: Note, db: Session = Depends(get_db)):
    try:
        new_note = models.Note()

        new_note.note_description = note.note_description
        new_note.note_owner = int(note.note_owner)

        db.add(new_note)
        db.commit()

        return {'response': 'note created.'}
    except:
        return {'response': 'failed to create note.'}