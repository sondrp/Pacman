import re
import random

# Board representation
# x : border
# D : dot
# d : empty square
# p : pac-man
# b : Blinky standing on emtpy square
# B : Blinky standing on square a dot
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

# Will describe what this is doing at some other time
def ghost_replacer(match):
    l, m, r = match.groups()
    new_l = r.upper() * l.isupper() + r.lower() * l.islower() 
    new_r = l.upper() * r.isupper() + l.lower() * r.islower()
    return new_l + m + new_r

# swap left and right match, but keep center unchanged. 
# lower the left and the right, turning F -> f. 
def player_replacer(match):
    l, m, r = match.groups()
    return r.lower() + m + l.lower()


class Pacman:
    def __init__(self, board=BOARD):
        self.board=board
        row_step = board.find("/")
        
        self.player_moves = {   # ?
            'E': r"(p)()([dD])",
            'S': fr"(p)(.{{{row_step}}})([dD])",
            'W': r"([dD])()(p)",
            'N': fr"([dD])(.{{{row_step}}})(p)",
        }
        self.ghost_moves = {key: [
            fr"([{key}])()([dD])",
            fr"([{key}])(.{{{row_step}}})([dD])",
            fr"([dD])()([{key}])",
            fr"([dD])(.{{{row_step}}})([{key}])",
        ] for key in ["bB", "nN", "iI", "cC"]}

    # Attempt to move the player. Return false if fail.
    def player_action(self, direction: str) -> bool:
        pattern = self.player_moves.get(direction)
        if not pattern: return False

        self.board = re.sub(pattern, player_replacer, self.board)
        return True
    
    def random_ghost_action(self, ghost: str) -> bool:
        ghost = ghost.lower() + ghost.upper()
        patterns = self.ghost_moves.get(ghost)
        if not patterns: return False

        indexes = [0, 1, 2, 3]
        random.shuffle(indexes)

        for index in indexes:
            pattern = patterns[index]
            if not re.search(pattern, self.board): continue

            self.board = re.sub(pattern, ghost_replacer, self.board)
            return True
        return False

    def random_all_ghosts(self):
        for ghost in ["b", "i", "n", "c"]:
            self.random_ghost_action(ghost)


        


