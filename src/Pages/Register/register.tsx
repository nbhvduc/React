import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye,EyeOff } from "lucide-react";

export function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const[confirmPassword,setConfirmPassword]=useState("")
    const[ErrorMessage,setErrorMessage]=useState("")
    const [showPassword,setShowPassword]=useState(false)
    const[showConfrmPassword,setShowConfirmPassword]=useState(false)
  
    const navigate = useNavigate()

    
    async function handleRegister() {
        setLoading(true);

        if (password!==confirmPassword){
        setErrorMessage("パスワードが一致しません");
        setLoading(false)
        return; /// Dừng ngay và không gọi API
        }

        

        /// Clear lỗi cũ nếu có
        setErrorMessage("")


        try {
            const response = await fetch(
                "http://127.0.0.1:8000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        
                        email: email,
                        password: password,
                        confirm_password:confirmPassword

                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
               setErrorMessage(data.detail);
               return;
            }
            // dang ky thanh cong, chuyen trang neu muon
           
            navigate('/verify_email',{state:{email}})

        } catch (error) {
            console.error(error)
           if(error instanceof Error){
            setErrorMessage(error.message)
           }

        } finally {
            setLoading(false);

        }
    }

        
    
    

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleRegister();
        }}>
        <div >
            <div>
                <h2>勤怠管理アプリ</h2>
                <p>社員登録</p>
            </div>

            <div>
                <label htmlFor="email">メール</label>
                <input id="email"
                    type="text"
                    placeholder="yamada@example.com"
                    onFocus={(e)=>e.target.placeholder=""}
                    onBlur={(e)=>e.target.placeholder="yamada@example.com"}
                    name="email"
                    autoComplete="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div style={{position:"relative",flexDirection:"column",display:"inline-block"}}>
                <label htmlFor="password">パスワード</label>
                <input id="password"
                    type={showPassword? "text":"password"}
                    placeholder="......"
                    onFocus={(e)=>e.target.placeholder=""}
                    onBlur={(e)=>e.target.placeholder="......"}
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                    < button 
                    type="button" 
                    onClick={()=>setShowPassword((prev)=>!prev)}
                    style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)"}}>
                        {showPassword?<Eye size={8}/>:<EyeOff size={8}/>}
                    </button>
                    
                   
                    


            </div> 

            <div style={{position:"relative",display:"inline-block",flexDirection:"column"}}>   
                <label htmlFor="confirm-password">パスワード確認</label>
                <input id="confirm-password"
                type={showConfrmPassword?"text":"password"}
                   placeholder="......"
                    onFocus={(e)=>e.target.placeholder=""}
                    onBlur={(e)=>e.target.placeholder="......"}
                    value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <button 
                    type="button"
                    onClick={()=>setShowConfirmPassword((prev)=>!prev)}
                    style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)"}}>
                        {showConfrmPassword?<Eye size={8}/>:<EyeOff size={8}/>}
                    </button>
            </div>
            
            {ErrorMessage&& <p style={{color:"red"}}>{ErrorMessage}</p>}

            <div>
                <button type="submit" disabled={loading}>
                    {loading ? "登録処理... " : "会員登録"}</button>
            </div>    
                

            <div>

                <Link to="/login">ログイン</Link>
            </div>
        </div>
        </form>
    )
    
}

