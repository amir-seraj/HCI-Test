import PropTypes from "prop-types";
import "./Page.css";
import { motion, useAnimation } from "framer-motion";
import NavigationArea from "./components/NavigationArea";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TimeTable from "./components/TimeTable";
import { useStorePageTimes, useStorePageVisits } from "./store";

const Page = ({ circleColor, faceColor, faceState }) => {
  const navigate = useNavigate();
  const blink = useAnimation();
  useEffect(() => {
    blink.start({
      y: [-10, -60, -10],
      transition: { duration: 9, repeat: Infinity },
      ease: "easeInOut",
    });
  }, [blink]);

  const location = useLocation();
  // const [pageTimes, setPageTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  // const [pageVisits, setPageVisits] = useState([]);
  const { addPageVisits } = useStorePageVisits();
  const { addPageTimes } = useStorePageTimes();

  useEffect(() => {
    // Record the visit with a timestamp when the path changes
    const currentPage = location.pathname.replace("/page", "");
    // const visit = { page: currentPage, timestamp: Date.now() };
    // setPageVisits((prevPageVisits) => [...prevPageVisits, visit]);
    const timestamp = Date.now();
    const formattedDate = new Date(timestamp).toLocaleString();
    console.log("Formatted Date:", formattedDate);
    addPageVisits(currentPage, formattedDate);
  }, [location.pathname, addPageVisits]);

  useEffect(() => {
    // Update the start time when the path changes
    setStartTime(Date.now());
  }, [location.pathname]);

  useEffect(() => {
    // Calculate and update the time spent when the path changes
    const handleRouteChange = () => {
      const pageLeaveTime = Date.now();
      const timeSpent = pageLeaveTime - startTime;
      const currentPage = location.pathname.replace("/page", "");
      console.log(timeSpent);
      // const timeEntry = {
      //   page: currentPage,
      //   timeSpent: parseFloat(timeSpent.toFixed(2)),
      // };
      addPageTimes(currentPage, timeSpent);
    };
    handleRouteChange();
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [location.pathname, startTime]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 100 }}
        className={`page`}
      >
        {/* {working && <motion.div className="working"></motion.div>} */}
        {circleColor && (
          <motion.div className={`circle ${circleColor} `}></motion.div>
        )}
        {faceColor && (
          <motion.div className={`face`}>
            <motion.div className="eyes">
              <motion.div className={`eye left ${faceColor} `}>
                <motion.div animate={blink} className="eyelid"></motion.div>
              </motion.div>
              <motion.div className={`eye right ${faceColor} `}>
                <motion.div animate={blink} className="eyelid"></motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className={`mouth ${faceColor}  ${faceState}`}
            ></motion.div>
          </motion.div>
        )}
        <button className="btn stop-btn" onClick={() => navigate(`/`)}>
          Stop
        </button>
      </motion.div>
      <NavigationArea direction="left" />
      <NavigationArea direction="right" />
      <NavigationArea direction="up" />
      <NavigationArea direction="down" />
      <TimeTable />
    </>
  );
};

Page.propTypes = {
  // working: PropTypes.string,
  workingState: PropTypes.string,
  circleColor: PropTypes.string,
  faceColor: PropTypes.string,
  faceState: PropTypes.string,
};

export default Page;
