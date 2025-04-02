import {  useEffect, useState } from "react";
import { FaDownload, FaHome } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { SiGooglescholar } from "react-icons/si";
import { Card_course, General, Security } from "./profile-page";
import axios from "axios";

interface YourComponentProps {
  sidebar: boolean;
}
export default function Home({sidebar}:YourComponentProps) {
  
  const [element, setElement] = useState('course');
  
  return (
    <div className="flex flex-col md:flex-row h-screen">
    
      
      {/* Left Sidebar - responsive */}
      <div 
        id="sidebar"
        className={` ${sidebar ? 'flex py-6':'hidden'}  bg-blue-100 w-full md:w-64 lg:w-[17%] h-auto md:h-full md:fixed top-0 md:top-24 left-0 pt-4 md:pt-10 pl-4 md:pl-10 md:flex flex-col gap-4 md:gap-10 `}
      >
        <span className="hidden md:block text-sm text-slate-500 font-medium">MAIN MENU</span>
        
        <div className={`flex items-center hover:text-blue-500 transition-all duration-200 ${element==='home' ? 'text-blue-500':''} gap-4`}>
          <FaHome className="text-xl" />
          <span onClick={()=> setElement('home')} className="font-medium cursor-pointer">Home</span>
        </div>
        
        <div className={`flex items-center hover:text-blue-500 transition-all duration-200 ${element==='course' ? 'text-blue-500':''} gap-4`}>
          <SiGooglescholar className="text-xl" />
          <span onClick={()=> setElement('course')} className="font-medium cursor-pointer">Courses</span>
        </div>

        {/* purchases , settings , logout */}
        {localStorage.getItem('token') ? (
          <div className="flex flex-col gap-4 md:gap-10 pt-4 md:pt-10 border-t border-slate-400 mr-4 md:mr-8">
            {/* purchases */}
            <div
              onClick={()=> setElement('purchase')}
              className={`flex cursor-pointer gap-3 text-gray-600 items-center`}
            >
              <FaDownload className={`text-xl ${element==='purchase' ? 'text-blue-500':''}`}/>
              <span className={`${element==='purchase' ? 'text-blue-500 font-bold':''}`}>Purchases</span>
            </div>

            {/* settings */}
            <div
              onClick={()=> setElement('settings')}
              className="flex cursor-pointer gap-3 text-gray-600 items-center"
            >
              <IoSettingsOutline className={`text-xl ${element === 'settings' ? 'text-blue-500':''}`} />
              <span className={`${element==='settings' ? 'text-blue-500 font-bold':''}`}>Settings</span>
            </div>

            <div
              onClick={()=> window.location.href = '/profile-page'}
              className="flex cursor-pointer gap-3   text-gray-600 items-center"
            >
              
              <span className={`bg-blue-500 w-full py-2 font-medium text-white flex justify-center rounded-l-lg`}>Start Demo</span>
            </div>

            {/* logout */}
            <div
              onClick={()=>{
                localStorage.removeItem('number')
                localStorage.removeItem('token')
                localStorage.removeItem('userid')
                localStorage.removeItem('promo')
                localStorage.removeItem('role')
                localStorage.removeItem('class')
                window.location.href='/'
              }} 
              className="flex cursor-pointer gap-3 text-gray-600 items-center"
            >
              <MdLogout className="text-xl text-gray-800"/>
              <span className="font-medium">Logout</span>
            </div>
          </div>
        ) : ''}
      </div>

      {/* Right Content - scrollable */}
      <div className="mt-16 md:mt-0 md:ml-64 lg:ml-[17%] w-full md:w-[calc(100%-16rem)] lg:w-[83%] overflow-y-auto h-screen px-4 md:px-10 py-4 md:py-28">
        {element === 'course' ? <Courses/> : 
         element === 'home' ? <Left_home/> : 
         element === 'purchase' ? <Purchases/> : 
         <CombineGeneralandSecurity/>}
      </div>
    </div>
  );
}
export function Purchases() {
   const [payVerified,setPayVerified] = useState(false)
   
   async function IsPaymentVerified() {
    try {
        const Permit = await axios({
            url: `https://vigyanbackend.onrender.com/user/IsPayVerified?number=${localStorage.getItem('number')}`,
            method:'GET'
        });
        if (Permit.data && Permit.data.success) {
            console.log("Permit.data-> " , Permit.data)
            setPayVerified(true);
        }
    } catch (err) {
        console.log(err);
    }
}

useEffect(() => {
    IsPaymentVerified();
}, []);

    return (
        <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-5 sm:gap-7">
            <h1 className="font-bold text-xl sm:text-2xl">My Purchases</h1>

            { payVerified ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card_course />
                    {/* Add more cards here if needed */}
                </div>
            ) : (
                <div className="text-blue-500 bg-blue-100 font-medium p-4 sm:p-6 rounded-full sm:mr-10 md:mr-20 text-center sm:text-left">
                    No courses purchased yet
                </div>
            )}
        </div>
    );
}

