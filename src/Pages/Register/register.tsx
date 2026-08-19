import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "./register.css";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [showConfrmPassword, setShowConfirmPassword] = useState("password");

  const navigate = useNavigate();

  async function handleRegister() {
    setLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("パスワードが一致しません");
      setLoading(false);
      return; /// Dừng ngay và không gọi API
    }

    /// Clear lỗi cũ nếu có
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.detail);
        return;
      }
      // dang ky thanh cong, chuyen trang neu muon

      navigate("/verify_email", { state: { email } });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleShowPassword(e: any) {
    e.preventDefault();
    if (showPassword === "text") {
      setShowPassword("password");
    } else {
      setShowPassword("text");
    }
  }
  function handleShowComfirmPassord(e: any) {
    e.preventDefault();
    if (showConfrmPassword === "text") {
      setShowConfirmPassword("password");
    } else {
      setShowConfirmPassword("text");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
    >
      <div>
        <h2 className="title">勤怠管理アプリ</h2>
      </div>
      <div className="register-container">
        <div className="register-box">
          <div className="content-box">
            <div className="content">
              <p>社員登録</p>
            </div>

            <div>
              <div className="mail-css">
                <div className="mail">メール</div>
                <span className="required-tag-email">*必須 </span>
              </div>

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
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-css">
              <div className="password">パスワード</div>
              <span className="required-tag-password">*必須</span>
            </div>
            <div className="password-container">
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
              <div className="button-container">
                <button
                  className="button-show-password"
                  onClick={handleShowPassword}
                >
                  パスワードを表示する
                </button>
              </div>
            </div>
            <div className="confirm-password-css">
              <div className="confirm-password">パスワード確認</div>
              <span className="required-tag-confirm-password">*必須</span>
            </div>
            <input
              className="input-content-confirm-password"
              id="confirm-password"
              type={showConfrmPassword}
              placeholder="パスワード確認"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "パスワード確認")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="button-container">
              <button
                className="button-show-confirm-password"
                onClick={handleShowComfirmPassord}
              >
                パスワードを表示する
              </button>
            </div>
          </div>

          {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}

          <div>
            <button
              className="button-register"
              type="submit"
              disabled={loading}
            >
              {loading ? "登録処理... " : "会員登録"}
            </button>
          </div>

          <div>
            <Link to="/login">ログイン</Link>
          </div>
        </div>
      </div>
    </form>
  );
}
