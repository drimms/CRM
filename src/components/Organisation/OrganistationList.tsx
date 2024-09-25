import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Dialog,
    Box,
    Stack,
} from "@mui/material";
import { Edit, Delete,Visibility } from "@mui/icons-material";
import { useOrganization } from "../../context/OrganizationContext";
import ModalForm from "./ModalForm";
import { Organization } from "../../context/IInterface";


const OrganizationList: React.FC = () => {
    const { organizations, deleteOrganization } =
        useOrganization();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
    const navigate = useNavigate();

    const handleEdit = (organization: Organization) => {
        setSelectedOrg(organization);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedOrg(null);
        setOpen(false);
    };

    return (
        <Box padding={3}>
            <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                marginBottom={2}
            >
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Добавить организацию
            </Button>
            </Stack>
            <TableContainer component={Paper} sx={{ minWidth: 650 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Название</TableCell>
                            <TableCell align="left">Город</TableCell>
                            <TableCell align="left">Адрес</TableCell>
                            <TableCell align="center" sx={{maxWidth: 50}}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {organizations.map((org: Organization) => (
                            <TableRow key={org.id}>
                                <TableCell>{org.name}</TableCell>
                                <TableCell>{org.city}</TableCell>
                                <TableCell>{org.address}</TableCell>
                                <TableCell sx={{ width: 50 }}>
                                    <Stack direction="row" spacing={1}>                                    
                                    <IconButton
                                        onClick={() =>
                                            navigate(`/employees/${org.id}`)
                                        }
                                    >
                                        <Visibility/>
                                    </IconButton>
                                    <IconButton onClick={() => handleEdit(org)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            deleteOrganization(org.id)
                                        }
                                    >
                                        <Delete />
                                    </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <ModalForm 
                    organization={selectedOrg} 
                    onClose={handleClose} 
                />
            </Dialog>
            
        </Box>
    );
};

export default OrganizationList;
