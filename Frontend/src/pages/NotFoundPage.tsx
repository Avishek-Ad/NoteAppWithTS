import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();
  return (
    <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-20 my-20">
            <h1 className="text-3xl font-bold">
                Page Not Found
            </h1>
            <button onClick={() => navigate("/notes")} className="bg-neutral-900 text-white font-bold py-2 px-4 rounded hover:scale-105">Go To Notes Page</button>
        </div>
    </div>
  )
}

export default NotFoundPage