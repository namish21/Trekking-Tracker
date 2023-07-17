import {  Box , Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Box position = {"relative"} width = "100%" height="90vh" >
      <img src="/hiking.jpg" alt="Road" width={"100%"} height= "90%" />
      <Typography
        variant="h3"
        fontFamily={"Satisfy, cursive"}
        textAlign={"center"}
        width = "100%"
        sx ={{ position:"absolute",top: "0px" }}
      >
        Dare to live the life you have always wanted
      </Typography>
      <Box widht = "100%" height = "30%" display={"flex"} flexDirection="column" >
        <Typography textAlign={"center"} variant="h4" padding={4}>
          Share your stories with us
        </Typography>
        <Box margin="auto" > 
          <Button variant='outlined' sx={{ mr: 2 }} >
            Share Your Story
          </Button>
          <Button LinkComponent={Link} to="/diaries" variant = "contained" sx={{ml:2}}  >
            View diaries
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Home