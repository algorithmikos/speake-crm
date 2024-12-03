import React from "react";

export const SingleStudent = ({ student, index, handleChange }) => {
  const fields = [
    {
      name: "studentName",
      label: `Student Name`,
      type: "text",
      required: true,
    },
    { name: "studentNumber", label: "Student Number", type: "tel" },
    {
      name: "grade",
      label: "Grade",
      type: "select",
      options: [
        "Select a grade",
        "1st secondary",
        "2nd secondary",
        "3rd secondary",
      ],
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Select a status", "Online", "Offline"],
      required: true,
    },
    {
      name: "action",
      label: "Action",
      type: "select",
      options: [
        "Select an action",
        "Call",
        "WhatsApp",
        "WhatsApp Only",
        "Settled",
      ],
      required: true,
    },
    {
      name: "payment",
      label: "Payment Cycle",
      type: "select",
      options: [
        "Select a payment cycle",
        "per Session",
        "Monthly",
        "(Subvention) per Session",
        "(Subvention) Monthly",
      ],
    },
    {
      name: "source",
      label: "Ad Source",
      type: "select",
      options: [
        "Select a source",
        "Facebook",
        "On-Ground Campaign",
        "Acquaintances",
      ],
      required: true,
    },
    { name: "notes", label: "Notes", type: "textarea", rows: 3 },
    { name: "parentName", label: "Parent Name", type: "text" },
    {
      name: "parentNumber",
      label: "Parent Number",
      type: "tel",
      pattern: "[0-9]{11}",
    },
  ];

  return (
    <div className="container-md" style={{ width: 500 }}>
      {fields.map((field) => (
        <div
          key={field.name}
          className="row form-group mt-4 mb-4 align-items-center"
        >
          <label
            htmlFor={`${field.name}${index}`}
            className="col col-form-label label-font"
            style={{ textAlign: "left", marginRight: -120 }}
          >
            {field.label}
          </label>
          <div className="col">
            {field.type === "select" ? (
              <select
                id={`${field.name}${index}`}
                name={field.name}
                value={student[field.name]}
                onChange={(e) => handleChange(e, index)}
                className="form-select"
                required={field.required}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                id={`${field.name}${index}`}
                name={field.name}
                value={student[field.name]}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Write any ${field.name.toLowerCase()} here...`}
                rows={field.rows}
                className="form-control"
              />
            ) : (
              <input
                id={`${field.name}${index}`}
                type={field.type}
                name={field.name}
                value={student[field.name]}
                onChange={(e) => handleChange(e, index)}
                className="form-control"
                pattern={field.pattern}
                required={field.required}
                placeholder={field.placeholder}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
