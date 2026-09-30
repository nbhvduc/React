import { useState } from "react";
import "./ChangePassword.css";

export function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confrimNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const hasEnoughCharacters = newPassword.length < 8 || newPassword.length > 20;
  const hasLesster = /[a-zA-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpace = /[\s]/.test(newPassword);

  const token = localStorage.getItem("jwt");

  async function handleChangePassword() {
    setLoading(true);

    if (!oldPassword || !confrimNewPassword || !newPassword) {
      setErrorMessage(
        "現在パスワード、新しいパスワード、または確認用パスワードを入力してください。",
      );
      setLoading(false);
      return;
    }
    if (newPassword != confrimNewPassword) {
      setErrorMessage("パスワードが一致しません");
      setLoading(false);
      return;
    }
    setErrorMessage("");
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/ChangePassword/ChangePassword",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_passowrd: newPassword,
            confrim_new_password: confrimNewPassword,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setErrorMessage(data.detail[0].msg);
        } else {
          setErrorMessage(data.detail);
        }
        return;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleShowOldPassword(e: any) {
    setShowOldPassword(e.target.checked);
  }
  function handleShowNewPassword(e: any) {
    setShowNewPassword(e.target.checked);
  }
  function handleShowConfirmNewPassword(e: any) {
    setShowConfirmNewPassword(e.target.checked);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleChangePassword();
      }}
    >
      <div>
        <div className="title-changePassword">
          <h2>パスワードの変更</h2>
        </div>
      </div>
      <div className="container-changePassword">
        <div className="Password">
          <div>現在のパスワード</div>
          <span style={{ color: "red" }}>*必須</span>
        </div>
        <div className="Password-content">
          <input
            className="input-Password"
            id="oldPassword"
            type={showOldPassword ? "text" : "password"}
            placeholder="パスワードを入力してください"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = "パスワードを入力してください")
            }
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <div>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                checked={showOldPassword}
                onChange={handleShowOldPassword}
              />
              パスワードを表示する
            </label>
          </div>
          <div>
            <div className="Password">
              <div>新しいパスワード</div>
              <span style={{ color: "red" }}>*必須</span>
            </div>
            <div className="Password-content">
              <input
                className="input-Password"
                id="oldPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="パスワードを入力してください"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "パスワードを入力してください")
                }
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="check-password">
                {newPassword && hasEnoughCharacters && (
                  <p style={{ color: "red" }}>
                    *8文字以上20文字以内で入力してください。
                  </p>
                )}
                {newPassword && !hasLesster && (
                  <p style={{ color: "red" }}>
                    *英字を1文字以上含めてください。
                  </p>
                )}
                {newPassword && !hasNumber && (
                  <p style={{ color: "red" }}>
                    *数字を1文字以上含めてください。
                  </p>
                )}
                {newPassword && hasSpace && (
                  <p style={{ color: "red" }}>スペースは使用できません。</p>
                )}
              </div>
              <div>
                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={showNewPassword}
                    onChange={handleShowNewPassword}
                  />
                  パスワードを表示する
                </label>
              </div>
            </div>
            <div>
              <div className="Password">
                <div>新しいパスワード (確認用)</div>
                <span style={{ color: "red" }}>*必須</span>
              </div>
              <div className="Password-content">
                <input
                  className="input-Password"
                  id="oldPassword"
                  type={showConfirmNewPassword ? "text" : "password"}
                  placeholder="パスワードを入力してください"
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) =>
                    (e.target.placeholder = "パスワードを入力してください")
                  }
                  value={confrimNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />

                <div>
                  <label>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={showConfirmNewPassword}
                      onChange={handleShowConfirmNewPassword}
                    />
                    パスワードを表示する
                  </label>
                </div>
                {ErrorMessage && <p style={{ color: "red" }}>{ErrorMessage}</p>}
                <div className="button">
                  <button type="submit" disabled={loading}>
                    {loading ? "確認中..." : "確認完了"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
