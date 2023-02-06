import logging
from typing import *

from settings import config
from utils.db_toolkit import db_toolkit as db

# logger setuping
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(name)s - %(message)s")