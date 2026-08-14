import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";


export function InputOTP(){
    const[code,setCode]=useState("")
   
    const[ErrorMessage,setErrorMessage]=useState("")
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const location=useLocation()
    const email=location.state?.email??""

    async function handleInputOTP(){
        setLoading(true)


        try{
            const response=await fetch(
                 "http://127.0.0.1:8000/forgot/verify_email_for_forgot_password",
                 {
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                    },
                    body:JSON.stringify({
                       email:email,
                        code:code
                    }),
                    
                 },
                 
            );


            const data =await response.json();
            if(!response.ok){
                setErrorMessage(data.detail);
                return;

            };
            console.log(data.reset_token)


             navigate("/CreateNewPassword",{state:data.reset_token})
             

        }catch(err){
            console.log(err);
            setErrorMessage("サーバーに接続できませんでした")
        }finally{
            setLoading(false)
        }
    }


        async function handleResendOTP(){
            setLoading(true)
            try{
                const response=await fetch(
                    "http://127.0.0.1:8000/auth/resend_otp_email",
                    {
                        method:"POST",
                        headers:{
                            "content-type":"application/json"
                        },
                        body:JSON.stringify({
                            email:email
                        }),
                    }
                    
                );
                navigate("/")
                const data=await response.json();
                if(!response.ok){
                    setErrorMessage(data.detail);
                    return;

                };
            }catch(err){
                console.log(err);
                setErrorMessage("サーバーに接続できませんでした")
            }finally{
                setLoading(false)
            };

        }
    

        return(
            <form onSubmit={(e)=>{
                e.preventDefault();
                handleInputOTP();
            }}>

                <div>
                    <h3>認証コードを入力してください</h3>
                    <p>認証コードをメールアドレスに送信しました。{email}</p>

                </div>
                <div>
                    <label htmlFor="code"></label>
                    <input id="code"
                    type="text"
                    value={code} onChange={(e)=> setCode (e.target.value)}></input>

                </div>
                {ErrorMessage &&<p style={{color:"red"}}>{ErrorMessage}</p>}

                <button type="submit" disabled={loading}>
                    {loading?"確認中。。。":"完了"}
                </button>
                

                <div>
                      <p>コードが届いていませんか？</p> 
                      <a href="#"
                        onClick={(e)=>{
                            e.preventDefault();
                            handleResendOTP();
                        }}>再送信
                      </a>
                </div>







            </form>
        )


    }


       

      
           
            
            
  
            

            
         

    
