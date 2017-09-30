import React from 'react'
import { ToastContainer, ToastMessage } from 'react-toastr'

const Toastr = ({ inputFunction }) => {
  const ToastMessageFactory = React.createFactory(ToastMessage.animation)
  return (
    <div>
      <ToastContainer
        ref={ inputFunction }
        toastMessageFactory={ToastMessageFactory}
        className="toast-top-right"
        preventDuplicates
      />
    </div>
  )
}


export default Toastr
