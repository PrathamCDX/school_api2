import express from "express";
import listSchools from "../Controllers/listSchoolsController.js";
import addSchool from "../Controllers/addSchoolController.js";
const authRouter = express.Router();

authRouter.get("/listSchools", listSchools);
authRouter.post("/addschool", addSchool);

export default authRouter;
