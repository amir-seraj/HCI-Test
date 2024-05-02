import { useNavigate } from "react-router-dom";

const NavigationArea = ({ direction }) => {
  const navigate = useNavigate();
  const pageMap = {
    GR: 1,
    OR: 2,
    RR: 3,
    GW: 4,
    OW: 5,
    RW: 6,
    GG: 7,
    OG: 8,
    RG: 9,
  };
  const reversePageMap = {
    1: "GR",
    2: "OR",
    3: "RR",
    4: "GW",
    5: "OW",
    6: "RW",
    7: "GG",
    8: "OG",
    9: "RG",
  };
  const navigateToPage = (dir) => {
    let path = window.location.pathname;
    let currentPage = pageMap[path.replace("/", "")]; // Update this line
    let nextPage;

    switch (dir) {
      case "left":
        nextPage =
          currentPage === 1
            ? 3
            : currentPage === 4
            ? 6
            : currentPage === 7
            ? 9
            : currentPage - 1;
        break;
      case "right":
        nextPage =
          currentPage === 3
            ? 1
            : currentPage === 6
            ? 4
            : currentPage === 9
            ? 7
            : currentPage + 1;
        break;
      case "up":
        nextPage = currentPage <= 3 ? 4 : currentPage <= 6 ? 7 : 1;
        break;
      case "down":
        nextPage = currentPage <= 3 ? 4 : currentPage <= 6 ? 7 : 1;
        break;
      default:
        nextPage = 1;
        break;
    }

    navigate(`/${reversePageMap[nextPage]}`);
  };

  return (
    <div
      className={`navigation-area ${direction}`}
      onClick={() => navigateToPage(direction)}
    >
      {/* Added arrow function to correctly pass the direction */}
    </div>
  );
};
export default NavigationArea;
