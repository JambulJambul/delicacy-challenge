import { Grid, Box, Stack } from "@mui/material"

import SmallCard from "../../components/smallCard"
import Navbar from "../../components/Navbar"
import Categories from "../Homepage/components/Categories"

const FavoritePage = () => {
    return (
        <>
            <Navbar></Navbar>
            <Box px={10} pt={2}>
                <Categories></Categories>
                <Grid mt={4} container spacing={2}>
                    <Grid item xs={3} textAlign={"center"}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <SmallCard></SmallCard>
                        </Stack>
            </Grid>
                    <Grid item xs={3} textAlign={"center"}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <SmallCard></SmallCard>
                        </Stack>
            </Grid>
                    <Grid item xs={3} textAlign={"center"}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <SmallCard></SmallCard>
                        </Stack>
            </Grid>
                    <Grid item xs={3} textAlign={"center"}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <SmallCard></SmallCard>
                        </Stack>
            </Grid>
                    <Grid item xs={3} textAlign={"center"}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <SmallCard></SmallCard>
                        </Stack>
            </Grid>
                    <Grid item xs={3} textAlign={"center"}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <SmallCard></SmallCard>
                        </Stack>
            </Grid>
                    <Grid item xs={3} textAlign={"center"}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <SmallCard></SmallCard>
                        </Stack>
            </Grid>
                    <Grid item xs={3} textAlign={"center"}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <SmallCard></SmallCard>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default FavoritePage