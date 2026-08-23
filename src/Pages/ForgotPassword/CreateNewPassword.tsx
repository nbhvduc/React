import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import "./CreateNewPassword.css";

export function CreateNewPassword() {
  const [newpassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

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
    setShowNewPassword(e.target.checked);
  }

  function handleShowComfirmNewPassord(e: any) {
    setShowConfirmNewPassword(e.target.checked);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateNewPassword();
      }}
    >
      <h2 className="title-new-password">勤怠管理アプリ</h2>
      <div className="create-password-box">
        <div className="content-box">
          <div>
            <h2>パスワード再設定</h2>
          </div>
          <div>
            <div>新しいパスワード</div>
            <input
              id="newpassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="新しいパスワード入力してください"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder = "新しいパスワード入力してください")
              }
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={showNewPassword}
                  onChange={handleShowNewPassword}
                />
                パスワードを表示する
              </label>
            </div>
          </div>

          <div>
            <div>新しいパスワード確認</div>
            <input
              id="confirm-password"
              type={showConfirmNewPassword ? "text" : "password"}
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
            <label>
              <input
                type="checkbox"
                checked={showConfirmNewPassword}
                onChange={handleShowComfirmNewPassord}
              />
              パスワードを表示する
            </label>
          </div>

          {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "確認中..." : "完了"}
          </button>
        </div>
      </div>
    </form>
  );
}
