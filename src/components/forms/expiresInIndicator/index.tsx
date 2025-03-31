import { useRef, useEffect } from "react";

interface Props {
  formSuccess: boolean;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

const ExpiresInIndicator: React.FC<Props> = ({ formSuccess, setForm }) => {
  const timeRef = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    if (!formSuccess) return;

    let time = 600; // 10 minutes in seconds
    setForm((prev: any) => ({ ...prev, processing: true }));

    const timerInterval = setInterval(() => {
      const minutes = Math.floor(time / 60),
        seconds = time % 60,
        formattedTime = `Expires in: <span>${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}<span>`;

      if (time <= 0) {
        clearInterval(timerInterval);
        timeRef.current!.innerHTML = "Expired";

        setForm((prev: any) => ({ ...prev, processing: false }));
      } else {
        timeRef.current!.innerHTML = formattedTime;
      }

      time -= 1;
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [formSuccess]);

  return (
    <time ref={timeRef}>
      Expires in: <span>00:00</span>
    </time>
  );
};

export default ExpiresInIndicator;
