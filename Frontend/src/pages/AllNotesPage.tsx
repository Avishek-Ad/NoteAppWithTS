import { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import { GlobalContext, ContextType } from "../context/GlobalState";
import Footer from "../components/Footer";

function AllNotesPage() {
  const { loading, getAllNotes, notes }: ContextType =
    useContext(GlobalContext)!;

  useEffect(() => {
    getAllNotes();
    // console.log(notes);
  }, []);

  if (loading) {
    return <h1 className="text-3xl font-semibold">Loading...</h1>;
  }
  return (
    <>
      <NavBar />
      <div className="w-full">
        
          {notes && notes.length > 0 ? (
            <div className="w-2/3 mx-auto flex flex-col items-center gap-10">
              <h1 className="text-3xl font-bold">All Notes</h1>
              <div className="flex flex-wrap gap-10 justify-center md:gap-x-20">
                {notes &&
                  notes.length > 0 &&
                  notes.map((note) => (
                    <NoteCard
                      id={note.id}
                      key={note.id}
                      title={note.title}
                      completed={note.completed}
                      image={note.image}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-2/3 mx-auto flex flex-col items-center gap-5 my-20">
              <h1 className="text-3xl font-bold">No Notes Found !</h1>
              <h1 className="text-3xl font-bold">Create New Notes</h1>
            </div>
          )}
        </div>
      <Footer />
    </>
  );
}

export default AllNotesPage;
