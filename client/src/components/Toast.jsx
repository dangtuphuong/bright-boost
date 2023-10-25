import React from "react";
import { createRoot } from "react-dom/client";
import { Toast } from "react-bootstrap";

const ToastMessage = ({ text, textHeader = null, show, onHide, type }) => {
  return (
    <Toast
      show={show}
      onClose={onHide}
      bg={type}
      style={{ position: "fixed", top: "20px", right: "20px" }}
    >
      <Toast.Header>
        <strong className="w-100">{textHeader || "Notification"}</strong>
      </Toast.Header>
      {<Toast.Body>{text}</Toast.Body>}
    </Toast>
  );
};

const createToast =
  (type) =>
  (text, textHeader = null, duration = 2500) => {
    const toastContainer = document.createElement("div");
    document.body.appendChild(toastContainer);
    const toastRoot = createRoot(toastContainer);

    return new Promise((resolve) => {
      const hideToast = () => {
        toastRoot.unmount();
        toastContainer.remove();
        resolve();
      };

      const showToast = () => {
        toastRoot.render(
          <ToastMessage
            text={text}
            textHeader={textHeader}
            show={true}
            onHide={hideToast}
            type={
              (type === "error" && "danger") ||
              (type === "success" && "success")
            }
          />
        );
        setTimeout(() => {
          hideToast();
        }, duration);
      };

      showToast();
    });
  };

export const toast = {
  error: createToast("error"),
  success: createToast("success"),
};

export default ToastMessage;
