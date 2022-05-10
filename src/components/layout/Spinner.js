import React from 'react'
import spinnerImg from "../images/loading-gif.gif"

const Spinner = () => {
  return (
    <>
      <div>
          <img src={spinnerImg} alt="" className="d-block m-auto" />
      </div>
    </>
  )
}

export default Spinner