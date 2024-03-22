from fastapi import APIRouter
from app.db.data_storage import DataStorage

router = APIRouter()
db = DataStorage()

@router.get("/healthcheck")
def healthcheck():
    if db:
        return {"status": "ok"}
    else:
        return {"status": "not ok"}