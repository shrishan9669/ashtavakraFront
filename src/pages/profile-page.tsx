import axios from "axios"
import { useEffect, useState } from "react"

export default function Profilepage(){
    const[selected,setSelected] = useState('purchase')
    const [demoAccess,setDemoaccess] = useState<Boolean | String>('');
    const [demoEnd, setDemoEnd] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState("");
    async function Getdemodetails(){
           try{
              const access = await axios({
                url:`https://ashtabackend.onrender.com/user/checkDemoaccess?id=${localStorage.getItem('userid')}`,
                method:'GET'
              })
              if(access.data && access.data.success){
                console.log("The api DemoEnd " +  access.data.demoEnd)
                setDemoEnd(new Date(access.data.demoEnd));
                setDemoaccess(true)
              }
              else setDemoaccess(false);
           }
           catch(err){
               console.log(err)
           }
    }
    useEffect(()=>{
        Getdemodetails()
    },[localStorage.getItem('userid')])

    // after Time expired 
    async function SetAccessfalseAfterExpired(){
        try{
            await axios({
                url:`https://ashtabackend.onrender.com/user/setAccessfalse?id=${localStorage.getItem('userid')}`,
                method:'PUT'
            })
        }
        catch(err){
            console.log(err)
        }
    }
   
  // Countdown Timer Function
  useEffect(() => {
    console.log("Raw demoEnd from API:", demoEnd); // 🛠 Debugging
    if (!demoEnd || isNaN(demoEnd.getTime())) {
      console.log("hi");
      return;
    } // ✅ Ensure `demoEnd` is valid
  
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = demoEnd.getTime() - now.getTime();
  
      if (timeDiff <= 0) {
        SetAccessfalseAfterExpired();
        setTimeLeft("Demo expired! Buy course to continue.");
        clearInterval(interval);
      } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60); // ✅ Seconds added
  
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s left`);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [demoEnd]);
  
// after click
  async function Startdemo(){
    if(timeLeft.includes('expired')){
        return ;
    }
    try{
         await axios({
            url:"https://ashtabackend.onrender.com/user/start-demo",
            data:{
                userid:localStorage.getItem('userid')
            }
            ,
            method:"POST"
        })


    }
    catch(err){
      console.log(err)
    }
  }

//   check if payment is varified or not

const [payVarified,setPayvarified] = useState(false)
async function IsPaymentVerified(){
    try{
       const Permit = await axios({
        url:`https://ashtabackend.onrender.com/user/IsPayVerified?number=${localStorage.getItem('number')}`
       })
       if(Permit.data && Permit.data.success){
        setPayvarified(true)
       }
    }
    catch(err){
        console.log(err)
    }
}
useEffect(()=>{
    IsPaymentVerified()
},[])
    return <div className="p-14">
        {/* Upper body */}
        {/* start demo button */}
       {
        // demo started
        demoAccess === '' ? ''
        :
        
        (demoAccess === true ? <>
            <p className="text-white mb-3 rounded-2xl p-3 font-bold flex justify-center text-xl bg-black">{timeLeft}</p>
           
          </>:<div className={`flex justify-center gap-3 ${timeLeft.includes('expired') ? 'text-slate-200':''} flex-col items-center`}>
        <h1 className="text-xl font-medium bg-slate-100 px-3 w-full justify-center flex py-2 rounded-lg">By clicking , your Demo ends in 4 days . After that make payment and get classes🎓.</h1>
         <button
         onClick={Startdemo}
         className={`bg-blue-400 ${timeLeft.includes('expired') ? 'text-slate-200 disabled:bg-gray-400 disabled:cursor-not-allowed':''} px-4 py-2 rounded-full text-white font-medium hover:bg-blue-500 cursor-pointer`}>Start Demo</button>
         
    </div>)
}
        

        <div className="flex gap-4 justify-between px-5 border-b border-slate-400 ">
           <div className="flex gap-10">
           <span onClick={()=> setSelected('purchase')} className={`font-medium  cursor-pointer transition-all duration-100  text-lg ${selected === 'purchase' ? 'text-blue-600 border-b-2':''}`}>Purchases</span>
            <span onClick={()=> setSelected('general')} className={`font-medium cursor-pointer transition-all duration-100  text-lg ${selected === 'general' ? 'text-blue-600 border-b-2':''}`}>General</span>
            <span onClick={()=> setSelected('security')} className={`font-medium  cursor-pointer transition-all duration-100 text-lg ${selected === 'security' ? 'text-blue-600 border-b-2':''}`}>Security</span>
           </div>

           <button
           onClick={()=>{
            localStorage.removeItem('number');
            localStorage.removeItem('token');
            window.location.href = '/'
           }}
           className="px-4 py-2 bg-gray-800 text-white rounded-full cursor-pointer font-medium">Logout</button>
           
        </div>

        {selected ==='purchase' ? <Purchases demoAccess={demoAccess} payVarified={payVarified}/>:(selected === 'general' ? <General/>:<Security/>)}
    </div>
}
export function Purchases({demoAccess,payVarified}:any){
    return <div className="p-10 flex-col flex gap-7">
        <h1 className="flex  font-bold text-2xl">My Purchases</h1>

        {/* <div className="text-blue-500 bg-blue-200 font-medium p-6 rounded-full mr-20">No courses purchased yet</div> */}
            
            {demoAccess  || payVarified ? <Card_course />:''}
        
    </div>
}
function Card_course(){
    return (
     <div className="w-[350px] h-auto rounded-2xl border border-slate-500">
         <div className="h-[40%]">
         <img src={'./thumbnail.jpeg'} className="h-full rounded-tl-2xl rounded-tr-2xl w-full" alt="cardimage" />
         </div>
 
         <div className="h-[60%] flex flex-col gap-5 px-4 py-6">
             <h1 className="font-bold text-lg">{"Live 0-100 Complete"}</h1>
                
                <div className="flex justify-center flex-col items-center gap-3">
                    <button 
                    onClick={()=> window.location.href = `/view`}
                    className="bg-blue-500 rounded-full cursor-pointer hover:font-medium text-white transition-all duration-300 hover:bg-blue-600 w-[80%] py-2">View</button>
                    <button 
                    onClick={()=> window.location.href = ``}
                    className="bg-slate-800 rounded-full cursor-pointer hover:font-medium text-white transition-all duration-300 hover:bg-slate-600 w-[80%] py-2">View Invoice</button>
                </div>
            
             
         </div>
     </div>
    )
 }
