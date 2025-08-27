import express from "express";
import { create, getHistory } from "../controller/Noteshistory.js";
const route = express.Router();
const app = express();

route.post("/AddHistory", create);
route.get("/Noteshistory/:id",getHistory)
export default route;
