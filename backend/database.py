import sqlite3


DATABASE = "pacman.db"

conn = sqlite3.connect(DATABASE)
c = conn.cursor()

c.execute("""
    CREATE TABLE IF NOT EXISTS boards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        board TEXT NOT NULL      
    ) 
""")

conn.commit()
conn.close()