import React from 'react';
import { useDispatch } from 'react-redux';
import PostImage from './HomePostImage';
import { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Menu, MenuItem, Stack } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentForm from './CommentForm';

const HomePostContent = ({ post }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <PostImage images={post.Images} />
      {post.content}
      {/* <CommentForm post={post} />
      <List>
        <ListItem alignItems="flex-start">
      {post.Comment.map(()=>{
        <>
        <ListItemText
            primary="작성자"
            secondary={<React.Fragment>{'댓글 내용'}</React.Fragment>}
          />
          <Box>
            <MoreVertIcon onClick={handleOpenUserMenu} />
            <Menu
              sx={{ mt: '25px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Stack>
                  <Typography textAlign="left">수정</Typography>
                  <Typography textAlign="left">삭제</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
          </>
      })}
        </ListItem>
        <Divider variant="middle" component="li" />
      </List> */}
    </div>
  );
};

export default HomePostContent;
