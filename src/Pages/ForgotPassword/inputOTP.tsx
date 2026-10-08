import {
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import "./inputOTP.css";

const OTP_LENGTH = 5;

export function InputOTP() {
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ?? "";
  const enteredCode = code.join("");

  async function handleInputOTP() {
    if (enteredCode.length !== OTP_LENGTH) {
      setErrorMessage("5桁の認証コードを入力してください");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/forgot/verify_email_for_forgot_password",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            code: enteredCode,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.detail ?? "認証に失敗しました");
        return;
      }

      navigate("/CreateNewPassword", { state: data.reset_token });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOTP() {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/forgot/forgotpasswordresendOTP",
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
      console.log(data);
      if (!response.ok) {
        setErrorMessage(data.detail);
        return;
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function fillCode(value: string, startIndex: number) {
    const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH - startIndex);
    if (!digits) {
      return;
    }

    setCode((currentCode) => {
      const nextCode = [...currentCode];
      digits.split("").forEach((digit, index) => {
        nextCode[startIndex + index] = digit;
      });
      return nextCode;
    });
    setErrorMessage("");

    const nextInputIndex = Math.min(startIndex + digits.length, OTP_LENGTH - 1);
    inputRefs.current[nextInputIndex]?.focus();
  }

  function handleCodeChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const value = event.target.value;
    if (!value) {
      setCode((currentCode) =>
        currentCode.map((digit, digitIndex) =>
          digitIndex === index ? "" : digit,
        ),
      );
      setErrorMessage("");
      return;
    }

    fillCode(value, index);
  }

  function handleCodeKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleCodePaste(event: ClipboardEvent<HTMLInputElement>, index: number) {
    event.preventDefault();
    fillCode(event.clipboardData.getData("text"), index);
  }

  return (
    <form
      className="otp-page"
      onSubmit={(e) => {
        e.preventDefault();
        handleInputOTP();
      }}
    >
      <h2>認証コード入力</h2>
      <div className="content-type-input">
        <h3>メールで受信した認証コードを入力してください</h3>
        <p>
          {email}に認証コードを送信しました。{OTP_LENGTH}桁の認証コードを入力してください
        </p>
      </div>
      <div className="otp-inputs" role="group" aria-label="認証コード">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            className="input-OTP"
            aria-label={`${index + 1}桁目`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={OTP_LENGTH}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            value={digit}
            onChange={(event) => handleCodeChange(event, index)}
            onKeyDown={(event) => handleCodeKeyDown(event, index)}
            onPaste={(event) => handleCodePaste(event, index)}
          />
        ))}
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button
        className="button-input-otp"
        type="submit"
        disabled={loading || enteredCode.length !== OTP_LENGTH}
      >
        {loading ? "確認中。。。" : "完了"}
      </button>

      <div className="resend-OTP-container">
        <p className="resend-OTP">コードが届いていませんか？</p>
        <button type="button" onClick={handleResendOTP} disabled={loading}>
          再送信
        </button>
      </div>
    </form>
  );
}
