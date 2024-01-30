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
  Grid,
} from "@mui/material";
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
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <TextField
        label="Search Patients"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Id</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Anchor Age</TableCell>
              <TableCell>Anchor Year</TableCell>
              <TableCell>Anchor Year Group</TableCell>
              <TableCell>Date of Death</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {patients
              .filter(
                (patient) =>
                  patient.subject_id
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  patient.gender
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  // patient.email.toLowerCase().includes(searchTerm.toLowerCase())
                  patient.anchor_age
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  patient.anchor_year
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  patient.anchor_year_group
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  patient.dod.toLowerCase().includes(searchTerm.toLowerCase())
              )

              .map((patient) => (
                <TableRow
                  key={patient.subject_id}
                  onClick={() => handlePatientSelect(patient)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{patient.subject_id}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.anchor_age}</TableCell>
                  <TableCell>{patient.anchor_year}</TableCell>
                  <TableCell>{patient.anchor_year_group}</TableCell>
                  <TableCell>{patient.dod}</TableCell>
                </TableRow>
              ))}
          </TableBody> */}
          <TableBody>
            {patients
              .filter((patient) => patient.subject_id.includes(searchTerm))
              .map((patient) => (
                <TableRow
                  key={patient.subject_id}
                  onClick={() => handlePatientSelect(patient)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{patient.subject_id}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.anchor_age}</TableCell>
                  <TableCell>{patient.anchor_year}</TableCell>
                  <TableCell>{patient.anchor_year_group}</TableCell>
                  <TableCell>{patient.dod}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedPatient && (
        <Paper elevation={3}>
          <Box mt={4}>
            <Typography variant="h4">
              Selected Patient: {selectedPatient.subject_id}{" "}
              {/* {selectedPatient.lastName} */}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Forms:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/admission`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Admission Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/emar`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    EMAR Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/drgcodes`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    DRG Codes Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/lab-events`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Lab Events Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/microevents`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Microevents Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/omr`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    OMR (Order Management Record) Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/pharmacy`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Pharmacy Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/poe`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    POE (Provider Order Entry) Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/poe-details`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    POE Details Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/prescriptions`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Prescriptions Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/procedures-icd`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Procedures ICD Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/provider`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Provider Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/services`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Services Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/transfers`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Transfers Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/caregivers`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Caregivers Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/chart-events`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Chart Events Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/d-items`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    D_Items Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/datetimeevents`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    DateTimeEvents Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/icustays`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    ICUSTays Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/ingredientevents`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Ingredient Events Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/inputevents`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Input Events Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/outputevents`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Output Events Form
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  to={`/procedureevents`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Procedure Events Form
                  </Button>
                </Link>
                <Link
                  to={`/hcps-events`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    HCPS EVENTS FORM
                  </Button>
                </Link>
                <Link
                  to={`/d_labItems`}
                  state={{ selectedSubject_id: selectedPatient.subject_id }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    LAB ITEMS FORM
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default HealthStaffDashboard;
