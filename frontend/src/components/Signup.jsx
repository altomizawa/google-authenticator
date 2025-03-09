import React from 'react'

const Signup = () => {
  return (
    <div>
      <h1>SIGN UP</h1>
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
      <p className='mt-4'>Don't have an account? <a href='/signup' className='cursor-pointer'>Click here</a> to create one</p>
    </div>
  )
}

export default Signup
