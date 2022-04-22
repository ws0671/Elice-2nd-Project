import React, { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import { UserStateContext, DispatchContext } from "../App"
import { Button } from "react-bootstrap"

function Main() {
  const navigate = useNavigate()
  const location = useLocation()

  const userState = useContext(UserStateContext)
  const dispatch = useContext(DispatchContext)

  return (
    <>
      <div>h</div>
    </>
  )
}

export default Main
