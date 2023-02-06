from apscheduler.schedulers.asyncio import AsyncIOScheduler
from modules import *

scheduler = AsyncIOScheduler(timezone='Europe/Moscow')

async def update_auth_counts(): 
	for admin in await db.admins.get_all():
		if admin['auth_count'] <= 0:
			await db.admins.set_field(admin['id'], {'auth_count': 5})

def setup():
	scheduler.add_job(update_auth_counts, 'interval', hours=1)
	#cheduler.add_job(some_work, 'cron', hour=0, minute=0)

	scheduler.start()