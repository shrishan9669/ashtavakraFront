import axios from "axios";
import { useState } from "react"
import Loader from "../components/loader";

export default function Admin(){
    const [link,setLink] = useState('');

    const [msg,setMsg] = useState('')
    const [data,setData] = useState([])

    async function Getpending(){
        setLoading1(true)
        try{
              const res = await axios({
                url:'http://localhost:3000/user/getpending',
                method:'GET'
              })

              console.log(res.data)
              if(res.data && res.data.all){
                   setData(res.data.all)
              }
        } 
        catch(err){
            console.log(err)
        }
        finally{
            setLoading1(false)
        }
    }

    const[loading,setLoading] = useState(false);
     const[loading1,setLoading1] = useState(false);

    
     const [loadingobj,setLoadingObj]  = useState<Record <string,boolean>>({});

     return <div className="p-5">
        {/* pasting latest class link */}

        <div className="flex w-full px-10">
            {/*  */}
            <div className="flex bg-blue-200 justify-center items-center w-[40%]">
                <h1 className="text-3xl font-medium">Paste the link for Latest class</h1>
            </div>
            {/* form type with options */}
              <div className="w-[60%] gap-5 flex flex-col p-4 bg-slate-100">
                <div className="flex flex-col">
                    <span className="font-medium">Select course:</span>
                    <select name="" id="" className="border border-slate-700 rounded-full p-2 font-medium">
                    <option value="">Select..</option>
                    <option value="Maths class">Maths class</option>
                    <option value="Maths class">Science class</option>
                    <option value="Maths class">Sst class</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="font-medium" htmlFor="link">Class link:</label>
                    <input onChange={(e)=> setLink(e.target.value)} type="text"  className="outline-0 p-2 border border-slate-700 rounded-full" />
                </div>
   


                 <div className="flex justify-center">
                    <button onClick={async()=>{
                        if(!link){
                            alert("Link field is required!!");
                            return ;
                        }
                        setLoading(true);
                        try{
                           const res = await axios({
                            url:'http://localhost:3000/user/linkpasting',
                            data:{
                                link:link
                            },
                            method:'POST'
                           })
                           if(res.data && res.data.success){
                            console.log(res.data);
                            setMsg(res.data.message);
                           }
                        }
                        catch(err){
                            console.log(err);
                        }
                        finally{
                            setLoading(false);
                        }
                    }} className={`px-3 py-2 hover:font-medium transition-all duration-300 cursor-pointer bg-green-400 rounded-full text-white hover:bg-green-600 ${loading ? 'bg-slate-100 hover:bg-slate-100':''}`}>{loading ? <Loader/>:"Paste link"}</button>
                 </div>
               

                <span className="flex justify-center font-medium text-pink-700 animate-bounce">{msg}</span>



              </div>
        </div>

        {/* Varification panel */}
        <div className="py-10">
            <div className="flex gap-4 items-center">
                <span>See who made Purchase {"->"}</span>
                <button onClick={Getpending} className="px-3 py-2 hover:bg-blue-600 rounded-full cursor-pointer bg-blue-400 text-white font-medium">{loading1 ? <Loader/>:'Purchases'}</button>
            </div>

            <div className="py-5 flex flex-col gap-6">
            { data.length > 0 &&

            data.map((e:any)=>{
                return <div className="flex gap-20 items-center">
                    <span className="font-medium">{"Name :  " + e.name}</span>
                    <span className="font-medium">{"Number : " + e.number}</span>
                    <span className="font-medium">{"TransactionId : " + e.purchaseid}</span>
                    <button
                    onClick={async()=>{
                         setLoadingObj((prev:any)=> ({...prev,[e.id]:true}))
                        try{
                                await axios({
                                url:`http://localhost:3000/user/varifytrue?id=${e.id}`,
                                method:'PUT'
                               })

                        }
                        catch(err){
                           console.log(err)
                        }
                        finally{
                            setLoadingObj((prev:any)=> ({...prev,[e.id]:false}))
                        }
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-pink-600 bg-pink-500 rounded-full text-white">{loadingobj[e.id] ? <Loader/>:'Verify'}</button>
                </div>
            })
            }
            </div>
            
        </div>

    </div>
}