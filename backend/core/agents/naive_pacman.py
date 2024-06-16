from math import inf
import re

# Bad AI that will search for the closest food, and walk towards it. 
# Does not use relevant search algorithms (like A*), and does not consider walls. 

class NaivePacman:
    def __init__(self, board: str):
        row_step = board.find("/")

        self.actions = {
            "E": r"(p)()([dD])",
            "S": fr"(p)(.{{{row_step}}})([dD])",
            "W": r"([dD])()(p)",
            "N": fr"([dD])(.{{{row_step}}})(p)",
        }

        # Now define the process:
        # Given a board, we are asked to make a move.  
        # The return from this function is a new board (or old, if no move is needed)

    goal = None

    # Move towards the closest dot. 
    # 1. Make sure a goal exist
    # 2. Figure out direction to approach it
    # 3. Make move
    def make_move(self, board: str):
        
        current_index = board.find("p")
        goal = self.goal

        if not goal or goal == current_index:
            goal = self.find_goal(board, current_index)

        if goal == inf: 
            return board
        
        dy, dx = self.decomponse_distance(board, current_index, goal)

        if dy < 0: return self.move(board, "N")
        if dy > 0: return self.move(board, "S")
        if dx > 0: return self.move(board, "E")
        if dx < 0: return self.move(board, "W")
        return board

    def move(self, board: str, direction: str):
        action = self.actions.get(direction, None)
        if not action: 
            return board
        return re.sub(action, self.replacer, board)

    # Finds the index of the closest dot by manhattan distance. 
    # Will return inf if no dot exist.
    # Poor algorithm: will start in the corner of the board and search the whole thing.
    # Better to use a real search algorithm :)
    def find_goal(self, board: str, current_index: int):

        goal = inf
        distance_to_goal = inf

        for index, letter in enumerate(board):
            if letter != "D": continue

            dy, dx = self.decomponse_distance(board, current_index, index)
            manhattan_distance = abs(dy) + abs(dx)
            if manhattan_distance < distance_to_goal:
                goal = index
                distance_to_goal = manhattan_distance

        return goal

    # Returns the x and y distance between point a to b
    def decomponse_distance(self, board: str, a: int, b: int):
        cols = board.find("/") + 1
        ya, xa = divmod(a, cols)
        yb, xb = divmod(b, cols)
        dy = yb - ya
        dx = xb - xa
        return dy, dx

    def replacer(self, match):
        l, m, r = match.groups()
        return r.lower() + m + l.lower()