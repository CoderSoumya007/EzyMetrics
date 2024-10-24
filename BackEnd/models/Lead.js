import mongoose from "mongoose"

const LeadSchema = new mongoose.Schema({
    lead_id: Number,
    name: String,
    email: String,
    phone: String,
    source: String,
    status: String,
    company: String,
    lead_score: Number,
    assigned_salesperson: String
})

export default mongoose.model("Lead",LeadSchema)