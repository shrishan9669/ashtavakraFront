import { BsPersonFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";


export default function Header({ onSignupclick, onLoginclick,setSidebar }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const toggleState = () => {
    setSidebar((prevState: boolean) => !prevState);
  };
  return (
    <header className={`bg-white w-full ${["/courses/12", "/profile-page", "/admin", "/view", "/paymentdetails"].includes(location.pathname) ? "" : " md:fixed"} shadow-lg py-2 px-6 md:px-32 flex justify-between items-center`}>
      <div onClick={toggleState} className="md:hidden text-blue-400 bg-slate-200 p-2 rounded-full block">
       <FaArrowRight/>  
      </div> 
      <div className="flex items-center space-x-3">
        <img src="./logo.jpg" alt="Vive Logo" className="h-14 md:h-20 rounded-full w-14 md:w-20" />
        <span className="text-lg md:text-xl flex flex-col font-bold text-gray-800">अष्टावक्र <span>अकैडमी</span></span>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        
        {!isLoggedIn && <button onClick={onSignupclick} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all">Signup</button>}
        {!isLoggedIn && <button onClick={onLoginclick} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all">Login</button>}
        {isLoggedIn && (
          <div className="flex cursor-pointer bg-blue-500 rounded-full w-10 h-10 justify-center p-2 items-center">
            <BsPersonFill onClick={() => (window.location.href = "/profile-page")} className="text-4xl text-white" />
          </div>
        )}
        {localStorage.getItem('role') === 'teacher' ? <span className="font-medium hover:text-blue-500 cursor-pointer" onClick={()=>{
          window.location.href = '/admin'
        }}>Admin</span>:''}
        <span className="font-medium cursor-pointer hover:text-blue-400 transition-all duration-300" onClick={()=> window.location.href = '/'}>Home</span>
      </div>
      
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-gray-800">
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="absolute top-16 right-6 z-50 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-4 md:hidden">
          {!isLoggedIn && <button onClick={onSignupclick} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all w-full">Signup</button>}
          {!isLoggedIn && <button onClick={onLoginclick} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all w-full">Login</button>}
          {isLoggedIn && (
            <div className="flex cursor-pointer bg-blue-500 rounded-full w-10 h-10 justify-center p-2 items-center">
              <BsPersonFill onClick={() => (window.location.href = "/profile-page")} className="text-4xl text-white" />
            </div>
          )}
          <span className="font-medium" onClick={()=> window.location.href = '/'}>Home</span>
        </div>
      )}
    </header>
  );
}
