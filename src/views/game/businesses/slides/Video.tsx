import s from "./styles.module.css";

interface VideoProps {
  data: {
    title: string;
    link: string;
  };
}

const Video: React.FC<VideoProps> = ({ data }) => {
  return (
    <div className={s.optionsView}>
      <iframe
        width="100%"
        height="100%"
        src={data?.link}
        title={data?.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;