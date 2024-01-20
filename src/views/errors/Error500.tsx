import Error from ".";

const Error500: React.FC = () => {
  return <Error status={500} text="Internal server error" linkType="back" />;
};

export default Error500;
