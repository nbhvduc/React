import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import "./login.css";
import { useUser } from "../../context/userProvider";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useUser();

  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    if (!email || !password) {
      setErrorMessage("メールとパスワードを入力してください");
      setLoading(false);
      return;
    }

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
        setLoading(false);
        return;
      }

      localStorage.setItem("jwt", data.access_token);

      const loggedInUser = {
        id: data.id ?? 0,
        email: data.email ?? email,
        role: data.role === "admin" ? "admin" : "user",
        name: data.name ?? data.username ?? email,
        employee_code: data.employee_code ?? "",
        is_active: data.is_active ?? true,
      } as const;

      const userResponse = await fetch(
        "http://127.0.0.1:8000/users/get_employee",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      );

      const userData = await userResponse.json();

      setUser(userResponse.ok ? userData : loggedInUser);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
    }
  }

  function handleShowPassword(e: any) {
    setShowPassword(e.target.checked);
  }

  return (
    <form
      className="login-page"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="login-container">
        <div className="login-box">
          <div className="content-box">
            <div>
              <h2 className="title">勤怠管理システム</h2>
            </div>
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
                type={showPassword ? "text" : "password"}
                placeholder="パスワードを入力してください"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "パスワードを入力してください")
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="check-box-password-login">
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={handleShowPassword}
                  />
                  パスワードを表示する
                </label>
              </div>
            </div>

            {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}

            <button className="button-login" type="submit" disabled={loading}>
              {loading ? "ログイン..." : "ログイン"}
            </button>

            <div className="link-forgot-password">
              <Link to={"/forgotPassword"}>パスワードを忘れた方</Link>
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
