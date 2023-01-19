import { useEffect, useState } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import NumberPageList from '*/components/NumberPageList/NumberPageList';
import { useDispatch, useSelector } from 'react-redux';
import {addNumber} from '../src/Common/GlobalState.js';
import {  ref, child, get, set } from "firebase/database";
import { database } from './firebase.js';
function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.global);
  const [toggleRand,setToggleRand] = useState(false);
  const [toggleList,setToggleList] = useState(false);
  const [fake,setFake] = useState(false);
  const [number,setNumber] = useState(0);
  const dbRef = ref(database);

      get(child(dbRef, 'number')).then( (snapshot) => {
        if (snapshot.exists()) {
          setNumber(snapshot.val().rand);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

  useEffect(() => {
    let timeId = setTimeout(() => {
      if (toggleRand) {
        random();
      }
    },3000)
    return () => {
      clearTimeout(timeId);
    }
  },[number,toggleRand]);
  useEffect(() => {
    let timeId = setTimeout(() => {
      setFake(x => !x);
      return () => {
        clearTimeout(timeId);
      }
    },2800)
  },[fake])
  const random = () => {
    const numberRad = Math.floor(Math.random() * (90 - 1 + 1) + 1)
    const isCheck = state.numberArray.some((x) => x === numberRad);
    if (isCheck) {
      random();
      return;
    }
      dispatch(addNumber(numberRad))
      set(child(dbRef, 'number'), {
        rand  : numberRad,
      });
  }
  const handleClickPlay = () => {
    set(child(dbRef, 'check'), {
      toggle : true,
    });
    get(child(dbRef, 'check')).then( (snapshot) => {
      if (snapshot.exists()) {
        setToggleRand(snapshot.val().toggle);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  const handleClickPause = () => {
    set(child(dbRef, 'check'), {
      toggle : false,
    });
    get(child(dbRef, 'check')).then( (snapshot) => {
      if (snapshot.exists()) {
        setToggleRand(snapshot.val().toggle);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  const handleShowNumberList = () => {
    setToggleList(x => !x);
  }

  return (
    <div className="main">
      <div className='header'>
      <div className="number">{number}</div>
      <div className="button">
        <button onClick={handleClickPlay}>Play</button>
        <button onClick={handleClickPause}>Pause</button>
        <button onClick={handleShowNumberList}>Hiện toàn bộ số</button>
      </div>
      {
        toggleList && 
        <div className="number-list">
            {state.numberArray &&  state.numberArray.map((item) => (
              <button className="button-number">{item}</button>
            ))}
        </div>
      }
      </div>
    <Routes>
      <Route path="/" element={<NumberPageList />} />
    </Routes>
    </div>
  );
}

export default App;
