import express from "express"
import { generateReport } from '../Controllers/reportController.js';

const router=express.Router();

router.get("/generate",generateReport)

export default router;