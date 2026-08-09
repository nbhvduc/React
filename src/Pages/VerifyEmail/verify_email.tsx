import {  useNavigate } from "react-router";
import { useState } from "react";


export function VerifyEmail(){
    
    const[code,setCode]=useState("")
    const[ErrorMessage,setErrorMessage]=useState("")
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const[email,setEmail]=useState("")

    async function handleVerifyEmail(){
        setLoading(true)
        try{
            const response=await fetch(
               "/auth/verify_email",
               {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    code:code,
                }),
                
               }

            );

            const data= await response.json();

            if (!response.ok){
                setErrorMessage(data.detail);
                return; 
            }
            
            navigate("/")
            
        }catch(error){
            console.log(error)
            setErrorMessage("サーバーに接続できませんでした");

        }finally{
            setLoading(false);

        }
    }

    async function handleResendCode() {
        setLoading(true)

        try{
            const response=await fetch(
                "/auth/resend_otp_email",
                {
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({
                        email:email
                    })
                },
            );
            const data= await response.json()



            if(!response.ok){
                setErrorMessage(data.detail)
            }

        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }

        
        
    return(
        <div>
            <div>
                <h3>認証コードを入力してください</h3>
                <p>///////</p>
            </div>
             <div>
                <input id="email"
                    type="text"
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <input id="code"
                    type="text"
                    value={code} onChange={(e)=>setCode(e.target.value)}/>
            </div>

            {ErrorMessage&& <p style={{ color:"red"}}>{ErrorMessage}</p>}


            <div>
                <button onClick={handleVerifyEmail} disabled={loading}>
                    {loading ? "確認中...":"完了"}
                </button>
            </div>
            <div>
                <p>SNS が届いていませんか？</p> 
                <a href="#"
                onClick={(e)=>{
                e.preventDefault();
                handleResendCode();
                }}>再送信</a>
            </div>
        </div>
    )




    
    }



