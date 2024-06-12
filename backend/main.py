from typing import List
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from queries import query_create_board, query_get_boards
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
    return {"boards": query_get_boards()}

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
            self.pacman.random_all_ghosts()
            await self.broadcast()

    async def broadcast(self):
        for connection in self.active_connections:
            await connection.send_text(self.pacman.board)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.player_action(data)

    except WebSocketDisconnect:
        manager.disconnect(websocket)

