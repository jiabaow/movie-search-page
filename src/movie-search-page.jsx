import {useState} from "react";
import axios from "axios";

const MovieSearchPage = () => {
    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const apiKey = process.env.REACT_APP_TMDB_KEY;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: apiKey,
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        setError(null);
        fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const movieDetails = res.results.map((item) => {
                    return {
                        id: item.id,
                        title: item.title,
                        poster_path: item.poster_path
                    };
                });
                setMovies(movieDetails);
                console.log(movieDetails);
            })
            .catch(err => {
                console.error(err);
                setError(
                    "There was an error loading the movie search results. Please try again later."
                );
            });
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div>
            <p>Movie Search Page</p>
            <input type="text" value={input} style={{width: "300px"}} onChange={handleInputChange}/>
            <button onClick={handleSubmit}>Search</button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {movies.map((item) => (
                    <div key={item.id}>
                        <div style={{ border: "1px solid gray", width: "150px", textAlign: "center" }}>
                            <h3>{item.title}</h3>
                            {item.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    style={{ width: "100px" }}
                                    alt={item.title}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default MovieSearchPage;
