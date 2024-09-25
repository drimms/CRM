import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Employee, Organization } from "../../context/IInterface";

interface ModalFormProps {
    employee: Employee | null;
    addEmployee: (employee: Employee) => void;
    updateEmployee: (updatedEmployee: Employee) => void;
    organization: Organization | null;
    onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
    organization,
    employee,
    onClose,
    addEmployee,
    updateEmployee,
}) => {
    const formik = useFormik({
        initialValues: {
            id: employee ? employee.id : "",
            name: employee ? employee.name : "",
            position: employee ? employee.position : "",
            depts: employee ? employee.depts : "",
        },
        onSubmit: (values) => {
            if (values.id) {
                updateEmployee(values);
            } else {
                addEmployee({ ...values, id: uuidv4() });
            }
            onClose();
        },
    });

    useEffect(() => {
        formik.setValues({
            id: employee ? employee.id : "",
            name: employee ? employee.name : "",
            position: employee ? employee.position : "",
            depts: employee ? employee.depts : "",
        });
    }, [employee]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
                {employee ? "Редактировать данные сотрудника" : "Добавить нового сотрудника"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="name"
                    label="ФИО сотрудника"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <TextField
                    margin="dense"
                    name="position"
                    label="Должность"
                    fullWidth
                    value={formik.values.position}
                    onChange={formik.handleChange}
                />
                <TextField
                    margin="dense"
                    name="depts"
                    label="Отдел"
                    fullWidth
                    value={formik.values.depts}
                    onChange={formik.handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отменить</Button>
                <Button type="submit" variant="contained">Сохранить</Button>
            </DialogActions>
        </form>
    );
};

export default ModalForm;
