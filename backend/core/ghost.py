import re
from typing import List
from abc import ABC, abstractmethod

class Ghost(ABC):
    def __init__(self, board: str, symbol: str):
        ghost_regex = symbol.lower() + symbol.upper()
        self.pattern = fr"[{ghost_regex}]"
        row_step = board.find("/")
        
        # A ghost may move in four directions (E, S, W, N), but only if the square is empty (d or D).
        # Also capture all symbols between start square and landing square.
        self.actions = [
            fr"([{ghost_regex}])()([dD])",
            fr"([{ghost_regex}])(.{{{row_step}}})([dD])",
            fr"([dD])()([{ghost_regex}])",
            fr"([dD])(.{{{row_step}}})([{ghost_regex}])",
        ]

    @abstractmethod
    def make_action(self, board: str):
        pass

    def get_action(self, direction):
        action_index = "ESWN".find(direction)
        if (action_index == -1): 
            return None
        return self.actions[action_index]

    def can_move(self, board: str, direction: str):
        action = self.get_action(direction)
        if not action:
            return False
        return re.search(action, board)

    def move(self, board, direction):
        action = self.get_action(direction)
        if not action:
            return board
        return re.sub(action, self.replacer, board)

    def get_legal_moves(self, board: str) -> List[str]:
        return [
            self.move(board, direction)
            for direction in "ESWN"
            if self.can_move(board, direction) 
        ]
    
    # Swap the ghost and landing square (l and r). Do nothing with the symbols between them (m).
    # Note: the ghost could be either l or r, which is the reason for all the case checks.
    # This automatically takes care of setting the vacant square case correctly.
    def replacer(self, match):
        l, m, r = match.groups()
        new_l = r.upper() * l.isupper() + r.lower() * l.islower() # new_l is the symbol of r, and case of l
        new_r = l.upper() * r.isupper() + l.lower() * r.islower() # new_r is the symbol of l, and case of r
        return new_l + m + new_r
        