import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Header from "./components/header"
import Course1 from "./pages/course1"
import { useState } from "react"
import { MobileNumberModal, SignupModal} from "./components/loginmodal"
import Profilepage from "./pages/profile-page"
import Admin from "./pages/admin"
import View from "./pages/Viewcourse"
import Loader from "./components/loader"
import PaymentConfirm from "./pages/paymentConfirm"




function App() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoginOpen, setIsLoginOpen] = useState(false);

   const [sidebar,setSidebar] = useState(false)
  
 return (
  <BrowserRouter>
  
  <div style={{fontFamily:'Quicksand, sans-serif'}}>
  <Header setSidebar={setSidebar} onSignupclick={()=> setIsModalOpen(true)} onLoginclick={()=> setIsLoginOpen(true)}/>

<Routes>
   <Route path="/" element={<Home sidebar={sidebar}/>}/>

   
   <Route path="/courses/:id" element={<Course1/>} />
   <Route path="/profile-page" element={<Profilepage />} />
   <Route path="/admin" element={<Admin/>}/> 
   <Route path="/view" element={<View/>}/> 
   <Route path="/loader" element={<Loader/>}/>
   <Route path="/paymentdetails" element={<PaymentConfirm/>}/>   
</Routes>
<SignupModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
 <MobileNumberModal isOpen={isLoginOpen} onClose={()=> setIsLoginOpen(false)}/>
 

 {/* The signup logic */}
 
  </div>
  
  
  </BrowserRouter>
 )
}

export default App
