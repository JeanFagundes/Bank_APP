import Header from 'components/Header';
import Home from 'pages/home';
import Login from 'pages/login';
import Register from 'pages/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from 'context/AuthContext';
import Dashboard from 'pages/dashboard';

function App() {
    return (
        <UserProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}
export default App;
