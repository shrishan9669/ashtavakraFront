import axios from 'axios';
import { ArrowRightIcon, EyeIcon, EyeOffIcon, PhoneIcon } from 'lucide-react';
import  {useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from './loader';
import { HiXMark } from 'react-icons/hi2';


function UserOrTeacherSignup({setUserteacher,onClose,isOpen}:any){
  if(!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/30 backdrop-blur-sm'>
    <div className='relative w-full max-w-md mx-4'>
      <div className='bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in-up'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h2 className="text-2xl font-bold text-gray-800">Join As</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className='space-y-4'>
          <div className='space-y-1'>
            <h3 className='text-lg font-medium text-gray-700'>I want to...</h3>
            <p className='text-sm text-gray-500'>Select your role to continue registration</p>
          </div>

          <div className='flex flex-col gap-3'>
            <button 
              onClick={() => setUserteacher('student')} 
              className='flex items-center justify-between px-6 py-4 transition-all duration-200 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md group'
            >
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className='text-left'>
                  <h4 className='font-medium text-gray-800'>Learn</h4>
                  <p className='text-sm text-gray-500'>Sign up as Student</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button 
              onClick={() => setUserteacher('teacher')} 
              className='flex items-center justify-between px-6 py-4 transition-all duration-200 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md group'
            >
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className='text-left'>
                  <h4 className='font-medium text-gray-800'>Teach</h4>
                  <p className='text-sm text-gray-500'>Sign up as Teacher</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
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
          userteacher === 'student' ? <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm  bg-opacity-30 z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white flex flex-col gap-6 p-8 rounded-xl border border-gray-200 shadow-2xl relative w-full max-w-md mx-4">
            <div className='flex items-center justify-between'>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Student Sign Up</h2>
                <p className="text-sm text-gray-500 mt-1">Join our learning community</p>
              </div>
              <button
                id='close'
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-2xl font-light"
              >
                &times;
              </button>
            </div>
        
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
        
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="class">
                  Class
                </label>
                <input
                  onChange={(e) => setClass(e.target.value)}
                  id="class"
                  type="number"
                  placeholder="9 or 10"
                  min="9"
                  max="12"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
        
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  onChange={handleEmailchange}
                  id="email"
                  type="email"
                  placeholder="yourname@gmail.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                {emailmsg && <p className='mt-1 text-sm text-red-500'>{emailmsg}</p>}
              </div>
        
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="number">
                  Phone Number
                </label>
                <input
                  onChange={handleInputChange}
                  id="number"
                  type="text"
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
              </div>
        
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
        
              <button
                onClick={async (e) => {
                  e.preventDefault()
                  if (!phoneNumberRegex.test(phone)) {
                    setError('Please enter a valid phone number.');
                    return;
                  }
                  if (!regexemail.test(email)) {
                    setEmailmsg('Invalid Gmail address')
                    return;
                  }
                  if (!name || !password || !email || !phone) {
                    alert("All fields are required!!");
                    return;
                  }
        
                  setLoading(true)
                  try {
                    const res = await axios({
                      url: "https://vigyanbackend.onrender.com/user/createuser",
                      method: "POST",
                      data: {
                        email, password, name, number: phone, role: "student", Class: Class
                      }
                    })
        
                    console.log(res.data)
                    if (res.data && res.data.newUser) {
                      setMsg(res.data.msg)
                      onClose();
                      document.getElementById('headerLogin')?.click()
                    }
                    else setMsg(res.data.msg)
                  }
                  catch (err) {
                    console.log(err);
                    alert(err)
                  }
                  finally {
                    setLoading(false)
                  }
                }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
              >
                {loading ? <Loader /> : 'Create Account'}
              </button>
        
              {msg && (
                <div className={`text-center py-2 px-4 rounded-lg ${msg.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  <span className="text-sm">{msg}</span>
                </div>
              )}
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


export const MobileNumberModal = ({ onClose, isOpen }: any) => {
  if (!isOpen) return null;
  
  const [next, setNext] = useState(false);
  const [number, setNumber] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const phoneNumberRegex = /^[7-9]{1}[0-9]{9}$/;

  const handlenumberchange = (e: any) => {
    const value = e.target.value;
    setNumber(value);
    
    if (!phoneNumberRegex.test(value)) {
      setMsg('Please enter a valid 10-digit mobile number');
    } else {
      setMsg('');
    }
  };

  const handleSubmit = async () => {
    if (!phoneNumberRegex.test(number)) {
      setMsg('Please enter a valid mobile number');
      return;
    }
    
    setLoading(true);
    try {
      const user = await axios({
        url: "https://vigyanbackend.onrender.com/user/checknumber",
        data: { number },
        method: 'POST'
      });

      if (user.data?.status) {
        localStorage.setItem('number', number);
        localStorage.setItem('role', user.data.role);
        setNext(true);
      } else {
        setMsg('Mobile number not registered');
      }
    } catch (err) {
      console.error(err);
      setMsg('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='login'>
      {next ? (
        <Aftermobile onClose={onClose} isOpen={isOpen} />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h1 className="text-xl font-semibold text-gray-800">Login with Mobile</h1>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    id="mobile"
                    type="tel"
                    value={number}
                    onChange={handlenumberchange}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                    maxLength={10}
                  />
                  <PhoneIcon className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
                {msg && (
                  <p className={`text-sm mt-1 ${msg.includes('valid') ? 'text-amber-500' : 'text-red-500'}`}>
                    {msg}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !phoneNumberRegex.test(number)}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2
                  ${loading || !phoneNumberRegex.test(number) 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'}`}
              >
                {loading ? (
                  <>
                    {/* <Arrowpathi clas
                    <sName="h-4 w-4 animate-spin" />
                    Verifying... */}
                    <Loader/>
                  </>
                ) : (
                  <>
                    <ArrowRightIcon className="h-4 w-4" />
                    Continue
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
function Aftermobile({ onClose, isOpen }: any) {
  if (!isOpen) return null;
  const [withpassword, setWithpassword] = useState(false);

  return (
    <div>
      {withpassword ? (
        <LoginWithPassword onClose={onClose} isOpen={isOpen} />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h1 className="text-xl font-semibold text-gray-800">Login Options</h1>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                 <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-5 h-5"
  >
    <path 
      fillRule="evenodd" 
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" 
      clipRule="evenodd" 
    />
  </svg>
                {/* <XMarkIcon className="h-5 w-5" /> */}
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="space-y-4">
                <button
                  onClick={() => setWithpassword(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  
                  Continue with Password
                </button>

                
              </div>

              <div className="pt-2 text-center">
                <button className="text-sm text-blue-500 hover:text-blue-600 hover:underline transition-colors">
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Don't have an account?{' '}
                <button
                onClick={()=>{
                  onClose();
                  document.getElementById('headerSignup')?.click()

                }}
                className="text-blue-500 hover:underline">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoginWithPassword({ onClose, isOpen }: { onClose: () => void; isOpen: boolean }) {
  if (!isOpen) return null;

  const [msg, setMsg] = useState('');
  const [type, setType] = useState('password');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      setMsg('Please enter your password');
      return;
    }
    
    setLoading(true);
    setMsg('');
    
    try {
      const res = await axios({
        url: `https://vigyanbackend.onrender.com/user/checkpassword?password=${password}&number=${localStorage.getItem('number')}`,
        method: 'GET'
      });

      if (res.data?.status) {
        setMsg('Successfully logged in');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userid', res.data.userid);
        localStorage.setItem('class', res.data.Class);
        window.location.href = '/';
      } else {
        setMsg(res.data?.msg || 'Invalid credentials');
        localStorage.removeItem('role');
      }
    } catch (err) {
      console.error(err);
      setMsg('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out'>
      <div className='bg-white flex flex-col gap-6 p-8 rounded-xl shadow-xl w-full max-w-md mx-4'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-2xl text-gray-800'>Welcome Back</h1>
          <button
            onClick={onClose}
            className='text-2xl text-gray-500 hover:text-gray-700 transition-colors'
          >
            &times;
          </button>
        </div>
        
        <div className='space-y-1'>
          <label htmlFor="password" className='text-sm font-medium text-gray-700'>
            Password
          </label>
          <div className='relative'>
            <input
              type={type}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full rounded-lg border border-gray-300 p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              placeholder='Enter your password'
            />
            <button
              type="button"
              onClick={() => setType(type === 'password' ? 'text' : 'password')}
              className='absolute right-3 top-4 text-gray-500 hover:text-gray-700 focus:outline-none'
            >
              {type === 'password' ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <div className='flex justify-center'>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
            </div>
          ) : (
            'Login'
          )}
        </button>
        
        {msg && (
          <div className={`text-center text-sm ${
            msg.includes('Successfully') ? 'text-green-600' : 'text-red-500'
          }`}>
            {msg}
          </div>
        )}
        
        <div className='text-center'>
          <button className='text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none transition-colors'>
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
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
