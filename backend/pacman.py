import re
from typing import Dict, Set

# The game itself. For now, make it simple by being turn based.
# The player makes a move, and the pieces respond. The bots make random moves to start.

BOARD = re.sub(r"\s", "", """
xxxxxxxxxxxxxxxxxxxxxxxxxxxx/
xPfffffffffffxxffffffffffffx/
xfxxxxfxxxxxfxxfxxxxxfxxxxfx/
xfxxxxfxxxxxfxxfxxxxxfxxxxfx/
xfxxxxfxxxxxfxxfxxxxxfxxxxfx/
xffffffffffffffffffffffffffx/
xfxxxxfxxfxxxxxxxxfxxfxxxxfx/
xfxxxxfxxfxxxxxxxxfxxfxxxxfx/
xffffffxxffffxxffffxxffbpicx/
xxxxxxxxxxxxxxxxxxxxxxxxxxxx/
""")

actions: Dict[str, Set[str]] = {
    'E': (r"P[^x]", r" P"),
    'W': (r"[^x]P", r"P "),
    'S': (r"P(.{28})[^x]", r" \1P"),
    'N': (r"[^x](.{28})P", r"P\1 "),
}

class Pacman:
    board = BOARD

    # Player inputs a direction to go in, and the game updates state accordingly.
    # For now, we are very forgiving. Illegal moves will not update the ghosts.
    def player_action(self, direction) -> bool:
        action = actions.get(direction)
        if not action: 
            return False
        
        pattern, repl = action
        self.board = re.sub(pattern, repl, self.board)
        return True


