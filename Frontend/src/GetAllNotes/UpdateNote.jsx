import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Button, 
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { AppContext } from '../Components/Navbar/UserInfo';
import RichTextEditor from "../Components/TextEditor/RichTextEditor";

export default function UpdateNote({ Notes, Id, onUpdate, view }) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(Notes || "<p></p>");
  const { user } = useContext(AppContext);

  useEffect(() => {
    setNoteText(Notes || "<p></p>");
  }, [Notes]);

  const handleCancel = () => {
    setNoteText(Notes || "<p></p>");
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVR_URL}/Notes/update/${Id}`,
        { Notes: noteText },
        { withCredentials: true }
      );

      toast.success("Note updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });

      if (onUpdate) onUpdate(res.data);
      setIsEditing(false);

      try {
        await axios.post(`${import.meta.env.VITE_SERVR_URL}/History/AddHistory`, {
          UserId: user.id,
          Action: "Update",
          ImgURL: Id,
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      toast.error("Error updating note", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleRichTextChange = (html) => {
    setNoteText(html);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      {view === "private" ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
          {!isEditing ? (
            <Button 
              variant="outlined" 
              onClick={() => setIsEditing(true)}
              sx={{ textTransform: 'none' }} 
            >
              Edit Note
            </Button>
          ) : (
            <>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleCancel}
                sx={{ textTransform: 'none' }} 
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSave}
                sx={{ textTransform: 'none' }} 
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>
      ) : (
        <></>
      )}

      {!isEditing ? (
        <Box
          sx={{
            "& p": { margin: "0.5em 0" },
            "& h1": { fontSize: "2em", fontWeight: "bold", margin: "0.67em 0" },
            "& h2": { fontSize: "1.5em", fontWeight: "bold", margin: "0.75em 0" },
            "& ul": { paddingLeft: "2em", margin: "0.5em 0" },
            "& ol": { paddingLeft: "2em", margin: "0.5em 0" },
            "& li": { margin: "0.25em 0" },
            "& strong": { fontWeight: "bold" },
            "& em": { fontStyle: "italic" },
            "& s": { textDecoration: "line-through" },
            "& pre": { 
              whiteSpace: "pre-wrap", 
              margin: "0.5em 0",
              padding: "1em",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              overflow: "auto"
            },
            "& code": {
              fontFamily: "monospace",
              backgroundColor: "#f5f5f5",
              padding: "0.2em 0.4em",
              borderRadius: "3px"
            },
            whiteSpace: "pre-wrap", // Preserves whitespace and line breaks
            wordBreak: "break-word",
            lineHeight: 1.6,
            color:'var(--normal-color)'
          }}

          dangerouslySetInnerHTML={{ __html: noteText }}
        />
      ) : (
        <Box sx={{ mt: 2 }}>
          <RichTextEditor
            value={noteText}
            onChange={handleRichTextChange}
          />
        </Box>
      )}
    </Box>
  );
}