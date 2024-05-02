import { useNavigate } from "react-router-dom";

import "./Landing.css";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <h1 className="title">PerfectPosture</h1>
        <div className="btns">
          <button
            className="start-btn btnLanding"
            onClick={() => navigate(`/GR`)}
          >
            REST MODE
          </button>
          <button
            className="start-btn btnLanding"
            onClick={() => navigate(`/GW`)}
          >
            WORK MODE
          </button>
          <button
            className="start-btn btnLanding"
            onClick={() => navigate(`/GG`)}
          >
            GAME MODE
          </button>
        </div>
      </div>
    </>
  );
}

export default Landing;
