// sidenotes.jsx
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

// Define a consistent blue color
const BLUE_COLOR = '#1976D2';

export default function SideNotes({ Notes: initialNotes, Id, onUpdate, Title }) {
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
        // 💡 FORCE STYLES: Use the 'style' prop to guarantee the blue color and border color.
        style={{
          color: BLUE_COLOR, // Force text color
          borderColor: BLUE_COLOR, // Force border color
          backgroundColor: 'transparent', // Ensure no fill color
        }}
        sx={{
          // Use sx for hover effects and other properties
          
          '&:hover': {
            backgroundColor: `${BLUE_COLOR}10`, 
            borderColor: BLUE_COLOR, 
            boxShadow: 'none', 
          },
          
          // Existing layout/font styles
          borderRadius: 2,
          fontWeight: 600,
          textTransform: "none", // Prevent ALL CAPS
          px: 2,
          py: 1,
        }}
      >
        {"VIEW NOTES".toUpperCase()}
      </Button>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          // Responsive width for mobile screens
          sx={{
            width: {
              xs: '95vw',
              sm: 400,
              md: 450,
            },
            padding: 3,
            bgcolor: "#fff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontFamily: "Times New Roman" }}
            >
              {Title}
            </Typography>

            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />
          
          {/* UpdateNote component */}
          <UpdateNote 
            Notes={currentNotes} 
            Id={Id} 
            onUpdate={handleNoteUpdate}
          />
        </Box>
      </Drawer>
    </Box>
  );
}