import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getPostDetails, postUpdate } from '../api-helpers/helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useNavigate } from 'react-router-dom';

const DiaryUpdate = () => {

    const navigate = useNavigate();
    const [post,setPost] = useState();
    const [inputs, setInputs] = useState({ title:"" , description:"" , location:"" , imageUrl:"" } );

    const id = useParams().id;
    console.log(id);

    useEffect( () => {
        getPostDetails(id).then( 
            (data) => {
                setPost(data.post)
                setInputs( {
                    title: data.post.title,
                    description: data.post.description,
                    imageUrl : data.post.image,
                    location: data.post.location,
                 })
            }).catch( (err) => console.log(err) );
    } , [id] ) ;
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
        postUpdate(inputs,id).then( (res) => navigate("/diaries") ).catch( err => console.log(err) )
    }

    const handleChange = (e) => {
        e.preventDefault();
        setInputs( (prevState) => ( { ...prevState , 
        [e.target.name] : e.target.value,
        } ) );
    }

  return (
    <Box display = "flex" flexDirection={"column"} widht = "100%" height="100%" >
        <Box display="flex" margin="auto" padding={4} >
            <Typography fontWeight={"bold"} variant='h4' >
                Share your experience with us
            </Typography>
            <TravelExploreIcon sx = {{ fontSize:"40px" , paddingLeft:1 , color: "lightcoral" }} />
        </Box>
      { post && (<form onSubmit={handleSubmit} >
            <Box padding={3} display="flex" width="80%" margin="auto" flexDirection={"column"} >
                <FormLabel >Title </FormLabel>
                <TextField value={inputs.title} name='title' onChange={handleChange}  variant='standard' margin='normal'/>
                <FormLabel >Description</FormLabel>
                <TextField value={inputs.description} name='description' onChange={handleChange} variant='standard' margin='normal'/>
                <FormLabel >Image URL </FormLabel>
                <TextField value={inputs.imageUrl} name='imageUrl' onChange={handleChange} variant='standard' margin='normal'/>
                <FormLabel > Location </FormLabel>
                <TextField value={inputs.location} name='location' onChange={handleChange} variant='standard' margin='normal'/>
                {/* <FormLabel > Date </FormLabel>
                <TextField type='date' value={inputs.date} name='date' onChange={handleChange} variant='standard' margin='normal'/> */}
                <Button type='submit' color="warning" sx={{ width:"30%" , margin: "auto", mt:4 , borderRadius:7 }} variant='contained' >
                    Post
                </Button>
            </Box>
        </form>)}
    </Box>
  )

};  

export default DiaryUpdate;
