import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 1000); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
                <div className="text-xl font-bold">
                    Transfer Successful
                </div>
                <div className="mt-2 text-gray-700">
                    Redirecting to dashboard now
                </div>
            </div>
        </div>
    );
};
