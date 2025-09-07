import React, { useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { Button } from '@mui/material';
import './CSS/Visbility.css'
const Visbility = ({ notesid }) => {
    const [Visibility, setVisiblity] = useState("private");
    const handleOption = (e) => {
        setVisiblity(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${import.meta.env.VITE_SERVR_URL}/view/Changevisibility/${notesid}`, { Visibility })
            console.log(res)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="visibility-form">
                <FormControl>
                    <FormLabel className="visibility-label">Visibility</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="private"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="private" control={<Radio />} label="Private" onChange={handleOption} />
                        <FormControlLabel value="public" control={<Radio />} label="Public" onChange={handleOption} />
                    </RadioGroup>
                </FormControl>
                <div className="msg">This will change visibility to {Visibility}</div>
                <div className="btn">
                    <Button variant="outlined" type="submit">Save Changes</Button>
                </div>
            </form>

        </>
    )
}

export default Visbility;
