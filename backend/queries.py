from sqlite3 import connect
from typing import List
from database import DATABASE

def array_to_board(board: List):
    return {
        "id": board[0],
        "board": board[1],
        "type": board[2],
    }

def query_create_board(board: str, type: str):
    with connect(DATABASE) as db:
        c = db.cursor()
        c.execute("INSERT INTO boards (board, type) VALUES (?, ?)", (board, type))
        db.commit()

def query_get_boards():
    with connect(DATABASE) as db:
        c = db.cursor()
        c.execute("SELECT * FROM boards")
        boards = c.fetchall()
        boards = [array_to_board(board) for board in boards]
        return boards

def query_get_board(id: int):
    with connect(DATABASE) as db:
        c = db.cursor()
        c.execute("SELECT * FROM boards where id = ?", (id,))
        board = c.fetchone()
        return array_to_board(board)
    
def query_delete_board(id: int):
    with connect(DATABASE) as db:
        c = db.cursor()
        c.execute("DELETE FROM boards WHERE id = ?", (id,))