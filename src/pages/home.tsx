import { useState } from "react";
import { FaDownload, FaHome } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { SiGooglescholar } from "react-icons/si";
import { General, Purchases, Security } from "./profile-page";

export default function Home({sidebar}:any) {
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

            {/* logout */}
            <div
              onClick={()=>{
                localStorage.removeItem('number')
                localStorage.removeItem('token')
                localStorage.removeItem('userid')
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
      <div className="w-full md:w-[80%] px-4 md:px-0">
        <img 
          src="./liveprep.webp" 
          className="h-auto md:h-[700px] w-full rounded-lg md:rounded-2xl" 
          alt="Live-Prep banner" 
        />
      </div>

      {/* Why live prep */}
      <div className="flex flex-col mt-10 md:mt-20 gap-6 md:gap-10 items-center py-5 px-4 md:px-0">
        <div className="flex justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-center">Why Live-Prep?</h1>
        </div>

        {/* Whys */}
        <div className="w-full">
          <img src="./photo1.png" alt="Why choose Live-Prep" className="w-full h-auto" />
        </div>
      </div>

      {/* About Live-prep */}
      <div className="flex flex-col gap-6 md:gap-10 w-full md:w-[1100px] px-4 md:px-0">
        <div className="flex justify-center">
          <h1 className="text-2xl md:text-3xl font-bold">About Live-Prep</h1>
        </div>

        {/* rangeen card */}
        <div className="flex text-base md:text-lg font-thin flex-col gap-3 md:gap-5 rounded-xl md:rounded-3xl py-6 md:py-10 px-4 md:px-5 bg-gradient-to-r from-purple-200 via-pink-100 to-orange-200">
          <h1 className="text-lg md:text-xl">Welcome to Live-Prep</h1>
          <p>This is an initiative by <b>Aman Shrivastava</b> to personally mentor students in their core Subjects like Maths and Science.</p>
          <p>Aman strongly feels that today you are either a 1x student or a 100x student and nothing in the middle, and his hope is to take everyone in the class to be a <b>100x student</b>.</p>
          <p>Join him in his first course on Maths and Science with a heavy focus on core concepts to learn topics and make them enjoyable.</p>
        </div>
      </div>
    </div>
  );
}

function Courses(){
  let course_array = [
    {
      "image":'./thumbnail.jpeg',
      "heading":'Complete Science and Maths cohort - Class 10th',
      "para":'Complete syllabus - https://blog.100xdevs.com/ Starts 2nd Au..',
      'cur_price':'₹12,000',
      'old_price':'₹14,499'
    },
    {
      "image":'./thumbnail.jpeg',
      "heading":'Complete Science and Maths cohort - Class 10th',
      "para":'Complete syllabus - https://blog.100xdevs.com/ Starts 2nd Au..',
      'cur_price':'₹12,000',
      'old_price':'₹14,499'
    },
    {
      "image":'./thumbnail.jpeg',
      "heading":'Complete Science and Maths cohort - Class 10th',
      "para":'Complete syllabus - https://blog.100xdevs.com/ Starts 2nd Au..',
      'cur_price':'₹12,000',
      'old_price':'₹14,499'
    },
    {
      "image":'./thumbnail.jpeg',
      "heading":'Complete Science and Maths cohort - Class 10th',
      "para":'Complete syllabus - https://blog.100xdevs.com/ Starts 2nd Au..',
      'cur_price':'₹12,000',
      'old_price':'₹14,499'
    }
  ];
  
  return (
    <div className="h-full flex flex-col gap-6 md:gap-10 w-full px-4 md:px-0">
      <div className="flex justify-center pt-4 md:pt-0">
        <h1 className="font-bold text-lg md:text-xl">Courses</h1>
      </div>

      {/* card divs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {course_array.map((e:any, index:number) => (
          <Card_course 
            key={index}
            image={e.image} 
            heading={e.heading} 
            para={e.para} 
            curprice={e.cur_price} 
            oldprice={e.old_price}
          />
        ))}
      </div>
    </div>
  );
}

function Card_course({image, heading, para, curprice, oldprice}: any){
  return (
    <div className="w-full max-w-sm mx-auto sm:max-w-none sm:w-auto h-auto sm:h-[450px] rounded-xl md:rounded-2xl border border-slate-500 overflow-hidden">
      <div className="h-40 sm:h-[40%]">
        <img 
          src={image} 
          className="h-full w-full object-cover rounded-tl-xl md:rounded-tl-2xl rounded-tr-xl md:rounded-tr-2xl" 
          alt="course thumbnail" 
        />
      </div>

      <div className="h-auto sm:h-[60%] flex flex-col gap-3 md:gap-5 p-3 md:p-4 md:py-6">
        <h1 className="font-bold text-base md:text-lg line-clamp-2">{heading}</h1>
        <p className="text-slate-500 text-sm md:text-base line-clamp-2">{para}</p>
        
        <div className="flex justify-between mt-2 md:mt-0">
          <span className="font-bold text-sm md:text-base">
            {curprice} <span className="line-through font-normal text-slate-400 text-xs md:text-sm">{oldprice}</span>
          </span>
          <span className="text-green-500 font-bold text-sm md:text-base">30% off</span>
        </div>

        <div className="flex justify-center mt-2 md:mt-0">
          <button 
            onClick={()=> window.location.href = `/courses/${12}`}
            className="bg-blue-500 rounded-full cursor-pointer text-white hover:bg-blue-600 w-full md:w-[80%] py-1 md:py-2 text-sm md:text-base"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}
