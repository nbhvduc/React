import "./ModalConfirm.css";

type ModalConfirmProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  confirmLabel?: string;
  variant?: "danger" | "primary";
};

export function ModalConfirm({
  message,
  onConfirm,
  onCancel,
  title = "ログアウト",
  confirmLabel = "ログアウト",
  variant = "danger",
}: ModalConfirmProps) {
  return (
    <div
      className="modal-container"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <div className="confirm-modal-icon" aria-hidden="true">
          <span>!</span>
        </div>
        <h2 id="confirm-modal-title">{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-cancel" onClick={onCancel}>
            キャンセル
          </button>
          <button
            className={`modal-confirm modal-confirm--${variant}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
