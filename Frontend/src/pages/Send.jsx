import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const Send = () => {
    const [searchParams] = useSearchParams();
    const friendName = searchParams.get('name') || 'Friend';
    const friendId = searchParams.get('id');

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/dashboard');
    };

    const [amount, setAmount] = useState('');
    const [to, setTo] = useState(friendId); 
    useEffect(() => {
        setTo(friendId); 
    }, [friendId]);

    const handleTransfer = async () => {
        try {
            const response = await axios.post('https://paytm-backend-4cbp.onrender.com/api/v1/account/transfer', {
                amount,
                to
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log('Transfer successful:', response.data);
            navigate('/success')
        } catch (error) {
            console.error('Transfer failed:', error);
            alert("Transfer Failed")
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-400">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-gray-200 shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                                <span className="text-2xl text-white">{friendName[0]}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{friendName}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Enter Amount"
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <button onClick={handleTransfer} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-gray-600 text-white">
                                Initiate Transfer
                            </button>
                            <button onClick={handleCancel} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-gray-600 text-white">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
