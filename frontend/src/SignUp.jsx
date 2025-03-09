import React from 'react'
import { useState } from 'react'

const Signup = () => {
  const [userId, setUserId] = useState('')
  const [qrCode, setQrCode] = useState('')
  
  const onChange = (e) => {
    const { value } = e.target
    setUserId(value)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/setup-mfa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      })
      // const data = await response.json()
      if (response) {
        setQrCode(qrCode)
      } else {
        console.log('Error initiating MFA setup')
      }
    } catch (error) {
      console.log('error:', error)
    }
  }
  
  return (
    <div className='min-w-[480px] w-[640px]'>
      <h1>SIGN UP</h1>
      <form className='flex flex-col gap-2 justify-left mt-12' action={handleSubmit}>
        <div className='flex flex-col gap-2 justify-left'> 
          <label className='text-left font-bold' htmlFor='userId'>User ID:</label>
          <input onChange={onChange} className='border-b-2' name='userId' type="text" placeholder="User ID" />
        </div>
        <button className='mt-12' type="submit">Sign Up</button>
      </form>
      <p className='mt-4'>Already have an account? <a href='/' className='cursor-pointer'>Click here</a> to sign in</p>
    </div>
  )
}

export default Signup
