import UserCard from "./UserCard";
import Navbar from "../Navbar/Navbar";
import './Dashboard.css';
import Noteshistory from "./Noteshistory";
import NotesChart from "./NotesChart";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-left">
          <div className="dashboard-usercard">
            <UserCard />
          </div>
        </div>
        <div className="dashboard-right">
          <div className="dashboard-card dashboard-chart">
            <NotesChart />
          </div>

          <div className="dashboard-card dashboard-history">
            <div className="dashboard-history-title">Notes History</div>
            <div className="dashboard-history-scroll">
              <Noteshistory />
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default Dashboard;
