import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import * as Api from "../../api"

const CommunityAddForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [content, setContent] = useState({
    category: "",
    title: "",
    body: "",
    tags: ["인사"],
  })
  const [error, setError] = useState({ title: true, body: true })

  const changeHandler = (e) => {
    setContent((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    errorHandler(e.target.name)
  }

  const errorHandler = (v) => {
    if (content.v === "") {
      setError((prev) => {
        return { ...prev, [v]: true }
      })
    } else {
      setError((prev) => {
        return { ...prev, [v]: false }
      })
    }
  }

  const submitHandler = () => {
    if (!error.title && !error.body) {
      alert("성공했습니다.")
      const newContent = content
      Api.post("article/create", newContent).then((res) => {})
      navigate("/community")
    } else {
      alert("실패했습니다. 다시 한 번 확인해주세요.")
    }
  }

  const keyPressHandler = (e) => {
    const copied = content
    if ((e.code = "Enter" && e.target.value)) {
      copied.tags.push(e.target.value)
      setContent((prev) => {
        return { ...prev, tags: copied.tags }
      })
    }
  }

  const removeHandler = (e) => {
    const copied = content
    const copiedTags = copied.tags.filter(
      (item) => item !== e.target.textContent
    )
    setContent((prev) => {
      return { ...prev, tags: copiedTags }
    })
  }

  return (
    <Container>
      <div className="header">커뮤니티 글쓰기</div>
      <form className="formContainer">
        <fieldset className="formFieldset">
          <select
            onclick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <option disabled selected>
              {isOpen ? `말머리 선택 안함` : `말머리 선택`}
            </option>
            <option>필독</option>
            <option>자유</option>
            <option>꿀팁</option>
            <option>건의사항</option>
            <option>리뷰</option>
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
              placeholder={
                content.tags.length > 3
                  ? "최대 3개의 태그까지만 가능합니다."
                  : "태그를 입력하세요"
              }
              onKeyPress={keyPressHandler}
              disabled={content.tags.length > 3 ? true : false}
            />
          </div>

          {content.tags.map((item) => (
            <span onClick={removeHandler}>{item}</span>
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
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 60vh;

  form {
    border: solid 2px grey;
    border-radius: 3px;
  }

  .header {
    margin: 20px;
    padding: 10px;
    width: 100vh;
    border-bottom: 2px solid grey;
    font-weight: bold;
    font-size: 30px;
  }

  .formFieldset {
    margin: 10px;
    padding: 10px;
    width: 100vh;

    select {
      width: 50vh;
    }

    input {
      width: 50vh;
    }

    textarea {
      width: 100%;
      min-height: 20vh;
    }
  }

  .buttonContainer {
    margin: 10px;
    padding: 10px;
    width: 100vh;
    text-align: end;

    .formButton {
      border: none;
      padding: 4px;
      color: white;
      font-weight: 700;
      width: 20%;

      border-radius: 3px;
      cursor: pointer;
    }

    .submitButton {
      margin-right: 10px;
      background: #6c63ff;
    }

    .cancelButton {
      background: #ff6b6b;
    }
  }
  span {
    border: 2px solid black;
    margin: 5px;
  }
  input#tag {
    margin-bottom: 5px;
  }
`

export default CommunityAddForm
