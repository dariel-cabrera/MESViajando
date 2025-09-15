import React, { useState, useEffect } from 'react';
import { Card, Snackbar, Alert, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

import { TablaProfesor } from './table/dataTable';
import ProfesorService from 'services/profesor-service';
/* import { eliminarDatos } from './CalculationFunction'; */
import DataTable from 'examples/Tables/DataTable';
import dayjs from 'dayjs';


function Profesores() {
  const [profesores, setProfesores] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [mensaje, setMensaje] = useState({ 
    open: false, 
    text: '', 
    severity: 'info' 
  });

  const mostrarMensaje = (text, severity = 'info') => {
    setMensaje({ open: true, text, severity });
  };

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const profesores = await Promise.all([
        ProfesorService.getProfesores()
        
      ]);

      
     setProfesores(profesores)
      
    } catch (error) {
      setError(error.message);
      mostrarMensaje("Error al cargar datos iniciales", 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  

  const LoadingIndicator = () => (
    <MDBox display="flex" justifyContent="center" alignItems="center" height="300px" flexDirection="column">
      <CircularProgress size={60} thickness={4} color="info" />
      <MDTypography mt={2} variant="button" color="text">
        Cargando datos de los profesores ...
      </MDTypography>
    </MDBox>
  );

  const ErrorMessage = ({ error, onRetry }) => (
    <MDBox p={3} textAlign="center" color="error">
      <MDTypography color="error" variant="h6">
        Ocurrió un error
      </MDTypography>
      <MDTypography color="text" variant="body2">
        {error}
      </MDTypography>
      <MDButton 
        variant="gradient" 
        color="info" 
        onClick={onRetry}
        sx={{ mt: 2 }}
      >
        Reintentar
      </MDButton>
    </MDBox>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3} textAlign="center">
        <MDTypography variant="h4" fontWeight="medium" color="black">
          Gestión de Profesores
        </MDTypography>
      </MDBox>

      {error ? (
        <ErrorMessage error={error} onRetry={fetchInitialData} />
      ) : loading ? (
        <LoadingIndicator />
      ) :(
        <>

          <MDBox pt={3} pb={3}>
            <Card>
              <MDBox 
                mx={2} 
                mt={-3} 
                py={3} 
                px={2} 
                bgColor="info" 
                borderRadius="lg" 
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Resultados de Cálculos ({profesores.length})
                </MDTypography>
              </MDBox>
              
              <MDBox pt={3}>
                <DataTable
                  table={TablaProfesor({
                    datos: profesores,
                    onEditar: (val) => {
                      setCalculo({ ...val, id: val._id });
                    },
                    onEliminar: (id) => { 
                      /* eliminarDatos({ idValue: id, getDatos: fetchInitialData });*/
                      
                    }
                    })
                  }
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </MDBox>
        </>
      )}

      <Snackbar
        open={mensaje.open}
        autoHideDuration={4000}
        onClose={() => setMensaje(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setMensaje(prev => ({ ...prev, open: false }))} 
          severity={mensaje.severity}
          sx={{ width: '100%' }}
        >
          {mensaje.text}
        </Alert>
      </Snackbar>

      <Footer />
    </DashboardLayout>
  );
}

export default Profesores;