"""Vector store interface"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional


class VectorStore(ABC):
    """Abstract vector store interface"""
    
    @abstractmethod
    def ingest(self, text: str, metadata: Dict[str, Any], collection_name: str = "default") -> str:
        """Ingest a document and return chunk_id"""
        pass
    
    @abstractmethod
    def query(self, text: str, top_k: int = 5, collection_name: str = "default") -> List[Dict[str, Any]]:
        """Query similar documents and return results with scores"""
        pass
    
    @abstractmethod
    def delete_collection(self, collection_name: str) -> bool:
        """Delete a collection"""
        pass
