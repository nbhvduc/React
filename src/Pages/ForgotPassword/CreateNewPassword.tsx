import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import "./CreateNewPassword.css";

export function CreateNewPassword() {
  const [newpassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState("password");
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState("password");

  const hasEnoughCharacters = newpassword.length >= 6
  const hasLetter = /[a-zA-Z]/.test(newpassword);
  const hasNumber = /[0-9]/.test(newpassword)

  const Location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const reset_token = Location.state;
  console.log(Location.state);
  console.log(reset_token);

  async function handleCreateNewPassword() {
    setLoading(true);

    if (newpassword != confirmNewPassword) {
      setErrorMessage("パスワード一致しません");
      setLoading(false);
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/forgot/create_new_password",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            new_password: newpassword,
            confirm_password: confirmNewPassword,
            reset_token_password: reset_token,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.detail);
        return;
      }
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleShowNewPassword(e: any) {
    e.preventDefault();
    if (showNewPassword === "text") {
      setShowNewPassword("password");
    } else {
      setShowNewPassword("text");
    }
  }

  function handleShowComfirmNewPassord(e: any) {
    e.preventDefault();
    if (showConfirmNewPassword === "text") {
      setShowConfirmNewPassword("password");
    } else {
      setShowConfirmNewPassword("text");
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateNewPassword();
      }}
    >
      <h2 className="title">勤怠管理アプリ</h2>
      <div className="create-password-box">
        <div className="content-box">
          <div>
            <h2>パスワード再設定</h2>
          </div>
          <div>
            <div>新しいパスワード</div>
            <input
              id="newpassword"
              type={showNewPassword}
              placeholder="新しいパスワード入力してください"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder = "新しいパスワード入力してください")
              }
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div>
              <button onClick={handleShowNewPassword}>
                パスワードを表示する
              </button>
            </div>
          </div>

          {/**     
           "" => false, newpassword-> "" -> false
          "223" => true, newpassword -> "334" -> true, hasEnoughCharacters -> false, !hasEnoughCharacters -> true
          /}

          {/** show lỗi nhập password */}
          <div>
            {newpassword && !hasEnoughCharacters && <p style={{ color: "red" }}>Mật khẩu phải có ít nhất 6 ký tự</p>}
            {newpassword && !hasLetter && <p style={{ color: "red" }}>Mật khẩu phải có ít nhất 1 ký tự là chữ</p>}
            {newpassword && !hasNumber && <p style={{ color: "red" }}>Mật khẩu phải có ít nhất 1 ký tự là số</p>}
          </div>

          <div>
            <div>新しいパスワード確認</div>
            <input
              id="confirm-password"
              type={showConfirmNewPassword}
              value={confirmNewPassword}
              placeholder="もう一度入力してください"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder = "もう一度入力してください")
              }
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          <div>
            <button onClick={handleShowComfirmNewPassord}>
              パスワードを表示する
            </button>
          </div>

          {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}

          <div>
            <p>Mat khau phai co it nhất 6 ký tự, và gồm số và chữ</p>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "確認中..." : "完了"}
          </button>
        </div>
      </div>
    </form>
  );
}
