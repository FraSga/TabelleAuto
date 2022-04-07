import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import HomePage from "./pages/HomePage/Homepage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    console.log(location);
  }, [location.pathname]);

  function checkToken() {
    let token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((res) => res.json())
      .then((res) => {
        alert("username e password corrette "+JSON.stringify(res));
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/auth/login");
      });
  }

  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
