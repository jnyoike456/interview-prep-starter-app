from fastapi import APIRouter, HTTPException, status, Response
from app.api.models.schemas import Product
from app.db.data_storage import DataStorage
from random import randrange

router = APIRouter()
db = DataStorage()

@router.get("/products")
async def get_products():
    data = db.get_all()
    return {"data": data}

@router.get("/products/{id}")
async def get_product(id: int):
    is_item_in_db = db.find_item(str(id))
    if not is_item_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
    product = db.get(str(id))
    return {"product detail": product}

@router.post("/products", status_code=status.HTTP_201_CREATED)
async def create_item(product: Product):
    product_dict = product.model_dump()
    id = randrange(0, 100000000)
    product_dict["item_id"] = id
    db.write(str(id), product_dict)
    return {"data": product_dict}


@router.delete("/products/{id}")
async def get_product(id: int):
    deleted = db.delete(str(id))
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"product with id: {id} does not exist")
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)