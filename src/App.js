import { Routes, Route } from "react-router-dom";

// components
import MyNavBar from "./components/Navbar";

// pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/Listing";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/viewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/Home";

function App() {
  return (
    <>
      <div>
        {" "}
        <MyNavBar />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/book/list" element={<ListingPage />}></Route>
        <Route path="/book/view/:bookId" element={<BookDetailPage />}></Route>
        <Route path="/book/orders" element={<OrdersPage />}></Route>
        <Route
          path="/books/orders/:bookId"
          element={<ViewOrderDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
