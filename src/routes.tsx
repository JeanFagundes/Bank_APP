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
import Investment from 'pages/investment';
import ContactChat from 'pages/ContactChat';

function App() {
    return (
        <Router>
            <AuthProvider>
                <UserProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transfer" element={<Transfer />} />
                        <Route path="/deposit" element={<Deposit />} />
                        <Route path="/investment" element={<Investment />} />
                        <Route path="/contactChat/:name" element={<ContactChat />} />
                    </Routes>
                </UserProvider>
            </AuthProvider>
        </Router>
    );
}
export default App;
