from pydantic import BaseModel

class Product(BaseModel):
    item_id: int = None
    name: str
    description: str = None
    price: float
    tax: float = None