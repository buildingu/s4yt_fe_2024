import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props extends React.PropsWithChildren<{}> {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  height: React.CSSProperties["height"];
  style?: React.CSSProperties;
  label?: string;
  noExitBtn?: true;
}

const ModalTemplate: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  children,
  show,
  setShow,
  height,
  label,
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
            aria-label={label ? label : "Popup"}
            className="modal"
            id="modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: height }}
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
