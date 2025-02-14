import { useRef } from "react";
import s from "./styles.module.css";

interface Props extends Omit<React.ComponentProps<"img">, "onLoad"> {
  src: string;
  containerProps?: React.ComponentProps<"div"> & { [key: string]: any };
}

const onFinish = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  error: boolean,
  blurRef: React.RefObject<HTMLImageElement>
) => {
  const img = e.currentTarget;

  if (error) img.src = "/images/no-image.webp";
  img.setAttribute("aria-busy", "false");
  blurRef.current!.classList.add(s.loaded);
};

const Image: React.FC<Props> = ({ src, alt, className, containerProps, ...props }) => {
  const blurRef = useRef<HTMLImageElement>(null);

  return (
    <div
      className={`blur ${s.blurLoad}${className ? " " + className : ""}`}
      ref={blurRef}
      {...containerProps}
    >
      <img
        aria-busy="true"
        src={src}
        alt={alt}
        loading="lazy"
        {...props}
        onLoad={(e) => onFinish(e, false, blurRef)}
        onError={(e) => onFinish(e, true, blurRef)}
      />
    </div>
  );
};

export default Image;
