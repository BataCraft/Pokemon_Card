import { BrowserRouter as Router, Routes, Route}  from "react-router-dom"
import Home from "./Pages/Home"

const AllRouters = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
    
    
    </>
  )
}

export default AllRouters