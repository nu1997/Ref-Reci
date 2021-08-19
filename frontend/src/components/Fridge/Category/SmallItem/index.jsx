import { React, useState, useEffect } from "react";
import {
  Fade,
  Backdrop,
  CardActionArea,
  makeStyles,
  Modal,
  Card,
  Button,
  Typography,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";

import server from "../../../../server.json";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  btn: {
    width: "100%",
    height: "100%",
  },
  card: {
    height: "100%",
  },
  card2: {
    height: "100%",
  },
  image: {
    width: '100%',
    maxWidth: 300,
  },
  media: {
    height: 200,
  },
}));

const SmallItem = (props) => {
  const { dt, idx } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cnt, setCnt] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let check = false;
  const addDt = () => {
    handleClose();
    props.showDt(dt.productName, dt.productClassification2);
  };
  const editShelfLife = dt.productShelfLife.slice(0, 10)

  return (
    <div className={classes.btn}>
      <Card onClick={handleOpen} className={!check ? classes.card : classes.card2}>
        <CardActionArea>
          <CardMedia className={classes.media} image={`${server.ip}/img?id=${dt.productImage}`} />
          <CardContent>
            <Box>
              <Typography variant="h5" component="h2" >
                {dt.productName}
              </Typography>
            </Box>
            <Box p={2}>
              <Chip size="small" label={`수량 | ${dt.productCount}`} />
              <Typography variant="body2" color="textSecondary" component="p">
                유통기한 | {editShelfLife}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid>
              <Grid item>
                <img className={classes.image} src={`${server.ip}/img?id=${dt.productImage}`} />
              </Grid>
              <Grid item>
                <Box>
                  <Box p={1} className={classes.title}>
                    <Typography component="h5" variant="h5">
                      {dt.productName}
                    </Typography>
                    <Chip 
                      label="d-day"
                      color="primary"
                    />
                  </Box>
                  <Divider orientation="horizontal" variant="middle"/>
                  <Box p={1} className={classes.title}>
                    <IconButton>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h5" color="textSecondary">
                      {dt.productCount}
                    </Typography>
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center">
              <Button variant="outlined" startIcon={<RestaurantMenuIcon />} onClick={addDt.bind()}>
                레시피 재료로 추가하기
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default SmallItem;

// 유통기한 조절 (날짜 조정)
// 수량 조절 (캘린더랑 똑같이 함)