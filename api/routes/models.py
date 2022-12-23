from pydantic import BaseModel
from modules import *

class UpdateFields(BaseModel):
    fields: Dict[str, Any]

class DeleteQuery(BaseModel):
    ids: List[int]