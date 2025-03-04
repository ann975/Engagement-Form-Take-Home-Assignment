// You'll need these imports when implementing the form:
import { useState } from "react";
import type { EngagementFormData } from "../types/engagement";
import { generateCustomerId } from "../utils/idGenerator";
import { exportToCSV } from "../utils/csvExport";

export const EngagementForm = () => {
  // TODO: Implement form state management
  // Example:
  // const [formData, setFormData] = useState<EngagementFormData>({
  //   customerId: '', // This will be auto-generated on submission
  //   signupDate: '',
  //   lastEngagementDate: '',
  //   engagementScore: 0,
  //   subscriptionType: 'Basic',
  //   churnStatus: false
  // });
  const [formData, setFormData] = useState<EngagementFormData>({
    customerId: "",
    signupDate: "",
    lastEngagementDate: "",
    engagementScore: 0,
    subscriptionType: "Basic",
    churnStatus: false,
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  // TODO: Implement form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    // Example:
    // const newEntry = {
    //   ...formData,
    //   customerId: generateCustomerId()
    // };
    // exportToCSV(newEntry); // This will combine with mock data

    // Don't forget to:
    // 1. Generate customer ID
    // 2. Validate the form data
    // 3. Export to CSV (will include mock data)
    // 4. Clear the form
    // 5. Show success message

    const errors: string[] = [];
    // //Validate signup date and last engagement date
    // if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.signupDate)) {
    //   errors.push("Signup date must be in YYYY-MM-DD format.");
    // }
    // if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.lastEngagementDate)) {
    //   errors.push("Last engagement date must be in YYYY-MM-DD format");
    // }

    //Check lastEngagementDate not earlier than signupDate

    /*I added a validation for dates but commented out,
    labels already enforce proper formatting

    Change YYYY-MM-DD formatting to MM-DD-YYYY when user inputs for user convenience
    Then output CSV file to YYYY-MM-DD as specified 
    */
    if (!formData.lastEngagementDate || !formData.signupDate) return;

    const lastEngagementDate = new Date(formData.lastEngagementDate);
    const signupDate = new Date(formData.signupDate);

    if (lastEngagementDate < signupDate) {
      errors.push("Last engagement date cannot be earlier than signup date.");
    }

    //Validate engagementScore is integer between 0 and 100
    if (
      !Number.isInteger(formData.engagementScore) ||
      formData.engagementScore < 0 ||
      formData.engagementScore > 100
      //currently doesn't allow for 0 or 100 as inputs, this should be improved
      //conflicting error reports: drop down bar only allows for whole numbers, should also be improved
    ) {
      errors.push("Engagement score must be a whole number between 0 and 100.");
    }

    // //Validate subscriptionType
    // if (!["Basic", "Premium", "VIP"].includes(formData.subscriptionType)) {
    //   errors.push("Subscription Type must be one of: Basic, Premium, or VIP.");
    // }

    // //Validate churnStatus
    // if (typeof formData.churnStatus !== "boolean") {
    //   errors.push("Churn Status must be true or false.");
    // }

    /* I added validations but commented out,
    drop down menu already enforces proper subscription type
    */

    //Check all fields are filled
    /*Later submissions should include user's name as well as Id
     */
    const requiredFields = [
      "signupDate",
      "lastEngagementDate",
      "engagementScore",
      "subscriptionType",
    ];
    const missingField = requiredFields.find(
      (field) => !formData[field as keyof EngagementFormData]
    );

    if (missingField) {
      setFormErrors([`${missingField} is required`]);
      return;
    }
    if (errors.length > 0) {
      setFormErrors(errors);
      return; //Stops form submission from continuing if errors
    }

    const newEntry = {
      ...formData,
      customerId: generateCustomerId(), //Generate customerId
    };

    //Combine with mock CSV data
    exportToCSV(newEntry);
    setFormData({
      customerId: "",
      signupDate: "",
      lastEngagementDate: "",
      engagementScore: 0,
      subscriptionType: "Basic",
      churnStatus: false,
    }); //Clears form
    setFormErrors([]); // Clear errors
    alert("Form submitted successfully!"); //Succcess message
    /*currently exports CSV and produces success message simultaneously
    fix to produce success message, then CSV */
  };

  /* CSV form currently outputs after each submission,
  not allowing for additional submissions to accrue.
  Should have separate Save and Submit buttons 
  */

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: Implement form fields */}
      {/* Example of a form field: */}
      {/* <div>
        <label htmlFor="signupDate">Signup Date:</label>
        <input
          type="date"
          id="signupDate"
          name="signupDate"
          value={formData.signupDate}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            signupDate: e.target.value
          }))}
          required
        />
      </div> */}
      <div>
        <label htmlFor="signupDate">Signup Date:</label>
        <input
          type="date"
          id="signupDate"
          name="signupDate"
          value={formData.signupDate}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              signupDate: e.target.value,
            }))
          }
          required
        />
      </div>

      <div>
        <label htmlFor="lastEngagementDate">Last Engagement Date:</label>
        <input
          type="date"
          id="lastEngagementDate"
          name="lastEngagementDate"
          value={formData.lastEngagementDate}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              lastEngagementDate: e.target.value,
            }))
          }
          required
        />
      </div>

      <div>
        <label htmlFor="engagementScore">Engagement Score (0-100):</label>
        <input
          type="number"
          id="engagementScore"
          name="engagementScore"
          value={formData.engagementScore}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              engagementScore: parseInt(e.target.value, 10),
            }))
          }
          min="0"
          max="100"
          required
        />
      </div>

      <div>
        <label htmlFor="churnStatus">Churn Status:</label>
        <input
          type="checkbox"
          id="churnStatus"
          name="churnStatus"
          checked={formData.churnStatus}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              churnStatus: e.target.checked,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="subscriptionType">Subscription Type:</label>
        <select
          id="subscriptionType"
          name="subscriptionType"
          value={formData.subscriptionType}
          onChange={(e) => {
            const value = e.target.value as "Basic" | "Premium" | "VIP";
            setFormData((prev) => ({
              ...prev,
              subscriptionType: value,
            }));
          }}
          required
        >
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <div>
        {formErrors.length > 0 && (
          <ul>
            {formErrors.map((error, index) => (
              <li key={index} style={{ color: "#ff4da6" }}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
