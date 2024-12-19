import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GlobalContext,
  ContextType,
  NoteTypeForCreate,
} from "../context/GlobalState";
import { Toaster } from "react-hot-toast";

function EditSingleNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    loading,
    getSingleNote,
    updateNote,
    deleteNote,
    singleNote,
  }: ContextType = useContext(GlobalContext)!;
  const [tag, setTag] = useState<string>();

  useEffect(() => {
    getSingleNote(Number(id));
  }, []);

  useEffect(() => {
    if (singleNote) {
      setFormData({
        title: singleNote?.title,
        description: singleNote?.description,
        tags: [],
        completed: singleNote?.completed,
        image: "",
      });
      setTag(singleNote?.tags.join(", "));
    }
  }, [singleNote]);

  const [formData, setFormData] = useState<NoteTypeForCreate>({
    title: "",
    description: "",
    tags: [],
    completed: false,
    image: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file); //base64
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    console.log(loading);
    updateNote(Number(id), formData);
    setTimeout(() => {
      navigate(`/read/${id}`);
    }, 2000);
  };

  const handleDelete = () => {
    // console.log("Delete Clicked");
    // console.log(formData);
    deleteNote(Number(id));
    setTimeout(() => {
      navigate("/notes");
    }, 2000);
  };

  return (
    <div className="w-full mb-20 mt-5">
      <div className="w-full sm:w-3/4 md:w-2/3 mx-auto flex flex-col items-center gap-10">
        <h1 className="text-3xl font-bold">Edit Note</h1>
        <div className="w-3/4 mx-auto border-2 border-neutral-400 p-5 rounded">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                value={formData.title}
                className="w-full text-center text-lg font-medium p-2 focus-within:outline-none border-2 border-neutral-400 rounded focus-within:border-neutral-500"
                placeholder="Title"
                type="text"
                name="title"
                id="title"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image">{`Add New Thumbnail (optional)`}</label>
              <input
                onChange={handleImageChange}
                placeholder="Add Thumbnail"
                type="file"
                name="image"
                id="image"
                accept="image/*"
              />
            </div>
            <div>
              <textarea
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 focus-within:outline-none border-2 border-neutral-400 rounded focus-within:border-neutral-500"
                name="description"
                value={formData.description}
                id="description"
                placeholder="Description..."
                rows={10}
              ></textarea>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 lg:gap-20">
              <div>
                <div className="flex flex-row gap-5">
                  <input
                    onChange={(e) => setTag(e.target.value)}
                    value={tag}
                    className="w-full focus-within:outline-none border-2 border-neutral-400 rounded px-2 focus-within:border-neutral-500"
                    type="text"
                    name="tags"
                    id="tags"
                    placeholder="Add Tags"
                  />
                  <button
                    type="button"
                    disabled={!tag || tag === ""}
                    onClick={() =>
                      tag &&
                      tag.length > 0 &&
                      setFormData({
                        ...formData,
                        tags: [...formData.tags, ...tag.split(",")],
                      })
                    }
                    className="bg-neutral-900 text-white px-2 rounded hover:scale-105"
                  >
                    Add
                  </button>
                </div>
                <p>{formData.tags.join(", ")}</p>
              </div>
              <div>
                <h1
                  className={`${
                    formData.completed ? "text-green-500" : "text-red-500"
                  } font-semibold`}
                >
                  {formData.completed ? "Completed" : "Not Completed"}
                </h1>
                <button
                  className="bg-neutral-400 px-2 rounded text-sm font-semibold hover:scale-105"
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, completed: !formData.completed })
                  }
                >
                  toggle status
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-10 md:gap-20">
              <button
                type="submit"
                className="bg-neutral-900 text-white px-6 rounded py-2 font-semibold hover:scale-105"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                type="button"
                className="bg-neutral-900 text-white px-6 rounded py-2 font-semibold hover:scale-105"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default EditSingleNote;
