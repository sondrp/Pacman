from typing import List
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from queries import query_create_board, query_delete_board, query_get_board, query_get_boards
from core.pacman import Pacman

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/boards")
def get_boards():
    return query_get_boards()

@app.get("/board/{id}")
def get_board(id: int):
    return query_get_board(id)

""" @app.delete("/delete/{id}")
def get_board(id: int):
    return query_delete_board(id) """

@app.post("/create")
async def create_board(request: Request):
    data = await request.json() 
    board = data["board"]
    type = data["type"]
    query_create_board(board, type)

class ConnectionManager:
    active_connections: List[WebSocket] = []
    pacman = Pacman()


    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        await self.broadcast()

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def player_action(self, direction):
        if self.pacman.player_action(direction):
            self.pacman.move_ghosts_random()
            await self.broadcast()

    async def broadcast(self):
        for connection in self.active_connections:
            await connection.send_text(self.pacman.board)

manager = ConnectionManager()

@app.websocket("/ws/{id}")
async def websocket_endpoint(websocket: WebSocket, id: str):

    board = get_board(id)
    manager.pacman = Pacman(board["board"])

    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.player_action(data)

    except WebSocketDisconnect:
        manager.disconnect(websocket)

