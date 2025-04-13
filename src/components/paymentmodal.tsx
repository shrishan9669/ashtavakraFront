import axios from "axios";
import { useState } from "react";
import Loader from "./loader";

export default function PaymentModal({ isOpen, onClose, installment }: any) {
  const [code, setCode] = useState('');
  const [codeAllow, setCodeAllow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [msg,setMsg] = useState('')

  // Date logic ..early discount
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

  // Check if current date is between March 31 - April 10
  const showOffer = 
    (currentMonth === 3 && currentDay === 31) || // March 31st
    (currentMonth === 4 && currentDay <= 10);    // April 1-10

  if (!isOpen) return null;

  const handleApplyCode = async () => {
    if (!code.trim()) return;

    if(showOffer && installment==='1'){
      alert("Promo code can't be applied when Early bird discount is activated!.")
      return ;
    }
    
    setLoading(true);
    try {
      const response = await axios.get('https://vigyanbackend.onrender.com/user/checkPromo', {
        params: { code,userid:localStorage.getItem('userid') }
      });
      
      if (response.data?.status) {
        setCodeAllow(true);
        setApplied(true);
      }
      else {
        setCodeAllow(false)
        setMsg("You can't apply your Promo Code!!")
        setApplied(true);
      }
      
    } catch (err) {
      console.error(err);
      setCodeAllow(false);
      setApplied(true);
    } finally {
      setLoading(false);
    }
  };

   const totalAmount = installment === '1' 
    ? (codeAllow ? "₹7,000" : "₹7,200") 
    : (codeAllow ? "₹4,150" : "₹4,250");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-modal-enter">


        {/* Header */}
        {showOffer &&   
        <div className="flex justify-center py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
           Discount till 10th April , Only  ₹6,500 on One time payment.
        </div>}


      
        <div className="p-6 pb-0 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
           
          </div>
          <button 
            onClick={()=>{
              onClose()
              window.location.href = '/courses/12'

            }}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors text-3xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 pt-4 space-y-6">
          {/* QR Code Section */}
          <div className="flex flex-col items-center">
            <div className=" bg-gray-50 rounded-xl border border-gray-200 mb-4">
              <img 
                className="w-full rounded-xl h-48 object-contain" 
                src="/chunnuqr.jpg" 
                alt="Payment QR Code"
              />
            </div>
            <p className="text-center text-gray-600 text-sm">
              Scan the QR code to make payment.
            </p>
          </div>

          {/* Promo Code Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`relative flex-1 border rounded-lg overflow-hidden transition-all ${applied ? (codeAllow ? 'border-green-500' : 'border-red-500') : 'border-gray-300'}`}>
                <input 
                  type="text" 
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (applied) setApplied(false);
                  }}
                  placeholder="Enter promo code"
                  className="w-full px-4 py-3 focus:outline-none"
                  disabled={loading}
                />
                {applied && (
                  <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${codeAllow ? 'text-green-500' : 'text-red-500'}`}>
                    {codeAllow ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={handleApplyCode}
                disabled={!code.trim() || loading}
                className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  loading ? 'bg-gray-300 cursor-wait' :
                  !code.trim() ? 'bg-gray-300 cursor-not-allowed' :
                  'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md'
                }`}
              >
                {loading ? <Loader /> : 'Apply'}
              </button>
            </div>
            
            {applied && (
              <p className={`text-sm ${codeAllow ? 'text-green-600' : 'text-red-600'}`}>
                {codeAllow ? 'Promo code applied successfully!' : (msg ? msg:"Invalid Promo Code.")}
              </p>
            )}
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium">{installment === '1' ? 'One-time payment' : '2 Installments'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className={`font-bold text-lg ${showOffer && installment ==='1' ? 'text-green-400':''}`}>{showOffer && installment==='1' ? '₹6,500':totalAmount}</span>
            </div>
            {codeAllow && (
              <div className="flex justify-between text-green-600">
                <span>Discount applied:</span>
                <span className="font-medium">{installment === '1' ? '₹400 off' : '₹300 off per installment'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button 
            onClick={() => {
              window.location.href = '/paymentdetails'
              if(codeAllow){
                localStorage.setItem('promo',"applied");
              }

            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            Done Payment
          </button>
        </div>
      </div>
    </div>
  );
}
