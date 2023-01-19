from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services import APScheduler
from modules import db

import routes

# setuping fastapi
app = FastAPI()
app.include_router(routes.router)

# adding corses
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return {'msg': 'root'}

@app.on_event('startup')
async def on_startup():
    await db.database.create_all()

APScheduler.setup()