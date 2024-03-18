import { Router } from "express";
import {getAllEmails, getEmailById} from "../controllers/emails.controller.js"

const router = Router()

router.get("/emails", getAllEmails);
router.get("/emails/:id", getEmailById);    // read


/*
// CreateReadUpdateDelete - CRUD

router.post("/libros", createLibro);        // create
router.get("/libros/:id", getLibroById);    // read
router.put("/libros/:id", updateLibro);     // update
router.delete("/libros/:id", deleteLibro);  // delete
*/

export default router