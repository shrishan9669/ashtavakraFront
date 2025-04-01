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
                    Complete Science and Maths cohort.
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
// export default function Course1() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [installment, setInstallment] = useState('1');
//     const [activeTab, setActiveTab] = useState('overview');

//     return (
//         <div className="w-full bg-gray-50">
//             {/* Hero Section */}
//             <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 h-auto min-h-[300px] md:h-[400px] flex flex-col md:flex-row p-6 md:px-10 lg:px-20 items-center justify-between overflow-hidden">
//                 {/* Decorative elements */}
//                 <div className="absolute top-0 left-0 w-full h-full opacity-10">
//                     <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white"></div>
//                     <div className="absolute bottom-10 right-32 w-60 h-60 rounded-full bg-white"></div>
//                 </div>
                
//                 <div className="z-10 flex flex-col items-start max-w-full md:max-w-[60%]">
//                     <span className="text-white bg-blue-500 bg-opacity-30 px-3 py-1 rounded-full text-sm mb-3 backdrop-blur-sm">
//                         New Cohort Starting Soon
//                     </span>
//                     <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 leading-tight">
//                         Complete Science <br/> & Mathematics Program
//                     </h1>
//                     <p className="text-blue-100 mb-6 text-lg">
//                         Master core concepts from basics to advanced level
//                     </p>
//                     <button 
//                         onClick={() => setIsOpen(true)}
//                         className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
//                     >
//                         Enroll Now
//                     </button>
//                 </div>
                
//                 <div className="z-10 w-full mt-10 md:mt-0 md:w-[350px] relative md:-bottom-10">
//                     <Card 
//                         installment={installment} 
//                         setInstallment={setInstallment} 
//                         onOpen={() => setIsOpen(true)} 
//                     />
//                 </div>
//             </div>

//             {/* Content Navigation */}
//             <div className="sticky top-0 z-20 bg-white shadow-sm">
//                 <div className="max-w-full px-6 md:px-10 lg:px-20 flex overflow-x-auto hide-scrollbar">
//                     <button 
//                         onClick={() => setActiveTab('overview')}
//                         className={`px-4 py-3 font-medium text-sm md:text-base whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
//                     >
//                         Overview
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('curriculum')}
//                         className={`px-4 py-3 font-medium text-sm md:text-base whitespace-nowrap ${activeTab === 'curriculum' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
//                     >
//                         Curriculum
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('pricing')}
//                         className={`px-4 py-3 font-medium text-sm md:text-base whitespace-nowrap ${activeTab === 'pricing' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
//                     >
//                         Pricing
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('faq')}
//                         className={`px-4 py-3 font-medium text-sm md:text-base whitespace-nowrap ${activeTab === 'faq' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
//                     >
//                         FAQ
//                     </button>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="max-w-full px-6 md:px-10 lg:px-20 py-8 md:py-12 lg:max-w-[800px] mx-auto">
//                 {/* Overview Section */}
//                 {activeTab === 'overview' && (
//                     <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//                             <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                             Course Overview
//                         </h2>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//                                 <h3 className="font-semibold text-blue-700 mb-2 flex items-center">
//                                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                     Starts From
//                                 </h3>
//                                 <p className="text-gray-700">1st April 2025</p>
//                             </div>
                            
//                             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//                                 <h3 className="font-semibold text-blue-700 mb-2 flex items-center">
//                                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                     </svg>
//                                     Duration
//                                 </h3>
//                                 <p className="text-gray-700">1 Year Access</p>
//                             </div>
//                         </div>
                        
//                         <div className="space-y-4">
//                             <h3 className="text-lg font-semibold text-gray-800">What You'll Learn</h3>
//                             <p className="text-gray-700 leading-relaxed">
//                                 In this comprehensive program, we'll take you from fundamental concepts to advanced problem-solving techniques in both Science and Mathematics. Our structured approach ensures you build a solid foundation while developing the critical thinking skills needed to tackle complex problems.
//                             </p>
                            
//                             <div className="mt-6 space-y-3">
//                                 <div className="flex items-start">
//                                     <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                     <span className="text-gray-700">Master core concepts from basic to advanced levels</span>
//                                 </div>
//                                 <div className="flex items-start">
//                                     <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                     <span className="text-gray-700">Develop problem-solving strategies for any question type</span>
//                                 </div>
//                                 <div className="flex items-start">
//                                     <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                     <span className="text-gray-700">Gain confidence through structured practice and expert guidance</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 </div>
//                 </div>
//                 )
//                 }
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
                        <h3 className="text-lg font-semibold text-gray-900 mt-1">Complete Maths and Science class.</h3>
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
