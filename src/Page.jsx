import PropTypes from 'prop-types';
import './Page.css';

const Page = ({ bgColor, circleColor }) => {
  return (
    <div className={`page ${bgColor}`}>
      {circleColor && <div className={`circle ${circleColor}`}></div>}
    </div>
  );
};

Page.propTypes = {
  bgColor: PropTypes.string.isRequired,
  circleColor: PropTypes.string
};

export default Page;