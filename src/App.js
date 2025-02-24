import { Routes, Route } from "react-router-dom";

// components
import MyNavBar from "./components/Navbar";

// pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/Listing";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <div>
        {" "}
        <MyNavBar />
      </div>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}></Route>

        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/book/list" element={<ListingPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
