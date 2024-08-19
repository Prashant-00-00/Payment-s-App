import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { Send } from "./pages/Send"
import { Signin } from "./pages/Signin"
import { Success } from "./pages/Success"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send' element={<Send />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/success' element={<Success />} />
          <Route path='/' element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
