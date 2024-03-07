import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const EditForm = () => {
  
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [country,setCountry] = useState('');
  const [totalemp,setTotalEmp] = useState('');

  const {id} = useParams('');



  useEffect(() => {
    axios.get(`http://localhost:3005/v1/getCompanyData/${id}`)
    .then(res => {
    let companResponce = res.data.activeData;
    
if(companResponce) {
    setName(companResponce.companyName);
    setEmail(companResponce.emailAddress);
    setPhone(companResponce.phoneNumber);
    setAddress(companResponce.Address);
    setCountry(companResponce.country);
    setTotalEmp(companResponce.totalEmployees);
}
}
    )
  })

  
  
                    

    //     Axios.get(`http://localhost:3005/v1/getCompanyData`).then(res => {
    //         console.log(res.data.activeData, "response");
    //         let stData = res.data.activeData;
    //         setCompanyData(stData);
    //     });

    //     try {
    //         const res = axios.put(`http://localhost:3005/v1/putCompanyData/${location.state.existData.id}`, body);
    //         console.log(res)
    //      } catch (error) {
    //          console.error('Error updating data:', error);
    //      }
   
    

   

    

      

   

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Card sx={{ width: 400, marginTop: 5 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Edit Form {id}
                    </Typography>
                    <form >
                        <TextField
                            fullWidth
                            label="Company Name"
                            variant="outlined"
                            type="text"
                            name="companyName"
                            value={name}
                            // onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            type="text"
                            name="companyEmailAddress"
                            value={email}
                            // onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            type="text"
                            name="phoneNumber"
                            value={phone}
                            // onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                            type="text"
                            name="address"
                            value={address}
                            // onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Country"
                            variant="outlined"
                            type="text"
                            name="country"
                            value={country}
                            // onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Total Employees"
                            variant="outlined"
                            type="text"
                            name="totalEmployees"
                            value={totalemp}
                            // onChange={handleInputChange}
                            margin="normal"
                        />
                        <Grid container justifyContent="center" marginTop={2}>
                            <Button variant="contained"  color="error" style={{ marginRight: '1rem' }}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Grid>
       
    );
};

export default EditForm;


