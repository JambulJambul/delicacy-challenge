import { Box, Typography, Stack, Button, Grid, createTheme, useTheme, ThemeProvider } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { callJSONServerAPI } from "../../domain/json-server-api"

import SmallCard from "../../components/smallCard"
import Navbar from "../../components/Navbar"

const FavoritePage = () => {
    const [data, setData] = useState();

    const theme = createTheme({
        typography: {
            fontFamily: "Archivo Narrow, roboto, sans-serif",
        },
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await callJSONServerAPI(`/posts`, 'GET');
            const modifiedResponse = response?.map((item) => ({
                idMeal: item.idMeal,
                strMeal: item.strMeal,
                strMealThumb: item.strMealThumb,
            }));
            setData(modifiedResponse);
        } catch (error) {
            console.log(error);
        }
    };


    let dataIsEmpty = false;
    if (data != null) {
        dataIsEmpty = true;
    }

    return (
        <>
        <ThemeProvider theme={theme}>
            <Navbar></Navbar>
            <Box px={10} pt={2}>
                <Grid mt={4} container spacing={2}>
                    {dataIsEmpty ? (
                        <>{data?.map((item) => (
                            <>
                                <Grid item xs={3} textAlign={"center"}>
                                    <Stack direction={"row"} justifyContent={"center"}>
                                        <SmallCard data={[item]} withFavorite={true}></SmallCard>
                                    </Stack>
                                </Grid>
                            </>
                        ))}
                        </>
                    ) : (
                        <>
                            <Typography variant="h3"> Loading...</Typography>
                        </>
                    )}
                </Grid>
            </Box>
            </ThemeProvider>
        </>
    )
}

export default FavoritePage