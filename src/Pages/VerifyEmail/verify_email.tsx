import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./verify_email.css";

export function VerifyEmail() {
  const [code, setCode] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email ?? "";

  async function handleVerifyEmail() {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/verify_email", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.detail);
        return;
      }
      setTimeout(() => {
        setMessage("確認中.....");
      });
      setTimeout(() => {
        setMessage("登録が完了しました");
      }, 3000);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResendCode() {
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth//resend_otp_email",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.detail);
      }
      setMessage("認証コードを再送信しました");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleCodeCheck(even: any) {
    const value = even.target.value;
    if (value.length > 5) {
      return;
    }
    setCode(value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleVerifyEmail();
      }}
    >
      <h2 className="title-verify">認証コード入力</h2>
      <div>
        <div className="content-type">
          <h3>メールで受信した認証コードを入力してください</h3>
          <p>
            {email}に認証コードを送信しました。5桁の認証コードを入力してください
          </p>
        </div>

        <div>
          <input
            className="input-otp"
            id="code"
            type="number"
            value={code}
            onChange={handleCodeCheck}
          />
        </div>

        {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}
        {message && <p style={{ color: "blue" }}>{message}</p>}

        <div>
          <button className="button-verify" type="submit" disabled={loading}>
            {loading ? "確認中..." : "認証する"}
          </button>
        </div>
        <div>
          <p className="resend-otp">コードが届いていませんか？</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleResendCode();
            }}
          >
            再送信
          </a>
        </div>
      </div>
    </form>
  );
}
