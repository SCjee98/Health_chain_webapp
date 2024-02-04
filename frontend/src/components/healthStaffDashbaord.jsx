import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Modal,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavBar from "../adminDashboard/NavBar";

const HealthStaffDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };
  const handleCloseModal = () => {
    setSelectedPatient(null);
  };
  useEffect(() => {
    // Fetch list of patients from the server
    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:5000/api/dashboard/health-staff/patients", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const styles = {
    patientCard: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      marginBottom: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    selectedPatient: {
      backgroundColor: "#f0f8ff", // Light blue background for selected patient
    },
    formButton: {
      margin: "5px",
    },
  };

  const forms = [
    { name: "Admission Form", link: "/admission" },
    { name: "EMAR Form", link: "/emar" },
    { name: "DRG Codes Form", link: "/drgcodes" },
    { name: "Lab Events Form", link: "/lab-events" },
    { name: "Microevents Form", link: "/microevents" },
    { name: "OMR Form", link: "/omr" },
    { name: "Pharmacy Form", link: "/pharmacy" },
    { name: "POE Form", link: "/poe" },
    { name: "POE Details Form", link: "/poe-details" },
    { name: "Prescriptions Form", link: "/prescriptions" },
    { name: "Procedures ICD Form", link: "/procedures-icd" },
    { name: "Provider Form", link: "/provider" },
    { name: "Services Form", link: "/services" },
    { name: "Transfers Form", link: "/transfers" },
    { name: "Caregivers Form", link: "/caregivers" },
    { name: "Chart Events Form", link: "/chart-events" },
    { name: "D_Items Form", link: "/d-items" },
    { name: "DateTimeEvents Form", link: "/datetimeevents" },
    { name: "ICUSTays Form", link: "/icustays" },
    { name: "Ingredient Events Form", link: "/ingredientevents" },
    { name: "Input Events Form", link: "/inputevents" },
    { name: "Output Events Form", link: "/outputevents" },
    { name: "Procedure Events Form", link: "/procedureevents" },
    { name: "HCPS Events Form", link: "/hcps-events" },
    { name: "LAB ITEMS FORM", link: "/d_labItems" },
    // Add more forms as needed
  ];
  // const generateFormLinks = () => {
  //   return forms.map((form, index) => (
  //     <Grid item xs={4} key={index}>
  //       <Link
  //         to={form.link}
  //         state={{ selectedSubject_id: selectedPatient.subject_id }}
  //       >
  //         <Button variant="contained" color="primary" fullWidth>
  //           {form.name}
  //         </Button>
  //       </Link>
  //     </Grid>
  //   ));
  // };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <NavBar> Health Staff DAshboard</NavBar>
        {/* <Typography variant="h4">Health Staff Dashboard</Typography> */}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label="Search Patients"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ margin: "20px 0" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell align="center">Subject Id</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Date of Birth</TableCell>
              <TableCell align="center">Contact Number</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {patients
              .filter(
                (patient) =>
                  patient.firstName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  patient.lastName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  patient.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((patient, index) => (
                <TableRow
                  key={patient.subject_id}
                  onClick={() => handlePatientSelect(patient)}
                  sx={{
                    cursor: "pointer",
                    ...styles.patientCard,
                    ...(selectedPatient === patient
                      ? styles.selectedPatient
                      : {}),
                    "&:hover": {
                      backgroundColor: "#f0f8ff", // Light blue on hover
                    },
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  }}
                >
                  <TableCell align="center">{patient.subject_id}</TableCell>
                  <TableCell align="center">{patient.firstName}</TableCell>
                  <TableCell align="center">{patient.lastName}</TableCell>
                  <TableCell align="center">{patient.gender}</TableCell>
                  <TableCell align="center">{patient.dob}</TableCell>
                  <TableCell align="center">{patient.contactNumber}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedPatient && (
        <Paper elevation={3}>
          <Modal open={Boolean(selectedPatient)} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                maxWidth: "90%",
                overflow: "auto", // Enable scrolling
                maxHeight: "80vh", // Set maximum height for responsiveness
              }}
            >
              <Card elevation={3} sx={{ margin: "20px 0", padding: "16px" }}>
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: "16px",
                      fontFamily: "Verdana, sans-serif",
                      color: "#2C3E50",
                      textShadow: "1px 1px 2px #888888",
                      backgroundColor: "#ECF0F1",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    Selected Patient: {selectedPatient.subject_id}
                  </Typography>
                </CardContent>
              </Card>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="h5"
                    sx={{
                      marginBottom: "0px",
                      fontFamily: "Verdana, sans-serif",
                      color: "#2C3E50",
                      textShadow: "1px 1px 2px #888888",
                      backgroundColor: "#ECF0F1",
                      padding: "2px",
                      borderRadius: "2px",
                    }}
                  >
                    Forms:
                  </Typography>
                  {/* <Grid>{generateFormLinks(forms)}</Grid> */}
                </AccordionSummary>
                <AccordionDetails>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Form Name</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Map over the forms and render each row */}
                      {forms.map((form, index) => (
                        <TableRow key={index}>
                          <TableCell>{form.name}</TableCell>
                          <TableCell>
                            <Link
                              to={form.link}
                              state={{
                                selectedSubject_id: selectedPatient.subject_id,
                              }}
                              onClick={handleCloseModal}
                            >
                              <Button variant="contained" color="primary">
                                View Form
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Modal>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default HealthStaffDashboard;
