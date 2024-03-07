import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

const DeleteModal = ({ isOpen, onClose, companyId, setCompanyData, companyData }) => {
    const handleDeleteCompany = () => {
        axios.delete(`http://localhost:3005/v1/deleteCompanyData/${companyData.id}`)
            .then(() => {
                //const updatedData = companyData.filter(company => company.id !== companyData.id);
                //setCompanyData(updatedData);
                onClose();
            })
            .catch(error => {
                console.error('Error deleting company:', error);
            });
    };


    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Are you sure you want to delete this company?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="error" onClick={handleDeleteCompany}>Delete</Button>
                    <Button variant="contained" onClick={onClose}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteModal;
