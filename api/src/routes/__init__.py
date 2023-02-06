from . import general

from utils.db_toolkit import db_toolkit as db
from fastapi.routing import APIRouter

router = APIRouter(
    prefix='/api'
)

@router.get("/ping")
async def ping():
    async with db.database.engine.begin():
        return {'ok': True}
        
router.include_router(general.router)