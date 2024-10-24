import PDFDocument from 'pdfkit';
import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ReportingService {
  async generatePDFReport(data) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const filePath = path.join(__dirname, '../reports/report.pdf');
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);
      doc.fontSize(25).text('EzyMetrics Report', 100, 80);
      doc.fontSize(15).text(JSON.stringify(data, null, 2), 100, 120);

      doc.end();

      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    });
  }

  async generateCSVReport(data) {
    const filePath = path.join(__dirname, '../reports/report.csv');

    // Flatten the object of objects
    const records = {
      ...data.leads,  // Flatten leads
      ...data.campaigns,  // Flatten campaigns
      overallConversionRate: data.overall.overallConversionRate,
      averageLeadsPerCampaign: data.overall.averageLeadsPerCampaign
    };

    // Convert the record to an array for the CSV writer
    const recordArray = [records];  // Wrap in an array since the csv-writer expects an array of objects
    // console.log(recordArray);
    
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'totalLeads', title: 'Total Leads' },
        { id: 'averageLeadScore', title: 'Average Lead Score' },
        { id: 'activeCampaigns', title: 'Active Campaigns' },
        { id: 'overallConversionRate', title: 'Overall Conversion Rate' },
        { id: 'averageLeadsPerCampaign', title: 'Average Leads Per Campaign' },
        { id: 'conversionRate', title: 'Conversion Rate of Leads' },
        { id: 'uniqueSalespeople', title: 'Unique Number of Sales Person' },
        { id: 'totalCampaigns', title: 'Total Number of Campaigns' },
        { id: 'activeCampaigns', title: 'Active Number of Campaigns' },
        { id: 'totalBudget', title: 'Total Budget' },
        { id: 'totalLeadsGenerated', title: 'Total Number of Leads Generated' },
        { id: 'overallCTR', title: 'Overall CTR' },
        { id: 'overallConversionRate', title: 'Overall Conversion Rate' },
        { id: 'averageLeadsPerCampaign', title: 'Avg Leads per Campaigns' },
      ],
    });

    await csvWriter.writeRecords(recordArray); // Write the records to the CSV file
    return filePath;
  }
}

export default new ReportingService();