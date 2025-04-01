import axios from "axios";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function View() {
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function Getlatest() {
        try {
            setLoading(true);
            const res = await axios({
                url: `https://ashtabackendlatest.onrender.com/user/getlatestlink?Class=10`,
                method: 'GET'
            });

            if (res.data && res.data.link) {
                setLink(res.data.link);
                setError('');
            } else {
                setError('No live session scheduled');
            }
        } catch (err) {
            console.log(err);
            setError('Failed to fetch live link');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        Getlatest();
        const interval = setInterval(Getlatest, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Recorded Lectures Notice */}
            <div className="bg-slate-200 p-4 text-center">
                <h1 className="font-bold text-sm sm:text-base md:text-lg">
                    Recorded lectures coming soon...
                </h1>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row flex-1 bg-slate-100">
                {/* Course Image - Full width on mobile, 70% on desktop */}
                <div className="w-full lg:w-[70%] h-64 sm:h-80 md:h-96 lg:h-auto">
                    <img 
                        src="./mathandscience.webp" 
                        className="w-full h-full object-cover object-center" 
                        alt="Math and Science Course" 
                    />
                </div>

                {/* Live Class Section - Full width on mobile, 30% on desktop */}
                <div className="w-full lg:w-[30%] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 gap-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
                        Live Class
                    </h2>
                    
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <FaSpinner className="animate-spin text-blue-500" />
                            <span>Checking for live session...</span>
                        </div>
                    ) : error ? (
                        <p className="text-red-500 font-medium text-center">{error}</p>
                    ) : link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center w-full max-w-xs"
                        >
                            Join Live Class Now
                        </a>
                    ) : (
                        <p className="text-gray-600 text-center">
                            No live session available at the moment
                        </p>
                    )}

                    <div className="text-sm text-gray-500 text-center mt-4">
                        <p>Auto-refreshing every 10 seconds...</p>
                        <p className="mt-2">Next check: {new Date(Date.now() + 10000).toLocaleTimeString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
