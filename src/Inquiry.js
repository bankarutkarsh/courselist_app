import React, { useEffect, useState } from "react";
import axios from "axios";

function Inquiry() {
  const [enquiry, setEnquiry] = useState(null);
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("http://localhost:3004/enquiries");
        setEnquiry(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="App">
      <h1>All Inquiries</h1>
      <pre>{JSON.stringify(enquiry, null, 2)}</pre>
    </div>
  );
}

export default Inquiry;
