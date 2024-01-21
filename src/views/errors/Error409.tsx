import Error from ".";

const Error409: React.FC = () => {
  return (
    <Error
      status={409}
      text="Conflict; you're already logged in"
      linkType="back"
    />
  );
};

export default Error409;
