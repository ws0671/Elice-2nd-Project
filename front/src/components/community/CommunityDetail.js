import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
const CommunityDetail = () => {
  const params = useParams()
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((res) => console.log(res.data))
  }, [])

  return <div>안녕</div>
}

export default CommunityDetail
