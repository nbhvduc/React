import { useState } from "react";
import { Link } from "react-router-dom";

export function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


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
            try {
                const data = await response.json();
                console.log(data);


            } catch (err) {
                console.log(err)

            }

        } catch (err) {
            console.error(err);

        } finally {
            setLoading(false);

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
                    type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div>

                <button onClick={handleRegister} disabled={loading}>
                    {loading ? "登録処理... " : "会員登録"}</button>

                <Link to="/login">ログイン</Link>

            </div>






        </div>
    )
}





