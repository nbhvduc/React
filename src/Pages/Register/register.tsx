import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "./register.css";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrmPassword, setShowConfirmPassword] = useState(false);

  const hasEnoughCharacters = password.length < 8 || password.length > 20;
  const hasLesster = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpace = /\s/.test(password);

  const navigate = useNavigate();

  async function handleRegister() {
    setLoading(true);
    if (!email || !password) {
      setErrorMessage("メールとパスワードを入力してください");
      setLoading(false);
      return;
    }

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
    setShowPassword(e.target.checked);
  }
  function handleShowComfirmPassord(e: any) {
    setShowConfirmPassword(e.target.checked);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
    >
      <div className="register-container">
        <div className="register-box">
          <div className="content-box">
            <div>
              <h3 className="title">勤怠管理アプリ</h3>
            </div>
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
                type={showPassword ? "text" : "password"}
                placeholder="パスワードを入力してください"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "パスワードを入力してください")
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="check-password">
                {password && hasEnoughCharacters && (
                  <p style={{ color: "red" }}>
                    *8文字以上20文字以内で入力してください。
                  </p>
                )}
                {password && !hasLesster && (
                  <p style={{ color: "red" }}>
                    *英字を1文字以上含めてください。
                  </p>
                )}
                {password && !hasNumber && (
                  <p style={{ color: "red" }}>
                    *数字を1文字以上含めてください。
                  </p>
                )}
                {password && hasSpace && (
                  <p style={{ color: "red" }}>スペースは使用できません。</p>
                )}
              </div>

              <div>
                <label className="checkbox-password">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={handleShowPassword}
                  />
                  パスワードを表示する
                </label>
              </div>
              <div className="confirm-password-css">
                <div className="confirm-password">パスワード確認</div>
                <span className="required-tag-confirm-password">*必須</span>
              </div>
              <input
                className="input-content-confirm-password"
                id="confirm-password"
                type={showConfrmPassword ? "text" : "password"}
                placeholder="パスワード確認"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "パスワード確認")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className=" checkbox-confirm-password">
                <label>
                  <input
                    type="checkbox"
                    checked={showConfrmPassword}
                    onChange={handleShowComfirmPassord}
                  />
                  パスワードを表示する
                </label>
              </div>
            </div>

            {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}

            <div>
              <Link to="/login">ログイン</Link>
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
              <span className="plain-text">アカウントをお持ちですか？</span>
              <Link to="/login">ログイン</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
