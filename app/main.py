from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.data_storage import DataStorage

from app.api.routes import products
from app.api.routes import healthcheck

app = FastAPI()
db = DataStorage()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # The origin of the React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(healthcheck.router)

@app.get("/")
def read_root():
    return {"data": "My First Fast API project"}


