
import { useState } from "react";
import { useLocation, useNavigate} from "react-router";



export function VerifyEmail(){
    
    const[code,setCode]=useState("")
    const[ErrorMessage,setErrorMessage]=useState("")
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    
    
    const location=useLocation()
    const email=location.state?.email??""

    async function handleVerifyEmail(){
        setLoading(true)
        try{
            const response=await fetch(
               "http://127.0.0.1:8000/auth/verify_email",
               {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                  
                    code:code,
                }),
                
               }

            );

            const data= await response.json();

            if (!response.ok){
                setErrorMessage(data.detail);
                return; 
            }
            
            
            
        }catch(error){
            console.error(error)

            if(error instanceof Error){
                setErrorMessage(error.message)
            }
           

        }finally{
            setLoading(false);

        }
    }

    async function handleResendCode() {
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
                    })
                },
            );
            const data= await response.json()



            if(!response.ok){
                setErrorMessage(data.detail)
            }
            navigate("/login")

        }catch(error){
            console.error(error)
           if(error instanceof Error){
            setErrorMessage(error.message)
           }
        }finally{
            setLoading(false)
        };
        
    }


    function handleCodeCheck(even:any){
        const value =even.target.value
        if(value.length>5){
        return;
    
    }
    setCode(value)


    }
   

        
        
    return(
       <form onSubmit={(e)=>{
        e.preventDefault();
        handleVerifyEmail();
       }} >
        <div>
            <div>
                <h3>認証コードを入力してください</h3>
                <p>認証コードをメールアドレスに送信しました。{email}</p>
            </div>
             
            <div>
                <input id="code"
                    type="number"
                    value={code} onChange={handleCodeCheck}/>
            </div>

            {ErrorMessage&& <p style={{ color:"red"}}>{ErrorMessage}</p>}


            <div>
                <button type="submit" disabled={loading}>
                    {loading ? "確認中...":"完了"}
                </button>
            </div>
            <div>
                <p>コードが届いていませんか？</p> 
                <a href="#"
                onClick={(e)=>{
                e.preventDefault();
                handleResendCode();
                }}>再送信</a>
            </div>
        </div>
        </form>
    )




    
    }



