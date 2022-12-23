from modules import *
from .models import *
from utils.dependencies import ADMIN_DEPENDS

from fastapi.routing import APIRouter
from pydantic import BaseModel
from fastapi import HTTPException, Request

from dataclasses import dataclass
from hashlib import md5

responses = {

}

router = APIRouter(
    prefix='/admins',
)

class Admin(BaseModel):
    username: str

@dataclass
class AuthResponse:
    ok: bool
    token: str = None

@router.post('/create', dependencies=ADMIN_DEPENDS)
async def create(admin: Admin):
    data = await db.admins.add(
        username=admin.username
    )
    return {'data': db.database.row_to_dict(data)}

@router.post('/getList', dependencies=ADMIN_DEPENDS)
async def get_list():
    data = db.database.row_to_dict(await db.admins.get_all())
    return {'data': data, 'total': len(data)}

@router.post('/getOne/{id}', dependencies=ADMIN_DEPENDS)
async def get_one(id: int):
    return {'data': db.database.row_to_dict(await db.admins.get_one_by_id(id))}

@router.post('/getMany', dependencies=ADMIN_DEPENDS)
async def get_many(ids: str):
    '''ids like ?ids=3 54 10'''
    try: ids = [int(id) for id in ids.split()]
    except: raise HTTPException(400, 'Not allowed type')

    return {'data': db.database.row_to_dict(await db.admins.get_many_by_id(ids))}

@router.post('/update/{id}', dependencies=ADMIN_DEPENDS)
async def update(id: int, fields: UpdateFields):
    ''':values: values to update like {"name": "new name"}'''

    data = db.database.row_to_dict(await db.admins.set_field(id, fields.fields)) 
    return {'data': data}

@router.post('/deleteOne/{id}', dependencies=ADMIN_DEPENDS)
async def delete_one(id: int):
    data = db.database.row_to_dict((await db.admins.delete([id]))[0])
    return {'data': data}

@router.post('/deleteMany', dependencies=ADMIN_DEPENDS)
async def delete_many(ids: str):
    '''ids like ?ids=3 54 10'''
    try: ids = [int(id) for id in ids.split()]
    except: raise HTTPException(400, 'Not allowed type')

    await db.admins.delete(ids)

    return {'data': ids}

@router.post("/getAuth")
async def get_auth(username: str, password: str) -> AuthResponse:
    admin = await db.admins.auth(username, md5(password.encode()).hexdigest())
    
    if admin: 
        response = AuthResponse(ok=True, token=admin['token'])
        await db.admins.set_field(admin['id'], {'auth_count': 5})

    else: 
        response = AuthResponse(ok=False)
        await db.admins.register_auth_try(username)

    return response