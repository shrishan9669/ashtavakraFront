import { useState } from "react"
import Paymentmodal from "../components/paymentmodal"

export default function Course1() {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div className="w-full">
            {/* Banner */}
            <div className="bg-blue-500 h-auto min-h-[200px] md:h-[270px] flex flex-col md:flex-row p-6 md:pl-10 lg:pl-20 items-center relative justify-between">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold max-w-full md:max-w-[690px] mb-4 md:mb-0 text-center md:text-left">
                    Complete Science and Maths cohort - Class 10th
                </h1>
                <div className="w-full md:w-auto md:relative md:right-24 md:top-24">
                    <Card onOpen={() => setIsOpen(true)} />
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
                    <span className="font-medium">Validity: 3 years</span>
                    <span className="font-medium">Starts from 1st of April 2025</span>
                    <p className="text-gray-700 leading-relaxed">
                        In the Course, we'll be diving deep into the core concepts from the basics. 
                        The goal is for you to be able to understand the basics of the SUBJECTS and 
                        solve any problem out there.
                    </p>
                </div>
            </div>

            <Paymentmodal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}

function Card({ onOpen }: { onOpen: () => void }) {
    return (
        <div className="w-full sm:w-[350px] h-auto rounded-xl md:rounded-2xl border border-slate-300 shadow-lg bg-white mx-auto md:mx-0">
            {/* Thumbnail */}
            <div className="h-40 sm:h-[180px] md:h-[200px] overflow-hidden">
                <img 
                    src={'https://images.unsplash.com/photo-1559705421-4ae9bf6fabb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRodW1ibmFpbHxlbnwwfHwwfHx8MA%3D%3D'} 
                    className="w-full h-full object-cover rounded-tl-xl md:rounded-tl-2xl rounded-tr-xl md:rounded-tr-2xl" 
                    alt="Course thumbnail" 
                />
            </div>

            {/* Card Content */}
            <div className="h-auto p-4 sm:p-6 bg-blue-50 rounded-bl-xl md:rounded-bl-2xl rounded-br-xl md:rounded-br-2xl">
                <span className="text-slate-600 text-sm">PRICE</span>
                <div className="flex justify-between items-center mt-2 mb-4">
                    <span className="font-bold text-lg md:text-xl flex items-center gap-2">
                        ₹4,989 <span className="line-through font-normal text-slate-500 text-base">₹5,999</span>
                    </span>
                    <span className="text-green-500 font-medium bg-green-100 px-2 py-1 rounded-full text-sm">
                        17% off
                    </span>
                </div>
                
                {/* Buy Now Button */}
                <div className="flex justify-center">
                    <button 
                        onClick={onOpen}
                        className="w-full py-2 md:py-3 rounded-lg text-white cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors duration-200 font-medium"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}
