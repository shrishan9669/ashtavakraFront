import axios from "axios";
import { useState } from "react";
import Loader from "../components/loader";

export default function Admin() {
    const [link, setLink] = useState('');
    const [course, setCourse] = useState('');
    const [msg, setMsg] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loadingObj, setLoadingObj] = useState<Record<string, boolean>>({});

    async function Getpending() {
        setLoading1(true);
        try {
            const res = await axios({
                url: 'https://ashtabackend.onrender.com/user/getpending',
                method: 'GET'
            });

            if (res.data?.all) {
                setData(res.data.all);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading1(false);
        }
    }

    const handleSubmitLink = async () => {
        if (!link || !course) {
            alert("Both course and link fields are required!");
            return;
        }

        setLoading(true);
        try {
            const res = await axios({
                url: 'https://ashtabackend.onrender.com/user/linkpasting',
                data: { link, course },
                method: 'POST'
            });

            if (res.data?.success) {
                setMsg(res.data.message);
                setLink('');
                setCourse('');
                setTimeout(() => setMsg(''), 3000);
            }
        } catch (err) {
            console.error(err);
            setMsg('Failed to submit link');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id: string) => {
        setLoadingObj(prev => ({ ...prev, [id]: true }));
        try {
            await axios({
                url: `https://ashtabackend.onrender.com/user/varifytrue?id=${id}`,
                method: 'PUT'
            });
            // Refresh the pending list after verification
            Getpending();
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingObj(prev => ({ ...prev, [id]: false }));
        }
    };

    const [loading2,setLoading2] = useState(false)

    async function RemovelastLink(){
        setLoading2(true)
        try{
         const Delete =  await axios({
            url:'https://ashtabackend.onrender.com/user/removelastLink',
            method:'DELETE'
          })
            
          if(Delete.data && Delete.data.msg){
            setMsg(Delete.data.msg)
          }

        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading2(false)
        }
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Link Submission Section */}
            <div className="flex flex-col lg:flex-row gap-4 mb-10 bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="w-full lg:w-2/5 bg-blue-600 p-6 flex items-center justify-center">
                    <h1 className="text-xl sm:text-2xl font-medium text-white text-center">
                        Paste the link for Latest class
                    </h1>
                </div>

                {/* Form */}
                <div className="w-full lg:w-3/5 p-4 sm:p-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-sm sm:text-base">Select course:</label>
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 sm:p-3 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select..</option>
                                <option value="Maths class">Maths class</option>
                                <option value="Science class">Science class</option>
                                <option value="Sst class">SST class</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-sm sm:text-base" htmlFor="link">
                                Class link:
                            </label>
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Paste Zoom/Google Meet link"
                            />
                        </div>

                        <div className="flex justify-between mt-2">
                            <button></button>
                            <button
                                onClick={handleSubmitLink}
                                disabled={loading}
                                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium transition-all duration-200 ${
                                    loading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg'
                                }`}
                            >
                                {loading ? <Loader /> : "Submit Link"}
                            </button>

                            {/* Remove last link */}
                            <button
                            onClick={RemovelastLink}
                            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium transition-all duration-200 ${
                                    loading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg'
                                }`}>{loading2 ? <Loader/>:"Remove last link"}</button>
                        </div>

                        {msg && (
                            <div className={`text-center p-2 rounded-lg ${
                                msg.includes('success') 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {msg}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Verification Panel */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <h2 className="text-lg sm:text-xl font-medium">Purchase Verification</h2>
                    <button
                        onClick={Getpending}
                        disabled={loading1}
                        className={`px-4 py-2 rounded-lg text-white font-medium ${
                            loading1 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {loading1 ? <Loader /> : 'Refresh Purchases'}
                    </button>
                </div>

                {data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((e: any) => (
                                    <tr key={e.id}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{e.number}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{e.purchaseid}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={() => handleVerify(e.id)}
                                                disabled={loadingObj[e.id]}
                                                className={`px-3 py-1 rounded-full text-white text-sm ${
                                                    loadingObj[e.id]
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : 'bg-pink-500 hover:bg-pink-600'
                                                }`}
                                            >
                                                {loadingObj[e.id] ? <Loader  /> : 'Verify'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-6 text-gray-500">
                        {loading1 ? 'Loading...' : 'No pending purchases found'}
                    </div>
                )}
            </div>
        </div>
    );
}
