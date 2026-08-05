import { useState } from "react";
import { Link } from "react-router";

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleLogin() {
        setLoading(true);

        try {
            const response = await fetch(
                "/auth/login",
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
                throw new Error("Failed to fetch user")
            };
            const data = await response.json();
            console.log(data.message)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        };
    }

    return (
        <div>
            <div>
                <h1>勤怠管理アプリ</h1>
                <p>ログイン</p>
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
                    type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
               
            </div>

            <button onClick={handleLogin} disabled={loading}>
                {loading ? "ログイン..." : "ログイン"}
            </button>

            <div>
                <Link to="/forgot-password">パスワードを忘れた方</Link>
            </div>

            <div>
                <Link to={"/register"}>Register</Link>
            </div>

        </div>
    )
}

