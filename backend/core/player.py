import re

class Player:
    def __init__(self, board):
        row_step = board.find("/")

        self.actions = {
            'E': r"(p)()([dD])",
            'S': fr"(p)(.{{{row_step}}})([dD])",
            'W': r"([dD])()(p)",
            'N': fr"([dD])(.{{{row_step}}})(p)",
        }

    def get_move(self, board: str, direction: str) -> str | None:
        action = self.actions.get(direction, None)
        if not action: return None

        if not re.search(action, board): return None
        return re.sub(action, self.replacer, board)

    def get_moves(self, board):
        return [self.get_move(board, direction) for direction in "ESWN"]


    # Player move by swapping player and landing square.
    # The player can be either l or r, so lower both
    # to ensure that D -> d in the result. 
    def replacer(self, match):
        l, m, r = match.groups()
        return r.lower() + m + l.lower()