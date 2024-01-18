import { Box, Typography, Button } from '@mui/material'
import { callJSONServerAPI } from '../../domain/json-server-api'

import classes from './style.module.scss'

const SmallCard = ({ data, withFavorite }) => {
    return (
        <>
            <Box className={classes["main-box"]}>
                <Box className={classes["image-box"]}>
                    <img className={classes["item-image"]} src={data[0].strMealThumb} alt="" />
                </Box>
                <Box px={2} pb={4} mt={8} minHeight={140} className={classes["text-box"]}>
                    {withFavorite == false ? (
                    <><Typography mb={2} variant='p' textAlign={'center'}>
                        <b>{data[0].strMeal}</b>
                    </Typography>
                    </>
                    ) : 
                    (<>
                        <Typography mt={8} mb={2} variant='p' textAlign={'center'}>
                            <b>{data[0].strMeal}</b>
                        </Typography>
                        <Box className={classes["favorite-button"]}>
                            <Button variant="text">
                                Remove Favorite
                            </Button>
                        </Box>
                    </>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default SmallCard