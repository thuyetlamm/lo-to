import React, { useEffect, useState } from 'react';
import './NumberPage.scss'
import {Howl, Howler} from 'howler';
import wait from '*/assets/audio/wait.mp3';
import win from '*/assets/audio/win.mp3';
function NumberPage({arrayNumber}) {
  const soundWait = new Howl({
    src: [wait]
  });
  const soundWin = new Howl({
    src: [win]
  });
  const handleClick = (id,index,idx,num,color) => {
    if(num === 0 ) return;
    const col = document.querySelector(`.${color}-${id}-${index}-${idx}`);
    col.classList.toggle('checked');
    const row =  document.querySelectorAll(`.row-${id}-${index} td`);
    let check = 0;
      Object.values(row).forEach((v) =>  v.classList.contains('checked') && check++);
    if (check === 4) {
        soundWait.play();
      }
    if (check === 5) {
      soundWin.play();
      alert('Chúc mừng bạn đã kinh 😃 🎉')
    }
  }

  return (
    <div className='loto-wrap'>
      <div className='loto-main'>
        <table className='loto-table'>
          <thead></thead>
          <tbody>
          {
            arrayNumber.numberArr.map((item,index) => (
              <tr className={`loto-table-row row-${arrayNumber.id}-${index}`} key={index}>
              {
                item.map((num,idx) => (
                <td 
                className={`loto-table-col ${arrayNumber.color}-${arrayNumber.id}-${index}-${idx}`}
                data-id={idx} 
                key={idx} style={{backgroundColor : num === 0 ? arrayNumber.color : ''}} 
                onClick={() => handleClick(arrayNumber.id,index,idx,num,arrayNumber.color)}>
                  {
                  num !== 0 && num
                  }
                  </td>
                ))
              }
          </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NumberPage;