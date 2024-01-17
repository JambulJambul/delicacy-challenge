import { useState, useEffect } from "react"
import { Box, Typography, Stack, Button } from "@mui/material"
import { Link, useParams } from "react-router-dom"

import { callAPI } from "../../domain/api"
import Navbar from "../../components/Navbar"
import Categories from "./components/Categories"
import MainCard from "../../components/MainCard"
import SmallCard from "../../components/smallCard"

import classes from './style.module.scss'

const Homepage = () => {
    const [data, setData] = useState();
    const [randomData, setRandomData] = useState();
    const [category, setCategory] = useState();
    const { strCategory } = useParams();

    useEffect(() => {
        fetchData();
        fetchRandom();
        fetchCategory();
    }, []);

    const fetchData = async () => {
        try {
            let responseByCategories;
            if (strCategory) {
                responseByCategories = await callAPI(`/filter.php?c=${strCategory}`, 'GET');
            } else {
                responseByCategories = await callAPI(`/filter.php?c=beef`, 'GET');
            }
            const slicedResponse = responseByCategories?.meals?.slice(0, 10);
            const modifiedResponse = slicedResponse?.map(async (item) => {
                const responseById = await callAPI(`/lookup.php?i=${item.idMeal}`, 'GET');
                const { idMeal, strInstructions, strMeal, strCategory, strMealThumb, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strMeasure1, strMeasure2, strMeasure3, strMeasure4 } = responseById.meals[0]
                return {
                    idMeal, strInstructions, strMeal, strCategory, strMealThumb, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strMeasure1, strMeasure2, strMeasure3, strMeasure4
                }
            })
            const finalResponse = await Promise.all(modifiedResponse)
            setData(finalResponse)
        } catch (error) {
            console.log(error);
        }
    };

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

    const fetchCategory = async () => {
        const response = await callAPI(`/categories.php`, 'GET');
        const slicedResponse = response?.categories?.slice(0, 6);
        setCategory(slicedResponse)
    }

    let dataIsEmpty = false;
    if (data != null) {
        dataIsEmpty = true;
    }

    let randomDataIsEmpty = false
    if (randomData != null) {
        randomDataIsEmpty = true;
    }

    let categoryIsEmpty = false
    if (category != null) {
        categoryIsEmpty = true;
    }

    return (
        <>
            <Box>
                <Navbar></Navbar>
                <Box pl={10} pt={2}>
                    <Box pr={10}>
                        <Stack direction={"row"} gap={5}>
                            {categoryIsEmpty ? (
                                <>
                                    {category?.map((item) => (
                                        <>
                                            <Categories data={item}></Categories>
                                        </>
                                    ))}
                                </>
                            ) : (
                                <>
                                </>
                            )}
                            <Button variant="text"><Typography variant="p">Favorite</Typography></Button>
                        </Stack>
                    </Box>
                    {dataIsEmpty ? (
                        <>
                            <Box pt={2} pr={10} className={classes["main-card-flex"]}>
                                {data?.map((item) => (
                                    <>
                                        <MainCard data={item} withDetail={true}></MainCard>
                                        <Box ml={6}></Box>
                                    </>
                                ))}
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography variant="h4">Loading...</Typography>
                        </>
                    )}
                    <Box pr={10} mt={4}>
                        <Typography variant="h5">
                            More Recipies
                        </Typography>
                        <Box mt={2}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                {randomDataIsEmpty ? (
                                    <>
                                        {randomData?.map((item) => (
                                            <>
                                                <Link to={`/details/${item.idMeal}`}
                                                    key={item.idMeal}>
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
        </>
    )
}

export default Homepage