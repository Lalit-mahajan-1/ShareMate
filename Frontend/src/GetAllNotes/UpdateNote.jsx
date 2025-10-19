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

export default function UpdateNote({ Notes, Id, onUpdate,view }) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(Notes || "");
  const { user } = useContext(AppContext);

  useEffect(() => {
    setNoteText(Notes || "");
  }, [Notes]);

  const handleCancel = () => {
    setNoteText(Notes || "");
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

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      {
        view === "private" ? (
         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
        {!isEditing ?(
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
      </Box>):(<></>)
      }



      {!isEditing ? (
        <Typography
          component="pre"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontFamily: "inherit",
            lineHeight: 1.6,
          }}
        >
          {noteText} 
        </Typography>
      ) : (
        <Typography
        component="pre"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontFamily: "inherit",
            lineHeight: 1.6,
          }}
          >
        <TextField
          multiline
          fullWidth
          minRows={10}
          autoFocus
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              "& .MuiInputBase-input": {
                border: 'none !important',
                outline: 'none !important',
                boxShadow: 'none !important',
                p: 0, 
                minHeight: '200px', 
              },
              "&::before": { borderBottom: 'none !important' },
              "&::after": { borderBottom: 'none !important' },
              "&:hover:not(.Mui-disabled):before": { borderBottom: 'none !important' },

              "&.Mui-focused": {
                  boxShadow: 'none !important',
                  border: 'none !important',
                  outline: 'none !important',
              },
            }
          }}

        />
        </Typography>
      )}
    </Box>
  );
}