import { useState } from "react";
import "./login.css"

export function Login() {
  const [userCode, setUserCode] = useState("")
  const [password, setPassword] = useState("")


  async function handleLogin() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_code: userCode,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      // chuyen qua trang login
    } catch (err) {
      console.log(err);

    } finally {
      // finally là chỗ sẽ luôn chạy dù gọi API thành công hay lỗi
    }
  }

  return (
    <div className="login_page">
      <div className="login_card">
        <h1 >勤怠管理</h1>
        <p className="login">ログイン</p>

        <label className="usercode">社員コード</label>
        <input type="text" value={userCode} onChange={(e) => setUserCode(e.target.value)}
          placeholder="例:A001" />

        <label className="password"> パスワード</label>

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="例:・・・・・・" />

        <a className="forgot_password" href="forgot_password">忘れた方</a>

        <button className="btn_login" onClick={handleLogin}>ログイン</button>


        <a className="create_account" href="create_account">アカウント作成</a>




      </div>

    </div>
  )
}

