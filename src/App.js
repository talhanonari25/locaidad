import React from 'react'
import Home from './Components/Home/Home'
import Signup from './Components/Auth/Signup'

const App = () => {
  return (
    <div>
      <Home days={120}/>
      <Signup/>
    </div>
  )
}

export default App