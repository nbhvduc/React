import { useState } from "react";
import { useNavigate, Link } from "react-router";

export function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const[confirmPassword,setConfirmPassword]=useState("")
    const[ErrorMessage,setErrorMessage]=useState("")
    const [showPassword,setShowPassword]=useState("password")
    const[showConfrmPassword,setShowConfirmPassword]=useState("password")
  
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
                "/auth/register",
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
           
            navigate('/verify_email')

        } catch (err) {
            console.error(err);
            setErrorMessage("サーバーに接続できませんでした");

        } finally {
            setLoading(false);

        }
    }

        function handleShowPassword(){
            if (showPassword==="password"){
                setShowPassword("text")

            }else {
                setShowPassword("password")
            }
        }

        function handleShowConfrmPassword(){
            if (showConfrmPassword==="password"){
                setShowConfirmPassword("text")
            }else{
                setShowConfirmPassword("password")
            }
        }
    
    

    return (
        <div>
            <div>
                <h2>勤怠管理アプリ</h2>
                <p>社員登録</p>
            </div>

            <div>
                <label htmlFor="email">メール</label>
                <input id="email"
                    type="text"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
                <label htmlFor="password">パスワード</label>
                <input id="password"
                    type={showPassword}
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                     <button onClick={handleShowPassword}>パスワードを表示</button>


            </div> 

            <div>   
                <label htmlFor="confirm-password">パスワード確認</label>
                <input id="confirm-password"
                type={showConfrmPassword}
                value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                 <button onClick={handleShowConfrmPassword}>パスワードを表示</button>
            </div>
            
            {ErrorMessage&& <p style={{color:"red"}}>{ErrorMessage}</p>}

            <div>
                <button onClick={handleRegister} disabled={loading}>
                    {loading ? "登録処理... " : "会員登録"}</button>
            </div>    
                

            <div>

                <Link to="/login">ログイン</Link>
            </div>
        </div>
    )
}

