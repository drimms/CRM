import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useOrganization } from '../../context/OrganizationContext';
import { v4 as uuidv4 } from 'uuid';
import { Employee, Organization } from '../../context/IInterface';

interface ModalFormProps {
    organization: Organization | null;
    onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ 
    organization, 
    onClose 
}) => {
  const { addOrganization, updateOrganization } = useOrganization();

  const formik = useFormik({
    initialValues: {
        id: organization ? organization.id : '',
        name: organization ? organization.name : '',
        city: organization ? organization.city : '',
        address: organization ? organization.address : '',
      },
    onSubmit: (values: Organization) => {
        if (values.id) {
            updateOrganization(values);
          } else {
            addOrganization({ ...values, id: uuidv4() });
          }
      onClose();
    },
  });

  useEffect(() => {
    formik.setValues({
      id: organization ? organization.id : '',
      name: organization ? organization.name : '',
      city: organization ? organization.city : '',
      address: organization ? organization.address : '',
    });
  }, [organization]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>{organization ? 'Редактировать' : 'Добавить'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Название организации"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
        />
         <TextField
          margin="dense"
          name="city"
          label="Город"
          fullWidth
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Адрес"
          fullWidth
          value={formik.values.address}
          onChange={formik.handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button type="submit" variant="contained">Сохранить</Button>
      </DialogActions>
    </form>
  );
};

export default ModalForm;