import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-blue-300 flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex justify-between px-8 py-2 border-b text-xl">
      <Link to="/">Pacman Home</Link>
      <Link to="/board/create">Create Board</Link>
    </div>
  );
}

export default App;
