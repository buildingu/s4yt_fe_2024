import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props extends React.ComponentProps<"div"> {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  "aria-label": string;
  height: React.CSSProperties["height"];
  width?: React.CSSProperties["width"];
  style?: React.CSSProperties;
  noExitBtn?: boolean;
}

const ModalTemplate: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  show,
  setShow,
  height,
  width,
  style,
  noExitBtn,
  ...props
}) => {
  useEffect(() => {
    if (show) {
      // Prevents scrolling, body too is needed for mobile browsers.
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      // Hides content behind the modal for screen readers.
      document.getElementById("root")!.ariaHidden = "true";
      // If keyboard, it focuses the modal. TODO: This could be better, like locking the keyboard to only the modal.
      document.getElementById("modal")!.focus();
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.getElementById("root")!.ariaHidden = null;
    }
  }, [show]);

  return (show &&
    createPortal(
      <>
        <div
          role="presentation"
          aria-label="Backdrop"
          className="modalBackdrop"
          onClick={() => setShow(false)}
        >
          <div
            role="dialog"
            tabIndex={1}
            className="modal"
            id="modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: height, maxWidth: width, ...(style && style) }}
            {...(!props["aria-label"] && { "aria-label": "Popup" })}
            {...props}
          >
            {!noExitBtn && (
              <button
                aria-label="Close"
                className="exitBtn"
                onClick={() => setShow(false)}
              />
            )}
            <div className="content">
              {children}
            </div>
          </div>
        </div>
      </>,
      document.body
    )) as React.ReactElement | null;
};

export default ModalTemplate;
