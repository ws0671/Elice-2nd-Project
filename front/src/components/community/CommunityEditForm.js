import { useState, useEffect } from "react";
import { Container } from "../styles/Community/CommunityAddFormStyle";
import * as Api from "../../api";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";

const CommunityEditForm = ({ isEditing }) => {
  // 해당 글 내용 데이터 상태값
  const [content, setContent] = useState([]);
  // 태그 인풋 상태값
  const [tag, setTag] = useState("");
  const params = useParams();

  useEffect(() => {
    Api.get("article", params.id).then((res) => {
      setContent(res.data.article);
    });
  }, []);

  const bodyChangeHandler = (data) => {
    setContent((prev) => ({ ...prev, body: data }));
    // if (content.body === "") setError((prev) => ({ ...prev, body: true }));
    // else setError((prev) => ({ ...prev, body: false }));
  };

  // 인풋박스 변경시 적용되는 함수
  const changeHandler = (e) => {
    setContent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 폼 제출용 함수
  const submitHandler = () => {
    if (content.title && content.body && content.category) {
      const newContent = content;
      Api.put(`article/${params.id}`, newContent).then((res) => {
        Swal.fire("성공했습니다.");
        isEditing();
      });
    } else {
      Swal.fire("실패했습니다. 다시 한 번 확인해주세요.");
    }
  };

  // 태그 추가용 함수
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

  // 태그 삭제용 함수
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
      <div className="header">커뮤니티 글쓰기(수정)</div>
      <form className="formContainer">
        <fieldset className="formFieldset">
          <select
            name="category"
            defaultValue={content.category}
            key={content.category}
            onChange={changeHandler}
          >
            <option style={{ display: "none" }} value="말머리 선택">
              말머리 선택
            </option>
            <option value="default">말머리 선택 안함</option>

            <option value="notice">공지사항</option>
            <option value="humor">유머</option>
            <option value="partyRecruitment">파티 모집</option>
            <option value="suggestions">건의사항</option>
            <option value="postscript">후기</option>
            <option value="honeytip">꿀팁</option>
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
          {/* <textarea
            className="text-area"
            placeholder="내용을 입력해주세요"
            value={content.body}
            name="body"
            onChange={changeHandler}
          ></textarea> */}
          <CKEditor
            editor={ClassicEditor}
            data={content.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              bodyChangeHandler(data);
            }}
          />
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
                content.tags && content.tags.length >= 3
                  ? "최대 3개의 태그까지만 가능합니다."
                  : "태그를 입력하세요"
              }
              onKeyPress={keyPressHandler}
              onChange={(e) => setTag(e.target.value)}
              disabled={content.tags && content.tags.length >= 3 ? true : false}
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
            확인
          </button>

          <button
            onClick={isEditing}
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

export default CommunityEditForm;
