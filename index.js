const code = document.getElementById("codename"); //분류 select id
const place = document.getElementById("guname"); //지역 select id
const contents = document.querySelector("#contents"); //화면출력부분 div

//버튼 클릭시 이벤트 처리
function searchResult() {
  const codeIndex = code.selectedIndex; //분류select index
  selectCode = code.options[codeIndex].value; //분류 value

  const placeIndex = place.selectedIndex; //지역select index
  selectplace = place.options[placeIndex].value; //지역 value

  fetchData();
  //이벤트 실행마다 div 내용 초기화
  contents.innerHTML = "";
}

async function fetchData() {
  let fetchArr = [];
  const fetchRes = await fetch("./seoulevent.json");
  const fetchJson = await fetchRes.json();
  fetchArr = [...fetchJson.DATA];
  //newData = 조건에 맞는 요소만 필터링 한 것
  newData = fetchArr.filter(
    //ele = json객체 1개
    (ele) => ele.codename == selectCode && ele.guname == selectplace
  );

  //조건에맞는 요소 없을시
  if (newData.length == 0) {
    contents.innerHTML = ` <img src="/chunsik-cry.gif" alt="" width="100%" height="500px" id="chunsik">`;
    alert("행사목록이 없습니다!");
  }
  //newData 배열 각각의 요소 화면 출력
  newData.forEach((info) => {
    console.log(info);
    const content = `
        <div class="info">
        <img src="${info.main_img}" alt="" width="230px" height="200px" class="img">
        <div class="title">${info.title}</div>
          <div class="guname">${info.guname}</div>
          <div class="codename">${info.codename}</div>
          <div class="date">${info.date}</div>
          <a href="${info.org_link}" target="_blank">홈페이지 바로가기</a>
          </div>
          `;
    contents.innerHTML += content;
  });
}
