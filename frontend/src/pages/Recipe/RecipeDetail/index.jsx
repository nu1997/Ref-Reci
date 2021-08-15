import React from 'react';
import { Container, Box, Typography, Paper, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TopBar from '../../../layout/TopBar';
import BottomBar from '../../../layout/BottomBar';
import FloatingActionButton from '../../../layout/FloatingActionButton';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  image: {
    maxWidth: '100%',
    height: '100%',
  },
}));


export default function RecipeDetail() {
  const classes = useStyles();

  return (
    <Container fixed>
      <TopBar />
      <BottomBar />
      <FloatingActionButton />
    </Container>
  )
};