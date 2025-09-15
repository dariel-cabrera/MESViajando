import React from 'react';
import PropTypes from 'prop-types';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';

export const TablaProfesor = ({ datos, onEditar, onEliminar }) => {
  const columns = [
    { Header: "#", accessor: "index", align: "left" },
    { Header: "Nombre", accessor: "nombre", align: "left" },
    { Header: "Apellido", accessor: "apellido", align: "left" },
    { Header: "CI", accessor: "ci", align: "left" },
    { Header: "Facultad", accessor: "facultad", align: "left" },
   
  ];

  const rows = Array.isArray(datos) ? datos.map((val, index) => ({
    index: index + 1,
    ubicacion: val.ubicacion || "Sin ubicación",
    nombre:val.nombre,
    apellido:val.apellido,
    ci:val.ci,
    facultad:val.facultad,
    acciones: (
      <MDBox display="flex" justifyContent="space-around">
        <MDButton variant="gradient" color="info" size="small" onClick={() => onEditar(val)}>
          <EditIcon />
        </MDButton>
        <MDButton variant="gradient" color="error" size="small" onClick={() => onEliminar(val._id)}>
         <DeleteIcon />
        </MDButton>
      </MDBox>
    )
  })) : [];

  return { columns, rows };
};

TablaProfesor.propTypes = {
  datos: PropTypes.array.isRequired,
  onEditar: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
};
