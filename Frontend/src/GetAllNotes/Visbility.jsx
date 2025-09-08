import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import "./CSS/Visbility.css";

const Visbility = ({ notesid }) => {
    const [visibility, setVisibility] = useState("private");

    const handleOption = (e) => {
        setVisibility(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_SERVR_URL}/view/Changevisibility/${notesid}`,
                { Visibility: visibility }
            );

            toast.success("Upload successful!", {
                position: "bottom-left",
                autoClose: 3000,
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>

            <form onSubmit={handleSubmit} className="visibility-form">
                <FormControl className="visibility-control">
                    <FormLabel className="visibility-label">Visibility</FormLabel>
                    <RadioGroup
                        value={visibility}
                        onChange={handleOption}
                        className="visibility-options"
                    >
                        <FormControlLabel value="private" control={<Radio />} label="Private" />
                        <FormControlLabel value="public" control={<Radio />} label="Public" />
                    </RadioGroup>
                </FormControl>

                <div className="visibility-msg">
                    This note will be <span>{visibility}</span>.
                </div>

                <div className="visibility-btn">
                    <Button variant="contained" color="primary" type="submit">
                        Save Changes
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Visbility;
