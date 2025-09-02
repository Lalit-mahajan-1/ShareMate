import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Navbar/UserInfo';
import axios from "axios";
import "./Noteshistory.css"; 

const Noteshistory = () => {
  const { user } = useContext(AppContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user || !user.id) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVR_URL}/History/Noteshistory/${user.id}`,
          { withCredentials: true }
        );
        setHistory(res.data.reverse());
      } catch (error) {
        console.error("Error fetching user history:", error.message);
      }
    };

    fetchData();
  }, [user]); 

  return (
    <div className="history-container">
      {history.map((h, index) => (
        <div key={index} className="history-card">
          <div className="history-content">
            <p className="history-date">{h.Date}</p>
            <p className="history-action">{h.Action}</p>
            <p className="history-img" >{h.title}</p>   
          </div>
        </div>
      ))}
    </div>
  );
};

export default Noteshistory;
