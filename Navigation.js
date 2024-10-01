import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { addImage, deleteImage } from './Actions';

const Navigation = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);

  const [newImage, setNewImage] = useState({ id: '', img: '', title: '', author: '', url: '' });

  const handleAddImage = () => {
    if (newImage.id && newImage.img && newImage.title) {
      dispatch(addImage(newImage));
      setNewImage({ id: '', img: '', title: '', author: '', url: '' }); // Reset input
    }
  };

  const handleDeleteImage = (id) => {
    dispatch(deleteImage(id));
  };

  return (
    <Box sx={{ display: "flex", mt: 4 }}>
      {/* Sticky Box */}
      <Box
        sx={{
          position: "sticky",
          top: "20px",
          alignSelf: "flex-start",
          width: "200px",
          padding: "16px",
          borderRadius: "10px",
          marginRight: "70px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          <b>Navigation</b>
        </Typography>
        <Typography variant="body2">
          30+ components that will help go through the pages
        </Typography>

        {/* Add New Image */}
        <TextField
          label="ID"
          value={newImage.id}
          onChange={(e) => setNewImage({ ...newImage, id: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          value={newImage.img}
          onChange={(e) => setNewImage({ ...newImage, img: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Title"
          value={newImage.title}
          onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author"
          value={newImage.author}
          onChange={(e) => setNewImage({ ...newImage, author: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddImage} fullWidth>
          Add Image
        </Button>
      </Box>

      {/* Image List */}
      <ImageList sx={{ width: 800, height: "auto" }} cols={3}>
        {images.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>Author: {item.author}</span>}
              position="below"
              actionIcon={
                <Button variant="contained" color="secondary" onClick={() => handleDeleteImage(item.id)}>
                  Delete
                </Button>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Navigation;
