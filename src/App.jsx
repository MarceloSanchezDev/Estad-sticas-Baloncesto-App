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
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken("");
    setUser({});
  };

  const login = (tok, user) => {
    sessionStorage.setItem("token", tok);
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(tok);
    setUser(user);
  };

  return (
    <Router>
      <div className="container">
        {token && <Nav logout={logout} />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Main token={token} />} />
            <Route path="/login" element={<Login login={login} token={token} />} />
            <Route path="/register" element={<Register login={login} token={token} />} />
            <Route path="/profile" element={<Profile token={token} user={user} />} />
            <Route path="/newStatistic" element={<NewStatistic token={token} user={user} />} />
            <Route path="/allStatistic" element={<AllStatistic token={token} user={user} />} />
            <Route path="/allStatisticPercentage" element={<AllStatisticPercentage token={token} user={user} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
