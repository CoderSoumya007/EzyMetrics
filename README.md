# EzyMetrics Backend API

EzyMetrics Backend API provides seamless data integrations, ETL (Extract, Transform, Load) processes, reporting capabilities, and notification services. It integrates with CRM and marketing platforms, processes lead and campaign data, and generates actionable reports for the EzyMetrics platform.


## Table of Content

1. Installation
2. Environment Variables
3. API Endpoints
4. Lead Data Endpoints
5. Campaign Data Endpoints
6. ETL Process Endpoints
7. Reporting Endpoints
8. Notification Endpoints
9. Error Handling
## Installation

1. Clone the repository: git clone https://github.com/CoderSoumya007/EzyMetrics.git
2.  Navigate to the project directory: cd EzyMetrics/BackEnd
3. Install the required dependencies: npm Install
4. Ensure MongoDB is running, or set up the database connection via MongoDB Atlas.
5. Create a .env file with the following variables described below.
6. Start the server: npm start


## Environment Variables

# MongoDB Configuration
MONGO_URI= //your database url  
PASSWORD= //your database password

# Nodemailer (for sending alerts)
SMTP_HOST=smtp.gmail.com  //Host-Email  
SMTP_PORT=587  
SMTP_USER=your-email@gmail.com  //User-Email  
SMTP_PASS=your-app-password  //App-password  
SMTP_FROM=your-email@gmail.com  //Sender-Email

# Application Port
PORT=5000

##  API Endpoints

## 1. Welcome Endpoint
Endpoint: /welcome  

Method: GET  

Description: Simple endpoint to check if the server is running.  

Response:  
{
  "message": "Welcome to Lead Management System"
}

## 2. Fetch Leads
Fetch all lead data from the CRM service.  

Endpoint: /api/leads/fetch  

Method: GET 

Description: Retrieves all the leads from the CRM and stores them in the database named leads.  

Response: Returns a JSON array of lead objects.  
[
    {  
        "lead_id": 1,  
        "name": "John Doe",  
        "email": "john.doe@example.com",  
        "phone": "+1234567890",  
        "source": "Website",  
        "status": "New",  
        "company": "ABC Corp",  
        "lead_score": 75,  
        "assigned_salesperson": "Alice Smith",  
        "_id": "671ace392e8d44e47accee92",  
        "__v": 0  
    },
]

## 3.Fetch Campaigns
Fetch all campaign data from the marketing service.

Endpoint: /api/campaigns/fetch  

Method: GET 

Description: Retrieves all the campaigns and stores them in the database.

Response: Returns a JSON array of campaign objects.

[
    {  
        "campaign_id": 101,  
        "campaign_name": "Summer 2024 Promo",  
        "start_date": "2024-06-01T00:00:00.000Z",  
        "end_date": "2024-07-31T00:00:00.000Z",  
        "budget": 5000,  
        "spend": 3200,  
        "clicks": 12000,  
        "impressions": 150000,  
        "leads_generated": 300,  
        "conversion_rate": 10.5,  
        "status": "Active",  
        "_id": "671acf102e8d44e47accee95",  
        "__v": 0  
    },
]  

## 4.ETL Process Endpoints
Run ETL Process:
Starts the ETL (Extract, Transform, Load) process for leads and campaigns.  

Endpoint: /api/etl/fetch   

Method: Get

Description: Triggers the ETL process, extracting lead and campaign data, transforming it into meaningful metrics, and loading it into the database.  

Response: Returns the transformed metrics.  
{  
    "leads": {  
        "totalLeads": 8,  
        "leadsBySource": {   
            "Website": 4,  
            "Social Media": 4  
        },  
        "leadsByStatus": {  
            "New": 4,  
            "Contacted": 4  
        },  
        "leadsByCompany": {  
            "ABC Corp": 4,  
            "XYZ Ltd": 4  
        },
        "averageLeadScore": 67.5,  
        "conversionRate": 0,  
        "uniqueSalespeople": 2  
    },   
    "campaigns": {  
        "totalCampaigns": 12,  
        "activeCampaigns": 6,  
        "totalBudget": 90000,  
        "totalSpend": 78000,  
        "totalClicks": 180000,  
        "totalImpressions": 2100000,  
        "totalLeadsGenerated": 4800,  
        "overallCTR": 0.08571428571428572,  
        "overallConversionRate": 0.02666666666666667,  
        "overallCPL": 16.25,  
        "budgetUtilization": 0.8666666666666667  
    },  
    "overall": {  
        "overallConversionRate": 0.0016666666666666668,  
        "averageLeadsPerCampaign": 0.6666666666666666  
    }  
}  

## 4.Reporting Endpoints
Generate PDF Report:
Generate a PDF report with the ETL data.  

Endpoint: /api/reports/generate${query} //query can be either CSV or PDF

Description: Generates a PDF/CSV according to user choice report containing metrics from leads and campaigns.  

CSV Format:  
![image](https://github.com/user-attachments/assets/a16decb2-c7f3-44c7-bd21-e7eb37ea6b03)  

PDF Format:  
![image](https://github.com/user-attachments/assets/55849467-56b1-4582-ac16-1393a0f229de)  



## 5.Notification Endpoints  
 Send Alert Email:
Sends an alert email if specific conditions are met (e.g., low conversion rate).  

Endpoint: Automatically triggered during ETL if a condition is met.  

Description: If the conversion rate is below 2%, an alert is sent to the admin email.  

Example: A low conversion rate alert would trigger an email:
Subject: Low Conversion Rate Alert
The current conversion rate is 1.95%, which is below the threshold of 2%.  

Example of Mail:
![WhatsApp Image 2024-10-25 at 04 40 45_9c264742](https://github.com/user-attachments/assets/7a19cf98-bf35-4549-9220-b927d248e719)




## Error Handling  

Common errors include:

400 Bad Request – Invalid input data.  
404 Not Found – Lead or campaign not found.  
500 Internal Server Error – A server-side issue occurred.  
