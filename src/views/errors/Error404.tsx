import Error from ".";

const Error404: React.FC = () => {
  return (
    <Error
      status={404}
      text="The requested page was not found"
      linkType="home"
    />
  );
};

export default Error404;
