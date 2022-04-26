import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import * as Api from "../../api"

const CommunityAddForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [content, setContent] = useState({ title: "", body: "" })
  const [error, setError] = useState({ title: true, body: true })

  const changeHandler = (e) => {
    setContent((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(content)
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
      console.log(error)
    }
  }

  const submitHandler = () => {
    if (!error.title && !error.body) {
      alert("성공했습니다.")
      const newContent = content
      Api.post("artcle/create", newContent).then((res) => {
        console.log(res.data)
      })
      navigate("/community")
    } else {
      alert("실패했습니다. 다시 한 번 확인해주세요.")
    }
  }

  return (
    <Container>
      <div className="header">커뮤니티 글쓰기</div>
      <form className="formContainer">
        <fieldset className="formFieldset">
          <select
            onclick={() => {
              console.log(isOpen)
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
`

export default CommunityAddForm
