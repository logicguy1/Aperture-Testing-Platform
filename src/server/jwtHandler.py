import jwt
from typing import Dict, List, Tuple, Any, Type


class JWTHandler:
    secret = "H4ozDPggS8u9JTCeGAk3uF3MRPCYrx9465iqHPjfNH8m37NPHt3bbrqNn9SpJUtW5Go2o5"

    def encode(self, payload: Dict[str, Any]) -> str:
        try:
            token = jwt.encode(payload, self.secret, algorithm='HS256')
            return token
        except Exception as e:
            print(f"Error encoding JWT token: {str(e)}")
            return None

    def decode(self, token: str) -> Dict[str, Any]:
        try:
            payload = jwt.decode(token, self.secret, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            print("JWT token has expired")
            return None
        except jwt.DecodeError:
            print("Error decoding JWT token")
            return None
