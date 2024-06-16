import re
from typing import List
from core.ghost import Ghost
import random

# Agent that will pick a random direction to go in, if there are any. 

class RandomGhost(Ghost):
    def __init__(self, board: str, symbol: str):
        super().__init__(board, symbol)

    def make_action(self, board: str) -> List[str]:
        actions = super().get_legal_moves(board)
        if not actions: 
            return board
        return random.choice(actions)