import { useEffect, useState } from "react";
import { ChangeMyProfileAPI } from "./changeMyProfileAPI";
import { ModalConfirm } from "../ModalConfirm/ModalConfirm";
import { useEmployeeInfo } from "../../hooks/useEmployeeInfo";

import "./changeMyProfile.css";
import { useNavigate } from "react-router";

export function UpdateMyProfile() {
  const { employee } = useEmployeeInfo();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setName(employee?.name ?? "");
    setBirthday(employee?.birthday ?? "");
    setPhone(employee?.phone ?? "");
  }, [employee?.name, employee?.birthday, employee?.phone]);

  async function handleChangeMyProfile() {
    try {
      const data = await ChangeMyProfileAPI(name, birthday, phone);
      console.log(data);
      setShowConfirm(false);
      navigate("/BacsicInfo");
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  }
  function handleChangeName(e: any) {
    setName(e.target.value);
  }
  function handleChangeBirthday(e: any) {
    setBirthday(e.target.value);
  }
  function handleChangePhone(e: any) {
    setPhone(e.target.value);
  }
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setShowConfirm(true);
      }}
    >
      <div className="my-proflie-container">
        <div className="profile">
          <label>
            新しい名前
            <input value={name} onChange={handleChangeName} />
          </label>
        </div>
        <div className="profile">
          <label>
            新しい生年月日
            <input
              type="date"
              value={birthday}
              onChange={handleChangeBirthday}
            />
          </label>
        </div>
        <div className="profile">
          <label>
            新しい電話番号
            <input type="tel" value={phone} onChange={handleChangePhone} />
          </label>
        </div>
        <button className="profile-button" type="submit">
          更新
        </button>
        {showConfirm && (
          <ModalConfirm
            message="変更しますか？"
            title="変更確認"
            confirmLabel="変更する"
            variant="primary"
            onConfirm={() => void handleChangeMyProfile()}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </form>
  );
}
