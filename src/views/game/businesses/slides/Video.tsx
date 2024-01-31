import { useState } from "react";
import Spinner from "@components/loaders/spinner";
import s from "./styles.module.css";

interface VideoProps {
  data: {
    title: string;
    link: string;
  };
}

const Video: React.FC<VideoProps> = ({ data }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className={`${s.optionsView} ${s.optionsViewVideo}`}>
      {!loaded && (
        <Spinner
          size="100px"
          style={{
            border: "solid 10px #9c9c9c",
            borderTop: "solid 10px #242424",
          }}
        />
      )}
      <iframe
        onLoad={() => setLoaded(true)}
        width="100%"
        height="100%"
        src={data?.link}
        title={data?.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={!loaded ? { display: "none" } : { display: "block" }}
      ></iframe>
    </div>
  );
};

export default Video;
