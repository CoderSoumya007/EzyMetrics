import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
    campaign_id: Number,
    campaign_name: String,
    start_date: Date,
    end_date: Date,
    budget: Number,
    spend: Number,
    clicks: Number,
    impressions: Number,
    leads_generated: Number,
    conversion_rate: Number,
    status: String
})

export default mongoose.model('Campaign',CampaignSchema);
