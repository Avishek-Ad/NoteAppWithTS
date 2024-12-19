import { Request, Response } from "express";
import Note from "../models/notes";
import cloudinary from "../libs/cloudinary";

type NoteType = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
  image: string;
};

const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.findAll();
    res.status(200).json({ data: notes, nHits: notes.length });
  } catch (error) {
    console.log("Error in Get All Notes Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNote = async (req: Request, res: Response) => {
  try {
    const { title, description, tags, completed, image } = req.body;
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "notes",
      });
    }

    const note = await Note.create({
      title,
      description,
      tags,
      completed,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
    });
    res.status(201).json({ data: note, message: "Note Created Successfully" });
  } catch (error) {
    console.log("Error in Create Note Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const note = await Note.findAll({where : {id: id}});
    const note = await Note.findByPk(id);
    res.status(200).json({ data: note, message: "Note Fetched Successfully" });
  } catch (error) {
    console.log("Error in Get Note Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, tags, completed, image } = req.body;
    // console.log(req.body);
    const note = await Note.findByPk(id);
    const planeNote: NoteType = note?.get();
    if (!note) {
      res.status(404).json({ message: "Note Not Found" });
    }
    let cloudinaryResponse = null;
    
    if (image) {
      // destroy previous image
      if (planeNote.image) {
        const publicId = planeNote.image.split("/").pop()?.split(".")[0];
        // console.log("sfdkjhdsakfjlksadjf")
        try {
          await cloudinary.uploader.destroy(`notes/${publicId}`);
          console.log("Image Deleted Successfully");
        } catch (error) {
          console.log("Error in Delete Note Controller", error.message);
        }
      }
      // upload new image
      if (image) {
        cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: "notes",
        });
      }
      await note.update({
        title,
        description,
        tags,
        completed,
        image: cloudinaryResponse?.secure_url
          ? cloudinaryResponse.secure_url
          : "",
      });
    }else{
      await note.update({
        title,
        description,
        tags,
        completed
      });
    }

    res
      .status(200)
      .json({message: "Note Updated Successfully" });
  } catch (error) {
    console.log("Error in Update Note Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    const planeNote: NoteType = note?.get();
    if (!note) {
      res.status(404).json({ message: "Note Not Found" });
    }

    if (planeNote.image) {
      const publicId = planeNote.image.split("/").pop()?.split(".")[0];
      try {
        await cloudinary.uploader.destroy(`notes/${publicId}`);
        console.log("Image Deleted Successfully");
      } catch (error) {
        console.log("Error in Delete Note Controller", error.message);
      }
    }
    await note.destroy();
    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    console.log("Error in Delete Note Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllNotes, createNote, getNote, updateNote, deleteNote };
