import { Box, Typography, Button, Stack, Grid } from "@mui/material"
import { Link } from "react-router-dom"

import { callJSONServerAPI } from "../../domain/json-server-api"

import OliveOil from '../../assets/olive-oil.svg'

import classes from './style.module.scss'

const MainCard = ({ data, withDetail }) => {
    const addToFavorites = async () => {
        try {
            const favoritePost = {
                id: data.idMeal,
                idMeal: data.idMeal,
                strMeal: data.strMeal,
                strMealThumb: data.strMealThumb
            }
            await callJSONServerAPI('/posts', 'POST', {}, {}, favoritePost)
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFromFavorites = async () => {
        try {
            await callJSONServerAPI(`/posts/${data.idMeal}`, 'DELETE')
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    return (
        <>
            <Box width={1000} className={classes["main-box"]}>
                <Box pb={10} className={classes['text-box']}>
                    <Stack width={500}>
                        <Typography variant="h5" color={"#404040"} fontWeight={700} noWrap className={classes["title-text"]}>
                            {data.strMeal}
                        </Typography>
                        <Box pt={4} className={classes["description-box"]}>
                            <Typography variant="p" color={"#404040"}>
                                {data.strInstructions}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography mt={2} variant="h5" color={"#969696"}>
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
                                                    <Typography variant="p" color={"#404040"}>
                                                        <b>{data.strIngredient1}</b>
                                                    </Typography>
                                                    <Typography variant="p" color={"#404040"}>
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
                                                    <Typography variant="p" color={"#404040"}>
                                                        <b>{data.strIngredient2}</b>
                                                    </Typography>
                                                    <Typography variant="p" color={"#404040"}>
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
                                                    <Typography variant="p" color={"#404040"}>
                                                        <b>{data.strIngredient3}</b>
                                                    </Typography>
                                                    <Typography variant="p" color={"#404040"}>
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
                                                    <Typography variant="p" color={"#404040"}>
                                                        <b>{data.strIngredient4}</b>
                                                    </Typography>
                                                    <Typography variant="p" color={"#404040"}>
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
                                                <Link className="button-box" to={`/details/${data.idMeal}`} key={data.idMeal}>
                                                    <Button variant="outlined">Detail</Button>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {data.isFavorite == true ? (
                                                    <>
                                                        <Button variant="outlined" onClick={removeFromFavorites}>REMOVE FAVORITES</Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button variant="outlined" onClick={addToFavorites}>ADD TO FAVORITES</Button>
                                                    </>
                                                )}
                                            </Grid>
                                        </>
                                    ) : (
                                        <>
                                            <Grid item xs={12}>
                                                <Stack direction={"row"} justifyContent={"center"}>
                                                    {data.isFavorite == true ? (
                                                        <>
                                                            <Button variant="outlined" onClick={removeFromFavorites}>REMOVE FAVORITES</Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button variant="outlined" onClick={addToFavorites}>ADD TO FAVORITES</Button>
                                                        </>
                                                    )}
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