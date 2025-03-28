import { useState } from "react";
import { FaDownload, FaHome } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { SiGooglescholar } from "react-icons/si";
import { General, Purchases, Security } from "./profile-page";
export default function Home() {
    const [element,setElement] = useState('course') 
    return (
      <div className="flex h-screen">
        {/* Left Sidebar - fixed */}
        <div className="bg-blue-100 w-[17%] h-full fixed top-24  left-0 pt-10 pl-10 flex flex-col gap-8">
          <span className="text-sm text-slate-500 font-medium">MAIN MENU</span>
          <div className={`flex items-center hover:text-blue-500 transition-all duration-200 ${element==='home' ? 'text-blue-500':''} gap-4`}>
            <FaHome className="text-xl" />
            <span onClick={()=> setElement('home')} className="font-medium cursor-pointer">Home</span>
          </div>
          <div className={`flex items-center hover:text-blue-500 transition-all duration-200 ${element==='course' ? 'text-blue-500':''} gap-4`}>
            <SiGooglescholar className="text-xl" />
            <span  onClick={()=> setElement('course')} className="font-medium cursor-pointer " >Courses</span>
          </div>

          {/* purchases , settings , logout */}
        {localStorage.getItem('token') ? <div className="flex flex-col  gap-10 pt-10 border-t border-slate-400 mr-8">
            {/* purchases */}
              <div
              onClick={()=> setElement('purchase')}
              className={`flex  cursor-pointer gap-3 text-gray-600 items-cente`}>
              <FaDownload className={`text-xl ${element==='purchase' ? 'text-blue-500':''} `}/>
              <span className={` ${element==='purchase' ? 'text-blue-500 font-bold':''}`}>Purchases</span>
              </div>

              {/* settings */}
              <div
              onClick={()=> setElement('settings')}
              className="flex cursor-pointer gap-3 text-gray-600 items-center">
              <IoSettingsOutline className={`text-xl  ${element === 'settings' ? 'text-blue-500':''}`} />
              <span className={` ${element==='settings' ? 'text-blue-500 font-bold':''}`}>Settings</span>
              </div>

              {/* logout */}

              <div
              
              onClick={()=>{
                localStorage.removeItem('number')
                localStorage.removeItem('token')
                localStorage.removeItem('userid')
                window.location.href='/'
                
              }} className="flex  cursor-pointer gap-3 text-gray-600 items-center">
              <MdLogout className="text-xl text-gray-800"/>
              <span className="font-medium">Logout</span>
              </div>

          </div>:''}
          
          
        </div>


  
        {/* Right Content - scrollable */}
        <div className="ml-[17%] w-[83%] overflow-y-auto h-screen px-10 py-28">
          {element === 'course' ? <Courses/>:(element==='home') ? <Left_home/>:(element==='purchase' ? <Purchases/>:<CombineGeneralandSecurity/>)}
        </div>
      </div>
    );
  }

  function CombineGeneralandSecurity(){
    const [selected,setSelected] = useState('general')
    return <div className="flex flex-col gap-10 py-10">
     
           <div className="flex gap-10 border-b  border-slate-300">
            <span onClick={()=> setSelected('general')} className={`font-medium py-3 cursor-pointer transition-all duration-100  text-lg ${selected === 'general' ? 'text-blue-600 border-b-4':''}`}>General</span>
            <span onClick={()=> setSelected('security')} className={`font-medium py-3  cursor-pointer transition-all duration-100 text-lg ${selected === 'security' ? 'text-blue-600 border-b-4':''}`}>Security</span>
           </div>

            {selected==='general' ? <General/>:<Security/>}
          
           
        
    </div>
  }
  
  function Left_home(){
    return <div className="flex flex-col items-center w-full">  
        {/* top image */}

        <div className="w-[80%]">
          <img src="./liveprep.webp" className="h-[700px] w-full rounded-2xl" alt="" />
        </div>

        {/* Why live prep */}
        <div className="flex flex-col mt-20 gap-10 items-center py-5">
            <div className="flex justify-center">
                <h1 className="text-5xl font-bold">Why Live-Prep?</h1>
            </div>

            {/* Whys */}

            <div className="">

                <img src="./photo1.png" alt="" />

            </div>
        </div>

        {/* About Live-prep */}
        <div className="flex flex-col gap-10 w-[1100px] ">
            <div className="flex justify-center">
              <h1 className="text-3xl font-bold">About Live-Prep</h1>
            </div>

{/* rangeen card */}
            <div className="flex text-lg font-thin flex-col gap-5 rounded-3xl py-10 px-5 bg-gradient-to-r from-purple-200 via-pink-100 to-orange-200">
                <h1>Welcome to Live-Prep</h1>
                <p>This is an initiative by <b>Aman Shrivastava</b> to personally mentor students in their core Subjects like Maths and Science.</p>
                <p>Aman strongly feels that today you are either a 1x student or a 100x student and nothing in the middle, and his hope is to take everyone in the class to be a <b>100x student</b>.</p>
                <p>Join him in his first course on Maths and Science  with a heavy focus on core concepts to learn topics and make them enjoyable.</p>
            </div>
           
        </div>


    </div>
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

    ]
    return (
        <div className="h-full flex flex-col gap-10 w-full">
            <div className="flex justify-center">
                <h1 className="font-bold text-xl">Courses</h1>
            </div>

            {/* card divs */}

            <div className="grid grid-cols-3 gap-3">
              {
                course_array.map((e:any)=>{
                    return <Card_course image={e.image} heading={e.heading} para={e.para} curprice={e.cur_price} oldprice={e.old_price}/>
                })
              }
             
              
            
            </div>

        </div>
    )
}


function Card_course({image,heading,para,curprice,oldprice}:any){
   return (
    <div className="w-[350px] h-[450px] rounded-2xl border border-slate-500">
        <div className="h-[40%]">
        <img src={image} className="h-full rounded-tl-2xl rounded-tr-2xl w-full" alt="cardimage" />
        </div>

        <div className="h-[60%] flex flex-col gap-5 px-4 py-6">
            <h1 className="font-bold text-lg">{heading}</h1>
            <p className="text-slate-500">{para}</p>
            
            <div className="flex justify-between">
            <span className="font-bold">{curprice} <span className="line-through font-normal text-slate-400">{oldprice}</span></span>
            <span className="text-green-500 font-bold">30% off</span>
            </div>

            <div className="flex justify-center">
                <button 
                onClick={()=> window.location.href = `/courses/${12}`}
                className="bg-blue-500 rounded-full cursor-pointer text-white hover:bg-blue-600 w-[80%] py-2">View details</button>
            </div>
           
            
        </div>
    </div>
   )
}