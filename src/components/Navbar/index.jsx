import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import classes from './style.module.scss'

const Navbar = () => {
    return (
        <Box className={classes["navbar-box"]}>
            <Link to={'/'}>
                <Typography variant="h4">
                    Delicacy
                </Typography>
            </Link>
        </Box>
    )
}

export default Navbar