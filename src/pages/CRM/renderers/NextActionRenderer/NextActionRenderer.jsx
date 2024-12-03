import React from "react";

const NextActionRenderer = ({ value }) => {
  if (!value || value === "n/a") {
    return "Not handled";
  } else if (value === "call") {
    return "Call";
  } else if (value === "call-again") {
    return "Call Again";
  } else if (value === "whatsapp-msg") {
    return "Message on WhatsApp";
  } else if (value === "waiting") {
    return "Waiting";
  } else if (value === "whatsapp-details") {
    return "Booked, details on WhatsApp";
  } else if (value === "convert-to-student") {
    return "Convert to student";
  } else if (value === "archive") {
    return "Archive";
  }
};

export default NextActionRenderer;
