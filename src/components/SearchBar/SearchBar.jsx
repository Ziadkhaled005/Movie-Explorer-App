// import { useState } from "react";
// import "./SearchBar.css";

// const SearchBar = ({ onSearch }) => {
//     const [query, setQuery] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (query.trim()) {
//             onSearch(query);
//         }
//     };

//     return (
//         <form
//             className="search-bar"
//             onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search for movies..."
//                 className="search-input"
//             />
//             <button
//                 type="submit"
//                 className="search-button">
//                 🔍
//             </button>
//         </form>
//     );
// };

// export default SearchBar;

import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, initialValue = "" }) => {
    const [query, setQuery] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    };

    return (
        <form
            className="search-bar"
            onSubmit={handleSubmit}>
            <div className="search-input-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    className="search-input"
                    aria-label="Search movies"
                />
                {query && (
                    <button
                        type="button"
                        className="clear-button"
                        onClick={handleClear}
                        aria-label="Clear search">
                        ✕
                    </button>
                )}
            </div>
            <button
                type="submit"
                className="search-button"
                aria-label="Search">
                🔍
            </button>
        </form>
    );
};

export default SearchBar;
