import { Box, Stack, Typography, Button } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import classes from './style.module.scss'

const Categories = ({ data }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (!isClicked) {
            setIsClicked(true);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };


    return (
        <>
            <Box>
                <Link to={`/${data.strCategory}`} onClick={handleClick}>
                    <Button variant="text"><Typography variant="p">{data.strCategory}</Typography></Button>
                </Link>
            </Box>
        </>
    )
}

export default Categories