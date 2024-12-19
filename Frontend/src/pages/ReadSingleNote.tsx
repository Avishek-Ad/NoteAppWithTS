import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useContext, useEffect } from "react";
import { GlobalContext, ContextType } from "../context/GlobalState";

function ReadSingleNote() {
  const { id } = useParams();
  const { loading, getSingleNote, singleNote }: ContextType =
    useContext(GlobalContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    getSingleNote(Number(id));
  }, []);

  const goToEditPage = () => {
    navigate(`/edit/${id}`);
  };

  // console.log(singleNote);

  if (loading) {
    return <h1 className="text-3xl font-semibold">Loading...</h1>;
  }
  return (
    <>
      <NavBar />
      <div className="w-full">
        <div className="flex flex-col gap-3 w-2/3 mx-auto">
          <div className="flex justify-center">
            <img
              className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3"
              //   src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg"
              src={singleNote?.image}
              alt="image"
            />
          </div>
          <h1 className="text-2xl font-semibold text-center">
            {singleNote?.title}
          </h1>
          <p className="text-justify px-5">
            {singleNote?.description}
          </p>
          <div className="flex flex-col gap-4 px-5">
            <div className="flex flex-row gap-2">
              <h1 className="font-semibold">Tags :</h1>
              <div className="font-semibold">
                {singleNote?.tags?.join(", ")}
              </div>
            </div>
            <div
              className={`${
                singleNote?.completed ? "text-green-500" : "text-red-500"
              } font-semibold`}
            >
              {singleNote?.completed ? "completed" : "not completed"}
            </div>
          </div>
          <div className="text-sm font-medium px-5">
            CreatedAt : {singleNote?.createdAt.split("T")[0] + " " + singleNote?.createdAt.split("T")[1].split(".")[0]}
          </div>
          <div className="flex flex-row justify-center">
            <button
              onClick={goToEditPage}
              className="bg-neutral-900 text-white font-bold py-2 px-6 rounded hover:scale-110"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReadSingleNote;
