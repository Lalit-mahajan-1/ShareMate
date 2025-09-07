import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import ShareIcon from '@mui/icons-material/Share';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ShareSection from './ShareSection';
import Visbility from './Visbility';
import './CSS/Sharemodal.css'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Sharemodal = ({shareurl,notesid}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
                <ShareIcon onClick={handleOpen} />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-box" >
                    <Box className="modal-tabs" >
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Share" {...a11yProps(0)} />
                            <Tab label="Publish" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                       <ShareSection shareUrl={shareurl}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Visbility notesid = {notesid}/>
                    </CustomTabPanel>
                </Box>
            </Modal>
        </div>
    )
}

export default Sharemodal
