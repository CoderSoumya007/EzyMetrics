import etlServices from '../Services/etlServices.js';
import NotificationService from '../Services/notificationService.js';
import ReportingService from '../Services/reportingService.js';

export const generateReport = async (req, res) => {
    try {
        const report = await etlServices.performETL();
        const reportData = { ...report };
        // console.log("report data ",reportData);


        const { format } = req.query;
        let filePath;

        if (format === 'csv') {
            filePath = await ReportingService.generateCSVReport(reportData);
        } else {
            filePath = await ReportingService.generatePDFReport(reportData);
        }
        
        res.download(filePath);

        // Check for alert conditions
        if (report.leads.conversionRate < 0.02) {
            const emailSubject = 'Low Conversion Rate Alert';
            const emailMessage = `The current conversion rate is ${report.leads.conversionRate.toFixed(2)}%, which is below the threshold of 2%.`;

            await NotificationService.sendAlert(
                "soumyaranjanpanda86581@gmail.com",
                emailSubject,
                emailMessage
            );
        }
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error: error.message });
    }
};