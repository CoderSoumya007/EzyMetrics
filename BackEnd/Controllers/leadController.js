import fetchLeads from "../Services/crmService.js";

export const fetchLeadsController = async (req, res) => {
    try {
      const insertedLeads = await fetchLeads();
    //   console.log("Leads successfully inserted:", insertedLeads);
      res.status(200).json(insertedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
    }
  };

