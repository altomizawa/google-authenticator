import { useState } from 'react'
import './App.css'

function App() {

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    console.log(userId, password)
    const response = await fetch('http://127.0.0.1:3000/verify-mfa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, password })
    })
    const data = await response.json()
    console.log(data)
  }

  const onChange = (e) => {
    const { name, value } = e.target
    if (name === 'userId') {
      setUserId(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  return (
    <>
      <div>
        <h1>Multi-Factor Authentication</h1>
        <form className='flex flex-col gap-2 justify-left mt-12' action={handleSubmit}>
          <div className='flex flex-col gap-2 justify-left'> 
            <label className='text-left font-bold' htmlFor='userId'>User ID:</label>
            <input onChange={onChange} className='border-b-2' name='userId' type="text" placeholder="User ID" />
          </div>
          <div className='flex flex-col gap-2 justify-left'> 
            <label className='text-left font-bold' htmlFor='password'>Password:</label>
            <input onChange={onChange} className='border-b-2' name='password' type="text" placeholder="Password" />
          </div>
          <button className='mt-12' type="submit">Login</button>
        </form>
        <p className='mt-4'>Don't have an account? <a>Click here</a> to create one</p>
      </div>
    </>
  )
}

export default App
