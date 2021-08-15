import { React, useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Paper, Button, createMuiTheme } from "@material-ui/core";
import { useNowCols } from "../../../../common/MediaQueryHooks";
import catDt from "./dump.json";
import CardItem from "../CardItem";


const useStyles = makeStyles((theme) => ({
  grid: {
    border: "1px solid #dfdfdf",
    textAlign: "center",
    borderRadius: "15px",
    margin: "auto",
    height: "100%",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  list: {
    height: "120%",
  },
}));
//삭제 예정
const useGetdata = () => {
  const [catItemDatas, setCatItemDatas] = useState([]);
  const getDatas = async () => {
    setCatItemDatas(catDt);
  };
  useEffect(() => {
    getDatas();
  }, []);
  return catItemDatas;
};


const CardList = (props) => {
  const classes = useStyles();
  // const data = useGetdata();
  const data = props.datas;
  return (
    <div className={classes.root}>
<<<<<<< HEAD
      <Grid xs={12}>
        <GridList container className={classes.list}>
=======
      <Grid container>
>>>>>>> 50e4378615cd53ccf665db1f8c3e333e82eb5f9b
          {data.map((dt, idx) => (
            <Grid item justifyContent="center" alignItems="center" key={idx} xs={6} sm={4} lg={3}>
              <Paper className={classes.grid}>
                <CardItem dt={dt} idx={idx} />
              </Paper>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
export default CardList;
