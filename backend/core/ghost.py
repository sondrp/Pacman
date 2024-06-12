import re
from typing import List

class Ghost:
    def __init__(self, board: str, symbol: str):
        self.symbol = symbol
        ghost_regex = symbol.lower() + symbol.upper()
        row_step = board.find("/")
        
        # A ghost may move in four directions (E, S, W, N), but only if the square is empty (d or D).
        # Also capture all symbols between start square and landing square.
        self.actions = [
            fr"([{ghost_regex}])()([dD])",
            fr"([{ghost_regex}])(.{{{row_step}}})([dD])",
            fr"([dD])()([{ghost_regex}])",
            fr"([dD])(.{{{row_step}}})([{ghost_regex}])",
        ]
    
    def get_legal_moves(self, board: str) -> List[str]:
        results = []
        for action in self.actions:
            if not re.search(action, board): continue

            result = re.sub(action, self.replacer, board)
            results.append(result)
        return results
    
    # When moving a ghost, there are two things to take care of:
    # 1. When the landing square contains a dot, the ghost must be uppercase.
    # Lowercase if not.
    # 2. If the moving ghost is uppercase, the vacant square must contain a dot (symbol: D).
    # Else, the vacant square must be empty (symbol: d).
    # The function takes in a match, capturing the moving ghost and the landing square (r and l). 
    # It also captures some symbols in the middle (m) which we do not care about.
    def replacer(self, match):
        l, m, r = match.groups()
        new_l = r.upper() * l.isupper() + r.lower() * l.islower() 
        new_r = l.upper() * r.isupper() + l.lower() * r.islower()
        return new_l + m + new_r
        