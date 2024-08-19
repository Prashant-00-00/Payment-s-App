import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('myName');
        navigate('/signin');
    };

    return (<>
        <div>
            <Button onClick={handleLogout} label={"Logout"} />
        </div>
    </>)
}