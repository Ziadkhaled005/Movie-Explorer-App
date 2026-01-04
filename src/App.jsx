import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Favorites from "./pages/Favorites/Favorites";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <div className="App">
                    <Header />
                    <main>
                        <Routes>
                            <Route
                                path="/"
                                element={<Home />}
                            />
                            <Route
                                path="/movie/:id"
                                element={<MovieDetails />}
                            />
                            <Route
                                path="/favorites"
                                element={<Favorites />}
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
