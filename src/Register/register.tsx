import { useState } from "react";
import { useNavigate, Link } from "react-router";

export function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [inputPasswordType, setInputPasswordType] = useState('password')
    const navigate = useNavigate()

    async function handleRegister() {
        setLoading(true);

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
                        password: password

                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to register user')
            }

            // dang ky thanh cong, chuyen trang neu muon
            const data = await response.json();
            navigate('/login')

        } catch (err) {
            console.error(err);

        } finally {
            setLoading(false);

        }
    }


    function handleShowHidePassword() {
        // chuyen cai type cho input (input password)
        if (inputPasswordType === 'password') {
            setInputPasswordType("text")
        } else {
            setInputPasswordType("password")
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
                type={inputPasswordType}
                value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleShowHidePassword}>show/hide password</button>
            </div>
            
            <button onClick={handleRegister} disabled={loading}>
                {loading ? "登録処理... " : "会員登録"}</button>

            <Link to="/login">ログイン</Link>

        </div>
    )
}





