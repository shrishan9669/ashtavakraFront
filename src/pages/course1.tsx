import { useState } from "react"
import Paymentmodal from "../components/paymentmodal"

export default function Course1() {
    const [isOpen, setIsOpen] = useState(false)
    const [installment,setInstallment] = useState('1')
    return (
        <div className="w-full">
            {/* Banner */}
            <div className="bg-blue-500 h-auto min-h-[200px] md:h-[270px] flex flex-col md:flex-row p-6 md:pl-10 lg:pl-20 items-center relative justify-between">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold max-w-full md:max-w-[690px] mb-4 md:mb-0 text-center md:text-left">
                    Complete Science and Maths cohort - Class 10th
                </h1>
                <div className="w-full md:w-auto md:relative md:right-24 md:top-24">
                    <Card installment={installment} setInstallment={setInstallment} onOpen={() => setIsOpen(true)} />
                </div>
            </div>

            {/* Overview */}
            <div className="max-w-full px-6 md:px-10 lg:px-20 py-8 md:py-10 lg:max-w-[690px]">
                <div className="border-b border-slate-400 py-3">
                    <span className="text-blue-500 border-b-2 border-blue-500 py-3 font-medium text-lg">
                        Overview
                    </span>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-4 mt-4">
                    <span className="font-medium">Validity: 1 years</span>
                    <span className="font-medium">Starts from 1st of April 2025</span>
                    <p className="text-gray-700 leading-relaxed">
                        In the Course, we'll be diving deep into the core concepts from the basics. 
                        The goal is for you to be able to understand the basics of the SUBJECTS and 
                        solve any problem out there.
                    </p>
                </div>
            </div>

{/* Installments and Promo Code  */}
        <div className="max-w-full px-6 md:px-10 lg:px-20 py-8 md:py-10 lg:max-w-[690px]">
        <div className="border-b border-slate-400 py-3">
                <span className="text-blue-500 border-b-2 border-blue-500 py-3 font-medium text-lg">
                    Installments and Promo Code
                </span>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <span className="font-medium">Course Fee with Installments: ₹4250 + ₹4250 = ₹8500/-</span>
                <span className="font-medium">One-time Payment: ₹7200/-</span>
                <p className="text-gray-700 leading-relaxed">
                    If you purchase the course with installments, your referral code will only provide a ₹300 discount, 
                    and you will earn a ₹200 commission.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    If you purchase the course with full payment, your referral code will provide a ₹400 discount, 
                    and you will earn a ₹300 commission.
                </p>
            </div>
            </div>

            <Paymentmodal installment={installment} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}

function Card({ onOpen ,installment,setInstallment}: any) {
    // const [installment, setInstallment] = useState('1');
    const [isHovered, setIsHovered] = useState(false);
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
  
    // Check if current date is between March 31 - April 10
    const showOffer = 
      (currentMonth === 3 && currentDay === 31) || // March 31st
      (currentMonth === 4 && currentDay <= 10);    // April 1-10
  


    
    return (
        <div 
            className="w-full sm:w-[360px] translate-y-[100px] h-auto rounded-xl border border-gray-200 shadow-sm bg-white mx-auto transition-all duration-300 hover:shadow-md hover:border-gray-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Thumbnail with hover effect */}
            <div className="h-48 overflow-hidden relative rounded-t-xl">
                <img 
                    src={'https://images.unsplash.com/photo-1559705421-4ae9bf6fabb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRodW1ibmFpbHxlbnwwfHwwfHx8MA%3D%3D'} 
                    className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`} 
                    alt="Course thumbnail" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6 bg-white rounded-b-xl">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Course</span>
                        <h3 className="text-lg font-semibold text-gray-900 mt-1">Complete Maths and Science class 10th.</h3>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Popular
                    </span>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 font-medium">Installment Plan:</span>
                            <select 
                                onChange={(e) => setInstallment(e.target.value)} 
                                className="ml-2 block w-auto rounded-md border-gray-300 py-1 pl-2 pr-8 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            >
                                <option value="1">Single Payment</option>
                                <option value="2">2 Installments</option>
                            </select>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Total Amount:</p>
                            <p className="text-xl font-bold text-gray-900">
                                {installment === '1' ? (
                                    <span>{showOffer ? "Special Discount till 10th April ₹6,500":'₹7,200'} <span className="text-sm font-normal text-gray-500">(one-time)</span></span>
                                ) : (
                                    <span>₹8,500 <span className="text-sm font-normal text-gray-500">(2 x ₹4,250)</span></span>
                                )}
                            </p>
                            {installment === '2' && (
                                <p className="text-xs text-red-500 mt-1">* Additional ₹1,300 for installment option</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Buy Now Button */}
                    <button 
                        onClick={onOpen}
                        className="mt-6 w-full py-3 rounded-lg text-white cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Enroll Now
                    </button>
                    
                  
                </div>
            </div>
        </div>
    )
}
