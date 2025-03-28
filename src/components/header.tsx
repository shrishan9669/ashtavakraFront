import {  BsPersonFill } from "react-icons/bs";

interface HeaderProps {
  onSignupclick:()=>void;
  onLoginclick:()=> void;
}
export default function Header({onSignupclick,onLoginclick}:HeaderProps){
    return (
        <header className={`bg-white  w-full ${(['/courses','/profile-page','/admin','/view','/paymentdetails'].includes(location.pathname)) === true ? '':'fixed'}  shadow-lg py-2 px-32 flex justify-between items-center`}>
        <div className="flex items-center space-x-3">
          <img src="../public/logo.jpg" alt="Vive Logo" className="h-20 rounded-full w-20" />
          <span className="text-xl flex flex-col font-bold text-gray-800">अष्टावक्र <span>अकैडमी</span></span>
        </div>

        <div className="gap-8 flex">
          {/* search bar */}
          <div className="flex items-center rounded-full bg-slate-200">
            <input className="border transition-all duration-300 focus:ring-1 focus:ring-blue-300 outline-0 border-slate-400 rounded-l-full h-full px-8  " placeholder="Type here to search.." type="text" />
           <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-512.png" className="h-10 p-2 cursor-pointer  rounded-r-full border border-l-0 border-slate-400 px-3 transiall duration-300 hover:bg-slate-400" alt="" />
          </div>
          {localStorage.getItem('token') ? '':<button onClick={onSignupclick} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all">Signup</button>}
          {localStorage.getItem('token') ?  '':<button onClick={onLoginclick} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all">
          Login
        </button>}

        {localStorage.getItem("token") ? <div className="flex cursor-pointer bg-blue-500 rounded-full w-10 h-10 justify-center p-2 items-center">
          <BsPersonFill onClick={()=> window.location.href = '/profile-page'} className="text-4xl text-white" />
        </div>:''}
        
       
        </div>
      
      </header>
    )
}