import express from "express"
import {fetchCampaigns} from "../Controllers/campaignController.js";

const router=express.Router();

router.get("/fetch",fetchCampaigns);

export default router;