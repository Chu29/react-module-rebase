import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import MealDetailsPage from "./pages/MealDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" Component={HomePage}></Route>
        <Route path="/categories" Component={CategoryPage}></Route>
        <Route path="/meal-details" Component={MealDetailsPage}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
