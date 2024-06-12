
Pacman - to learn some fundamental computational rationality techniques (AI).

## Running the project

The backend is a simple websocket server that holds the game logic. Commands:

- `cd backend`
- `python database.py` (only needed once)

-- Optional virtual environment --
- `python -m venv virt` (virt or any name)
- `source virt/bin/activate` (linux/macOS)
-  `.\virt\Scripts\activate` (Windows)

-- 

- `pip install -r requirements.txt`
- `uvicorn main:app --reload`


Frontend shows the state of the pacman game. Commands:
- `cd frontend`
- `npm install`
- `npm run dev`

## Upcomming features

#### Search:
 * DFS,
 * BFS,
 * UCS,
 * Greedy Search,
 * A* Search
#### MultiAgent Project (Adversarial search)
 * Minimax
 * Alpha-beta pruning
 * Expectimax
#### Markov Decision Processes & Reinforcemenet Learning
 * Value Iteration
 * Policy Iteration
 * Asynchronous value iteration
 * Prioritized sweeping value iteration
 * Epsilon greedy
 * Q-learning
 * Approximate Q-learning