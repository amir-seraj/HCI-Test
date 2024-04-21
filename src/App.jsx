import { BrowserRouter,  Route, Routes, useLocation } from "react-router-dom";
import Page from "./Page";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState,  } from "react";

const NavigationArea = ({ direction }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'a': // Left
          navigateToPage('left');
          break;
        case 'd': // Right
          navigateToPage('right');
          break;
        case 'w': // Up
          navigateToPage('up');
          break;
        case 's': // Down
          navigateToPage('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const navigateToPage = (direction) => {
    let path = window.location.pathname;
    let currentPage = parseInt(path.replace('/page', ''), 10);
    let nextPage;
    switch (direction) {
      case 'left':
        nextPage = currentPage === 1 ? 3 : currentPage === 4 ? 6 : currentPage - 1;
        break;
      case 'right':
        nextPage = currentPage === 3 ? 1 : currentPage === 6 ? 4 : currentPage + 1;
        break;
      case 'up':
        nextPage = currentPage <= 3 ? 4 : 1;
        break;
      case 'down':
        nextPage = currentPage <= 3 ? 4 : 1;
        break;
      default:
        break;
    }

    navigate(`/page${nextPage}`);
  };

  return (
    <div className={`navigation-area ${direction}`} onClick={navigateToPage} />
  );
};

const TimeTable = ({ pageTimes, pageVisits }) => {
    return (
      <div>
        <h3>Time Spent on Pages</h3>
        <div style={{ display: "flex", gap: "2rem" }}>
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Time Spent (sec)</th>
              </tr>
            </thead>
            <tbody>
              {pageTimes.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.page}</td>
                  <td>{entry.timeSpent.toFixed(2)}</td> {/* Already in sec */}
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {pageVisits.map((visit, index) => (
                <tr key={index}>
                  <td>{visit.page}</td>
                  <td>{new Date(visit.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
const App = () => {
  const location = useLocation();
  const [pageTimes, setPageTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const [pageVisits, setPageVisits] = useState([]);

  useEffect(() => {
    // Record the visit with a timestamp when the path changes
    const currentPage = location.pathname.replace('/page', '');
    const visit = { page: currentPage, timestamp: Date.now() };
    setPageVisits(prevPageVisits => [...prevPageVisits, visit]);
  }, [location.pathname]);

  useEffect(() => {
    // Update the start time when the path changes
    setStartTime(Date.now());
  }, [location.pathname]);

  useEffect(() => {
    // Calculate and update the time spent when the path changes
    const handleRouteChange = () => {
      const pageLeaveTime = Date.now();
      const timeSpent = pageLeaveTime - startTime;
      
      const currentPage = location.pathname.replace('/page', '');
      const timeEntry = { page: currentPage, timeSpent: parseFloat(timeSpent.toFixed(2)) };
      setPageTimes(prevPageTimes => [...prevPageTimes, timeEntry]);
    };
    //   setPageTimes(prevPageTimes => {
    //     const currentPageTimes = prevPageTimes[currentPage] || [];
    //     return {
    //       ...prevPageTimes,
    //       [currentPage]: [...currentPageTimes, timeSpent]
    //     };
    //   });
    // };

    // Call the route change handler when the component mounts or updates
    handleRouteChange();

    // Return a cleanup function that updates the time when the component unmounts
  //   return handleRouteChange;
  // }, [location, startTime]);
  return () => {
    window.removeEventListener('popstate', handleRouteChange);
  };
}, [location.pathname, startTime]);

  // Function to download data as a JSON file
  const downloadDataAsJson = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Function to handle the download when a button is clicked
  const handleDownload = () => {
    const dataToDownload = {
      pageTimes,
      pageVisits
    };
    downloadDataAsJson(dataToDownload, 'page-data.json');
  };
  
  return (
    <>
      <Routes>
        <Route path="/page1" element={<Page bgColor="green" />} />
        <Route path="/page2" element={<Page bgColor="orange" />} />
        <Route path="/page3" element={<Page bgColor="red" />} />
        <Route path="/page4" element={<Page bgColor="black" circleColor="green" />} />
        <Route path="/page5" element={<Page bgColor="black" circleColor="orange" />} />
        <Route path="/page6" element={<Page bgColor="black" circleColor="red" />} />
      </Routes>
      <NavigationArea direction="left" />
      <NavigationArea direction="right" />
      <NavigationArea direction="up" />
      <NavigationArea direction="down" />
      <button onClick={handleDownload}>Download Data as JSON</button>
      <TimeTable pageTimes={pageTimes} pageVisits={pageVisits} />
    </>
  );
};

export default AppWrapper;