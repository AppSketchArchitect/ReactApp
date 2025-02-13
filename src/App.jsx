import { Routes, Route, BrowserRouter } from "react-router"
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import "./App.css";
import { UserProvider } from "./context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import UpdatePasswordPage from "./pages/UpdatePassword.jsx";

export default function App() {
  return (
    <>
      <UserProvider> {/* L'UserProvider permet de fournir le même contexte aux enfants (Variables globales) */}
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Dashboard" element={
              <>
                {/* Si l'utilisateur n'est pas connecté alors ProtectedRoute le renverra à la page /Login */}
                <ProtectedRoute/>
                {/* Sinon le tableau de bord s'affichera */}
                <Dashboard/>
              </>
            }/>
            <Route path="/UpdatePassword" element={
              <>
                <ProtectedRoute/>
                <UpdatePasswordPage/>
              </>
            }/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};