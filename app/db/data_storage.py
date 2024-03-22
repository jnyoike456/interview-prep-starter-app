from typing import Dict, Any, Optional, List

# This is an inmemory datastore. 
# But it's modular so you could easily swap in database operations here 

class DataStorage:
    _instance = None

    def __init__(self):
        if not hasattr(self, 'data_store'):
            self.data_store = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def write(self, key: str, value: Any) -> None:
        """Store the value under the given key."""
        if key in self.data_store:
            return self.get(key)
        self.data_store[key] = value

    def get(self, key: str) -> Optional[Any]:
        """Retrieve the value stored under the given key."""
        return self.data_store.get(key)

    def find_item(self, key: str) -> bool:
        return key in self.data_store

    def delete(self, key: str) -> bool:
        """Delete the value associated with the given key."""
        if key in self.data_store:
            del self.data_store[key]
            return True
        return False

    def get_all(self) -> Dict[str, Any]:
        return list(self.data_store.values())
