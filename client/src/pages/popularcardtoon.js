import React from 'react';
import MenuBar from '../components/MenuBar';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LOAD_HOTPOSTS_REQUEST } from '../reducers/post';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Avatar,
  Box,
} from '@mui/material';
import { red } from '@mui/material/colors';
import HomePostContent from '../components/HomePostContent';
import CommentList from '../components/CommentList';
import FollowButton from '../components/FollowButton';
import LikeButton from '../components/LikeButton';
import CardtoonAppBar from '../components/CardtoonAppBar';

const PopularCardtoonPage = () => {
  const { hotPosts } = useSelector(state => state.post);

  const hasLikers = hotPosts.filter(x => x.Likers.length > 0);
  const {
    removeCommentLoading,
    addCommentLoading,
    likePostLoading,
    unLikePostLoading,
    removePostLoading,
  } = useSelector(state => state.post);

  const descLikers = hasLikers?.sort(
    (a, b) => b.Likers.length - a.Likers.length
  );

  const rank = [...new Set(hasLikers.map(x => x.Likers.length))];
  const fifthPlace = rank[4];
  const hotPostsArr = descLikers.filter(x => x.Likers.length >= fifthPlace);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_HOTPOSTS_REQUEST,
    });
  }, [
    removeCommentLoading,
    addCommentLoading,
    likePostLoading,
    unLikePostLoading,
    removePostLoading,
  ]);

  return (
    <>
      <CardtoonAppBar />
      <Box sx={{ mb: '65px' }}>
        {hotPostsArr?.map((post, i) => (
          <Card
            sx={{ height: '100%', margin: '20px 5px' }}
            variant="outlined"
            key={i}
          >
            <CardHeader
              title={
                <Link
                  to={`/userprofile/${post.User.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={i}
                >
                  {post.User.nickname}
                </Link>
              }
              avatar={
                <Link to={`/userprofile/${post.User.id}`} key={i}>
                  {' '}
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="profilepic"
                    src={`http://localhost:3065/${post.User.profileimagesrc}`}
                    key={post.User.id}
                  />
                </Link>
              }
              action={<FollowButton post={post} />}
            />
            <CardContent>
              <HomePostContent
                sx={{ whiteSpace: 'normal' }}
                post={post}
                key={post.id}
              />
            </CardContent>
            <Divider variant="middle" />
            <LikeButton post={post} />
            <CommentList post={post} />
          </Card>
        ))}
        <MenuBar />
      </Box>
    </>
  );
};

export default PopularCardtoonPage;
