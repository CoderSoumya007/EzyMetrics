import MarketingService from "../Services/marketingService.js"

export const fetchCampaigns=async (req,res)=>{
try{
    const campaigns=await MarketingService.fetchCampaigns();
    res.json(campaigns);
}catch(error){
    res.status(500).json({message:"Error fetching campaigns",error:error.message})
}
}