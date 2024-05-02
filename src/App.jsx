import { Route, Routes } from "react-router-dom";
import Page from "./Page";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import Landing from "./pages/Landing/Landing";

const App = () => {
  return (
    <>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* RESTING */}
          <Route
            path="/GR"
            element={
              <Page
                key="/GR"
                bgColor="black"
                faceColor="greenf"
                faceState="happy"
              />
            }
          />
          <Route
            path="/OR"
            element={
              <Page
                key="/OR"
                bgColor="black"
                faceColor="orangef"
                faceState="annoyed"
              />
            }
          />
          <Route
            path="/RR"
            element={
              <Page
                key="/RR"
                bgColor="black"
                faceColor="redf"
                faceState="sad"
              />
            }
          />
          {/* WORKING */}
          <Route
            path="/GW"
            element={
              <Page
                // key="/GW"
                bgColor="green"
              />
            }
          />
          <Route
            path="/OW"
            element={
              <Page
                // key="/OW"
                bgColor="orange"
              />
            }
          />
          <Route
            path="/RW"
            element={
              <Page
                // key="/RW"
                bgColor="red"
              />
            }
          />
          {/* GAMING */}
          <Route
            path="/GG"
            element={
              <Page
                // key="/GG"
                bgColor="black"
                circleColor="green"
              />
            }
          />
          <Route
            path="/OG"
            element={
              <Page
                // key="/OG"
                bgColor="black"
                circleColor="orange"
              />
            }
          />
          <Route
            path="/RG"
            element={
              <Page
                // key="/RG"
                bgColor="black"
                circleColor="red"
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
