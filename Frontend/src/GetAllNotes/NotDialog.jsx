import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import UpdateDialog from './UpdateDialog';

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

export default function CustomizedDialogs({ Notes ,Id,onUpdate}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
            >
                See Notes
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle
                    id="customized-dialog-title"
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
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Typography
                        gutterBottom
                        sx={{
                            fontSize: '1rem',
                            color: '#333',
                            lineHeight: 1.6
                        }}
                    >
                        {Notes}
                    </Typography>
                </DialogContent>
                <UpdateDialog Id={Id} Note={Notes} onSave={onUpdate} />
                
            </BootstrapDialog>
        </>
    );
}
