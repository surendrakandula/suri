import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, Button, Box, Grid } from '@mui/material';
import axios from 'axios';
 
const AddCompany = ({ isOpen, onClose, onAddCompany }) => {
    const [newCompany, setNewcompany] = useState({
        companyName: '',
        emailAddress: '',
        phoneNumber: '',
        Address: '',
        country: '',
        totalEmployees: ''
    });
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewcompany(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
 
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
       
        // Make a POST request to add the new student
        axios.post('http://localhost:3005/v1/postCompanyData', newCompany)
            .then(response => {
                console.log(response.data); // Log response from server
                onAddCompany(newCompany); // Add the new student to the table
                onClose(); // Close the modal
            })
            .catch(error => {
                console.error('Error adding student:', error);
                // Handle error as needed
            });
    };
   
 
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'white', boxShadow: 24, p: 2 }}>
                <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Add Company</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField name="id" label="Company ID" value={newCompany.id} onChange={handleChange} fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="companyName" label="Company Name" value={newCompany.CompanyName} onChange={handleChange} fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="emailAddress" label="emailAddress" value={newCompany.emailAddress} onChange={handleChange} fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="phoneNumber" label="phoneNumber" value={newCompany.phoneNumber} onChange={handleChange} fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="Address" label="Address" value={newCompany.Address} onChange={handleChange} fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="country" label="country" value={newCompany.country} onChange={handleChange} fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="totalEmployees" label="totalEmployees" value={newCompany.totalEmployees} onChange={handleChange} fullWidth variant="outlined" />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 10 }}>
                        <Button onClick={onClose} variant="contained" color="primary" style={{ marginRight: 10 }}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">Add</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};
 
export default AddCompany;