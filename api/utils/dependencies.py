from fastapi import Header, HTTPException, Depends
from modules import *

async def check_admin_token(admin_token=Header(default=None)):
    if not await db.admins.check_token(admin_token): raise HTTPException(401, detail='Not Auth')


ADMIN_DEPENDS = [Depends(check_admin_token)]