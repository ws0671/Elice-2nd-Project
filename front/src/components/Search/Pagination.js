import React from "react";

const Pagination = () => {
  const MAX_PAGE_COUNT = 10; // MAX_PAGE_COUNT -> 한번에 보여지는 페이지 수,
  let resultList = [];
  function getPaginationArray(currPage, pageCount) {
    // 1, 11, 21 ... 페이지가 선택될 때 ,
    // 1~10, 11~20, 21~30 ... 리스트 생성
    if ((currPage + 1) % MAX_PAGE_COUNT === 1) {
      let idx = 1;
      resultList = [currPage];
      while (resultList.length < MAX_PAGE_COUNT && currPage + idx < pageCount) {
        resultList.push(currPage + idx);
        idx++;
      }
      // 9, 19, 29 ... 페이지가 선택될 때,
      // 1~10, 11~20, 21~30 ... 리스트 생성
    } else if (currPage % MAX_PAGE_COUNT === MAX_PAGE_COUNT - 1) {
      let idx = 1;
      resultList = [currPage];
      while (resultList.length < MAX_PAGE_COUNT) {
        resultList.unshift(currPage - idx);
        idx++;
      }
    }
    return resultList;
  }

  return <div>Pagination</div>;
};

export default Pagination;
