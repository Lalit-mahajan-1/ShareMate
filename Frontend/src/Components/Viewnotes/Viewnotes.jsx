import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import {
  Avatar,
  Typography,
  Container,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';

const Viewnotes = () => {
  const { userid, notesid } = useParams();
  const [notes, setNotes] = useState(null);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVR_URL}/view/${userid}/${notesid}`
        );
        setNotes(res.data.note[0]);
        setUserName(res.data.Name);
        setProfileImage(res.data.ProfileImage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userid, notesid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={4}>
          <Avatar src={profileImage} alt={userName} />
          <Typography variant="subtitle1" fontWeight="600">
            {userName}
          </Typography>
        </Stack>

        {notes && (
          <>
            <Typography variant="h4" fontWeight="700" gutterBottom>
              {notes.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", mb: 3, lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: notes.Notes }}
           ></Typography>

            {notes.ImgURL && (
              <img
                src={notes.ImgURL}
                alt="note"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginTop: "1rem",
                }}
              />
            )}
          </>
        )}
        <Divider sx={{ my: 4 }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2" color="text.secondary">
            Share this article
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton onClick={handleCopy}>
              <ShareIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default Viewnotes;
