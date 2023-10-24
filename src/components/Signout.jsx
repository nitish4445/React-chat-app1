import React from 'react'

const Signout = (props) => {
  return props.auth.currentUser && (
    <>
      <button className='sing-out' onClick={()=>props.auth.signOut()}>Sign Out</button>
    </>
  )
}

export default Signout;
