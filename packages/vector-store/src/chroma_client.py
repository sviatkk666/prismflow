"""Chroma vector store implementation"""

import chromadb
from chromadb.config import Settings
from typing import List, Dict, Any
from .interface import VectorStore
import uuid


class ChromaVectorStore(VectorStore):
    """Chroma vector store implementation"""
    
    def __init__(self, host: str = "localhost", port: int = 8000):
        self.client = chromadb.HttpClient(
            host=host,
            port=port,
            settings=Settings(allow_reset=True)
        )
    
    def ingest(self, text: str, metadata: Dict[str, Any], collection_name: str = "default") -> str:
        """Ingest a document"""
        try:
            collection = self.client.get_or_create_collection(name=collection_name)
        except Exception:
            collection = self.client.create_collection(name=collection_name)
        
        chunk_id = metadata.get("chunk_id") or str(uuid.uuid4())
        
        collection.add(
            documents=[text],
            metadatas=[metadata],
            ids=[chunk_id]
        )
        
        return chunk_id
    
    def query(self, text: str, top_k: int = 5, collection_name: str = "default") -> List[Dict[str, Any]]:
        """Query similar documents"""
        try:
            collection = self.client.get_collection(name=collection_name)
        except Exception:
            return []
        
        results = collection.query(
            query_texts=[text],
            n_results=top_k
        )
        
        if not results["ids"] or not results["ids"][0]:
            return []
        
        return [
            {
                "chunk_id": results["ids"][0][i],
                "text": results["documents"][0][i],
                "metadata": results["metadatas"][0][i],
                "score": 1.0 - results["distances"][0][i] if "distances" in results else 0.0,
            }
            for i in range(len(results["ids"][0]))
        ]
    
    def delete_collection(self, collection_name: str) -> bool:
        """Delete a collection"""
        try:
            self.client.delete_collection(name=collection_name)
            return True
        except Exception:
            return False
