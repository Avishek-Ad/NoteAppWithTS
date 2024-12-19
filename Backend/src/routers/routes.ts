import express from "express";
const router = express.Router();

import { getAllNotes, createNote, getNote, updateNote, deleteNote } from "../controllers/controllers";

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getNote).patch(updateNote).delete(deleteNote);

export default router;