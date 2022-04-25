import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CommunityAddForm = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  return (
    <>
      <div>커뮤니티 글쓰기</div>
      <form className="formContainer">
        <fieldset className="formFieldset">
          <input
            value={title}
            id="title"
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
          ></input>
        </fieldset>

        <fieldset className="formFieldset">
          <input
            value={body}
            id="content"
            type="text"
            name="content"
            placeholder="내용을 입력해 주세요."
          ></input>
        </fieldset>

        <fieldset className="formFieldset">
          <select>
            <option value="americano">아메리카노</option>
            <option value="caffe latte">카페라테</option>
            <option value="cafe au lait">카페오레</option>
            <option value="espresso">에스프레소</option>
          </select>
        </fieldset>

        <div className="buttonContainer">
          <button
            onClick={() => navigate("/community")}
            type="button"
            className="formButton resetButton"
          >
            글올리기
          </button>

          <button
            onClick={() => navigate("/community")}
            type="button"
            className="formButton submitButton"
          >
            취소
          </button>
        </div>
      </form>
    </>
  )
}

export default CommunityAddForm
