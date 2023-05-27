import React from "react";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddItems from "./components/Admin/AddItems/AddItems";
import { BrowserRouter, Routes, Route } from "react-router-dom"
const App = () => {
  return(
    // <>
    //   <AdminDashboard/>
    //   {/* <AddItems/> */}
    // </>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard/>}></Route>
        <Route path="/add-items-page" element={<AddItems/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App