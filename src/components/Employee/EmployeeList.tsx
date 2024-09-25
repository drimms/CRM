import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Stack,
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
} from "@mui/material";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
import { useOrganization } from "../../context/OrganizationContext";
import { Employee, Organization } from "../../context/IInterface";
import ModalForm from "../ModalEmp/ModalForm";


const EmployeeList: React.FC = () => {
    const { orgId } = useParams<{ orgId: string }>();
    const { organizations, setSelectedOrg } = useOrganization();
    const [selectedOrg, setOrganization] =  useState<Organization | null>(null);;
    const [open, setOpen] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedOrgs = JSON.parse(localStorage.getItem('organizations') || '[]');
        setSelectedOrg(storedOrgs);
        const org = storedOrgs.find((org: Organization) => org.id === orgId);
        setOrganization(org ?? null);
        // const org = organizations.find((org: Organization) => org.id === orgId);
        // setOrganization(org ?? null);
        // setSelectedOrg(org ?? null);
    }, [orgId, organizations, setSelectedOrg]);

    const handleEdit = (employee: Employee) => {
        setSelectedEmp(employee);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedEmp(null);
        setOpen(false);
    };

    const addEmployee = (employee: Employee) => {
        if (!selectedOrg) return;

        const updatedEmployees = [...(selectedOrg.employees || []), employee];
        const updatedOrg = { ...selectedOrg, employees: updatedEmployees };
        setOrganization(updatedOrg);
        setSelectedOrg(updatedOrg);

        const updatedOrganizations = organizations.map((org: Organization) =>
            org.id === updatedOrg.id ? updatedOrg : org
        );
        localStorage.setItem(
            "organizations",
            JSON.stringify(updatedOrganizations)
        );
    };

    const updateEmployee = (updatedEmployee: Employee) => {
        if (!selectedOrg) return;

        const updatedEmployees = (selectedOrg.employees || []).map(
            (emp: Employee) =>
                emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
        const updatedOrg = { ...selectedOrg, employees: updatedEmployees };
        setOrganization(updatedOrg);
        setSelectedOrg(updatedOrg);

        const updatedOrganizations = organizations.map((org: Organization) =>
            org.id === updatedOrg.id ? updatedOrg : org
        );
        localStorage.setItem(
            "organizations",
            JSON.stringify(updatedOrganizations)
        );
    };

    const deleteEmployee = (empId: string) => {
        if (!selectedOrg) return;

        const updatedEmployees = (selectedOrg.employees || []).filter(
            (emp: Employee) => emp.id !== empId
        );
        const updatedOrg = { ...selectedOrg, employees: updatedEmployees };
        setOrganization(updatedOrg);
        setSelectedOrg(updatedOrg);

        const updatedOrganizations = organizations.map((org: Organization) =>
            org.id === updatedOrg.id ? updatedOrg : org
        );
        localStorage.setItem(
            "organizations",
            JSON.stringify(updatedOrganizations)
        );
    };

    return (
        <Box padding={3}>
            <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                marginBottom={2}
            >
            <Button startIcon={<ArrowBack />} onClick={() => navigate("/")}>
                Назад
            </Button>            
            <h2>Сотрудники: {selectedOrg?.name} </h2>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Добавить сотрудника
            </Button>
            </Stack>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Имя</TableCell>
                            <TableCell align="left">Должность</TableCell>
                            <TableCell align="left">Отдел</TableCell>
                            <TableCell align="center" sx={{maxWidth: 50}}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(selectedOrg?.employees || []).map((emp: Employee) => (
                            <TableRow key={emp.id}>
                                <TableCell>{emp.name}</TableCell>
                                <TableCell>{emp.position}</TableCell>
                                <TableCell>{emp.depts}</TableCell>
                                <TableCell sx={{ width: 50 }}>
                                    <Stack direction="row" spacing={1}>
                                    <IconButton onClick={() => handleEdit(emp)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => deleteEmployee(emp.id)}
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
                    employee={selectedEmp}
                    onClose={handleClose}
                    addEmployee={addEmployee}
                    updateEmployee={updateEmployee}
                />
            </Dialog>
        </Box>
    );
};

export default EmployeeList;
