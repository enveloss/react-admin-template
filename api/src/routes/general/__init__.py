from fastapi import APIRouter 
from . import admins 

router = APIRouter()

router.include_router(admins.router)