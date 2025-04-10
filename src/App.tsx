import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Header from "./components/header"
import Course1 from "./pages/course1"
import { JSX, useState } from "react"
import { MobileNumberModal, SignupModal} from "./components/loginmodal"
import Profilepage from "./pages/profile-page"
import Admin from "./pages/admin"
import View from "./pages/Viewcourse"
import PaymentConfirm from "./pages/paymentConfirm"




function App() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoginOpen, setIsLoginOpen] = useState(false);

   const [sidebar,setSidebar] = useState(false)
  
   const PrivateRoute = ({children}:{children:JSX.Element}) => {
      const isAuthenticated = !!localStorage.getItem('token');
      return isAuthenticated ? children : <Navigate to={'/'} />
    }
    const AdminRoute = ({children}:{children:JSX.Element}) => {
      const isAuthenticated = localStorage.getItem('role') === 'teacher';
      return isAuthenticated ? children : <Navigate to={'/'} />
    }
 return (
  <BrowserRouter>
  
  <div style={{fontFamily:'Quicksand, sans-serif'}}>
  <Header setSidebar={setSidebar} onSignupclick={()=> setIsModalOpen(true)} onLoginclick={()=> setIsLoginOpen(true)}/>

<Routes>
   <Route path="/" element={<Home sidebar={sidebar}/>}/>

   
   <Route path="/courses/:id" element={<PrivateRoute><Course1/></PrivateRoute>} />
   <Route path="/profile-page" element={<PrivateRoute><Profilepage /></PrivateRoute>} />
   <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>}/> 
   <Route path="/view" element={<PrivateRoute><View/></PrivateRoute>}/> 
   
   <Route path="/paymentdetails" element={<PrivateRoute><PaymentConfirm/></PrivateRoute>}/>   
</Routes>
<SignupModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
 <MobileNumberModal isOpen={isLoginOpen} onClose={()=> setIsLoginOpen(false)}/>
 

 {/* The signup logic */}
 
  </div>
  
  
  </BrowserRouter>
 )
}

export default App
