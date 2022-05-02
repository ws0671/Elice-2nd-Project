import Swal from "sweetalert2";

import { put as Put } from "../../api";

// 현재 로그인 유저 데이터 값
const MypageEditModal = (nickname, userId) => {
  (async () => {
    const { value: getNickname } = await Swal.fire({
      title: "수정할 닉네임을 적어주세요",
      // text: "그냥 예시일 뿐입니다.",
      input: "text",
      inputValue: nickname,
      showCancelButton: true,
      inputPlaceholder: "닉네임을 입력하세요",
      confirmButtonText: "확인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소",
    });
    // 이후 처리되는 내용.
    if (getNickname) {
      Swal.fire("닉네임이 정상적으로 변경되었습니다");
      Put(`user/${userId}`, { nickname: getNickname }).then((res) =>
        console.log(res.data)
      );
    }
  })();
};

export default MypageEditModal;
