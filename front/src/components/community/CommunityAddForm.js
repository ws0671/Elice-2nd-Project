import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post as Post } from "../../api";
import { Container } from "../styles/Community/CommunityAddFormStyle";

// 커뮤니티 글쓰기 추가폼 컴포넌트
const CommunityAddForm = () => {
  const navigate = useNavigate();

  // 추가할 내용 데이터 상태값
  const [content, setContent] = useState({
    category: "",
    title: "",
    body: "",
    tags: [],
  });
  // 태그 인풋 상태값
  const [tag, setTag] = useState("");
  // 에러 확인 상태값
  const [error, setError] = useState({ title: true, body: true });

  // 인풋 변경 시 사용되는 함수
  const changeHandler = (e) => {
    setContent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(content);
    errorHandler(e.target.name);
  };
  // 에러 상태 변경 함수
  const errorHandler = (v) => {
    if (content.v === "") {
      setError((prev) => {
        return { ...prev, [v]: true };
      });
    } else {
      setError((prev) => {
        return { ...prev, [v]: false };
      });
    }
  };
  // 폼 제출 함수
  const submitHandler = () => {
    if (!error.title && !error.body && content.category) {
      alert("성공했습니다.");
      const newContent = content;
      Post("article", newContent).then((res) => navigate("/community"));
    } else alert("실패했습니다. 다시 한 번 확인해주세요.");
  };

  // 태그 인풋 enter시 태그값 추가 함수
  const keyPressHandler = (e) => {
    const copied = content;
    if (e.key === "Enter" && e.target.value) {
      copied.tags.push(e.target.value);
      setContent((prev) => {
        return { ...prev, tags: copied.tags };
      });
      setTag("");
    }
  };

  // 해당 태그 삭제 함수
  const removeHandler = (e) => {
    const copied = content;
    const copiedTags = copied.tags.filter(
      (item) => item !== e.target.textContent
    );
    setContent((prev) => {
      return { ...prev, tags: copiedTags };
    });
  };

  return (
    <Container>
      <div className="header">커뮤니티 글쓰기</div>
      <form className="formContainer">
        <fieldset className="formFieldset">
          <select name="category" onChange={changeHandler}>
            <option id="notUse" value="말머리 선택">
              말머리 선택
            </option>
            <option value="선택 안함">말머리 선택 안함</option>
            <option value="공지사항">공지사항</option>
            <option value="유머">유머</option>
            <option value="파티 모집">파티 모집</option>
            <option value="건의사항">건의사항</option>
            <option value="후기">후기</option>
            <option value="꿀팁">꿀팁</option>
          </select>
        </fieldset>

        <fieldset className="formFieldset">
          <input
            value={content.title}
            id="title"
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            onChange={changeHandler}
          ></input>
        </fieldset>

        <fieldset className="formFieldset">
          <textarea
            className="text-area"
            placeholder="내용을 입력해주세요"
            value={content.body}
            name="body"
            onChange={changeHandler}
          ></textarea>
        </fieldset>

        <fieldset className="formFieldset">
          <div>
            <div>태그 설정</div>
            <input
              type="text"
              id="tag"
              size="20"
              value={tag}
              placeholder={
                content.tags.length >= 3
                  ? "최대 3개의 태그까지만 가능합니다."
                  : "태그를 입력하세요"
              }
              onKeyPress={keyPressHandler}
              onChange={(e) => setTag(e.target.value)}
              disabled={content.tags.length >= 3 ? true : false}
            />
          </div>

          {content.tags &&
            content.tags.map((item) => (
              <span key={content.tags.indexOf(item)} onClick={removeHandler}>
                {item}
              </span>
            ))}
        </fieldset>

        <div className="buttonContainer">
          <button
            onClick={submitHandler}
            type="button"
            className="formButton submitButton"
          >
            글올리기
          </button>

          <button
            onClick={() => navigate("/community")}
            type="button"
            className="formButton cancelButton"
          >
            취소
          </button>
        </div>
      </form>
    </Container>
  );
};

export default CommunityAddForm;
