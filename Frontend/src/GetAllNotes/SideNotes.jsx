import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UpdateNote from "./UpdateNote";
const BLUE_COLOR = '#1976D2';

export default function SideNotes({ Notes: initialNotes, Id, onUpdate, Title, view }) {
  const [open, setOpen] = React.useState(false);
  const [currentNotes, setCurrentNotes] = React.useState(initialNotes);

  React.useEffect(() => {
    setCurrentNotes(initialNotes);
  }, [initialNotes]);

  const toggleDrawer = (openState) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setOpen(openState);
  };

  const handleNoteUpdate = (newNote) => {
    const updatedContent = newNote.Notes || newNote; 
    setCurrentNotes(updatedContent); 
    if (onUpdate) {
        onUpdate(newNote); 
    }
  };

  return (
    <Box>
      <Button
        onClick={toggleDrawer(true)}
        variant="outlined" 
        style={{
          color: BLUE_COLOR, 
          borderColor: BLUE_COLOR, 
          backgroundColor: 'transparent', 
        }}
        sx={{  
          '&:hover': {
            backgroundColor: `${BLUE_COLOR}10`, 
            borderColor: BLUE_COLOR, 
            boxShadow: 'none', 
          },
          borderRadius: 2,
          fontWeight: 600,
          textTransform: "none",
          px: 2,
          py: 1,
        }}
      >
        VIEW NOTES
      </Button>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: {
              xs: '95vw',
              sm: 400,
              md: 450,
            },
            padding: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor:'var(--user-card-color)',
            color:'var(--text-color)'
            
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontFamily: "Times New Roman" }}
            >
              {Title}
            </Typography>

            <IconButton onClick={toggleDrawer(false)} sx={{color:'var(--normal-color)'}}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 ,color:'var(--normal-color)'}} />
          <UpdateNote 
            Notes={currentNotes} 
            Id={Id} 
            onUpdate={handleNoteUpdate}
            view = {view}     />
        </Box>
      </Drawer>
    </Box>
  );
}