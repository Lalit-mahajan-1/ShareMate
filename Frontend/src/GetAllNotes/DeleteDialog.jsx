import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { toast, Bounce } from 'react-toastify';
import { AppContext } from '../Components/Navbar/UserInfo';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: '#ffffff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    minWidth: '320px'
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2, 3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

export default function DeleteDialog({ Note, Id, onDelete }) {
  const [open, setOpen] = useState(false);
  const {user,setUser} = useContext(AppContext)
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteNote = async (NoteId) => {
    await axios
      .delete(`${import.meta.env.VITE_SERVR_URL}/Notes/Delete/${NoteId}`,{withCredentials:true})
      .then(async (res) => {
        toast.error("Note Deleted Successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
        try{
          await axios.post(`${import.meta.env.VITE_SERVR_URL}/History/AddHistory`,{UserId:user.id,Action:'Delete',ImgURL:NoteId})
        }
        catch(error){
          console.log(error)
        }

        onDelete(NoteId); 
        handleClose();
      })
      .catch((error) =>{
        console.log(error)
      });
  }

  return (
    <> <div className="button-update" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Delete Note
      </Button>

    </div>

      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 0
          }}
        >
          Delete Note?
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography component="div">
            This will delete the note!

          </Typography>
        </DialogContent>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '12px 24px' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDeleteNote(Id)}>Delete</Button>
        </div>
      </BootstrapDialog>
    </>
  );
}
