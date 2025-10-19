import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import "./Publicnotes.css";
import SideNotes from "../../GetAllNotes/SideNotes";

const Publicnotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [Index, setIndex] = useState(0);

      const handleNoteUpdated = (updatedNote) => {
        setNotes(prev => prev.map(n => (n._id === updatedNote._id ? updatedNote : n)));
    };
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
                  <img 
                    src={note.ImgURL} 
                    alt="Note" 
                    onClick={() => {
                    setIndex(index);
                    setOpen(true);
                  }} />
                </div>
              )}

              <div className="note-description">
                     <SideNotes
                          Notes={note.Notes}
                          Id={note._id}
                          onUpdate={handleNoteUpdated}
                          Title={note.title}
                          view = "public"
                    />
              </div>
            </div>
          ))
        )}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={Index}
        plugins={[Download, Fullscreen, Zoom, Captions]}
        zoom={{
          doubleClickMaxStops: 5,
          maxZoomPixelRatio: 6,
        }}
        slides={notes.map((note) => {
          return {
            src: note.ImgURL,
            title: note.title,
          };
        })}
        carousel={{
          finite: true
        }
        }
      />
    </>
  );
};

export default Publicnotes;
