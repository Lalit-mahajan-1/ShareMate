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

const Uploadfile = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const {user,setUser} = useContext(AppContext)
  const NotesByUser = {
    Notes: "",
    ImgURL: "",
    theme:"#fff"
  };
  const [Notes, setNotes] = useState(NotesByUser);
  const [load, setLoad] = useState(false);
  function handleInputFile(e) {
    const { type, files, value, name } = e.target;

    if (type === "file" && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        setPreviewImage(selectedFile);
      }
    } else if (type === "text") {
      setNotes((prev) => ({ ...prev, Notes: value }));
    }
  }

  useEffect(() => {
    window.addEventListener("paste", (e) => {
      if (e.clipboardData.files.length > 0) {
        const imageFile = e.clipboardData.files[0];
        if (imageFile.type.startsWith("image/")) {
          setFile(imageFile);
          setPreviewImage(imageFile);
        }
      }
    });
  }, []);

  function setPreviewImage(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setTimeout(() => { setLoad(true) }, 0);
      setTimeout(() => {
        setLoad(false);
        setNotes({ ...Notes, ImgURL: fileReader.result });
      }, 500)
    };
  }

  const upload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("No File Selected!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("Notes", Notes.Notes);
      formData.append("theme", Notes.theme);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVR_URL}/Notes/upload`,
          formData,{withCredentials:true}
        );
        toast.success("Upload successful!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });

        try{
          await axios.post(`${import.meta.env.VITE_SERVR_URL}/History/AddHistory`,{UserId:user.id,Action:'Create',ImgURL:res.data.newNotes._id})
        }
        catch(error){
          console.log(error)
        }

      } catch (err) {
        if(err.status === 401){
          toast.error("Please Signup", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        }    
      }
    }
  };

  const handleTheme = (color) =>{
    setNotes({...Notes, theme:color});
  }
  function handleClearImage(){
    setNotes({...Notes,ImgURL:""})
  }
  return (
    <div>
      <Navbar/>
      <div className="Container">
        <div className="SubContainer">
          <form onSubmit={upload}>

            <div className="button-row">
              <button className="input-file">
                <label htmlFor="fileInput" className="file-label">
                  <i className="fa-solid fa-cloud-arrow-up"></i> Upload Image
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="file-input-hidden"
                  onChange={handleInputFile}
                />
              </button>
              <button className="submit" type="submit">Submit</button>
            </div>

            <textarea
              type="text"
              id="Note"
              name="Note"
              value={Notes.Notes}
              onChange={(e) => setNotes((prev) => ({ ...prev, Notes: e.target.value }))}
              placeholder="Enter your note..."
            />
            <div className="imagepreview">
              {
                load ? <CircularProgress size="3rem" /> : (
                  <>
                    {Notes.ImgURL===""?null: <span className="cancel-btn" onClick={handleClearImage}><IconButton> <CancelIcon /> </IconButton> </span>}
                    <img
                      src={Notes.ImgURL === "" ? null : Notes.ImgURL}
                      onClick={() => setOpen(true)}
                    />
                  </>
                )
              }
            </div>
            <div className="theme-select">
              <div className="theme-color">{Notes.theme}</div>
              <Themeselector onColorChange ={handleTheme}/>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Download, Fullscreen, Zoom]}
        zoom={{
          doubleClickMaxStops: 5,
          maxZoomPixelRatio: 6,
        }}
        slides={[{ src: Notes.ImgURL }]}
      />
    </div>
  );
};

export default Uploadfile;
