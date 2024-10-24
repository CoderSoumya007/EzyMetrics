import Lead from '../models/Lead.js';
import Campaign from '../models/Campaign.js';
// import fetchLeads from './crmService.js';
// import marketingService from './marketingService.js';

class ETLService {
  async performETL() {
    console.log('Starting ETL process...');

    // Extract
    const extractedData = await this.extractData();

    // Transform
    const transformedData = this.transformData(extractedData);

    // Load
    await this.loadData(transformedData);

    console.log('ETL process completed.');

    return transformedData;
  }

  async extractData() {
    console.log('Extracting data...');
    const leads = await Lead.find({});
    const campaigns = await Campaign.find({});
    return { leads, campaigns };
  }

  transformData(data) {
    console.log('Transforming data...');
    const { leads, campaigns } = data;

    // Transform leads
    const leadMetrics = this.transformLeads(leads);

    // Transform campaigns
    const campaignMetrics = this.transformCampaigns(campaigns);

    // Combine metrics
    const combinedMetrics = this.combineMetrics(leadMetrics, campaignMetrics);

    return combinedMetrics;
  }

  transformLeads(leads) {
    const totalLeads = leads.length;
    const leadsBySource = {};
    const leadsByStatus = {};
    const leadsByCompany = {};
    let totalLeadScore = 0;
    const salespeople = new Set();

    leads.forEach(lead => {
      leadsBySource[lead.source] = (leadsBySource[lead.source] || 0) + 1;
      leadsByStatus[lead.status] = (leadsByStatus[lead.status] || 0) + 1;
      leadsByCompany[lead.company] = (leadsByCompany[lead.company] || 0) + 1;
      totalLeadScore += lead.lead_score;
      salespeople.add(lead.assigned_salesperson);
    });

    const averageLeadScore = totalLeadScore / totalLeads;
    const conversionRate = leads.filter(lead => lead.status === 'Converted').length / totalLeads;

    return {
      totalLeads,
      leadsBySource,
      leadsByStatus,
      leadsByCompany,
      averageLeadScore,
      conversionRate,
      uniqueSalespeople: salespeople.size
    };
  }

  transformCampaigns(campaigns) {
    const totalCampaigns = campaigns.length;
    let totalBudget = 0;
    let totalSpend = 0;
    let totalClicks = 0;
    let totalImpressions = 0;
    let totalLeadsGenerated = 0;
    let activeCampaigns = 0;

    campaigns.forEach(campaign => {
      totalBudget += campaign.budget;
      totalSpend += campaign.spend;
      totalClicks += campaign.clicks;
      totalImpressions += campaign.impressions;
      totalLeadsGenerated += campaign.leads_generated;
      if (campaign.status === 'Active') activeCampaigns++;
    });

    const overallCTR = totalClicks / totalImpressions;
    const overallConversionRate = totalLeadsGenerated / totalClicks;
    const overallCPL = totalSpend / totalLeadsGenerated; // Cost Per Lead
    const budgetUtilization = totalSpend / totalBudget;

    return {
      totalCampaigns,
      activeCampaigns,
      totalBudget,
      totalSpend,
      totalClicks,
      totalImpressions,
      totalLeadsGenerated,
      overallCTR,
      overallConversionRate,
      overallCPL,
      budgetUtilization
    };
  }

  combineMetrics(leadMetrics, campaignMetrics) {
    const overallConversionRate = leadMetrics.totalLeads / campaignMetrics.totalLeadsGenerated;
    const averageLeadsPerCampaign = leadMetrics.totalLeads / campaignMetrics.totalCampaigns;

    return {
      leads: leadMetrics,
      campaigns: campaignMetrics,
      overall: {
        overallConversionRate,
        averageLeadsPerCampaign
      }
    };
  }


  async loadData(transformedData) {
    console.log('Loading transformed data...');
    // In a real-world scenario, you might want to store these metrics in a separate collection
    // For this example, we'll just log the data
    console.log('Transformed Data:', JSON.stringify(transformedData, null, 2));
  }
}

export default new ETLService();