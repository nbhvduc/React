import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import "./login.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.detail);
        return;
      }

      // navigate
      navigate("/useEffect");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleShowPassword() {
    if (showPassword === "text") {
      setShowPassword("password");
    } else {
      setShowPassword("text");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div>
        <h2 className="title">勤怠管理アプリ</h2>
      </div>
      <div className="login-container">
        <div className="login-box">
          <div className="content-box">
            <div>
              <p className="content">ログイン</p>
            </div>
            <div>
              <div className="mail">メール</div>
              <input
                className="input-content-mail"
                id="email"
                type="text"
                placeholder="メールを入力してください"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "メールを入力してください")
                }
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="password">パスワード</div>
              <input
                className="input-content-password"
                id="password"
                type={showPassword}
                placeholder="パスワードを入力してください"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "パスワードを入力してください")
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="button-show-password">
                <button onClick={handleShowPassword}>
                  パスワードを表示する
                </button>
              </div>
            </div>

            {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}

            <button className="button-login" type="submit" disabled={loading}>
              {loading ? "ログイン..." : "ログイン"}
            </button>

            <div className="link-forgot-password">
              <Link to="/forgot-password">パスワードを忘れた方</Link>
            </div>

            <div className="link-register">
              <Link to={"/register"}>社員登録</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
