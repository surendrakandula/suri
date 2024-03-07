import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit, Trash } from 'react-feather';
import axios from 'axios';
import Button from '@mui/material/Button';
import AddCompany from './Addcompanys';
import DeleteModal from './DeletCompany';
// import Edit from './editcompany';
import { useNavigate, useLocation } from 'react-router-dom';


const BasicTable = () => {
    const [companyData, setCompanyData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompanyData, setSelectedCompanyData] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedCompany, setEditedCompany] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const fetchCompanyData = () => {
        let url = 'http://localhost:3005/v1/getCompanyData';
        axios.get(url, {}).then(response => {
            let stData = response.data.activeData;
            setCompanyData(stData);
        });
    };

    const handleAddCompany = (newCompany) => {
        setCompanyData([...companyData, newCompany]);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = (company) => {
        setEditedCompany(company);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditCompany = (editedData) => {
        // Send POST request to update company data
        axios.post('http://localhost:3005/v1/updateCompanyData', editedData)
            .then(response => {
                // Update company data locally
                const updatedData = companyData.map(company => {
                    if (company.id === editedData.id) {
                        return editedData;
                    }
                    return company;
                });
                setCompanyData(updatedData);
                closeEditModal();
            })
            .catch(error => {
                console.error('Error updating company data:', error);
            });
    };

    const openDeleteModal = (company) => {
        setSelectedCompanyData(company);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TableContainer component={Paper} sx={{ width: '100%', margin: '10px', overflowX: 'auto' }}>
                <Button variant="contained" size="large" sx={{ float: 'right', m: 2 }} onClick={openModal}>
                    Add +
                </Button>
                <AddCompany isOpen={isModalOpen} onClose={closeModal} onAddCompany={handleAddCompany} />
                <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} companyData={selectedCompanyData} setCompanyData={setSelectedCompanyData} />
                {/* <EditCompany isOpen={isEditModalOpen} onClose={closeEditModal} companyData={editedCompany} onEditCompany={handleEditCompany} /> */}
                <Table aria-label="simple table" sx={{ tableLayout: 'fixed' }}>
                    <TableHead sx={{ backgroundColor: 'yellow' }}>
                        <TableRow>
                            <TableCell style={{ minWidth: 50, fontWeight: 'bold' }}>Id</TableCell>
                            <TableCell style={{ minWidth: 100, fontWeight: 'bold' }}>companyName</TableCell>
                            <TableCell align="right" style={{ minWidth: 150, fontWeight: 'bold' }}>emailAddress</TableCell>
                            <TableCell align="right" style={{ minWidth: 120, fontWeight: 'bold' }}>phoneNumber</TableCell>
                            <TableCell align="right" style={{ minWidth: 150, fontWeight: 'bold' }}>Address</TableCell>
                            <TableCell align="right" style={{ minWidth: 100, fontWeight: 'bold' }}>country</TableCell>
                            <TableCell align="right" style={{ minWidth: 120, fontWeight: 'bold' }}>totalEmployees</TableCell>
                            <TableCell align="right" style={{ minWidth: 100, fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companyData.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white',
                                }}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.companyName}</TableCell>
                                <TableCell align="right">{row.emailAddress}</TableCell>
                                <TableCell align="right">{row.phoneNumber}</TableCell>
                                <TableCell align="right">{row.Address}</TableCell>
                                <TableCell align="right">{row.country}</TableCell>
                                <TableCell align="right">{row.totalEmployees}</TableCell>
                                <TableCell align="right">
                                    <Edit onClick={()=>{
                                        navigate(`/table-edit/${row.id}`,{
                                            state:{existData : row}
                                        });
                                    }} />
                                    <Trash onClick={() => openDeleteModal(row)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BasicTable;
