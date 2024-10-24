import express from "express"
import { runETL } from "../Controllers/etlController.js";

const router=express.Router();

router.get("/fetch",runETL)

export default router;