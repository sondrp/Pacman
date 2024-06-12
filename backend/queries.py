from sqlite3 import connect
from database import DATABASE

def query_create_board(board: str, type: str):
    with connect(DATABASE) as db:
        c = db.cursor()
        c.execute("INSERT INTO boards (board, type) VALUES (?, ?)", (board, type))
        db.commit()

def query_get_boards():
    with connect(DATABASE) as db:
        c = db.cursor()
        c.execute("""
            SELECT type, GROUP_CONCAT(board) AS boards
            FROM boards
            GROUP BY type
        """)
        return c.fetchall()