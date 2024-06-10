import re
from typing import Dict, Set
from random import shuffle

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
    'E': (r"[^x]", r" "),
    'S': (r"(.{28})[^x]", r" \1"),
    'W': (r"[^x]", r" "),
    'N': (r"[^x](.{28})", r"\1 "),
}

def make_pattern(piece: str, direction: str):
    if direction not in actions.keys(): return None, None

    forward = direction == "E" or direction == "S"
    pattern, repl = actions.get(direction)

    if forward:
        return fr"{piece}{pattern}", fr"{repl}{piece}"
    else:
        return fr"{pattern}{piece}", fr"{piece}{repl}"


class Pacman:
    board = BOARD

    def player_action(self, direction) -> bool:
        pattern, repl = make_pattern("P", direction)
        if not pattern:
            return False

        self.board = re.sub(pattern, repl, self.board)
        self.ghost_action()

        return True

    # Make a random move for each of the ghosts
    def ghost_action(self) -> bool:
        board = self.board
        ghosts = ["b", "p", "i", "c"]
        directions = ["N", "E", "S", "W"]
        shuffle(directions)
        shuffle(ghosts)


        for ghost in ghosts:
            for direction in directions:
                pattern, repl = make_pattern(ghost, direction)
                if not re.search(pattern, board): continue
                board = re.sub(pattern, repl, board)
                break

        self.board = board


