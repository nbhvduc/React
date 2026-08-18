import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react" 

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const[ErrorMessage,setErrorMessage]=useState("")
    const[showPassword,setShowPassword]=useState(false)
    const navigate=useNavigate()


    async function handleLogin() {  
        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),

                }
            );

             const data = await response.json();


            if (!response.ok) {
                setErrorMessage(data.detail);
                return;
                
            };

            // navigate
            navigate("/Menu")
           

        } catch (error) {
           console.error(error)
           if(error instanceof Error){
            setErrorMessage(error.message)
           }
        } finally {
            setLoading(false)
        };
    }

   
    

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleLogin();
        }}>
        <div>
            <div>
                <h1>勤怠管理アプリ</h1>
                <p>ログイン</p>
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
            <div style={{position:"relative",display:"inline-block"}}>
                <label htmlFor="password">パスワード</label>
                <input id="password"
                    type={showPassword?"text":"password"}
                    placeholder="........"
                    onFocus={(e)=>e.target.placeholder=""}
                    onBlur={(e)=>e.target.placeholder="......."}
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button 
                    type="button"
                    onClick={()=>setShowPassword((prev)=>!prev)}
                    style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)"}}>
                        {showPassword ?<EyeOff size={8}/>:<Eye size={8}/>}
                    </button>
               
            </div> 

            {ErrorMessage && <p style={{color:"red"}}>{ErrorMessage}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "ログイン..." : "ログイン"}
            </button>

            <div>
                <Link to="/forgot-password">パスワードを忘れた方</Link>
            </div>

            <div>
                <Link to={"/register"}>社員登録</Link>
            </div>

        </div>
        </form>
    )
}

