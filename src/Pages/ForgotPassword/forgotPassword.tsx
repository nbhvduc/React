import { useState } from "react"
import {   useNavigate } from "react-router"




export function ForgotPasswordPage(){
    const[email,setEmail]=useState("")
    const[code,setCode]=useState("")
    const[ErrorMessage,setErrorMessage]=useState("")
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()


    async function hanldeForgotPasswordEmail() {
        setLoading(true)


        try{
            const response=await fetch(
                "http://127.0.0.1:8000/forgot/forgot_password",
                {
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                
                    },
                    body:JSON.stringify({
                        email:email,
                        code:code

                    }),
                    

                }

            );
            const data = await response.json();
            if(!response.ok){
                
                setErrorMessage(data.detail);
                return;

            }
            navigate("/inputOTP",{state:{email}})
            
        }catch(error){
         console.error(error)
         if(error instanceof Error){
            setErrorMessage(error.message)
         }
        }finally{
            setLoading(false)

        };
            
    }

   
    
    return(
        
        <form onSubmit={(e)=>{
            e.preventDefault();
            hanldeForgotPasswordEmail();
            }}>
            <div>
                <div>
                   <p>メールを入力してください</p>
                   <label htmlFor="email"></label>
                    <input id="email"
                    type="text"
                    placeholder="yamada@example.com"
                    onFocus={(e)=>e.target.placeholder=""}
                    onBlur={(e)=>e.target.placeholder="yamada@example.com"}
                    name="email"
                    autoComplete="email"
                    
                    value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                </div>

             
              {ErrorMessage && <p style={{color:"red"}}>{ErrorMessage}</p>}



                <div>
                    <button type="submit" disabled={loading}> {loading ? "確認中...":"完了"}</button>
                </div>

            </div>
        </form>
    )
   
}
