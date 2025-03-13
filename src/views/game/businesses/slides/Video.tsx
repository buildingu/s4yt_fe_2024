import { useState } from "react";
import Spinner from "@components/loaders/spinner";
import s from "./styles.module.css";

interface Props {
  video_title: string;
  video_url: string;
}

const Video: React.FC<Props> = ({ video_title, video_url }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className={`${s.optionsView} ${s.video}`}>
      {!loaded && (
        <Spinner
          size="100px"
          style={{
            border: "solid 10px #9c9c9c",
            borderTop: "solid 10px #242424"
          }}
        />
      )}
      <iframe
        onLoad={() => setLoaded(true)}
        width="100%"
        height="100%"
        src={video_url}
        title={video_title}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        style={{ display: loaded ? "block" : "none" }}
      />
    </div>
  );
};

export default Video;
