import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import server from '../../../server.json';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
    maxWidth: 200,
  }
}));

const showDday = (date) => {
  if (date < 0) {
    console.log('음수')
    return ('D + ' + String(Math.abs(date)))
  } else {
    return ('D - ' + String(date))
  }
};

//foodlist의 카운트 제어를 하기 위해 backend와 연동을 하는 함수
const postCount = async (url, Name, Type) => {
  try {
    const data = await axios({
      method: 'POST',
      url: url,
      data: {
        Name : Name,
        Type : Type
      },
      headers: { 
        accept: 'application/json'
      }
    })
    return data.data
  }
  catch (err) {
    console.log(url);
    console.log(`ERROR: ${err}`);
  }
}


export default function FoodList(props) {
  //카운트 제어를 위한 상태 함수 count에 현재 음식의 카운트를 저장한다
  const [count, setCount] = useState(props.foodCount)
  const classes = useStyles();
  const dDay = showDday(props.foodDday);

  //- 버튼이 클릭됐을 때 동작하는 함수
  async function onMinusClick (){
    console.log(props.foodName, props.foodCount)
    // console.log('마이너스 클릭')
    const cnt = await postCount(`${server.ip}/foodlist/changeCount`, props.foodName, 1)
    // console.log(cnt[0].Count)
    setCount(cnt[0].Count)
  }
  
  //+ 버튼이 클릭됐을 때 동작하는 함수
  async function onPlusClick (){
    // console.log('플러스 클릭')
    const cnt = await postCount(`${server.ip}/foodlist/changeCount`, props.foodName, 2)
    // console.log(cnt[0].Count)
    setCount(cnt[0].Count)
  }

  // 이벤트가 없는 날짜를 클릭하면 메시지를 띄우는 컴포넌트
  const blankPage = <Box>달력에서 유통기한이 있는 날짜를 선택해 주세요.</Box>;

  //음식이름이 아무것도 들어오지 않으면 (이벤트가 없으면) blankpage를 아니라면 foodlist를 띄워준다.
  if (props.foodName !== "undefined") {
    return (
      <Box m={2}>
        <Card className={classes.root}>
          <CardMedia
            component="img"
            alt="recipe-image"
            className={classes.cover}
            image={props.url}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Box p={1} className={classes.title}>
                <Typography component="h5" variant="h5">
                  {props.foodName}
                </Typography>
                <Chip 
                  label={dDay}
                  color="primary"
                />
              </Box>
              <Divider orientation="horizontal" variant="middle"/>
              <Box p={1} className={classes.title}>
                <IconButton>
                  <RemoveIcon onClick={onMinusClick}/>
                </IconButton>
                <Typography variant="subtitle1" color="textSecondary">
                  {count}
                </Typography>
                <IconButton>
                  <AddIcon onClick={onPlusClick}/>
                </IconButton>
              </Box>
            </CardContent>
          </div>
        </Card>
      </Box>
    )
  } else {
    return (
      blankPage
    )
  }
};
