import express from "express";
import {registration} from "../controllers/userController.js";
import {login} from "../controllers/userController.js";
import {getUsersdata} from "../controllers/userController.js";
import {getUserToken} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registration);
router.post("/login", login);
router.get("/getUsers", getUsersdata);
router.get("/getToken", getUserToken);

export default router;
