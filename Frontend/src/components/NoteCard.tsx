import { useNavigate } from "react-router-dom";

type NoteType = {
  id: number;
  title: string;
  completed: boolean;
  image: string;
}

function NoteCard({id, title, completed, image}: NoteType) {
  const navigate = useNavigate();
  if (title.length > 20) {
    title = title.substring(0, 20) + "...";
  }

  const handleEditButton = () => {
    navigate(`/edit/${id}`);
  }

  const handleDetailsButton = () => {
    navigate(`/read/${id}`);
  }
  return (
    <div className="flex flex-col w-full md:w-2/3 lg:w-1/3 border-2 border-neutral-400 hover:shadow-md rounded p-1 gap-1 justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <img
          className="rounded w-full hover:scale-125"
          src={image}
          alt={title}
        />
      </div>
      <div className="flex flex-col w-2/3 justify-between gap-2">
        <h1 className="text-lg font-semibold text-center">{title}</h1>
        <h1
          className={`text-sm font-semibold text-center md:text-base ${
            completed ? "text-green-500" : "text-red-500"
          }`}
        >
          {completed ? "Completed" : "Not Completed"}
        </h1>
        <div className="flex flex-row justify-between gap-4 px-3 md:px-5">
          <button onClick={handleDetailsButton} className="bg-neutral-900  text-white font-bold px-2 py-1 rounded w-24 hover:scale-105">
            Details
          </button>
          <button onClick={handleEditButton} className="bg-neutral-900  text-white font-bold px-2 py-1 rounded w-24 hover:scale-105">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
