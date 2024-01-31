import { useRef } from "react";
import s from "./styles.module.css";

interface Props extends React.ComponentProps<"img"> {
  src: string;
}

const Image: React.FC<Props> = ({ src, alt, ...options }) => {
  const blurRef = useRef<HTMLImageElement>(null);

  return (
    <div className={s.blurLoad} ref={blurRef}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        {...options}
        onLoad={() => blurRef.current!.classList.add(s.loaded)}
      />
    </div>
  );
};

export default Image;
