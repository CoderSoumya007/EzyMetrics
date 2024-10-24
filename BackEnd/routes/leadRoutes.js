import express from "express"
import {fetchLeadsController} from "../Controllers/leadController.js"


const router=express.Router();
router.get('/fetch',fetchLeadsController);

export default router;