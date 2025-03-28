import { useState } from "react"
import Paymentmodal from "../components/paymentmodal"

export default function Course1(){
    const [isOpen,setIsOpen]  = useState(false)
    return <div>
        {/*  banner*/}
        <div className="bg-blue-500 h-[270px] flex pl-20  items-center relative  ">
                <h1 className=" text-4xl text-white font-bold max-w-[690px]  ">Complete Science and Maths cohort - Class 10th</h1>
                <Card onOpen={()=> setIsOpen(true)}/>
        </div>

        {/* Overview */}

        <div className="max-w-[690px] flex flex-col gap-5 pl-20 mt-10">
            <div className="border-b border-slate-400 py-3">
             <span className="text-blue-500 border-b-2  py-3 font-medium">Overview</span>
            </div>

            {/* description */}
            <div className="flex flex-col gap-5">
                {/* validity */}
                <span className="font-medium">Validity : 3 years</span>
                <span className="font-medium">Starts from 1st of April 2025</span>

                <p>In the Course, we'll be diving deep into the core concepts from the basics. The goal is for you to be able to understand the basics of the SUBJECTS and solve any problem out there.</p>
            </div>
            
        </div>

        <Paymentmodal isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
    </div>
}

function Card({onOpen}:any){

    return  <div className="w-[350px]  h-auto absolute right-24 top-24 rounded-2xl border border-slate-500">
    <div className="h-[30%]">
    <img src={'https://images.unsplash.com/photo-1559705421-4ae9bf6fabb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRodW1ibmFpbHxlbnwwfHwwfHx8MA%3D%3D'} className="h-full rounded-tl-2xl rounded-tr-2xl w-full" alt="cardimage" />
    </div>

{/* down component */}
    <div className="h-[70%] flex flex-col gap-3 bg-blue-100 rounded-b-2xl px-4 py-6">
       <span className="text-slate-500 text-sm">PRICE</span>
       <div className="flex justify-between items-center">
        <span className="font-bold text-lg gap-2 flex items-center">₹4,989 <span className="line-through font-normal text-slate-400">₹5,999</span></span>
        <span className="text-green-400 font-medium text-lg">17% off</span>
       </div>
       {/* buy now */}

       <div className="flex justify-center">
          <button onClick={onOpen} className="w-[100%] py-2 rounded-full text-white cursor-pointer bg-blue-500 hover:bg-blue-600">Buy Now</button>
       </div>
       
       
        
    </div>
</div>
}