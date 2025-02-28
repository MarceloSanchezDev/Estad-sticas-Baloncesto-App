import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import NewStatistic from "./components/NewStatistic";
import AllStatistic from "./components/AllStatistics";
import AllStatisticPercentage from "./components/AllStatisticPercentage";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const login = (tok) => {
    localStorage.setItem("token", tok);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  };

  return (
    <Router>
      {token && <Nav logout={logout} />}
      <Routes>
        <Route path="/" element={<Main token={token} />} />
        <Route path="/login" element={<Login login={login} token={token} />} />
        <Route
          path="/register"
          element={<Register login={login} token={token} />}
        />
        <Route
          path="/profile"
          element={<Profile token={token} logout={logout} />}
        />
        <Route
          path="/newStatistic"
          element={<NewStatistic token={token} logout={logout} />}
        />
        <Route
          path="/allStatistic"
          element={<AllStatistic token={token} logout={logout} />}
        />
        <Route
          path="/allStatisticPercentage"
          element={<AllStatisticPercentage token={token} logout={logout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
