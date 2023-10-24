import React from 'react'

const SingIn = (props) => {
  const handleSignIn=()=>{
    const provider= new props.firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
}
return (
<>
  <button className='sign-in' onClick={handleSignIn}>Sign In with google</button>
  <p>Lets connect to talk and grow together</p>
</>
)
}

export default SingIn
