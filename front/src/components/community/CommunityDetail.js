import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as Api from "../../api"
import styled from "styled-components"
import axios from "axios"
import CommentAddForm from "../comment/CommentAddForm"
import CommentList from "../comment/CommentList"

const CommunityDetail = () => {
  const [detail, setDetail] = useState({})
  const [isLiked, setIsLiked] = useState(false)

  const pushLike = () => {
    let copied = detail
    if (isLiked) {
      setIsLiked((prev) => !prev)
      setDetail({ ...copied, like: copied.like - 1 })
      const putData = { author: detail.author, like: !isLiked }
      Api.put(`article/${params.id}/like`, putData).then((res) =>
        console.log(res.data)
      )
    } else {
      setIsLiked((prev) => !prev)
      setDetail({ ...copied, like: copied.like + 1 })
      const putData = { author: detail.author, like: !isLiked }
      Api.put(`article/${params.id}/like`, putData).then((res) =>
        console.log(res.data)
      )
    }

    // console.log(isLiked)
  }

  // const pushLike = () => {
  //   let copied = detail
  //   if (isLiked) {

  //   }
  //   else if (!isLiked && )
  //   setDetail()
  // }

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
    Api.get("article", params.id).then((res) => {
      setDetail(res.data.article)
      console.log(res.data)
      setIsLiked(res.data.like)
    })
  }, [])

  const clickHandler = (comment) => {
    let copied = [...example]
    // 유저가 댓글을 두번 이상은 못쓰는 경우 처리하기
    const newComment = { comment, articleId: "happy" }
    copied.push({ isDeleted: false, comment, writeNickname: "happy" })
    Api.post("/comment", newComment).then((res) => {
      console.log(res.data)
    })
    alert("댓글 등록이 완료되었습니다!")
    setExample(copied)
  }

  const editHandler = (item, comment) => {
    const edit = { ...item, comment }
    Api.put("comment/:commentId", edit).then((res) => console.log(res.data))
    const copied = example.map((v) => {
      if (v.writeNickname === edit.writeNickname) {
        return { ...v, comment }
      } else {
        return { ...v }
      }
    })
    console.log(copied)
    setExample(copied)
  }
  const removeHandler = (item) => {
    const deleted = { ...item, isDeleted: true }
    Api.put("comment/:commentId/delete", deleted).then((res) =>
      console.log(res.data)
    )
    const copied = example.map((v) => {
      if (v.writeNickname === deleted.writeNickname) {
        return { ...v, isDeleted: true }
      } else {
        return { ...v }
      }
    })
    console.log(copied)
    setExample(copied)
  }

  return (
    <>
      <Header />
      <Container>
        <div className="detail title">{detail.title}</div>
        <div className="detail writer">
          <div>{detail.nickname}</div>
          <div>{detail.createdAt} / 조회 수</div>
        </div>
        <div className="detail body">{detail.body}</div>
        <div className="detail etc">
          <img src="/images/unlike.png" alt="좋아요"></img>
          <span onClick={pushLike}>좋아요</span>
          <span>{detail.like}</span>
          <img src="/images/comment.png" alt="댓글"></img>
          <span>댓글</span>
          <span>{example.length}</span>
        </div>
        <div className="detail comment">
          <div className="head">댓글</div>
          <div className="area">
            <CommentList
              example={example}
              removeHandler={removeHandler}
              editHandler={editHandler}
            />
            <CommentAddForm clickHandler={clickHandler} />
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
    margin: 10px 0; 
    
    }

    .writer {
      font-size: 13px;
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
      margin: 20px 0;
      margin-right: 10px;
      text-align: center;
    }
  }
`
const Header = styled.div`
  height: 10vh;
`
export default CommunityDetail
