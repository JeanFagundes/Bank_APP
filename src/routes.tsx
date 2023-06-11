import Header from 'components/Header';
import Home from 'pages/home';
import Login from 'pages/login';
import Register from 'pages/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { UserProvider } from 'context/AuthContext';
// import { AuthProvider } from 'context/IsAuthenticated';
import Dashboard from 'pages/dashboard';
import Transfer from 'pages/transfer';
import Deposit from 'pages/deposit';
import { useEffect, useState } from 'react';
import { auth } from 'db/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/deposit" element={<Deposit />} />
            </Routes>
        </Router>
    );
}
export default App;
