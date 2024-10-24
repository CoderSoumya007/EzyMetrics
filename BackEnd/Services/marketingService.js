import Campaign from "../models/Campaign.js"

class MarketingService {
    async fetchCampaigns(){
        // Dummy Marketing Campaign Data
      const dummyCampaigns  = [
        {
          "campaign_id": 101,
          "campaign_name": "Summer 2024 Promo",
          "start_date": "2024-06-01",
          "end_date": "2024-07-31",
          "budget": 5000,
          "spend": 3200,
          "clicks": 12000,
          "impressions": 150000,
          "leads_generated": 300,
          "conversion_rate": 10.5,
          "status": "Active"
        },
        {
          "campaign_id": 102,
          "campaign_name": "Winter Sale 2023",
          "start_date": "2023-11-15",
          "end_date": "2023-12-31",
          "budget": 10000,
          "spend": 9800,
          "clicks": 18000,
          "impressions": 200000,
          "leads_generated": 500,
          "conversion_rate": 15,
          "status": "Completed"
        }
      ];

      return await Campaign.insertMany(dummyCampaigns);
    }
}

export default new MarketingService();