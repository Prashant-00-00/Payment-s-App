import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true); // Default to true
    const navigate = useNavigate();

    const handleSignin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("https://paytm-backend-4cbp.onrender.com/api/v1/user/signin", {
                username,
                password
            });

            if (rememberMe) {
                const { firstName, token } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("myName", firstName);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            navigate('/dashboard');

        } catch (error) {
            console.error("Error signing in:", error);
            alert("Incorrect Inputs, Please try again");
        }
    };

    return (
        <div>
            <section className="bg-gray-400">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-gray-200 rounded-lg shadow sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-800">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="prashant123"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-primary-300"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="font-light text-gray-600">Remember me</label>
                                    </div>
                                </div>
                                <button onClick={handleSignin} type="submit" className="w-full text-thin bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-600">
                                    Don't have an account yet? <a href="/signup" className="text-thin hover:underline">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

