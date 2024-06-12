import re
import random

from core.player import Player
from core.ghost import Ghost

# Each ghost can be represented with two symbols (upper and lowercase letter), 
# because it is important to track if the ghost is standing on a dot.
# Board representation:
# x : border
# D : empty square with a dot
# d : empty square
# p : pac-man
# b : Blinky standing on emtpy square
# B : Blinky standing on square with a dot
# i or I: Inky on empty or non empty square
# n or N: Pinky
# c or C: Clyde

BOARD = re.sub(r"\s", "", """
xxxxxxxxxxxxxxxxxxxxxxxxxxxx/
xpDDDDDDDDDDDxxDDDDDDDDDCDDx/
xDxxxxDxxxxxDxxDxxxxxDxxxxDx/
xDxxxxDxxxxxDxxDxxxxxDxxxxDx/
xDxxxxDxxxxxDxxDxxxxxDxxxxDx/
xDDDIDDDDNDDDDDDDDDDDDDDDDDx/
xDxxxxDxxDxxxxxxxxDxxDxxxxDx/
xDxxxxDxxDxxxxxxxxDxxDxxxxDx/
xDDDDDDxxDDDDxxDDDDxxDDBDDDx/
xxxxxxxxxxxxxxxxxxxxxxxxxxxx/
""")


def player_replacer(match):
    l, m, r = match.groups()
    return r.lower() + m + l.lower()


class Pacman:
    def __init__(self, board=BOARD):
        self.board=board  

        self.player = Player(board)      

        self.ghosts = [
            Ghost(board, "b"),    # Blinky 
            Ghost(board, "i"),    # Inky
            Ghost(board, "n"),    # Pinky
            Ghost(board, "c"),    # Clyde
        ]

    # Attempt to move the player
    # Return bool to show outcome
    def player_action(self, direction: str) -> bool:
        move = self.player.get_move(self.board, direction)
        if not move: return False

        self.board = move
        return True

    def move_ghosts_random(self):
        for ghost in self.ghosts:
            moves = ghost.get_legal_moves(self.board)
            if not moves: continue

            move = random.choice(moves)
            self.board = move