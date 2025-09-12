
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Trazas from "layouts/trazas";



import UserProfile from "layouts/user-profile";


import Login from "auth/login";
import Register from "auth/register";

import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";

import TrazasImg from "assets/images/trazas.png";
import UserImg from "assets/images/user.png";
import InicioImg from "assets/images/inicio.png";

 

const ImageIcon = ({ src, alt, fontSize = "small" }) => {
  const size = fontSize === "small" ? 20 : 25; // Ajusta los tamaños según necesites
  
  return (
    <img 
      src={src} 
      alt={alt} 
      style={{ 
        width: size, 
        height: size,
        filter: "invert(1)", // Opcional: si necesitas que sean blancos
      }} 
    />
  );
};

const routes = [
  // Rutas públicas (no requieren autenticación)
  {
    type: "collapse",
    name: "Login",
    key: "login",
    route: "/auth/login",
    component: <Login />,
    adminOnly: false,
    showInMenu: false
  },
  {
    type: "collapse",
    name: "Register",
    key: "register",
    route: "/auth/register",
    component: <Register />,
    adminOnly: false,
    showInMenu: false
  },
  {
    type: "collapse",
    name: "Forgot Password",
    key: "forgot-password",
    route: "/auth/forgot-password",
    component: <ForgotPassword />,
    adminOnly: false,
    showInMenu: false
  },
  {
    type: "auth",
    name: "Reset Password",
    key: "reset-password",
    route: "/auth/reset-password",
    component: <ResetPassword />,
    adminOnly: false,
    
  },

  // Rutas protegidas
  {
    type: "collapse",
    name: "Inicio",
    key: "inicio",
    icon: <ImageIcon src={InicioImg} alt="Inicio" fontSize="small" />,
    route: "/dashboard",
    component: <Dashboard />,
    adminOnly: false, // Accesible para todos los roles
    showInMenu: true
  },
  
  
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    icon: <ImageIcon src={UserImg} alt="Usuarios" fontSize="small" />,
    route: "/users",
    component: <Users />,
    adminOnly: true, // SOLO ADMINISTRADORES
    showInMenu: true
  },
  {
    type: "collapse",
    name: "Trazas",
    key: "trazas",
    icon: <ImageIcon src={TrazasImg} alt="Trazas" fontSize="small" />,
    route: "/trazas",
    component: <Trazas />,
    adminOnly: true, // SOLO ADMINISTRADORES
    showInMenu: true
  },
  
  
  {
    type: "collapse",
    name: "Perfil",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user-profile",
    component: <UserProfile />,
    adminOnly: false, // Accesible para todos
    showInMenu: false // Normalmente el perfil se accede desde un menú desplegable
  },
  {
    type: "collapse",
    name: "Salir",
    key: "salir",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/auth/login",
    component: <Login />,
    adminOnly: false,
    showInMenu: true,
    isLogout: true // Propiedad especial para identificar acción de logout
  }
];

export default routes;