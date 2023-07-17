import React from 'react'
import DiaryItem from './DiaryItem'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { getAllPosts } from '../api-helpers/helpers'
import { useState } from 'react'

const Diaries = () => {

  const [ posts , setPosts ] = useState()
  useEffect( () => {
    getAllPosts().then( (data) => setPosts(data?.posts) )
    .catch( (err) => (console.log(err)) );
  } , [] );

  return (
    <Box 
    display="flex" 
    flexDirection={"column"} 
    padding={3} 
    justifyContent="center" 
    alignItems={'center'}  
    >
      {" "}
      { posts && posts.map( (item,index) => (
        <DiaryItem 
        date = {new Date(`${item.date}`).toLocaleDateString() }
        description={item.description}
        image={item.image}
        id={item._id}
        location={item.location}
        title={item.title}
        key={index} 
        user={item.user._id}
        name={item.user.name}
        showEdit = {0}
        />
      )) } 
    </Box>
  )
}

export default Diaries