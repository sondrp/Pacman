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
    
    # Swap the ghost and landing square (l and r). Do nothing with m.
    # Note: the ghost could be either l or r, which is the reason for all the case checks.
    def replacer(self, match):
        l, m, r = match.groups()
        new_l = r.upper() * l.isupper() + r.lower() * l.islower() # new_l is the symbol of r, and case of l
        new_r = l.upper() * r.isupper() + l.lower() * r.islower() # new_r is the symbol of l, and case of r
        return new_l + m + new_r
        