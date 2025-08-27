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
    background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
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

export default function UpdateDialog({ Note, Id, onSave }) {
  const [open, setOpen] = useState(false);
  const [noteText, setNoteText] = useState(Note || '');
  const {user,setUser} = useContext(AppContext);

  useEffect(() => {
    setNoteText(Note || '');
  }, [Note]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const UpdateNote = async (id) => {
 
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_SERVR_URL}/Notes/update/${id}`,
          { Notes: noteText } , {
            withCredentials: true
          }
        );
        toast.success('Note updated successfully!', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
          transition: Bounce,
        });

        if (onSave) {
          onSave(res.data);
        }
        setOpen(false);
        try{
          await axios.post(`${import.meta.env.VITE_SERVR_URL}/History/AddHistory`,{UserId:user.id,Action:'Update',ImgURL:id})
        }
        catch(error){
          console.log(error)
        }
      }
      catch (error) {
        toast.error('Error updating note', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
          transition: Bounce,
        });
      }
    }


  return (
    <> <div className="button-update" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '12px 24px' }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
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
          Notes
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
            <textarea
              id="Note"
              name="Note"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter your note..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid transparent',
                fontSize: '1rem',
                resize: 'none',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </Typography>
        </DialogContent>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '12px 24px' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => UpdateNote(Id)}>Save Changes</Button>
        </div>
      </BootstrapDialog>
    </>
  );
}
