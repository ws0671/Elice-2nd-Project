import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as Api from "../../api"
import styled from "styled-components"
import CommentAddForm from "../comment/CommentAddForm"
import CommentList from "../comment/CommentList"

const CommunityDetail = () => {
  const [detail, setDetail] = useState({})
  const [isLiked, setIsLiked] = useState(false)
  const [example, setExample] = useState([])

  const params = useParams()
  useEffect(() => {
    Api.get("article", params.id).then((res) => {
      setDetail(res.data.article)
      console.log(res.data)
      setIsLiked(res.data.like)
      setExample(res.data.comments)
    })
  }, [])

  const clickHandler = (comment) => {
    let copied = [...example]

    const newComment = { comment, articleId: detail.articleId }
    // copied.push({ isDeleted: false, comment, writerNickname: "happy" })
    Api.post("comment", newComment).then((res) => {
      copied.push(res.data)
      alert("댓글 등록이 완료되었습니다!")
      setExample(copied)
      console.log(example)
    })
  }

  const editHandler = (item, comment) => {
    const edit = { ...item, comment }
    Api.put(`comment/${item.commentId}`, edit).then((res) =>
      console.log("수정데이터", res.data)
    )
    const copied = example.map((v) => {
      if (
        v.writeNickname === edit.writeNickname &&
        v.commentId === item.commentId
      ) {
        return { ...v, comment }
      } else {
        return { ...v }
      }
    })
    console.log("최종 수정된 데이터", copied)
    setExample(copied)
  }
  const removeHandler = (item) => {
    const deleted = { ...item, isDeleted: true }
    Api.put(`comment/${item.commentId}/delete`, deleted).then((res) =>
      console.log(res.data)
    )
    const copied = example.map((v) => {
      if (
        v.writeNickname === deleted.writeNickname &&
        v.commentId === item.commentId
      ) {
        return { ...v, isDeleted: true }
      } else {
        return { ...v }
      }
    })
    console.log(copied)
    setExample(copied)
  }

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

  const realComments = example.filter((v) => v.isDeleted === false)
  const createDate = detail.createdAt

  return (
    <>
      <Header />
      <Container>
        <div className="detail title">{detail.title}</div>
        <div className="detail writer">
          <div>{detail.nickname}</div>
          <div>{createDate && createDate.split("T")[0]} / 조회 수</div>
        </div>
        <div className="detail body">{detail.body}</div>
        <div className="detail etc">
          <img
            src={!isLiked ? "/images/unlike.png" : "/images/like.png"}
            alt="좋아요"
          ></img>
          <span className="liking" onClick={pushLike}>
            좋아요
          </span>
          <span>{detail.like}</span>
          <img src="/images/comment.png" alt="댓글"></img>
          <span>댓글</span>
          <span>{realComments.length}</span>
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

  .liking:hover {
    font-weight: bold;
    cursor: pointer;
    background: rgba(108, 99, 255, 0.3);
    border-radius: 100px;
  }
`
const Header = styled.div`
  height: 10vh;
`
export default CommunityDetail
