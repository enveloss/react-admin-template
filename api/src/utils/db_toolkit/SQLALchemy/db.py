from .utils.tables.admins import Admins
from .utils.databases import *

database = Database()
admins = Admins(database=database)