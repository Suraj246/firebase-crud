import './App.css';
import SignIn from './components/SignIn'
import PostPage from './components/PostPage'
import { useState, useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'
function App() {
  const [user, setUser] = useState([])


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PostPage user={user} setUser={setUser} />} />
        <Route path="/login" element={<SignIn user={user} setUser={setUser} />} />
      </Routes>
    </div >
  );
}

export default App;


