import { useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import SuperHeroesPage from "./components/Superheroes.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import HomePage from "./components/Home.page";

function App() {
  return (
    <BrowserRouter>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/">Home</Link> | <Link to="/superheroes">Super Heroes</Link> |{" "}
        <Link to="/rqsuperheroes">RQ Super Heroes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="superheroes" element={<SuperHeroesPage />} />
        <Route path="rqsuperheroes" element={<RQSuperHeroesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
