// Uploadfile.jsx
import { useState, useEffect, useContext } from "react";
import "./upload.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
import Navbar from "../Components/Navbar/Navbar";
import { AppContext } from "../Components/Navbar/UserInfo";
import Themeselector from "./Themeselector";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../Components/TextEditor/RichTextEditor";

const Uploadfile = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useContext(AppContext);
  const Navigate = useNavigate();

  const [Notes, setNotes] = useState({
    Notes: "<p></p>",
    ImgURL: "",
    theme: "#ffff", // default to primary blue
    title: ""
  });

  const [load, setLoad] = useState(false);

  function handleInputFile(e) {
    const { type, files } = e.target;
    if (type === "file" && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setPreviewImage(selectedFile);
      }
    }
  }

  useEffect(() => {
    const handlePaste = (e) => {
      if (e.clipboardData.files.length > 0) {
        const imageFile = e.clipboardData.files[0];
        if (imageFile.type.startsWith("image/")) {
          setFile(imageFile);
          setPreviewImage(imageFile);
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  function setPreviewImage(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        setNotes((prev) => ({ ...prev, ImgURL: fileReader.result }));
      }, 500);
    };
  }

  const handleRichTextChange = (html) => {
    setNotes((prev) => ({ ...prev, Notes: html }));
  };

  const upload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("No File Selected!", { position: "bottom-left", autoClose: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("Notes", Notes.Notes);
    formData.append("theme", Notes.theme);
    formData.append("title", Notes.title);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVR_URL}/Notes/upload`,
        formData,
        { withCredentials: true }
      );

      toast.success("Upload successful!", { position: "bottom-left", autoClose: 3000 });

      try {
        await axios.post(
          `${import.meta.env.VITE_SERVR_URL}/History/AddHistory`,
          { UserId: user.id, Action: 'Create', ImgURL: res.data.newNotes._id }
        );
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      if (err.status === 401) {
        toast.error("Please Signup", { position: "bottom-left", autoClose: 3000 });
      }
    }
  };

  const handleTheme = (color) => {
    setNotes((prev) => ({ ...prev, theme: color }));
  };

  function handleClearImage() {
    setNotes((prev) => ({ ...prev, ImgURL: "" }));
    setFile(null);
  }

  return (
    <div className="page-bg">
      <Navbar />
      <div className="upload-page-container">
        <button className="back-button" type="button" onClick={() => Navigate('/Notes/GetAllNotes')}>
          <ArrowBackIcon fontSize="small" /> Back to Notes
        </button>

        <form className="upload-form" onSubmit={upload}>
          {/* Main Grid Container */}
          <div className="form-content-grid">
            {/* Left Column: Title and Notes */}
            <div className="notes-column">
              <div className="title-area">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Enter title of note..."
                  id="title"
                  name="title"
                  value={Notes.title}
                  onChange={(e) => setNotes((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="notes-area">
                <div className="section-heading">Notes</div>
                {/* no change—editor itself is updated to vertical toolbar */}
                <RichTextEditor value={Notes.Notes} onChange={handleRichTextChange} />
              </div>
            </div>

            {/* Divider between columns (matches the sketch) */}
            <div className="grid-divider" aria-hidden />

            {/* Right Column: Image Preview and Options */}
            <div className="image-options-column">
              <div className="image-preview-box">
                {load ? (
                  <div className="loading-center">
                    <CircularProgress size="2.5rem" />
                  </div>
                ) : (
                  <>
                    {Notes.ImgURL !== "" && (
                      <span className="cancel-btn" onClick={handleClearImage} title="Remove image">
                        <IconButton size="small">
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </span>
                    )}
                    {Notes.ImgURL ? (
                      <img
                        src={Notes.ImgURL}
                        onClick={() => setOpen(true)}
                        alt="preview"
                        className="uploaded-image"
                      />
                    ) : (
                      <div className="placeholder-text">Image preview</div>
                    )}
                  </>
                )}
              </div>

              <div className="options-row">
                <div className="theme-select-box">
                  <label>Notes theme</label>
                  <div className="theme-chip" style={{ backgroundColor: Notes.theme }}>
                    {Notes.theme}
                  </div>
                  <Themeselector onColorChange={handleTheme} />
                </div>

                <label htmlFor="fileInput" className="upload-image-btn">
                  <i className="fa-solid fa-cloud-arrow-up" />
                  <span>Upload image</span>
                  <input
                    type="file"
                    id="fileInput"
                    className="file-input-hidden"
                    onChange={handleInputFile}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button (Bottom Center) */}
          <div className="submit-row">
            <button className="submit-btn" type="submit">Submit</button>
          </div>
        </form>
      </div>

      <ToastContainer />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Download, Fullscreen, Zoom]}
        zoom={{ doubleClickMaxStops: 5, maxZoomPixelRatio: 6 }}
        slides={[{ src: Notes.ImgURL }]}
      />
    </div>
  );
};

export default Uploadfile;