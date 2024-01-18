import Navbar from "../../components/Navbar"
import MainCard from "../../components/MainCard"
import SmallCard from "../../components/smallCard"
import { callAPI } from "../../domain/api";
import { callJSONServerAPI } from "../../domain/json-server-api";

import { Link, useParams } from 'react-router-dom';
import { Box, Typography, Stack, createTheme, ThemeProvider } from "@mui/material"

import classes from './style.module.scss'
import { useEffect, useState } from "react";

const DetailPage = () => {
    const { idMeal } = useParams();
    const [data, setData] = useState();
    const [randomData, setRandomData] = useState();

    useEffect(() => {
        fetchItemData();
        fetchRandom();
    }, [idMeal])

    const theme = createTheme({
        typography: {
            fontFamily: "Archivo Narrow, roboto, sans-serif",
        },
    });

    const fetchItemData = async () => {
        try {
            const responseById = await callAPI(`/lookup.php?i=${idMeal}`, 'GET');
            const responseJSONServer = await callJSONServerAPI(`/posts`, 'GET')
            const isMealInFavorites = responseJSONServer.some(item => item.idMeal == idMeal);
            if (responseById && responseJSONServer) {
                const modifiedData = {
                    idMeal: responseById.meals[0].idMeal,
                    strInstructions: responseById.meals[0].strInstructions,
                    strMeal: responseById.meals[0].strMeal,
                    strCategory: responseById.meals[0].strCategory,
                    strMealThumb: responseById.meals[0].strMealThumb,
                    strIngredient1: responseById.meals[0].strIngredient1,
                    strIngredient2: responseById.meals[0].strIngredient2,
                    strIngredient3: responseById.meals[0].strIngredient3,
                    strIngredient4: responseById.meals[0].strIngredient4,
                    strMeasure1: responseById.meals[0].strMeasure1,
                    strMeasure2: responseById.meals[0].strMeasure2,
                    strMeasure3: responseById.meals[0].strMeasure3,
                    strMeasure4: responseById.meals[0].strMeasure4,
                    isFavorite: isMealInFavorites
                };
                setData(modifiedData)
            } else {
                console.log("No data found for the given ID.");
            }
        } catch (error) {
        }
    }

    const fetchRandom = async () => {
        try {
            const numberOfItemsToFetch = 6;
            const modifiedData = [];
            while (modifiedData.length < numberOfItemsToFetch) {
                const responseRandomMenu = await callAPI('/random.php', 'GET');
                const randomMenu = responseRandomMenu.meals?.map((item) => ({
                    idMeal: item.idMeal,
                    strMeal: item.strMeal,
                    strMealThumb: item.strMealThumb
                }))
                modifiedData.push(randomMenu)
            }
            setRandomData(modifiedData)
        }
        catch (error) {
            console.log(error)
        }
    }

    let dataIsEmpty = false;
    if (data != null) {
        dataIsEmpty = true;
    }

    let randomDataIsEmpty = false;
    if (randomData != null) {
        randomDataIsEmpty = true;
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box className={classes["wrapper"]}>
                    <Navbar></Navbar>
                    <Box px={10} pt={2}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            {dataIsEmpty ? (
                                <>
                                    <MainCard data={data} withDetail={false}></MainCard>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h4">Loading...</Typography>
                                </>
                            )}
                        </Stack>
                        <Box mt={4}>
                            <Typography variant="h5">
                                More Recipies
                            </Typography>
                            <Box mt={2}>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    {randomDataIsEmpty ? (
                                        <>
                                            {randomData?.map((item) => (
                                                <>
                                                    <Link to={`/details/${item[0].idMeal}`}
                                                        key={item[0].idMeal}>
                                                        <SmallCard data={item} withFavorite={false}></SmallCard>
                                                    </Link>
                                                </>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <Typography variant="h4">Loading...</Typography>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default DetailPage