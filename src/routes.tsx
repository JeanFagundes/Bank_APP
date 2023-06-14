import Header from 'components/Header';
import Home from 'pages/home';
import Login from 'pages/login';
import Register from 'pages/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Transfer from 'pages/transfer';
import Deposit from 'pages/deposit';
import { AuthProvider } from 'context/AuthContext';
import { UserProvider } from 'context/userContext';

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transfer" element={<Transfer />} />
                        <Route path="/deposit" element={<Deposit />} />
                    </Routes>
                </Router>
            </UserProvider>
        </AuthProvider>
    );
}
export default App;
