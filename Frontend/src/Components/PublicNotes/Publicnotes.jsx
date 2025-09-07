import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Publicnotes.css";

const Publicnotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVR_URL}/view/publicnotes`
        );
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="publicnotes-container">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : notes.length === 0 ? (
          <p className="no-notes">No public notes available</p>
        ) : (
          notes.map((note, index) => (
            <div className="note-card" key={index}>
              <div className="note-header">
                <img
                  src={note.user.profileImg}
                  alt={note.user.name}
                  className="profile-img"
                />
                <span className="username">{note.user.name}</span>
              </div>

              <h3 className="note-title">{note.title}</h3>

              {note.ImgURL && (
                <div className="note-image">
                  <img src={note.ImgURL} alt="Note" />
                </div>
              )}

              <div className="note-description">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">View Notes</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography component="p">{note.Notes}</Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Publicnotes;
