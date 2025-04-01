import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import  {useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from './loader';


function UserOrTeacherSignup({setUserteacher,onClose,isOpen}:any){
  if(!isOpen) return null;
  return (
    <div className='fixed inset-0 flex items-center justify-center backdrop-blur-xs  z-50 transition-opacity duration-300 ease-in-out'>
     
        <div className='bg-white flex flex-col gap-6 p-8 rounded-2xl border border-gray-300 shadow-xl relative w-full max-w-md'>
        <div className='flex items-center justify-between'>
                  <h2 className="text-xl  font-bold ">Sign Up as a Student.</h2>
              <button
                  onClick={onClose}
                  className="text-3xl cursor-pointer font-bold text-gray-600 hover:text-black"
              >
                  &times;
              </button>
              </div>
          

          <button onClick={()=> setUserteacher('student')} className='w-full rounded-full py-2 text-white bg-blue-500 hover:bg-blue-600 cursor-pointer'>Signup as Student</button>
          <button onClick={()=> setUserteacher('teacher')} className='w-full py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 cursor-pointer'>Signup as Teacher</button>
        </div>
    </div>
  )
}
export const SignupModal = ({isOpen,onClose}:any) => {
    if (!isOpen) return null;
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [Class,setClass] = useState('')
    const [msg,setMsg]  = useState('')

 

    const [error,setError] = useState('');
    const[emailmsg,setEmailmsg] = useState('');
    const[loading,setLoading]  = useState(false)
    
    // Regex for validating phone number in xxx-xxx-xxxx format
    const phoneNumberRegex = /^[7-9]{1}[0-9]{9}$/;
    const regexemail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const handleInputChange = (e:any) => {
        setPhone(e.target.value);
        if (!phoneNumberRegex.test(e.target.value)) {
          setError('Invalid phone number format.');
        } else {
          setError('');
        }
      };
      const handleEmailchange = (e:any) => {
        setEmail(e.target.value);
        if (!regexemail.test(e.target.value)) {
          setEmailmsg('Invalid email number format.');
        } else {
          setEmailmsg('');
        }
      };
      

      // Validating Email Regex
      const [userteacher,setUserteacher] = useState('')
      
    return (
      <div>
        {
          userteacher === 'student' ? <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs  z-50 transition-opacity duration-300 ease-in-out">
        
          <div className="bg-white flex flex-col gap-6 p-8 rounded-2xl border border-gray-300 shadow-xl relative w-full max-w-md">
              <div className='flex items-center justify-between'>
                  <h2 className="text-xl  font-bold ">Sign Up as a Student.</h2>
              <button
              id='close'
                  onClick={onClose}
                  className="text-3xl cursor-pointer font-bold text-gray-600 hover:text-black"
              >
                  &times;
              </button>
              </div>
         
  
            {/* Signup logic */}
            <form>
          <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
              onChange={(e)=> setName(e.target.value)}
                id="name"
                type="text"
                placeholder="Enter your fullname.."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* class */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="class">
                Class:
              </label>
              <input
              onChange={(e)=> setClass(e.target.value)}
                id="class"
                type="number"
                placeholder="Enter your class 9th or 10th.."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                 onChange={handleEmailchange}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {emailmsg && <p className='text-red-400'>{emailmsg}</p>}
  
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="number">
                Phone no.
              </label>
              <input
                 onChange={handleInputChange}
                id="number"
                type="text"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {error && <p className='text-red-400'>{error}</p>}
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              
              <input
                 onChange={(e)=> setPassword(e.target.value)}
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute top-12 right-3 text-gray-600"
              >
                {passwordVisible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
  
            <button
  
            onClick={async(e)=>{
              e.preventDefault()
              if (!phoneNumberRegex.test(phone)) {
                  setError('Please enter a valid phone number.');
                  return;
              } 
              if(!regexemail.test(email)){
                  setEmailmsg('Invalid Gmail address')
                  return;
              }
              if(!name || !password || !email || !phone){
                alert("All fields are required!!");
                return ;
              }
               
              setLoading(true)
              try{
                  const res = await axios({
                      url:"https://vigyanbackend.onrender.com/user/createuser",
                      method:"POST",
                      data:{
                        email,password,name,number:phone,role:"student",Class:Class
                      }
                     })
    
                     console.log(res.data)
                     if(res.data && res.data.newUser){
                      setMsg(res.data.msg)
                      onClose();
                      document.getElementById('headerLogin')?.click()
                      
                     }
                     else setMsg(res.data.msg)
                     
              }
              catch(err){
                  console.log(err);
                  alert(err)
              }
              finally{
                setLoading(false)
              }
                   
            }}
              type="submit"
              className="w-full bg-blue-600 text-white cursor-pointer transition-all duration-300 p-3 rounded-lg hover:bg-blue-700 "
            >
              {loading ? <Loader/>:'Sign up'}
            </button>
            <div className='flex justify-center'><span className='text-green-400'>{msg}</span>
            </div>
            
          </form>
            
          </div>
        </div>
        
        : (userteacher === 'teacher' ?  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs  z-50 transition-opacity duration-300 ease-in-out">
        
          <div className="bg-white flex flex-col gap-6 p-8 rounded-2xl border border-gray-300 shadow-xl relative w-full max-w-md">
              <div className='flex items-center justify-between'>
                  <h2 className="text-xl  font-bold ">Sign Up as a Teacher.</h2>
              <button
                  onClick={onClose}
                  className="text-3xl cursor-pointer font-bold text-gray-600 hover:text-black"
              >
                  &times;
              </button>
              </div>
         
  
            {/* Signup logic */}
            <form>
          <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
              onChange={(e)=> setName(e.target.value)}
                id="name"
                type="text"
                placeholder="Enter your fullname.."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                 onChange={handleEmailchange}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {emailmsg && <p className='text-red-400'>{emailmsg}</p>}
  
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="number">
                Phone no.
              </label>
              <input
                 onChange={handleInputChange}
                id="number"
                type="text"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {error && <p className='text-red-400'>{error}</p>}
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Teacher_Key
              </label>
              
              <input
                 onChange={(e)=> setPassword(e.target.value)}
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter teacher's key"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute top-12 right-3 text-gray-600"
              >
                {passwordVisible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
  
            <button
  
            onClick={async(e)=>{
              e.preventDefault()
              if(password != 'AmanShrivastava'){
                alert(`Teacher's key is wrong!!`);
                return ;
              }
              if (!phoneNumberRegex.test(phone)) {
                  setError('Please enter a valid phone number.');
                  return;
              } 
              if(!regexemail.test(email)){
                  setEmailmsg('Invalid Gmail address')
                  return;
              }
              if(!name || !password || !email || !phone){
                alert("All fields are required!!");
                return ;
              }
                setLoading(true)
              try{
                  const res = await axios({
                      url:"https://vigyanbackend.onrender.com/user/createuser",
                      method:"POST",
                      data:{
                        email,password,name,number:phone,role:"teacher"
                      }
                     })
    
                     console.log(res.data)
                     if(res.data && res.data.newUser){
                      setMsg(res.data.msg)
                      onClose();
                      document.getElementById('headerLogin')?.click()
                     }
                     else setMsg(res.data.msg)
              }
              catch(err){
                  console.log(err);
                  alert(err)
              }
              finally{
                setLoading(false)
              }
                   
            }}
              type="submit"
              className="w-full bg-blue-600 text-white cursor-pointer transition-all duration-300 p-3 rounded-lg hover:bg-blue-700 "
            >
              {loading  ? <Loader/>:"Sign up"}
            </button>
            <div className='flex justify-center'><span className='text-green-400'>{msg}</span>
            </div>
            
          </form>
            
          </div>
        </div>:
        <UserOrTeacherSignup onClose={onClose} isOpen={isOpen} setUserteacher={setUserteacher}/>)
        }
      </div>

      
    );
}


export const MobileNumberModal = ({onClose,isOpen}:any)=>{
  if (!isOpen) return null;
  const [next,setNext] = useState(false);
  const [number,SetNumber] = useState('')
  const[msg,setMsg] = useState('')
  const [loading,setLoading] = useState(false)
  const phoneNumberRegex = /^[7-9]{1}[0-9]{9}$/;
  function handlenumberchange(e:any){
          SetNumber(e.target.value)
             console.log(e.target.value)
          if(!phoneNumberRegex.test(e.target.value)){
            setMsg('Invalid mobile number format!!')
          }
          else setMsg('')
  }
     return (
      // Conditional Rendering.
      <div id='login'>
        {next ? <Aftermobile onClose={onClose} isOpen={isOpen}/>
        
        :
        
        <div className='fixed inset-0 flex items-center  justify-center backdrop-blur-xs bg-opacity-60 z-50 transition-opacity duration-300 ease-in-out'>
        <div className='bg-white flex flex-col  gap-6 p-8 rounded-2xl shadow-2xl border border-gray-300 relative w-full max-w-md'>
 {/* heading and cross button */}
 <div className='flex justify-between items-center '>
            <h1 className='font-bold text-lg'>Enter your phone number for Login.</h1>
            <button
                onClick={onClose}
                className="text-3xl cursor-pointer font-bold text-gray-600 hover:text-black"
            >
                &times;
            </button>
          </div>

          <div className='flex flex-col gap-3'>
            <label htmlFor="mobile">Phone number:</label>
            <input onChange={handlenumberchange} type="text" placeholder='Enter your phone number' className='w-full rounded-full bg-slate-200 outline-0 border border-slate-500 p-3' />
            {msg && <p className='text-red-300 ml-3'>{msg}</p>}
          </div>

          

          <div className='flex justify-center'>
            <button onClick={async()=>{
              if(!phoneNumberRegex.test(number)){
                return ;
              }
                
              setLoading(true)
                try{
                  const user = await axios({
                    url:"https://vigyanbackend.onrender.com/user/checknumber",
                    data:{
                      number
                    },
                    method:'POST'
                  })

                  if(user.data && user.data.status){
                    localStorage.setItem('number',number)
                    localStorage.setItem('role',user.data.role)
                    setNext(true)
                  }
                  else setMsg(`Mobile number doesn't exist!!`)

                }
                catch(err){
                  console.log(err)
                  alert(err)
                }
                finally{
                  setLoading(false)
                }
            }} className='px-5 py-3 cursor-pointer hover:bg-blue-600 rounded-full text-white bg-blue-500 text-lg'>{loading ? <Loader/>:"Next"}</button>
          </div>
        </div>
       
      </div>}
      </div>
      
     )
}
function Aftermobile({onClose,isOpen}:any){
  if(!isOpen) return null;
  const [withpassword,setWithpassword] = useState(false)
  // const [withOtp,setWithOtp] = useState(false)
  // const[loading,setLoading] = useState(false)
  // // credentials to be send through component
  // const [token,setToken] = useState('')
  //  const [userid,setuserId] = useState('');

  return (<div>
            {withpassword ? <Loginwithpassword onClose={onClose} isOpen={isOpen}/> :<div className='fixed inset-0 flex items-center  justify-center backdrop-blur-xs bg-opacity-60 z-50 transition-opacity duration-300 ease-in-out'>
    <div className='bg-white flex flex-col  gap-6 p-8 rounded-2xl shadow-2xl border border-gray-300 relative w-full max-w-md'>
    <div className='flex justify-between items-center '>
            <h1 className='font-bold text-xl'>Login to your account</h1>
            <button
            onClick={onClose}
               
                className="text-3xl cursor-pointer font-bold text-gray-600 hover:text-black"
            >
                &times;
            </button>
    </div>
{/* login with password */}
    <div className='flex justify-center mt-3'>
      <button
      onClick={()=> setWithpassword(true)}
      className='bg-blue-500 p-3 cursor-pointer text-white text-lg hover:bg-blue-600 w-[90%] rounded-full'>Login with password</button>
    </div>

    {/* login with otp
    <div className='flex justify-center'>
      <button
      // Sending Otp
    
      onClick={async()=>{
        setLoading(true)
         try{
            const res = await axios({
              url:'https://vigyanbackend.onrender.com/user/send-otp',
              data:{
                phonenumber:localStorage.getItem('number')
              },
              method:"POST"
            })
            if(res.data && res.data.success){
              localStorage.setItem('code',res.data.otp)
              setToken(res.data.token)
              setuserId(res.data.id);
              setWithOtp(true)
            }
         }
         catch(err){
          console.log(err);
          alert(err)
         }
         finally{
          setLoading(false)
         }
      }}
      className='bg-blue-500 p-3 cursor-pointer  text-white text-lg hover:bg-blue-600 w-[90%] rounded-full'>{loading ? <Loader/>:"Login with otp"}</button>
    </div> */}

    {/* Forget password */}
    <div className='flex justify-center'>
      <span className='text-blue-400 underline text-sm'>Forgot Password</span>
    </div>
    </div>



  </div>}
          </div>
        )
  
  
}

function Loginwithpassword ({onClose,isOpen}:any){
  if(!isOpen) return null;
  const[msg,setMsg] = useState('')
  const [type,setType] = useState('password');
  const [password,setPassword] = useState('')
  const[loading,setLoading]  = useState(false)
  return <div className='fixed inset-0 flex items-center  justify-center backdrop-blur-xs bg-opacity-60 z-50 transition-opacity duration-300 ease-in-out'>
    <div className='bg-white flex flex-col  gap-6 p-8 rounded-2xl shadow-2xl border border-gray-300 relative w-full max-w-md'>
    <div className='flex justify-between items-center '>
            <h1 className='font-bold text-xl'>Login to your account</h1>
            <button
            onClick={onClose}
               
                className="text-3xl cursor-pointer font-bold text-gray-600 hover:text-black"
            >
                &times;
            </button>
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <div className='flex  gap-3 items-center text-xl '>
      <input type={type} onChange={(e)=> setPassword(e.target.value)}  className='w-full rounded-full bg-slate-200 outline-0 border border-slate-500 p-3'/>
       {type ==='password' ? <FaEye className='cursor-pointer' onClick={()=> setType("nopassword")}/>:<FaEyeSlash className='cursor-pointer' onClick={()=> setType('password')} />}
      </div>
      

    </div>
   
   <div className='flex justify-center'>
    <button
    onClick={async()=>{
      if(!password){
        alert("Please enter password")
        return ;
      }
      setLoading(true)
      try{
        const res = await axios({
          url:`https://vigyanbackend.onrender.com/user/checkpassword?password=${password}&number=${localStorage.getItem('number')}`,
         
          method:'GET'
        })
        if(res.data && res.data.status){
             setMsg('Successfully loggedIn');
             localStorage.setItem('token',res.data.token);
             localStorage.setItem('userid',res.data.userid)
             localStorage.setItem('class',res.data.Class)
             window.location.href = '/'
        }
        else {
          setMsg(res.data.msg)
          localStorage.removeItem('role')
        }

      }
      catch(err){
        console.log(err)
        alert(err)
      }
      finally{
        setLoading(false)
      }
    }}
    className='px-5 cursor-pointer hover:bg-blue-600 py-2 rounded-full text-white bg-blue-500'>{loading ? <Loader/>:"Login"}</button>
   </div>

    {msg && <p className='text-red-400 ml-3'>{msg}</p>}

    {/* Forget password */}
    <div className='flex justify-center'>
      <span className='text-blue-400 underline text-sm'>Forgot Password</span>
    </div>
    </div>



  </div>
}
// function Loginwithotp({onClose,isOpen,token,userid}:any){
//   const [enterotp,setOtp] = useState('')
//   function checkotp(){
//     if(localStorage.getItem('code') && localStorage.getItem('code')===enterotp){
//         localStorage.removeItem('code');
//         localStorage.setItem('token',token)
//         localStorage.setItem('userid',userid)
//          window.location.href = '/'
//     }
//     else localStorage.removeItem('role')
   
//   }
//   if(!isOpen) return null;
//   return <div className='fixed inset-0 flex items-center  justify-center backdrop-blur-xs bg-opacity-60 z-50 transition-opacity duration-300 ease-in-out'>
//         <div className='bg-white flex flex-col  gap-6 p-8 rounded-2xl shadow-2xl border border-gray-300 relative w-full max-w-md'>
            
//         <div className='flex justify-between items-center '>
//             <h1 className='font-bold text-xl'>Login to your account</h1>
//             <button
//             onClick={onClose}
               
//                 className="text-3xl cursor-pointer font-bold text-gray-600 hover:text-black"
//             >
//                 &times;
//             </button>
//     </div>
//     {/* label */}
//             <div className='flex flex-col gap-3'>
//               <label htmlFor="otp">Enter OTP</label>
//               <input onChange={(e)=> setOtp(e.target.value)} type="text" placeholder='Enter OTP'  className='w-full rounded-full bg-slate-200 outline-0 border border-slate-500 p-3'/>
//             </div>

//             {/* Green bar */}
//             <div className='p-4 w-full rounded-3xl text-green-500 bg-green-200'>
//             We’ve sent an OTP to your phone number
//             </div>

//             <div className='flex justify-center'>
//               <button
//               onClick={checkotp}
//               className='w-[70%] py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 cursor-pointer'>Submit</button>
//             </div>
//         </div>
//   </div>
// }
