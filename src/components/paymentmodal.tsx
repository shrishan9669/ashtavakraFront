export default function Paymentmodal({isOpen,onClose}:any){
    if(!isOpen) return null;
    return <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs  z-50 transition-opacity duration-300 ease-in-out">
        <div className="bg-white flex flex-col gap-6 p-8 rounded-2xl border border-gray-300 shadow-xl relative w-full max-w-md">

       <div className="flex justify-between">
         <h1 className="font-medium text-2xl">Make Payment</h1>
         <button onClick={onClose} className="text-3xl text-red-400 font-bold cursor-pointer">  &times;</button>
       </div>

       <div>
        <p>Scan the QR Code shown below and after making payment click the "Done Payment" button.</p>
       </div>

       <div className="flex justify-center">
         <img className="rounded-2xl w-44 h-44" src="https://towardsdatascience.com/wp-content/uploads/2021/07/16Bo2AKLpuOdXOOCXpvYHLQ.png" alt="" />
       </div>

       <div className="flex justify-center w-full">
        <button onClick={()=> window.location.href = '/paymentdetails'} className="bg-blue-500 w-full hover:bg-blue-600 py-3 font-medium text-white rounded-full cursor-pointer">Done Payment</button>
       </div>
        </div>
           
    </div>
}