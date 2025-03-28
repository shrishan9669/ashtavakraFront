import axios from "axios";
import { useEffect, useState } from "react";

export default function View(){
    const [link,setLink] = useState('')
    async function Getlatest(){
        try{
            const res = await axios({
                url:'http://localhost:3000/user/getlatestlink',
                method:'GET'
            })

            if(res.data && res.data.link){
                setLink(res.data.link);
            }
        }
        catch(err){
            console.log(err);
        }
    }

      // Auto-fetch latest link every 5 seconds
  useEffect(() => {
    Getlatest(); // Component mount hote hi call karega

    const interval = setInterval(() => {
      Getlatest();
    }, 5000);

    return () => clearInterval(interval); // Component unmount hone pe interval cleanup karega
  }, []);
    return (
        <div>
        {/* Recorded Lectures */}
        <div className="flex justify-center p-5 bg-slate-200 font-bold">
          <h1>Recorded lectures coming soon . . . .</h1>
        </div>
  {/* image and link */}

  <div className="flex h-[550px] w-screen  bg-slate-100">

{/* img */}
    <div className="h-full w-[70%]">
        <img src="./mathandscience.webp" className="h-full" alt="" />
    </div>


    {/* Live Class Button */}
    <div className="flex w-[30%]  justify-start items-center">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 px-5 py-3  rounded-full hover:bg-pink-600 text-white hover:font-medium"
            >
              Attend Live
            </a>
          ) : (
            <p className="text-red-500 font-bold">No latest link for this course</p>
          )}
        </div>

  </div>
        
      </div>
    )
}