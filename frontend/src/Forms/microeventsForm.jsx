import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const MicroEventsForm = () => {
  const [formData, setFormData] = useState({
    microevents_id: "", // Primary key, generated by the backend
    subject_id: "",
    hadm_id: "",
    micro_specimen_id: "",
    order_provider_id: "",
    chartdate: "",
    charttime: "",
    specimen_itemid: "",
    spec_type_desc: "",
    test_seq: "",
    storedate: "",
    storetime: "",
    test_itemid: "",
    test_name: "",
    org_itemid: "",
    org_name: "",
    isolate_num: "",
    quantity: "",
    ab_itemid: "",
    ab_name: "",
    dilution_text: "",
    dilution_comparison: "",
    dilution_value: "",
    interpretation: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const microeventsData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/microevents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(microeventsData),
      });

      if (response.ok) {
        console.log("MicroEvents form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit MicroEvents form:", response);
      }
    } catch (error) {
      console.error("Error submitting MicroEvents form:", error);
    }
  };

  return (
    <form
      style={{
        margin: "30px",
        marginLeft: "10px",
        border: "2px solid blue",
        padding: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        MicroEvents Form
      </Typography>
      <TextField
        label="Subject ID"
        name="subject_id"
        value={formData.subject_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Hospital Admission ID"
        name="hadm_id"
        value={formData.hadm_id}
        fullWidth
        disabled // Prevent manual editing
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Micro Specimen ID"
        name="micro_specimen_id"
        value={formData.micro_specimen_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      {/* Add more fields for the rest of the form data */}
      <TextField
        label="Order Provider ID"
        name="order_provider_id"
        value={formData.order_provider_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Chart Date"
        name="chartdate"
        value={formData.chartdate}
        type="date" // You can adjust the input type as needed
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Chart Time"
        name="charttime"
        value={formData.charttime}
        type="time" // You can adjust the input type as needed
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Specimen Item ID"
        name="specimen_itemid"
        value={formData.specimen_itemid}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Spec Type Description"
        name="spec_type_desc"
        value={formData.spec_type_desc}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Test Sequence"
        name="test_seq"
        value={formData.test_seq}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Store Date"
        name="storedate"
        value={formData.storedate}
        type="date" // You can adjust the input type as needed
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Store Time"
        name="storetime"
        value={formData.storetime}
        type="time" // You can adjust the input type as needed
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Test Item ID"
        name="test_itemid"
        value={formData.test_itemid}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Test Name"
        name="test_name"
        value={formData.test_name}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Organism Item ID"
        name="org_itemid"
        value={formData.org_itemid}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Organism Name"
        name="org_name"
        value={formData.org_name}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Isolate Number"
        name="isolate_num"
        value={formData.isolate_num}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Antibiotic Item ID"
        name="ab_itemid"
        value={formData.ab_itemid}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Antibiotic Name"
        name="ab_name"
        value={formData.ab_name}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dilution Text"
        name="dilution_text"
        value={formData.dilution_text}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dilution Comparison"
        name="dilution_comparison"
        value={formData.dilution_comparison}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dilution Value"
        name="dilution_value"
        value={formData.dilution_value}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Interpretation"
        name="interpretation"
        value={formData.interpretation}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Value"
        name="value"
        value={formData.value}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MicroEventsForm;
