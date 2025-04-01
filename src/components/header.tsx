// import { BsPersonFill } from "react-icons/bs";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { useState } from "react";
// import { FaArrowRight } from "react-icons/fa";


// export default function Header({ onSignupclick, onLoginclick,setSidebar }: any) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const isLoggedIn = !!localStorage.getItem("token");

//   const toggleState = () => {
//     setSidebar((prevState: boolean) => !prevState);
//   };
//   return (
//     <header className={`bg-white w-full ${["/courses/12", "/profile-page", "/admin", "/view", "/paymentdetails"].includes(location.pathname) ? "" : " md:fixed"} shadow-lg py-2 px-6 md:px-32 flex justify-between items-center`}>
//       <div onClick={toggleState} className="md:hidden text-blue-400 bg-slate-200 p-2 rounded-full block">
//        <FaArrowRight/>  
//       </div> 
//       <div className="flex items-center space-x-3">
//         <img src="/logo.png" alt="Vive Logo" className="h-14 md:h-20 rounded-full w-14 md:w-20" />
//         <span className="text-lg md:text-xl flex flex-col font-bold text-gray-800">विज्ञान <span className="text-2xl">संस्था</span></span>
//       </div>
      
//       <div className="hidden md:flex items-center gap-8">
        
//         {!isLoggedIn && <button onClick={onSignupclick} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all">Signup</button>}
//         {!isLoggedIn && <button onClick={onLoginclick} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all">Login</button>}
//         {isLoggedIn && (
//           <div className="flex cursor-pointer bg-blue-500 rounded-full w-10 h-10 justify-center p-2 items-center">
//             <BsPersonFill onClick={() => (window.location.href = "/profile-page")} className="text-4xl text-white" />
//           </div>
//         )}
//         {localStorage.getItem('role') === 'teacher' ? <span className="font-medium hover:text-blue-500 cursor-pointer" onClick={()=>{
//           window.location.href = '/admin'
//         }}>Admin</span>:''}
//         <span className="font-medium cursor-pointer hover:text-blue-400 transition-all duration-300" onClick={()=> window.location.href = '/'}>Home</span>
//       </div>
      
//       <div className="md:hidden flex items-center">
//         <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-gray-800">
//           {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//         </button>
//       </div>
      
//       {menuOpen && (
//         <div className="absolute top-16 right-6 z-50 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-4 md:hidden">
//           {!isLoggedIn && <button onClick={onSignupclick} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all w-full">Signup</button>}
//           {!isLoggedIn && <button onClick={onLoginclick} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all w-full">Login</button>}
//           {isLoggedIn && (
//             <div className="flex cursor-pointer bg-blue-500 rounded-full w-10 h-10 justify-center p-2 items-center">
//               <BsPersonFill onClick={() => (window.location.href = "/profile-page")} className="text-4xl text-white" />
//             </div>
//           )}
//           <span className="font-medium" onClick={()=> window.location.href = '/'}>Home</span>
//           {localStorage.getItem('role')==='teacher' ? <span className="font-medium" onClick={()=> window.location.href = '/admin'}>Admin</span>:''}
//         </div>
//       )}
//     </header>
//   );
// }
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Header({ onSignupclick, onLoginclick, setSidebar }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleState = () => {
    setSidebar((prevState: boolean) => !prevState);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    ...(localStorage.getItem('role') === 'teacher' ? [{ name: "Admin", path: "/admin" }] : [])
  ];

  return (
    <header 
      className={`w-full ${["/courses/12", "/profile-page", "/admin", "/view", "/paymentdetails"].includes(location.pathname) ? "" : "md:fixed"} z-50`}
      style={{
        animation: "slideDown 0.5s ease-out forwards",
        transform: "translateY(-100px)",
      }}
    >
      <style >{`
        @keyframes slideDown {
          to {
            transform: translateY(0);
          }
        }
        .menu-item {
          transition: all 0.3s ease;
        }
        .menu-item:hover {
          transform: scale(1.05);
        }
        .menu-item:active {
          transform: scale(0.95);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: #3b82f6;
          transition: width 0.3s;
        }
        .mobile-menu {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .signup-btn:hover {
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }
        .profile-btn:hover {
          transform: scale(1.1);
        }
        .profile-btn:active {
          transform: scale(0.9);
        }
      `}</style>

      <div className={`
        ${scrolled ? "backdrop-blur-lg bg-white/90 shadow-sm" : "bg-white"}
        transition-all duration-300 ease-in-out
        py-3 px-6 md:px-16 lg:px-32 flex justify-between items-center
        border-b border-gray-100
      `}>
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div 
            onClick={toggleState}
            className="md:hidden text-blue-500 bg-blue-50 p-2 rounded-full block cursor-pointer menu-item"
          >
            <FaArrowRight size={14}/>  
          </div> 
          
          <div 
            className="flex items-center space-x-3 cursor-pointer menu-item"
            onClick={() => window.location.href = "/"}
          >
            <img 
              src="/logo.png" 
              alt="Vive Logo" 
              className="h-12 md:h-16 rounded-full w-12 md:w-16 border-2 border-blue-100 shadow-sm" 
            />
            <span className="text-lg md:text-xl flex flex-col font-bold text-gray-800">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">विज्ञान</span> 
              <span className="text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">संस्था</span>
            </span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="font-medium text-gray-700 hover:text-blue-500 px-3 py-1 rounded-lg relative nav-link menu-item"
            >
              {link.name}
            </a>
          ))}
          
          {!isLoggedIn ? (
            <>
              <button 
              id="headerLogin"
                onClick={onLoginclick}
                className="px-5 py-2 rounded-lg font-medium text-blue-600 hover:bg-blue-50 menu-item"
              >
                Login
              </button>
              <button 
                onClick={onSignupclick}
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-lg font-medium transition-all signup-btn menu-item"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div 
              className="flex cursor-pointer bg-gradient-to-r from-blue-600 to-blue-400 rounded-full w-10 h-10 justify-center p-2 items-center shadow-md profile-btn relative overflow-hidden group transition-transform"
              onClick={() => (window.location.href = "/profile-page")}
            >
              <BsPersonFill className="text-xl text-white z-10" />
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-2xl text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors menu-item"
            aria-label="Menu"
          >
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-6  z-50 bg-white shadow-xl rounded-xl p-4 flex flex-col items-center space-y-1 md:hidden border  border-gray-100 w-64 mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="font-medium text-gray-700 hover:text-blue-500 px-4 py-3 w-full text-center rounded-lg hover:bg-blue-50 menu-item"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          
          
          {!isLoggedIn ? (
            <>
              <button 
              id="headerLogin"
                onClick={() => {
                  onLoginclick();
                  setMenuOpen(false);
                }}
                className="w-full px-6 py-3 rounded-lg font-medium text-blue-600 hover:bg-blue-50 menu-item"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  onSignupclick();
                  setMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg menu-item"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                window.location.href = "/profile-page";
                setMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 w-full px-6 py-3 rounded-lg font-medium text-blue-600 hover:bg-blue-50 menu-item"
            >
              <BsPersonFill className="text-blue-500" />
              <span>Profile</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
