from . import admins

from utils.db_toolkit import db_toolkit as db
from fastapi.routing import APIRouter

router = APIRouter(
    prefix='/api'
)

@router.get("/ping")
async def ping():
    try:
        await db.database.create_all()
        return {'ok': True}
    
    except:
        return {'ok': False}
        
router.include_router(admins.router)