import { createContext, useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

type NoteType = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
  image: string;
};

export type NoteTypeForGetSingleNote = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    completed: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export type NoteTypeForCreate = {
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
  image: string;
};

// export type NoteTypeWithOutId = Omit<NoteType, "id">;

export type ContextType = {
  loading: boolean;
  notes: NoteType[] | null;
  singleNote: NoteTypeForGetSingleNote | null;
  getAllNotes: () => void;
  createNote: (note: NoteTypeForCreate) => void;
  getSingleNote: (id: number) => void;
  updateNote: (id: number, note: NoteTypeForCreate) => void;
  deleteNote: (id: number) => void;
};

type GlobalStateProps = {
  children: React.ReactNode;
};

export const GlobalContext = createContext<ContextType>({} as ContextType);

function GlobalState({ children }: GlobalStateProps) {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [singleNote, setSingleNote] = useState<NoteTypeForGetSingleNote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createNote = async (note: NoteTypeForCreate) => {
    setLoading(true);
    try {
      console.log(note);
      await axios.post("/notes", note);
      //   console.log(response.data);
      setLoading(false);
      console.log("Note Created Successfully");
      toast.success("Note Created Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/notes");
      setNotes(response.data.data);
      // console.log(response.data);
      setLoading(false);
      console.log("Notes Fetched Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getSingleNote = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/notes/${id}`);
      setSingleNote(response.data.data);
      // console.log(response.data);
      setLoading(false);
      console.log("Note Fetched Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateNote = async (id: number, note: NoteTypeForCreate) => {
    setLoading(true);
    try {
      await axios.patch(`/notes/${id}`, note);
      console.log(note);
      setLoading(false);
      console.log("Note Updated Successfully");
      toast.success("Note Updated Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteNote = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`/notes/${id}`);
      setLoading(false);
      console.log("Note Deleted Successfully");
      toast.success("Note Deleted Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        notes,
        singleNote,
        loading,
        createNote,
        getAllNotes,
        getSingleNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
