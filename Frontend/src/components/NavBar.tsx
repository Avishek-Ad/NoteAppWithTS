import { Link, useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";

function NavBar() {
    const navigate: NavigateFunction = useNavigate();
  return (
    <div className="w-full flex flex-row justify-between px-20 border-b-2 py-5 mb-5">
        <h1 className="text-3xl font-bold">
          <Link to="/notes">Note App</Link>
        </h1>
        <div>
            <button onClick={() => navigate("/create")} className="bg-neutral-900 text-white font-bold py-2 px-4 rounded hover:scale-105">create</button>
        </div>
    </div>
  )
}

export default NavBar