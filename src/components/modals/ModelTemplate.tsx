import { useRef, useEffect } from "react";

interface Props extends React.PropsWithChildren<{}> {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
  label?: string;
}

const ModalTemplate: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  children,
  show,
  setShow,
  style,
  label,
  ...options
}) => {
  // const modalRef = useRef(null);

  useEffect(() => {
    if (show) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "initial";
    }
  }, [show]);

  useEffect(() => {
    console.log("setShow", setShow);
  }, [setShow]);

  // TODO: You can make a slide up animation CSS keyframes animation if you want
  return (
    show && (
      <>
        {/* Backdrop */}
        <div
          role="presentation"
          aria-label="Backdrop"
          onClick={() => setShow(false)}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            minHeight: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            transform: "blur(2px)",
            zIndex: "10",
          }}
        >
          {/* Modal */}
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            tabIndex={-1}
            aria-label={label ? label : "Popup"}
            // ref={modalRef}
            id="modal"
            style={{
              padding: "1.5rem",
              backgroundColor: "var(--sBeige)",
              borderWidth: "1px",
              borderColor: "rgba(213, 213, 213, 0.5)",
              // borderRadius: "6px",
              zIndex: "10",
              ...style,
            }}
            {...options}
          >
            {/*
               This can be the back btn, use the css from the sponsors backBtn, but we should actual make a global class backBtn lol
               If this is too weird to style we don't need the backBtn in the template... 
            */}
            {/* <button
              aria-label="Close"
              className="backBtn"
              onClick={() => setShow(false)}
            /> */}
            {children}
          </div>
        </div>
      </>
    )
  );
};

export default ModalTemplate;
