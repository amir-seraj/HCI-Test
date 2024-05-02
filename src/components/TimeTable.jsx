import { useStorePageTimes, useStorePageVisits } from "../store";

const TimeTable = () => {
  const { pageVisits } = useStorePageVisits();
  const { pageTimes } = useStorePageTimes();
  console.log(pageTimes);
  // Function to download data as a JSON file
  const downloadDataAsJson = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
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
      pageVisits,
    };
    downloadDataAsJson(dataToDownload, "page-data.json");
  };
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
                <td>{entry.timeSpent}</td> {/* Already in sec */}
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
      <button onClick={handleDownload}>Download Data as JSON</button>
    </div>
  );
};
export default TimeTable;
