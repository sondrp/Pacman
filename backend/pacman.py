import re
from random import shuffle

# The game itself. For now, make it simple by being turn based.
# The player makes a move, and the pieces respond. The bots make random moves to start.

BOARD = re.sub(r"\s", "", """
xxxxxxxxxxxxxxxxxxxxxxxxxxxx/
xpfffffffffffxxfffffffffcffx/
xfxxxxfxxxxxfxxfxxxxxfxxxxfx/
xfxxxxfxxxxxfxxfxxxxxfxxxxfx/
xfxxxxfxxxxxfxxfxxxxxfxxxxfx/
xfffiffffnfffffffffffffffffx/
xfxxxxfxxfxxxxxxxxfxxfxxxxfx/
xfxxxxfxxfxxxxxxxxfxxfxxxxfx/
xffffffxxffffxxffffxxffbfffx/
xxxxxxxxxxxxxxxxxxxxxxxxxxxx/
""")

class Pacman:
    row_step = BOARD.find("/") + 1
    def __init__(self, board=BOARD):
        self.board=board
        self.size = len(board)
        
        row_step = board.find("/") + 1
        self.directions = [1, row_step, -1, -row_step]

    # Attempt to move the piece. Return false if not allowed. 
    def make_move(self, index_from: int, index_to: int) -> bool:
        if index_from < 0 or self.size <= index_from or index_to < 0 or self.size <= index_to: 
            return False  

        board = list(self.board)
        piece = board[index_from]
        food = board[index_to]
        if not re.match(r"[pbnic][f ]", piece + food, re.I): return False

        board[index_from] = "f" if piece.isupper() else " "
        board[index_to] = piece.upper() if food == "f" else piece.lower()

        self.board = "".join(board)
        return True

    # Currently: ghost just picks a random direction
    def ghost_action(self, piece: str):
        board = self.board
        piece_index = board.find(piece)
        if piece_index == -1: return
        directions = self.directions.copy()
        shuffle(directions)

        for direction in directions:
            landing = piece_index + direction
            if self.make_move(piece_index, landing):
                return

    def ghost_actions(self):
        for ghost in "bnicBNIC":
            self.ghost_action(ghost)

    # Attempt to make a player move, and return true if successful
    def player_action(self, direction) -> bool:
        direction_index = "ESWN".find(direction)
        player_index = self.board.find("p")
        if direction_index == -1 or player_index == -1: return False

        print(self.directions[direction_index])

        board = list(self.board)
        landing_index = player_index + self.directions[direction_index]
        food = board[landing_index]
        if food not in "f ": return False

        board[player_index] = " "
        board[landing_index] = "p"
        self.board = "".join(board)

        self.ghost_actions()
        return True

