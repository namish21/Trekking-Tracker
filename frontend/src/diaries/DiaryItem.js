import { Delete, Description, ExpandMore } from '@mui/icons-material';
import PlaceIcon from '@mui/icons-material/Place';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { postDelete } from '../api-helpers/helpers';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DiaryItem = ( {title,description,image,location,date,id,user,name,showEdit} ) => {
      
    const [open,setOpen] = useState(false);

    const handleDelete = () => {
      postDelete(id).then( data => console.log(data) ).catch( err => console.log(err) ) ;
      setOpen(true);
    }

      let flag = 0;

      if( showEdit === 1 ){
        flag = 1;
      }

      const [expanded, setExpanded] = React.useState(false);

      
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
}));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return (
        <Card sx={{ width:"50%" , margin:1 , padding:1 , display:"flex" , flexDirection:"column" , boxShadow:"5px 5px 10px #ccc" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {name.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                {<PlaceIcon/>}
                <Typography>
                  {location}
                </Typography>
              </IconButton>
            }
            title = {name}
            header = {location}
            subheader = {date}
          />
          <img
            height = "194"
            // src = "https://images.unsplash.com/photo-1465311440653-ba9b1d9b0f5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
            src = {image}
            alt = {title}
          />
          <CardContent>
            <Typography paddingBottom={1} variant="h6" color="text.secondary">
              {title}
            </Typography>
            <hr/>
          </CardContent>
          <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {/* <Typography variant='body2' fontWeight='bold' >Read more...</Typography> */}
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph>{name}:</Typography> */}
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
        </Collapse>

          { flag === 1 ? (<CardActions sx = {{ marginLeft : "auto" }}  >
            <IconButton LinkComponent={Link} to={`/posts/${id}`} > <EditIcon/> </IconButton>
            <IconButton onClick={ handleDelete } > <Delete/> </IconButton>
          </CardActions>
          ) : <></> }

          <Snackbar open={open} autoHideDuration={6000} onClose={ () => setOpen(false) }>
            <Alert onClose={ () => setOpen(false) } severity="success" sx={{ width: '100%' }}>
              This is a success message!
            </Alert>
          </Snackbar>

        </Card>

      );
    }

export default DiaryItem
