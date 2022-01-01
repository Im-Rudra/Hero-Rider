import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import PrivetRoute from './Components/PrivetRoute';
import AuthProvider from './context/AuthProvider';
import DataProvider from './context/DataProvider';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

const App = () => (
  <div className="App">
    <Router>
      <AuthProvider>
        <DataProvider>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard/*"
              element={
                <PrivetRoute>
                  <Dashboard />
                </PrivetRoute>
              }
            />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  </div>
);

export default App;
