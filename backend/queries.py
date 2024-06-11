from sqlite3 import connect
from database import DATABASE

def query_create_board(board: str):
    with connect(DATABASE) as db:
        c = db.cursor()
        c.execute("INSERT INTO boards (board) VALUES (?)", (board,))
        db.commit()
