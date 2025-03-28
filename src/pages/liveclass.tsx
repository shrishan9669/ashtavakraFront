import axios from "axios"
import { useEffect, useState } from "react"
import Live from "../components/live"

export default function Liveclass({userid,classid}:any){

    const [role,setRole] = useState('')

    async function Role(){
        try{
            const res = await axios({
                url:"http://localhost:3000/admin/join-class",
                method:'POST',
                data:{
                    userid,classid
                }
            })
            if(res.data && res.data.role){
                setRole(res.data.role)
            }
        }
        catch(err){
            console.error('Error fetching role:', err);
        }
    }
    useEffect(()=>{
        Role()
    },[])
    
    if(!role){
        return <div>Loading..</div>
    }
    return (
        <div>
            {
                role==='host' ? 
                <Live channelName={'mathsclass'} uid={'12345'} role="host"/>
                :
                <Live channelName={'mathsclass'} uid={'67890'} role="audience"/>
            }
        </div>
    )
}