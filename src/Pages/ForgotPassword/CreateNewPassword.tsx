import { useState } from "react";
import {  useNavigate } from "react-router";
import { Eye,EyeOff } from "lucide-react";
import { useLocation } from "react-router";

export function CreateNewPassword(){
    const[newpassword,setNewPassword]=useState("")
    const[confirmNewPassword,setConfirmNewPassword]=useState("")
    const[ErrorMessage,setErrorMessage]=useState("")
    const[showNewPassword,setShowNewPassword]=useState(false)
    const[showConfirmNewPassword,setShowConfirmNewPassword]=useState(false)

    const Location=useLocation()
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const reset_token=Location.state
    console.log(Location.state)
    console.log(reset_token)

    async function handleCreateNewPassword(){
        setLoading(true)



        if(newpassword!=confirmNewPassword){
            setErrorMessage("パスワード一致しません")
            setLoading(false)
            return;
        }

        setErrorMessage("")

        try{
            const response=await fetch(
                "http://127.0.0.1:8000/forgot/create_new_password",
                {
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                    },
                    body:JSON.stringify({
                        new_password:newpassword,
                        confirm_password:confirmNewPassword,
                        reset_token_password:reset_token

                    }),
                }
            );
            const data= await response.json();
            if(!response.ok){
                setErrorMessage(data.detail);
                return;

            };
            navigate("/login")
        }catch(err){
            console.log(err);
            setErrorMessage("サーバーに接続できませんでした")
        }finally{
            setLoading(false)
        }

        


    };
    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleCreateNewPassword();
        }}>


            <div>
                <div>
                    <h2>パスワード再設定</h2>
                </div>
                <div>
                    <label htmlFor="newpassword"></label>
                    <input id="newpassword"
                    type={showNewPassword?"text":"password"}
                    placeholder="....."
                    onFocus={(e)=>e.target.placeholder=""}
                    onBlur={(e)=>e.target.placeholder="....."}
                    value={newpassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                    < button 
                    type="button"
                    onClick={()=>setShowNewPassword((prev)=>!prev)}
                    style={{position:"relative",right:8,top:"50%",}}>
                        {showNewPassword?<Eye size={8}/>:<EyeOff size={8}/>}
                    </button>

                </div>

                <div>
                    <label htmlFor="confirm-password"></label>
                    <input 
                    id="confirm-password"
                    type={showConfirmNewPassword?"text":"password"}
                    value={confirmNewPassword} onChange={(e)=>setConfirmNewPassword(e.target.value)}/>
                    < button 
                    type="button"
                    onClick={()=>setShowConfirmNewPassword((prev)=>!prev)}
                    style={{position:"relative",right:8,top:"50%"}}>
                        {showConfirmNewPassword?<Eye size={8}/>:<EyeOff size={8}/>}
                    </button>
                    
                </div>

                {ErrorMessage && <p style={{color:"red"}}>{ErrorMessage}</p>}

                <button 
                type="submit" disabled={loading}>
                    {loading?"確認中...":"完了"}
                </button>

                
            </div>








        </form>
       



    )

    
}