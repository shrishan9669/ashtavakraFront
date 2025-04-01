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
                        localStorage.removeItem('number');
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        localStorage.removeItem('class');
                        localStorage.removeItem('userid');
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
        <div className="w-full max-w-sm sm:w-[350px] h-auto rounded-xl md:rounded-2xl border border-slate-300 shadow-md overflow-hidden">
            <div className="h-48 sm:h-40 md:h-48 overflow-hidden">
                <img 
                    src={'./thumbnail.jpeg'} 
                    className="w-full h-full object-cover rounded-tl-xl md:rounded-tl-2xl rounded-tr-xl md:rounded-tr-2xl" 
                    alt="Course thumbnail" 
                />
            </div>

            <div className="h-auto p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
                <h1 className="font-bold text-lg sm:text-xl">Live 0-100 Complete</h1>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button 
                        onClick={() => window.location.href = `/view`}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors duration-200"
                    >
                        View Course
                    </button>
                    <button 
                        onClick={() => window.location.href = ``}
                        className="w-full sm:w-auto px-4 py-2 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-colors duration-200"
                    >
                        View Invoice
                    </button>
                </div>
            </div>
        </div>
    );
}
export function General() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[promocode,setPromocode] = useState('')

    async function Userdetails() {
        try {
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
                setPromocode(res.data.user.promocode)
            }
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    useEffect(() => {
        Userdetails();
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-4 sm:gap-6 max-w-2xl">
            <h1 className="font-bold text-xl sm:text-2xl mb-2">General Information</h1>
            
            <div className="flex flex-col gap-2 sm:gap-3">
                <label className="font-bold text-sm sm:text-base">
                    Full name <span className="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    value={name} 
                    disabled 
                    className="p-2 sm:p-3 bg-slate-100 rounded-lg sm:rounded-full w-full" 
                />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
                <label className="font-bold text-sm sm:text-base">
                    Promo code <span className="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    value={promocode} 
                    disabled 
                    className="p-2 sm:p-3 bg-slate-100 rounded-lg sm:rounded-full w-full" 
                />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
                <label className="font-bold text-sm sm:text-base">
                    Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    value={email} 
                    disabled 
                    className="p-2 sm:p-3 bg-slate-100 rounded-lg sm:rounded-full w-full" 
                />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
                <label className="font-bold text-sm sm:text-base">
                    Phone number <span className="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    value={localStorage.getItem('number') || ""} 
                    disabled 
                    className="p-2 sm:p-3 bg-slate-100 rounded-lg sm:rounded-full w-full" 
                />
            </div>
        </div>
    );
}
export function Security() {
    const [old, setOld] = useState('');
    const [newpass, setNewpass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    async function Changepassword() {
        setLoading(true);
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
                    alert(`Old password doesn't match!!`);
                    setLoading(false);
                    return;
                } else if (newpass != confirm) {
                    alert("New password and Confirm don't match!!");
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
                        console.log(err);
                        alert("Error changing password");
                    }
                }
            }
        } catch (err) {
            console.log(err);
            alert("Error verifying current password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-4 sm:gap-6 max-w-2xl">
            <h1 className="font-bold text-xl sm:text-2xl mb-2">Change Password</h1>
            
            <div className="flex flex-col gap-2 sm:gap-3">
                <label className="font-bold text-sm sm:text-base">
                    Current Password <span className="text-red-500">*</span>
                </label>
                <input 
                    onChange={(e) => setOld(e.target.value)} 
                    type="password" 
                    value={old}
                    placeholder="Enter old password" 
                    className="p-2 sm:p-3 bg-slate-100 rounded-lg sm:rounded-full w-full" 
                />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
                <label className="font-bold text-sm sm:text-base">
                    New Password <span className="text-red-500">*</span>
                </label>
                <input 
                    type="password" 
                    onChange={(e) => setNewpass(e.target.value)} 
                    value={newpass}
                    placeholder="Enter new password" 
                    className="p-2 sm:p-3 bg-slate-100 rounded-lg sm:rounded-full w-full" 
                />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
                <label className="font-bold text-sm sm:text-base">
                    Confirm Password <span className="text-red-500">*</span>
                </label>
                <input 
                    type="password" 
                    onChange={(e) => setConfirm(e.target.value)} 
                    value={confirm}
                    placeholder="Confirm new password" 
                    className="p-2 sm:p-3 bg-slate-100 rounded-lg sm:rounded-full w-full" 
                />
                {msg && (
                    <div className={`mt-2 text-center sm:text-left ${
                        msg.includes('success') ? 'text-green-500' : 'text-red-500'
                    }`}>
                        {msg}
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-4 sm:mt-6">
                <button 
                    onClick={Changepassword}
                    disabled={loading}
                    className={`px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 rounded-full text-white font-medium hover:bg-blue-600 transition-colors duration-200 ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Changing...' : 'Change Password'}
                </button>
            </div>
        </div>
    );
}
