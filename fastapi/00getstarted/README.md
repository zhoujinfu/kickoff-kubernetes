1. `pip3 install fastapi`
2. `pip3 install "uvicorn[standard]"`
3. `main.py`
4. `uvicorn main:app --reload`
5. `curl 'http://127.0.0.1:8000/items/5?q=somequery'`
6. browser navigate to `http://127.0.0.1:8000/docs`, `http://127.0.0.1:8000/redoc`
