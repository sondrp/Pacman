import re
from core.agents.naive_pacman import NaivePacman
from core.agents.simple_reflex_random import RandomGhost
from core.player import Player

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

# Now: 
# make it so that the pacman is the only active player, and make give him an ai.

class Game:
    def __init__(self, board=BOARD):
        self.board=board  

        self.ai = NaivePacman(board)


    # Attempt to move the player
    # Return bool to show outcome
    def player_action(self, direction: str) -> bool:
        move = self.player.get_move(self.board, direction)
        if not move: return False

        self.board = move
        return True

    def move_ghosts(self):
        self.board = self.ai.make_move(self.board)
    

game = Game("xxxxxxxxx/xDDDDDDDx/xDxxxxxDx/xDxxxxxDx/xpDDDDDDx/xxxxxxxxx/")