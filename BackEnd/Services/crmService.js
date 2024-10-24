import Lead from "../models/Lead.js"


const fetchLeads = async () => {

  //Dummy Leads from CRM
  const dummyLeads = [
    {
      "lead_id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "source": "Website",
      "status": "New",
      "company": "ABC Corp",
      "lead_score": 75,
      "assigned_salesperson": "Alice Smith"
    },
    {
      "lead_id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "+0987654321",
      "source": "Social Media",
      "status": "Contacted",
      "company": "XYZ Ltd",
      "lead_score": 60,
      "assigned_salesperson": "Bob Johnson"
    }
  ];


  try {
    console.log("Succesfully Inserted into lead collection");
    
    return await Lead.insertMany(dummyLeads);
  } catch (error) {
    throw new Error("Error inserting leads into the database: " + error.message);
  }
}

export default fetchLeads;

