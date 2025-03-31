import axios from "axios";
import { useState, ChangeEvent } from "react";
import Loader from "../components/loader";

export default function PaymentConfirm() {
    // State with TypeScript types
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [transactionid, setId] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [installment,setInstallment] = useState('0');

    const phoneNumberRegex = /^[7-9]{1}[0-9]{9}$/;
  function handlenumberchange(e:any){
          setNumber(e.target.value)
             console.log(e.target.value)
          if(!phoneNumberRegex.test(e.target.value)){
            setMsg('Invalid mobile number format!!')
          }
          else setMsg('')
  }
    // Handle file input change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setFile(file);
        }
    };

    // Make purchase API call
    const makePurchase = async () => {
        try {
            const response = await axios.post(
                'https://ashtabackendlatest.onrender.com/user/addpurchase',
                { name, number, transactionid ,installment }
            );
            if (response.data?.msg) {
                setMsg(response.data.msg);
            }
        } catch (error) {
            console.error("Purchase error:", error);
            setMsg("Failed to process payment. Please try again.");
        }
    };

    

    // Handle file upload
    const handleFileUpload = async () => {
        if (!file) return;

        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('number', number);
        formData.append('transactionid', transactionid);
        formData.append('screenshot', file);
        formData.append('installment',installment)
        if(localStorage.getItem('promo')){
            formData.append('promo','applied');
        }
        else formData.append('promo','unapplied');
        try {
            await axios.post(
                "https://ashtabackendlatest.onrender.com/user/sendMail",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        } catch (error) {
            console.error("File upload error:", error);
            setMsg("Payment confirmed but screenshot upload failed. Please contact support.");
        }
    };

    // Form submission handler
    const handleSubmit = async () => {
        if (!name || !number || !transactionid || !file) {
            setMsg("All fields are required!");
            return;
        }
        if(!phoneNumberRegex.test(number)){
            alert('Invalid mobile number format!!')
            return;
        }
        if(installment != '1' && installment != '2' && installment != '0'){
            alert("Installment field can be 1 , 2 or 0.");
            return ;
        }

        setLoading(true);
        setMsg("");

        try {
            await Promise.all([makePurchase(), handleFileUpload()]);
        } catch (error) {
            console.error("Submission error:", error);
            setMsg("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white">
                    <h2 className="text-xl sm:text-2xl font-bold text-center">Payment Confirmation</h2>
                    <p className="text-sm sm:text-base text-center mt-1 opacity-90">
                        Please fill in your payment details
                    </p>
                </div>

                {/* Form Body */}
                <div className="p-6 sm:p-8">
                    {/* Name Field */}
                    <div className="mb-5">
                        <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    {/* Phone Number Field */}
                    <div className="mb-5">
                        <label htmlFor="number" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            id="number"
                            type="tel"
                            value={number}
                            onChange={handlenumberchange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="+1234567890"
                            required
                        />
                       
                        
                    </div>

                    {/* Transaction ID Field */}
                    <div className="mb-5">
                        <label htmlFor="transactionid" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Transaction ID
                        </label>
                        <input
                            id="transactionid"
                            type="text"
                            value={transactionid}
                            onChange={(e) => setId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="TXN12345678"
                            required
                        />
                    </div>
                    {/* Installments */}
                    <div className="mb-5">
                        <label htmlFor="installment" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Installments
                        </label>
                        <input
                            id="installment"
                            type="text"
                            value={installment}
                            onChange={(e) => {
                               
                                setInstallment(e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="1 or 2"
                            required
                        />
                        <span className="text-slate-500 font-medium">Select 0 for One time payment , other wise write intallment number.</span>
                    </div>

                    {/* File Upload */}
                    <div className="mb-5">
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Payment Screenshot
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <label className="flex-1 cursor-pointer">
                                <div className="px-4 py-3 bg-white text-blue-600 rounded-lg border-2 border-dashed border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center">
                                    <span className="text-sm sm:text-base truncate max-w-xs">
                                        {file ? file.name : "Click to upload screenshot"}
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required
                                />
                            </label>
                            {file && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFile(null);
                                        setImage(null);
                                    }}
                                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Upload a clear screenshot of your payment confirmation
                        </p>
                    </div>

                    {/* Image Preview */}
                    {image && (
                        <div className="mb-6 flex flex-col items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
                            <p className="text-sm font-medium text-gray-700 mb-2">Screenshot Preview</p>
                            <img
                                src={image}
                                alt="Payment screenshot preview"
                                className="max-w-full h-auto max-h-64 object-contain rounded-md"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full py-3 px-6 rounded-lg shadow-md text-white font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center ${
                                loading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader/>
                                    Processing...
                                </>
                            ) : (
                                "Confirm Payment"
                            )}
                        </button>
                    </div>

                    {/* Status Message */}
                    {msg && (
                        <div
                            className={`mt-4 p-3 rounded-lg text-center text-sm sm:text-base ${
                                msg.toLowerCase().includes('success')
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {msg}
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                {/* <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-500 text-center">
                        Having trouble? Contact support at support@example.com
                    </p>
                </div> */}
            </div>
        </div>
    );
}
