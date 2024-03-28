//////////////////
// package.json 에서 scripts에서 "start": "PORT=3002 react-scripts start",
// PORT 3002에서 열림
/////////////////

import React, { useEffect, useState } from 'react';
import './App.css'; // App, AppText

function App() {
  // 루프백 실패로 인한 퍼블릭 어드레스 State...
  const [APITo, setAPITO] = useState('http://ec2-3-35-120-59.ap-northeast-2.compute.amazonaws.com:8002/count_click/click/')
  console.log("APITo:",APITo)
  // 누를 때 POST요청 보내는 함수
  const postCount = () => {
    //fetch
    fetch(APITo, { // VM의 프라이빗 주소 => 실패... 어째서 EC2 인스턴스 상에서 루프백이 불가능한 걸까..?
      method: 'POST', // POST요청 명시
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({}), //빈 Body
    }) //여기까지 fetch
    //then => response
    .then(response => response.json()) //응답 json으로 파싱
    // then=> data
    .then(data => {
      console.log('POST request succeeded:', data);
      setCount(data.count_id);
    })
    .catch(error => {
      console.error('POST request failed:', error);
      setCount('Error'); // 에러 발생 setCount('Error')
    });
  }


// click this ! 색 변경 state, handlers
  const [clickThisColor, setClickThisColor] = useState('#FFFFFF'); 
  const handleClickThisDown = () => {
    setClickThisColor("#222222")
    postCount(); // 완료 !
  };
  const handleClickThisUp = () => {
    setClickThisColor('#FFFFFF')
  }

// count state
const [count, setCount] = useState(0);

// 페이지 로드될 때 count 불러오는 Effect
// Django API TEST Successed !
// 그러나 첫 번째 실패 => Django CORS ?
// 맞음 ! => 장고 CORS 수정/ 장고 서버는 8002번 포트에서 열림/ React App은 3002번 포트에서 열리게끔
useEffect(() => { 
  fetch(APITo) // 어차피 React App, Django Server 같은 VM, 루프백 서버로 사용 ~~~
    // VM의 프라이빗 주소 => 실패... 어째서 EC2 인스턴스 상에서 루프백이 불가능한 걸까..?
    // try
    .then(response => response.json()) //json화
    .then(data => { 
      setCount(data.count_id); // count_id값으로 count state 설정
      console.log('GET request succeeded ! ');
      console.log(data);
    })
    // catch
    .catch(error => {
      console.log('GET request failed ... ');
      console.error('Error:', error);
      setCount('Error');
    })
  },[]) 


// 의존성 배열은 당연히 없음 <= 페이지가 로드될 때 실행되는 Effect를 의미

////////////////////////////////return part
  return (
    <div 
      className="App"
      style = {{
        flexDirection:'column'
      }}
    >
{/*click this !*/}
      <div 
        className='AppText'
        style={{
          color : clickThisColor,
          fontSize : 40
        }}
        onMouseDown = {handleClickThisDown}
        onMouseUp = {handleClickThisUp}
      >
        click this !
      </div>
{/*count !*/}
      <div 
        className="AppText"
        style = {{
          color : '#FFFFFF',
          fontSize : 30,
          marginTop:20
        }}
      >
        {count}
      </div>
      <a href="https://github.com/dlawork9888" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <div 
          className="AppText"
          style={{
            color : '#888888',
            fontSize : 20,
            marginTop:100
          }}
        >
          github.com/dlawork9888
        </div>
      </a>
    </div>
  );
}

export default App;
