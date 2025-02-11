import { Routes, Route, BrowserRouter } from "react-router"
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import "./App.css";
import { UserProvider } from "./context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"

export default function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Dashboard" element={
              <>
                <ProtectedRoute/>
                <Dashboard/>
              </>
            }/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};