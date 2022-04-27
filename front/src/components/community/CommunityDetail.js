import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as Api from "../../api"
import styled from "styled-components"
import axios from "axios"
const CommunityDetail = () => {
  const [detail, setDetail] = useState({})
  const [comment, setComment] = useState("")

  const [view, setView] = useState(false)

  // 댓글 mock data(back과 통신 연결 후 삭제하기)
  const comments = [
    {
      writeNickname: "프로게이머",
      comment: "새로운 댓글1",
      isDeleted: false,
    },
    {
      writeNickname: "포켓몬",
      comment: "새로운 댓글2",
      isDeleted: false,
    },
  ]
  const [example, setExample] = useState(comments)
  const params = useParams()
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((res) => setDetail(res.data))
  }, [])

  const clickHandler = () => {
    let copied = comments
    // 유저가 댓글을 두번 이상은 못쓰는 경우 처리하기
    const newComment = { comment, articleId: "happy" }
    copied.push({ comment, writeNickname: "happy" })
    Api.post("/comment", newComment).then((res) => {
      console.log(res.data)
    })
    alert("댓글 등록이 완료되었습니다!")
    setExample(copied)
    setComment("")
  }

  return (
    <>
      <Header />
      <Container view={view}>
        <div className="detail title">{detail.title}</div>
        <div className="detail">
          <div>작성자</div>
          <div>작성 시간 / 조회 수</div>
        </div>
        <div className="detail body">{detail.body}</div>
        <div className="detail etc">
          <img src="/images/unlike.png" alt="좋아요"></img>
          <span>좋아요</span>
          <span>0</span>
          <img src="/images/comment.png" alt="댓글"></img>
          <span>댓글</span>
          <span>{example.length}</span>
        </div>
        <div className="detail comment">
          <div className="head">댓글</div>
          <div className="area">
            {example.map((item) => {
              return (
                !item.isDeleted && (
                  <div className="comment-area">
                    <div>
                      <div className="nickname">{item.writeNickname}</div>
                      <div className="comment">{item.comment}</div>
                    </div>
                    <img
                      src="/images/viewmore.png"
                      alt="더보기"
                      onClick={() => {
                        setView(!view)
                      }}
                    ></img>
                    <ul className="dropdown">
                      <li>수정</li>
                      <li
                        onClick={() => {
                          const deleted = { ...item, isDeleted: true }
                          Api.put("comment/:commentId/delete", deleted).then(
                            (res) => console.log(res.data)
                          )
                          const copied = comments.map((v) => {
                            if (v.writeNickname === deleted.writeNickname) {
                              return { ...v, isDeleted: true }
                            } else {
                              return { ...v }
                            }
                          })

                          console.log(copied)
                          setExample(copied)
                        }}
                      >
                        삭제
                      </li>
                    </ul>
                  </div>
                )
              )
            })}
            <textarea
              className="write-area"
              placeholder="댓글을 남겨보세요."
              value={comment}
              name="comment"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button onClick={clickHandler}>등록</button>
          </div>
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .title {
    font-size: 25px;
    font-weight: bold;
  }

  .detail {
    width: 60%;

    .area {
      .comment-area {
        margin-bottom: 20px;
        font-size: 13px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // align-items: center;

        img {
          width: 20px;
          height: 20px;

          &:hover {
            cursor: pointer;
            background: rgba(108, 99, 255, 0.3);
            border-radius: 3px;
          }
        }

        .dropdown {
          display: ${({ view }) => (view ? "block" : "none")};
          position: absolute;
          left: 80%;
          background-color: #f9f9f9;
          min-width: 60px;
          padding: 8px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          list-style-type: none;

          li {
            font-weight: normal;
            text-align: center;
          }
          li:hover {
            background: rgba(108, 99, 255, 0.3);
            border-radius: 2px;
            font-weight: bold;
            // color: white;
            cursor: pointer;
          }
        }

        &:not(:nth-last-of-type(1)) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        }
      }
      .write-area {
        width: 100%;
        height: 20vh;
      }
      button {
        width: 10%;
        float: right;
        position: relative;
        margin: -50px 10px 0 0;
        border: none;
        padding: 4px;
        color: white;
        font-weight: 700;

        border-radius: 3px;
        cursor: pointer;
        background: #6c63ff;
      }
    }

    &:not(:nth-of-type(2)) {
      margin: 10px;
      padding: 10px;
    }

    &:nth-of-type(2) {
      margin: 0 10px;
      padding: 0 10px;
      font-size: 12px;
    }
  }
  .comment .head {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .etc {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
    }

    * {
      margin-right: 10px;
      text-align: center;
    }
  }
`
const Header = styled.div`
  height: 10vh;
`
export default CommunityDetail
