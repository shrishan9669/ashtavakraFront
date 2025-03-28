import axios from "axios";
import { useState } from "react"
import Loader from "../components/loader";

export default function PaymentConfirm(){

    

   

    const[name,setName] = useState('');
    const[number,setNumber] = useState('');
    const[transactionid,setId] = useState('');
    const [msg,setMsg] = useState('');
    const [image,setImage] = useState(String || null)
    const[file,setFile] = useState(null)
    const [loading,setLoading] = useState(false)

    function handleFileChange(e:any){
        const file = e.target.files[0];
        if(file){
            console.log(URL.createObjectURL(file));
            setImage(URL.createObjectURL(file));
            setFile(file)
        }
    }

   async function Makepurchase(){
    try{
       const make = await axios({
        url:'http://localhost:3000/user/addpurchase',
        data:{
            name:name,number:number,transactionid:transactionid
        },
        method:'POST'
       })
       if(make.data && make.data.msg){
            setMsg(make.data.msg);
       }
    }
    catch(err){
        console.log(err)
    }
   }

   async function Handlefileupload(){
    const data = new FormData();
    data.append('name',name);
    data.append('number',number);
    data.append('transactionid',transactionid);
    data.append('screenshot',file || "")
     console.log("The image is here-> " + file);
    try{
       await axios({
        url:"http://localhost:3000/user/sendMail",
        headers:{
            "Content-Type": "multipart/form-data"
        },
        data:data,
        method:'POST'
      })
      
    }
    catch(err){
        console.log(err)
    }
   }

    return  <div className="flex flex-col justify-center items-center p-4">
    {/* Form */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium">Name:</label>
        <input onChange={(e)=> setName(e.target.value)} type="text" className="border p-2 w-full rounded" />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label htmlFor="number" className="block font-medium">Phone Number:</label>
        <input onChange={(e)=> setNumber(e.target.value)} type="text" className="border p-2 w-full rounded" />
      </div>

      {/* Transaction ID */}
      <div className="mb-4">
        <label htmlFor="transactionid" className="block font-medium">Transaction ID:</label>
        <input onChange={(e)=> setId(e.target.value)} type="text" className="border p-2 w-full rounded" />
      </div>

      {/* Screenshot Upload */}
      <div className="mb-4">
        <label htmlFor="screenshot" className="block font-medium">Upload Screenshot:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 w-full rounded" />
      </div>

      {/* Image Preview */}
      {image && (
        <div className="mb-4">
          <p className="font-medium">Preview:</p>
          <img src={image} alt="Screenshot Preview" className="w-40 h-40 object-contain border p-1 rounded" />
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
      <button
      onClick={()=>{
        if(!name || !number || !transactionid || !image){
            alert("All fields are required!!");
            return ;
        }
        setLoading(true)
        try{
            Makepurchase();
            Handlefileupload();
        }
        catch(err){
              console.log(err)
        }
        finally{
            setLoading(false)
        }
       
      }}
      className="bg-blue-500   text-white w-full  py-2 rounded-full cursor-pointer hover:bg-blue-600">
        {loading ? <Loader/>:"Submit"}
      </button>
      </div>
     

      {/* msg */}
      <span className="flex mt-4 justify-center  max-w-[400px] text-center text-pink-600 font-medium">{msg}</span>
    </div>
  </div>
}