export function General(){
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
   async function Userdetails(){
        try{
              const res = await axios({
                url:`https://ashtabackend.onrender.com/user/details?number=${localStorage.getItem('number')}`,
               headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
               },
                method:'GET'
              })
              if(res.data){
                setName(res.data.user.name)
                setEmail(res.data.user.email)
              
              }
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    useEffect(()=>{
          Userdetails()
    },[])
    return <div className="p-10 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
            <span className="font-bold">Full name <span className="text-red-500 text-lg">*</span></span>
            <input type="text" placeholder={name} disabled className="p-3 cursor-not-allowed bg-slate-200  rounded-full mr-32" />
        </div>

        <div className="flex flex-col gap-3">
            <span className="font-bold">Email Address <span className="text-red-500 text-lg">*</span></span>
            <input type="text" placeholder={email} disabled className="cursor-not-allowed p-3 bg-slate-200 rounded-full mr-32"/>
        </div>

        <div className="flex flex-col gap-3">
            <span className="font-bold">Phone number <span className="text-red-500 text-lg">*</span></span>
            <input type="text" placeholder={localStorage.getItem('number') || ""} disabled className=" cursor-not-allowed p-3 bg-slate-200 rounded-full mr-32"/>
        </div>  
    </div>
}
export function Security(){

    const [old,setOld] = useState('')
     const [newpass , setNewpass ] = useState('')
    const [confirm,setConfirm] = useState('')
    const [msg,setMsg] = useState('')
   async function Changepassword(){
        try{
           const find = await axios({
            url:`https://ashtabackend.onrender.com/user/details?number=${localStorage.getItem('number')}`,
            method:'GET',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
           })

           if(find.data){
            if(find.data.user.password != old){
                alert(`Old password doesn't match!!`);
                return ;
            }

            else if(newpass != confirm ){
                alert("New password and Confirm doens't match!!");
                return ;
            }

            else{
                try{
                    const changepassword = await axios({
                        url:'https://ashtabackend.onrender.com/user/changepassword',
                        data:{number:localStorage.getItem('number'),newpass:confirm},
                        method:'PUT',
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem('token')}`
                        }
                    })
    
                    if(changepassword.data){
                        console.log("New password is ->",changepassword.data.newpass)
                        setMsg("Password changed Successfully!!")
                    }
                }
                catch(err){
                    console.log(err)
                    alert(err)
                }
                
            }


           }
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }
    return <div className="p-10 flex flex-col gap-5">
    <div className="flex flex-col gap-3">
        <span className="font-bold">Current Password <span className="text-red-500 text-lg">*</span></span>
        <input onChange={(e)=> setOld(e.target.value)} type="password" placeholder={'Enter old password..'}  className="p-3  bg-slate-200  rounded-full mr-32" />
    </div>

    <div className="flex flex-col gap-3">
        <span className="font-bold">New Password <span className="text-red-500 text-lg">*</span></span>
        <input type="text" onChange={(e)=> setNewpass(e.target.value)} placeholder={'Enter new password..'}  className="p-3 bg-slate-200 rounded-full mr-32"/>
    </div>

    <div className="flex flex-col gap-3">
        <span className="font-bold">Confirm Password <span className="text-red-500 text-lg">*</span></span>
        <input type="text" onChange={(e)=> setConfirm(e.target.value)} placeholder={'Confirm new password..'}  className="p-3 bg-slate-200 rounded-full mr-32"/>
        <span className="text-green-400">{msg}</span>
    </div>  

    <div className="flex justify-center mt-6">
        <button onClick={Changepassword} className="px-7 py-3 bg-blue-500 rounded-full hover:bg-blue-600 text-white font-medium cursor-pointer">Change Password</button>
    </div>
</div>
}
