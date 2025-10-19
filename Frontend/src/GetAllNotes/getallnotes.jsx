import { useState, useEffect } from 'react'
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import './CSS/getallusers.css';
import CustomizedDialogs from './NotDialog';
import DeleteDialog from './DeleteDialog';
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';
import Notedownload from './Notedownload';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DownloadIcon from '@mui/icons-material/Download';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import Downloaddialog from './Downloaddialog';
import Sharemodal from './Sharemodal';
import SideNotes from './SideNotes';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
                ...theme.applyStyles('dark', {
                    color: 'inherit',
                }),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));


const GetallNotes = () => {
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [Index, setIndex] = useState(0);
    const [ExSelect, setExSelect] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectdNotes, setSelectdNotes] = useState({});
    const [AllselectdNotes, setAllSelectdNotes] = useState([]);
    let navigate = useNavigate();
    const open1 = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNoteUpdated = (updatedNote) => {
        setNotes(prev => prev.map(n => (n._id === updatedNote._id ? updatedNote : n)));
    };
    const handleNoteDeleted = (id) => {
        setNotes(prev => prev.filter(note => note._id !== id));
    };
    const handleExportSelect = () => {
        setExSelect(!ExSelect)
        handleClose();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVR_URL}/me`, {
                    withCredentials: true,
                });
                setUser(res.data)
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVR_URL}/Notes/AllNotes/${res.data.id}`, { withCredentials: true })
                    setNotes(response.data);
                }
                catch (e) {
                    if (e.response && e.response.status === 401) {
                        navigate("/user/Signup")
                    }
                }
            }
            catch (error) {
                console.error("Error fetching users id:", error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="allnotes-btn">
                {!ExSelect ? <Downloaddialog notes={AllselectdNotes} /> : <></>}
                <Button
                    id="demo-customized-button"
                    aria-controls={open1 ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open1 ? 'true' : undefined}
                    style={{ color: 'black' }}
                    disableElevation
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </Button>

                <StyledMenu
                    id="demo-customized-menu"
                    slotProps={{
                        list: {
                            'aria-labelledby': 'demo-customized-button',
                        },
                    }}
                    anchorEl={anchorEl}
                    open={open1}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleExportSelect} disableRipple>
                        <CheckBoxIcon /> Select Export
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <DownloadIcon />
                        {notes.length > 0 && <Notedownload allnotes={notes} />}
                    </MenuItem>
                </StyledMenu>
            </div>

            <div className="container">
                {notes.map((note, index) => {
                    return (
                        <div
                            className="subcontainer"
                            key={note._id}
                            style={{ backgroundColor: note.theme }}
                        >
                            <div className="Note-Date">
                                {note.title}
                                {!ExSelect && (
                                    <Checkbox
                                        checked={!!selectdNotes[note._id]}
                                        onChange={() => {
                                            setSelectdNotes(prev => {
                                                const newSelection = {
                                                    ...prev,
                                                    [note._id]: !prev[note._id]
                                                };
                                                const selected = Object.keys(newSelection)
                                                    .filter((id) => newSelection[id])
                                                    .map((id) => notes.find((n) => n._id === id))
                                                    .filter(Boolean);

                                                setAllSelectdNotes(selected);

                                                return newSelection;
                                            });
                                        }}
                                    />
                                )}
                            </div>

                            <div className="notesImage">
                                <img
                                    alt=""
                                    src={note.ImgURL}
                                    onClick={() => {
                                        setIndex(index);
                                        setOpen(true);
                                    }}
                                />
                            </div>

                            <div className="notesText">
                               <SideNotes
                                   Notes={note.Notes}
                                   Id={note._id}
                                   onUpdate={handleNoteUpdated}
                                   Title={note.title}
                               />
                                {/* <CustomizedDialogs
                                    Notes={note.Notes}
                                    Id={note._id}
                                    onUpdate={handleNoteUpdated}
                                /> */}
                                <DeleteDialog
                                    Notes={note.Notes}
                                    Id={note._id}
                                    onDelete={handleNoteDeleted}
                                />
                                <Sharemodal shareurl={`${import.meta.env.VITE_FRONTEND_URL}/view/${user.id}/${note._id}`} notesid={note._id}/>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ToastContainer />

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={Index}
                plugins={[Download, Fullscreen, Zoom, Captions]}
                zoom={{
                    doubleClickMaxStops: 5,
                    maxZoomPixelRatio: 6,
                }}
                slides={notes.map((note) => {
                    return {
                        src: note.ImgURL,
                        description: note.Notes,
                        title: note.title,
                    };
                })}
                carousel={{
                    finite: true
                }
                }
            />
        </div>
    );

}

export default GetallNotes;
