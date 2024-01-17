import { Box, Typography, Button, Stack, Grid } from "@mui/material"

import { Link } from "react-router-dom"
import { useState } from "react"

import OliveOil from '../../assets/olive-oil.svg'

import classes from './style.module.scss'

const MainCard = ({ data, withDetail }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const addToFavorites = async () => {
        try {
            const response = await fetch('http://localhost:3000/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: data.idMeal,
                }),
            });
            if (response.ok) {
                setIsFavorite(true);
                console.log('Added to favorites successfully.');
            } else {
                console.error('Failed to add to favorites.');
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    return (
        <>
            <Box width={1000} className={classes["main-box"]}>
                <Box pb={10} className={classes['text-box']}>
                    <Stack width={500}>
                        <Typography variant="h5" noWrap className={classes["title-text"]}>
                            {data.strMeal}
                        </Typography>
                        <Box pt={4} className={classes["description-box"]}>
                            <Typography variant="p">
                                {data.strInstructions}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography mt={2} variant="h5">
                                Ingredients
                            </Typography>
                            <Grid mt={1} container spacing={2}>
                                <Grid item xs={6}>
                                    <Box>
                                        <Stack gap={1} direction={"row"}>
                                            <Box className={classes["ingredient-image-box"]}>
                                                <img className={classes['ingredient-image']} src={OliveOil} alt="" />
                                            </Box>
                                            <Box>
                                                <Stack>
                                                    <Typography variant="p">
                                                        <b>{data.strIngredient1}</b>
                                                    </Typography>
                                                    <Typography variant="p">
                                                        {data.strMeasure1}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Stack gap={1} direction={"row"}>
                                            <Box className={classes["ingredient-image-box"]}>
                                                <img className={classes['ingredient-image']} src={OliveOil} alt="" />
                                            </Box>
                                            <Box>
                                                <Stack>
                                                    <Typography variant="p">
                                                        <b>{data.strIngredient2}</b>
                                                    </Typography>
                                                    <Typography variant="p">
                                                        {data.strMeasure2}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Stack gap={1} direction={"row"}>
                                            <Box className={classes["ingredient-image-box"]}>
                                                <img className={classes['ingredient-image']} src={OliveOil} alt="" />
                                            </Box>
                                            <Box>
                                                <Stack>
                                                    <Typography variant="p">
                                                        <b>{data.strIngredient3}</b>
                                                    </Typography>
                                                    <Typography variant="p">
                                                        {data.strMeasure3}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Stack gap={1} direction={"row"}>
                                            <Box className={classes["ingredient-image-box"]}>
                                                <img className={classes['ingredient-image']} src={OliveOil} alt="" />
                                            </Box>
                                            <Box>
                                                <Stack>
                                                    <Typography variant="p">
                                                        <b>{data.strIngredient4}</b>
                                                    </Typography>
                                                    <Typography variant="p">
                                                        {data.strMeasure4}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box mt={2}>
                                <Grid container>
                                    {withDetail == true ? (
                                        <>
                                            <Grid item xs={6}>
                                                <Link to={`/details/${data.idMeal}`} key={data.idMeal}>
                                                    <Button variant="outlined">Detail</Button>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button variant="outlined" onClick={addToFavorites} disabled={isFavorite}>
                                                    {isFavorite ? 'Added to favorites' : 'Add to favorites'}
                                                </Button>
                                            </Grid>
                                        </>
                                    ) : (
                                        <>
                                            <Grid item xs={12}>
                                                <Stack direction={"row"} justifyContent={"center"}>
                                                    <Button variant="outlined" onClick={addToFavorites} disabled={isFavorite}>
                                                        {isFavorite ? 'Added to favorites' : 'Add to favorites'}
                                                    </Button>
                                                </Stack>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Box>
                        </Box>
                    </Stack>
                </Box>
                <Box className={classes["image-box"]}>
                    <img className={classes['item-image']} src={data.strMealThumb} alt="" />
                </Box>
            </Box>
        </>
    )
}

export default MainCard