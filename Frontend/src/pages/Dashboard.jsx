import { useEffect, useState } from 'react';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from 'axios';
import { Logout } from '../components/Logout';

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('https://paytm-backend-4cbp.onrender.com/api/v1/account/balance', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="bg-gray-400 min-h-screen">
            <div className="bg-gray-500">
                <Appbar />
            </div>
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
            <div className="fixed bottom-8 right-8">
                <Logout />
            </div>
        </div>
    );
};