function CombineGeneralandSecurity(){
  const [selected,setSelected] = useState('general')
  return (
    <div className="flex flex-col gap-6 md:gap-10 py-6 md:py-10">
      <div className="flex gap-4 md:gap-10 border-b border-slate-300 overflow-x-auto">
        <span 
          onClick={()=> setSelected('general')} 
          className={`font-medium py-2 md:py-3 cursor-pointer transition-all duration-100 text-base md:text-lg whitespace-nowrap ${selected === 'general' ? 'text-blue-600 border-b-4':''}`}
        >
          General
        </span>
        <span 
          onClick={()=> setSelected('security')} 
          className={`font-medium py-2 md:py-3 cursor-pointer transition-all duration-100 text-base md:text-lg whitespace-nowrap ${selected === 'security' ? 'text-blue-600 border-b-4':''}`}
        >
          Security
        </span>
      </div>

      {selected==='general' ? <General/> : <Security/>}
    </div>
  );
}

function Left_home(){
  return (
    <div className="flex flex-col items-center w-full">  
      {/* top image */}
      <div className="w-full md:w-[90%] px-4 md:px-0">
        <img 
          src="https://plus.unsplash.com/premium_photo-1683887033239-08a75665a069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNjaWVuY2UlMjBhbmQlMjBtYXRoc3xlbnwwfHwwfHx8MA%3D%3D" 
          className="h-auto md:h-[700px] w-full rounded-lg md:rounded-2xl" 
          alt="Live-Prep banner" 
        />
      </div>

      {/* Why live prep */}
      <div className="flex flex-col mt-10 md:mt-20 gap-6 md:gap-10 items-center py-5 px-4 md:px-0">
      

        {/* Whys */}
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Why <span className="text-indigo-600">AVS Classes</span>?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The most effective way to accelerate your tech career with industry-relevant skills
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 - Learn from the best */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-5">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Learn from the best</h3>
            </div>
            <p className="text-gray-600 pl-16">
              We clears the core concepts very easily with real life Examples.
            </p>
          </div>

          {/* Feature 2 - Open source */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-5">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Doubt Sessions</h3>
            </div>
            <p className="text-gray-600 pl-16">
              Solves your every doubt until it not gets demolished.
            </p>
          </div>

          {/* Feature 3 - Beginner friendly */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-5">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Beginner friendly</h3>
            </div>
            <p className="text-gray-600 pl-16">
              Start from the basics and go deep into the concepts with Top notch questions.
            </p>
          </div>

          {/* Feature 4 - Version control */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-5">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Career guidance.</h3>
            </div>
            <p className="text-gray-600 pl-16">
              Helping you sort yourself for the future destinations.
            </p>
          </div>

          {/* Feature 5 - Reach your inflection point */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-5">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Reach your inflection point</h3>
            </div>
            <p className="text-gray-600 pl-16">
              Become a student that tackles each and every question technically.
            </p>
          </div>

          {/* Feature 6 - Assignments */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-5">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Assignments</h3>
            </div>
            <p className="text-gray-600 pl-16">
              We have personally created assignments after every week of study, so it's extremely hands on.
            </p>
          </div>
        </div>

        {/* CTA Section */}
       
      </div>
    </div>
      </div>

      {/* About Live-prep */}
      <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-6xl px-4 md:px-6 mx-auto py-12">
  {/* Header */}
  <div className="text-center">
    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
      About <span className="">AVS</span> Classes
    </h1>
    <div className="mt-2 h-1 w-20 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
  </div>

  {/* Gradient Card */}
  <div className="w-full relative overflow-hidden rounded-2xl md:rounded-[28px] shadow-xl">
    {/* Animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-300 to-orange-300 opacity-20 animate-gradient-x"></div>
    
    {/* Content */}
    <div className="relative backdrop-blur-sm bg-white/80 p-6 md:p-10 flex flex-col gap-4 md:gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Welcome to अष्टावक्र विज्ञान संस्था</h2>
      </div>
      
      <p className="text-gray-700 leading-relaxed">
        This is an initiative to mentor students in their core subjects like Maths and Science.
      </p>
      
      <p className="text-gray-700 leading-relaxed">
        Aman strongly believes that today you are either a 1x student or a 100x student with nothing in between. His mission is to elevate every student in the class to become a <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">100x achiever</span>.
      </p>
      
      <p className="text-gray-700 leading-relaxed">
        Join him in this transformative journey through his first course on Maths and Science, with a strong emphasis on mastering core concepts to make learning both effective and enjoyable.
      </p>
      
      {/* CTA Button */}
     
    </div>
  </div>
</div>
    </div>
  );
}

function Courses() {
  // Get current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

  // Check if current date is between March 31 - April 10
  const showOffer = 
    (currentMonth === 3 && currentDay === 31) || // March 31st
    (currentMonth === 4 && currentDay <= 10);    // April 1-10

  // Calculate days remaining in offer
  let daysRemaining = 0;
  if (currentMonth === 3 && currentDay === 31) {
    daysRemaining = 11; // March 31 = 11 days left (including April 10)
  } else if (currentMonth === 4) {
    daysRemaining = 11 - currentDay; // April 1 = 10 days left, etc.
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Attractive Offer Banner  */}
      {showOffer && (
        <div className="bg-gradient-to-r md:mt-0 mt-18 from-purple-600 to-indigo-600 rounded-xl shadow-lg p-4 mb-12 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white text-lg sm:text-xl font-bold mb-2">
              🎉 LIMITED TIME OFFER! 🎉
            </p>
            <p className="text-purple-100 text-sm sm:text-base">
              Enroll between <span className="font-bold">April 1st - April 10th</span> and get 
              <span className="line-through text-purple-200 mx-1">₹7,200</span> 
              <span className="bg-white text-purple-600 font-bold px-2 py-1 rounded-md ml-1">₹6,500</span> 
              - Save ₹700! Don't miss this opportunity!
            </p>
            <div className="mt-3 flex justify-center">
              <div className="bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                {daysRemaining > 1 ? `OFFER ENDS IN ${daysRemaining} DAYS` : 'LAST DAY TODAY!'}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Course Card class 9th */}


   {localStorage.getItem('token') ? localStorage.getItem('class')==='9' ?
      //{/* Course Card class 9th */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-xl">
          {/* Image with overlay */}
          <div className="relative">
            <img 
              className="w-full h-64 sm:h-96 object-cover" 
              src="https://media.istockphoto.com/id/611751296/photo/stem-concept-with-drawing-background-magnifying-glass-over-education-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=9XhJbkAGJwFVjF01TkJoNq5fGc7UqtdfIAC7vtzVEVU=" 
              alt="STEM Education Course" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-white text-2xl sm:text-3xl font-bold">Advanced STEM Education Class 9th.</h2>
              <p className="text-gray-200 mt-1">Master the fundamentals of Science & Math</p>
            </div>
          </div>
          
          {/* Card Content */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Course Highlights</h3>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Special Doubt Sessions.
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Core Concept Clarity.
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly Tests .
                  </li>
                </ul>
              </div>
              <div className="text-right">
                {showOffer && <div><p className="text-sm text-gray-500">Regular Price</p>
                <p className="text-gray-400 line-through">₹7,200</p>
                <p className="text-sm text-gray-500 mt-2">Discounted Price</p></div>}
                
                {!showOffer && <p className="text-sm text-right text-gray-500">Price</p>}
                <p className="text-2xl font-bold text-purple-600">{showOffer ? '₹6,500':'₹7,200'}</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => window.location.href = '/courses/12'}
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full group shadow-lg hover:shadow-purple-500/30 cursor-pointer hover:scale-[1.1] transition-all duration-300"
              >
               View Details
              </button>
            </div>
          </div>
        </div>
      </div> :

      //{/* Course Card class 10th */}
      <div className="max-w-4xl mx-auto mt-32">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-xl">
          {/* Image with overlay */}
          <div className="relative">
            <img 
              className="w-full h-64 sm:h-96 object-cover" 
              src="https://media.istockphoto.com/id/611751296/photo/stem-concept-with-drawing-background-magnifying-glass-over-education-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=9XhJbkAGJwFVjF01TkJoNq5fGc7UqtdfIAC7vtzVEVU=" 
              alt="STEM Education Course" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-white text-2xl sm:text-3xl font-bold">Advanced STEM Education Class 10th.</h2>
              <p className="text-gray-200 mt-1">Master the fundamentals of Science & Math</p>
            </div>
          </div>
          
          {/* Card Content */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Course Highlights</h3>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Special Doubt Sessions.
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Core Concept Clarity.
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly Tests .
                  </li>
                </ul>
              </div>
              <div className="text-right">
                {showOffer && <div><p className="text-sm text-gray-500">Regular Price</p>
                <p className="text-gray-400 line-through">₹7,200</p>
                <p className="text-sm text-gray-500 mt-2">Discounted Price</p></div>}
                
                {!showOffer && <p className="text-sm text-right text-gray-500">Price</p>}
                <p className="text-2xl font-bold text-purple-600">{showOffer ? '₹6,500':'₹7,200'}</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => window.location.href = '/courses/12'}
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full group shadow-lg hover:shadow-purple-500/30 cursor-pointer hover:scale-[1.1] transition-all duration-300"
              >
               View Details
              </button>
            </div>
          </div>
        </div>
      </div>:

      // other wise


      <div>
        //{/* Course Card class 9th */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-xl">
          {/* Image with overlay */}
          <div className="relative">
            <img 
              className="w-full h-64 sm:h-96 object-cover" 
              src="https://media.istockphoto.com/id/611751296/photo/stem-concept-with-drawing-background-magnifying-glass-over-education-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=9XhJbkAGJwFVjF01TkJoNq5fGc7UqtdfIAC7vtzVEVU=" 
              alt="STEM Education Course" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-white text-2xl sm:text-3xl font-bold">Advanced STEM Education Class 9th.</h2>
              <p className="text-gray-200 mt-1">Master the fundamentals of Science & Math</p>
            </div>
          </div>
          
          {/* Card Content */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Course Highlights</h3>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Special Doubt Sessions.
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Core Concept Clarity.
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly Tests .
                  </li>
                </ul>
              </div>
              <div className="text-right">
                {showOffer && <div><p className="text-sm text-gray-500">Regular Price</p>
                <p className="text-gray-400 line-through">₹7,200</p>
                <p className="text-sm text-gray-500 mt-2">Discounted Price</p></div>}
                
                {!showOffer && <p className="text-sm text-right text-gray-500">Price</p>}
                <p className="text-2xl font-bold text-purple-600">{showOffer ? '₹6,500':'₹7,200'}</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => window.location.href = '/courses/12'}
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full group shadow-lg hover:shadow-purple-500/30 cursor-pointer hover:scale-[1.1] transition-all duration-300"
              >
               View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      //{/* Course Card class 10th */}
      <div className="max-w-4xl mx-auto mt-32">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-xl">
          {/* Image with overlay */}
          <div className="relative">
            <img 
              className="w-full h-64 sm:h-96 object-cover" 
              src="https://media.istockphoto.com/id/611751296/photo/stem-concept-with-drawing-background-magnifying-glass-over-education-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=9XhJbkAGJwFVjF01TkJoNq5fGc7UqtdfIAC7vtzVEVU=" 
              alt="STEM Education Course" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-white text-2xl sm:text-3xl font-bold">Advanced STEM Education Class 10th.</h2>
              <p className="text-gray-200 mt-1">Master the fundamentals of Science & Math</p>
            </div>
          </div>
          
          {/* Card Content */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Course Highlights</h3>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Special Doubt Sessions.
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Core Concept Clarity.
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly Tests .
                  </li>
                </ul>
              </div>
              <div className="text-right">
                {showOffer && <div><p className="text-sm text-gray-500">Regular Price</p>
                <p className="text-gray-400 line-through">₹7,200</p>
                <p className="text-sm text-gray-500 mt-2">Discounted Price</p></div>}
                
                {!showOffer && <p className="text-sm text-right text-gray-500">Price</p>}
                <p className="text-2xl font-bold text-purple-600">{showOffer ? '₹6,500':'₹7,200'}</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => window.location.href = '/courses/12'}
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full group shadow-lg hover:shadow-purple-500/30 cursor-pointer hover:scale-[1.1] transition-all duration-300"
              >
               View Details
              </button>
            </div>
          </div>
        </div>
      </div>


      </div>
      }


      
      

      
      
    </div>
  );
}

// function Card_course({image, heading, para, curprice, oldprice}: any){
//   return (
//     <div className="w-full max-w-sm mx-auto sm:max-w-none sm:w-auto h-auto sm:h-[450px] rounded-xl md:rounded-2xl border border-slate-500 overflow-hidden">
//       <div className="h-40 sm:h-[40%]">
//         <img 
//           src={image} 
//           className="h-full w-full object-cover rounded-tl-xl md:rounded-tl-2xl rounded-tr-xl md:rounded-tr-2xl" 
//           alt="course thumbnail" 
//         />
//       </div>

//       <div className="h-auto sm:h-[60%] flex flex-col gap-3 md:gap-5 p-3 md:p-4 md:py-6">
//         <h1 className="font-bold text-base md:text-lg line-clamp-2">{heading}</h1>
//         <p className="text-slate-500 text-sm md:text-base line-clamp-2">{para}</p>
        
//         <div className="flex justify-between mt-2 md:mt-0">
//           <span className="font-bold text-sm md:text-base">
//             {curprice} <span className="line-through font-normal text-slate-400 text-xs md:text-sm">{oldprice}</span>
//           </span>
//           <span className="text-green-500 font-bold text-sm md:text-base">30% off</span>
//         </div>

//         <div className="flex justify-center mt-2 md:mt-0">
//           <button 
//             onClick={()=> window.location.href = `/courses/${12}`}
//             className="bg-blue-500 rounded-full cursor-pointer text-white hover:bg-blue-600 w-full md:w-[80%] py-1 md:py-2 text-sm md:text-base"
//           >
//             View details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
