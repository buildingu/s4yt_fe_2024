import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props extends React.PropsWithChildren<{}> {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
  label?: string;
  noExitBtn?: true;
}

const ModalTemplate: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  children,
  show,
  setShow,
  label,
  noExitBtn,
  ...options
}) => {
  useEffect(() => {
    if (show) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "initial";
    }
  }, [show]);

  return (
    show &&
    createPortal(
      <>
        {/* Backdrop */}
        <div
          role="presentation"
          aria-label="Backdrop"
          className="backdrop"
          onClick={() => setShow(false)}
        />
        {/* Modal */}
        <div
          role="dialog"
          // tabIndex={-1}
          aria-label={label ? label : "Popup"}
          className="modal"
          id="modal"
          onClick={(e) => e.stopPropagation()}
          {...options}
        >
          {!noExitBtn && (
            <button
              aria-label="Close"
              className="exitBtn"
              onClick={() => setShow(false)}
            />
          )}
          {children}
        </div>
      </>,
      document.body
    )
  );
};

export default ModalTemplate;
