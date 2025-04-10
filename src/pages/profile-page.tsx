import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../components/loader";

export default function Profilepage() {
    const [selected, setSelected] = useState('purchase');
    const [demoAccess, setDemoaccess] = useState<Boolean | String>('');
    const [demoEnd, setDemoEnd] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState("");
    const [payVerified, setPayVerified] = useState(false);

    async function Getdemodetails() {
        try {
            const access = await axios({
                url: `https://vigyanbackend.onrender.com/user/checkDemoaccess?id=${localStorage.getItem('userid')}`,
                method: 'GET'
            });
            if (access.data && access.data.success) {
                setDemoEnd(new Date(access.data.demoEnd));
                console.log(new Date(access.data.demoEnd))
                setDemoaccess(true);
            } else {
                setDemoEnd(new Date(access.data.demoEnd))
                setDemoaccess(false);
                
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        Getdemodetails();
    }, [localStorage.getItem('userid')]);

    async function SetAccessfalseAfterExpired() {
        try {
            await axios({
                url: `https://vigyanbackend.onrender.com/user/setAccessfalse?id=${localStorage.getItem('userid')}`,
                method: 'PUT'
            });
        } catch (err) {
            console.log(err);
        }
    }

    // Countdown Timer Function
    useEffect(() => {
        if (!demoEnd ) {
            console.log("Yes this one")
            return;
        }

        const interval = setInterval(() => {
            const now = new Date();
            const timeDiff = demoEnd.getTime() - now.getTime();

            if (timeDiff <= 0) {
                console.log("Time expired")
                SetAccessfalseAfterExpired();
                setTimeLeft("Demo expired! Buy course to continue.");
                clearInterval(interval);
            } else {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDiff / 1000) % 60);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s left`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [demoEnd]);

    async function Startdemo() {
        if (timeLeft.includes('expired')) return;
        setLoading(true)
        try {
           const Demo =  await axios({
                url: "https://vigyanbackend.onrender.com/user/start-demo",
                data: {
                    userid: localStorage.getItem('userid')
                },
                method: "POST"
            });
            if(Demo.data && Demo.data.success){
                window.location.href = '/profile-page'
            }
        } catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false)
        }
    }

    async function IsPaymentVerified() {
        try {
            const Permit = await axios({
                url: `https://vigyanbackend.onrender.com/user/IsPayVerified?number=${localStorage.getItem('number')}`
            });
            if (Permit.data && Permit.data.success) {
                console.log("Permit.data-> " , Permit.data)
                setPayVerified(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        IsPaymentVerified();
    }, []);

    const[loading,setLoading]  = useState(false)
    return (
        <div className="p-4 sm:p-6 md:p-10 lg:p-14 w-full max-w-7xl mx-auto">
            {/* Demo Access Section */}
            
            {(demoAccess !== '' ) && (
                <div className="mb-6">
                    {demoAccess === true ? (
                        <p className="text-white mb-3 rounded-xl md:rounded-2xl p-3 font-bold text-center text-lg sm:text-xl bg-black">
                            {timeLeft}
                        </p>
                    ) : (
                        <div className={`flex flex-col items-center gap-3 ${timeLeft.includes('expired') || payVerified ? 'hidden' : ''}`}>
                            <h1 className="text-base sm:text-lg font-medium bg-slate-100 px-3 w-full text-center py-2 rounded-lg">
                                By clicking, your Demo ends in 4 days. After that make payment and get classes 🎓.
                            </h1>
                            <button
                                onClick={Startdemo}
                                disabled={timeLeft.includes('expired')}
                                className={`bg-blue-400 ${timeLeft.includes('expired') ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-500'} px-4 py-2 rounded-full text-white font-medium transition-colors duration-200`}
                            >
                                {loading ? <Loader/>:"Start Demo"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pb-4 border-b border-slate-400">
                <div className="flex gap-4 sm:gap-6 md:gap-10 overflow-x-auto pb-2">
                    <button
                        onClick={() => setSelected('purchase')}
                        className={`font-medium whitespace-nowrap cursor-pointer transition-all duration-100 text-base sm:text-lg ${selected === 'purchase' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    >
                        Purchases
                    </button>
                    <button
                        onClick={() => setSelected('general')}
                        className={`font-medium whitespace-nowrap cursor-pointer transition-all duration-100 text-base sm:text-lg ${selected === 'general' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    >
                        General
                    </button>
                    <button
                        onClick={() => setSelected('security')}
                        className={`font-medium whitespace-nowrap cursor-pointer transition-all duration-100 text-base sm:text-lg ${selected === 'security' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    >
                        Security
                    </button>
                </div>

                <button
                    onClick={() => {
                       localStorage.removeItem('number')
                        localStorage.removeItem('token')
                        localStorage.removeItem('userid')
                        localStorage.removeItem('promo')
                        localStorage.removeItem('role')
                        localStorage.removeItem('class')
                        window.location.href = '/';
                    }}
                    className="px-4 py-2 bg-gray-800 text-white rounded-full cursor-pointer font-medium hover:bg-gray-700 transition-colors duration-200 self-center sm:self-auto"
                >
                    Logout
                </button>
            </div>

            {/* Content Section */}
            <div className="mt-6">
                {selected === 'purchase' ? (
                    <Purchases demoAccess={demoAccess} payVerified={payVerified} />
                ) : selected === 'general' ? (
                    <General />
                ) : (
                    <Security />
                )}
            </div>
        </div>
    );
}
export function Purchases({ demoAccess, payVerified }: any) {
    console.log("In the purchases -> " + payVerified)
    console.log("In the purchases -> " + demoAccess)
    return (
        <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-5 sm:gap-7">
            <h1 className="font-bold text-xl sm:text-2xl">My Purchases</h1>

            {demoAccess || payVerified ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card_course />
                    {/* Add more cards here if needed */}
                </div>
            ) : (
                <div className="text-blue-500 bg-blue-100 font-medium p-4 sm:p-6 rounded-full sm:mr-10 md:mr-20 text-center sm:text-left">
                    No courses purchased yet
                </div>
            )}
        </div>
    );
}




export function Card_course() {
    return (
        <div className="w-full max-w-sm sm:w-[350px] h-auto rounded-xl md:rounded-2xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white">
            {/* Image with gradient overlay */}
            <div className="h-48 sm:h-40 md:h-48 overflow-hidden relative">
                <img 
                    src={'./thumbnail.jpg'} 
                    className="w-full h-full object-cover rounded-tl-xl md:rounded-tl-2xl rounded-tr-xl md:rounded-tr-2xl" 
                    alt="Course thumbnail" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">Popular</span>
            </div>

            {/* Card content */}
            <div className="h-auto p-5 sm:p-6 flex flex-col gap-4">
                <div>
                  
                    <h1 className="font-bold text-xl sm:text-2xl text-gray-800">Live 0-100 Complete Course for Class 9<sup>th</sup></h1>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">Master from scratch to advance with this comprehensive course covering all concepts with day to day examples.</p>
                </div>
                
                
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <button 
                        onClick={() => window.location.href = `/view`}
                        className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        View Course
                    </button>
                   
                </div>
            </div>
        </div>
    );
}
export function General() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [promocode, setPromocode] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    async function Userdetails() {
        try {
            setIsLoading(true);
            const res = await axios({
                url: `https://vigyanbackend.onrender.com/user/details?number=${localStorage.getItem('number')}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                method: 'GET'
            });
            if (res.data) {
                setName(res.data.user.name);
                setEmail(res.data.user.email);
                setPromocode(res.data.user.promocode);
            }
        } catch (err) {
            console.error(err);
            // Using toast notification would be better here
            alert(err || 'Failed to fetch user details');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        Userdetails();
    }, []);

    return (
        <div className="p-6 sm:p-8 md:p-10 bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">General Information</h1>
                <button 
                    onClick={Userdetails}
                    className="flex items-center cursor-pointer gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Refresh
                </button>
            </div>
            
            {isLoading ? (
                <div className="space-y-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                            <div className="h-12 bg-gray-100 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-5 sm:space-y-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Full name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={name} 
                                disabled 
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 disabled:opacity-75 disabled:cursor-not-allowed" 
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Promo code <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={promocode} 
                                disabled 
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 disabled:opacity-75 disabled:cursor-not-allowed" 
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={email} 
                                disabled 
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 disabled:opacity-75 disabled:cursor-not-allowed" 
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={localStorage.getItem('number') || ""} 
                                disabled 
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 disabled:opacity-75 disabled:cursor-not-allowed" 
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
type PasswordFields = 'old' | 'new' | 'confirm';

export function Security() {
    const [old, setOld] = useState('');
    const [newpass, setNewpass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });

    async function Changepassword() {
        setLoading(true);
        setMsg('');
        try {
            const find = await axios({
                url: `https://vigyanbackend.onrender.com/user/details?number=${localStorage.getItem('number')}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (find.data) {
                if (find.data.user.password != old) {
                    setMsg("Old password doesn't match!");
                    setLoading(false);
                    return;
                } else if (newpass != confirm) {
                    setMsg("New password and confirmation don't match!");
                    setLoading(false);
                    return;
                } else if (newpass.length < 6) {
                    setMsg("Password must be at least 6 characters");
                    setLoading(false);
                    return;
                } else {
                    try {
                        const changepassword = await axios({
                            url: 'https://vigyanbackend.onrender.com/user/changepassword',
                            data: { number: localStorage.getItem('number'), newpass: confirm },
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });

                        if (changepassword.data) {
                            setMsg("Password changed successfully!");
                            setOld('');
                            setNewpass('');
                            setConfirm('');
                        }
                    } catch (err) {
                        console.error(err);
                        setMsg("Error changing password. Please try again.");
                    }
                }
            }
        } catch (err) {
            console.error(err);
            setMsg("Error verifying current password");
        } finally {
            setLoading(false);
        }
    }

    const togglePasswordVisibility = (field:PasswordFields) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl w-full">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Change Password</h1>
                <p className="text-gray-500">Secure your account with a new password</p>
            </div>
            
            <div className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Current Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input 
                            onChange={(e) => setOld(e.target.value)} 
                            type={showPassword.old ? "text" : "password"} 
                            value={old}
                            placeholder="Enter current password" 
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all" 
                        />
                        <button 
                            type="button" 
                            onClick={() => togglePasswordVisibility('old')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                {showPassword.old ? (
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                ) : (
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                )}
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input 
                            type={showPassword.new ? "text" : "password"} 
                            onChange={(e) => setNewpass(e.target.value)} 
                            value={newpass}
                            placeholder="Enter new password (min 6 characters)" 
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all" 
                        />
                        <button 
                            type="button" 
                            onClick={() => togglePasswordVisibility('new')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                {showPassword.new ? (
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                ) : (
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                )}
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input 
                            type={showPassword.confirm ? "text" : "password"} 
                            onChange={(e) => setConfirm(e.target.value)} 
                            value={confirm}
                            placeholder="Confirm new password" 
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all" 
                        />
                        <button 
                            type="button" 
                            onClick={() => togglePasswordVisibility('confirm')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                {showPassword.confirm ? (
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                ) : (
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                )}
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Message and Submit */}
                <div className="pt-2">
                    {msg && (
                        <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${
                            msg.includes('success') ? 
                                'bg-green-50 text-green-700' : 
                                'bg-red-50 text-red-700'
                        }`}>
                            {msg}
                        </div>
                    )}
                    
                    <button 
                        onClick={Changepassword}
                        disabled={loading || !old || !newpass || !confirm}
                        className={`w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${
                            loading ? 'opacity-80 cursor-not-allowed' : ''
                        } ${
                            (!old || !newpass || !confirm) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </>
                        ) : (
                            'Change Password'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
