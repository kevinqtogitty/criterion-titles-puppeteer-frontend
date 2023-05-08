import PropagateLoader from 'react-spinners/PropagateLoader';

const Loader = (): JSX.Element => {
  return (
    <div className="data-is-being-fetched-loader">
      <h2>Fetching all Criterion Channel films</h2>
      <PropagateLoader color="#a2a912" />
    </div>
  );
};

export default Loader;
