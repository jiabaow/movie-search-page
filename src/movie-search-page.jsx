import {useState} from "react";
import axios from "axios";

const MovieSearchPage = () => {
    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);
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
                })
                setMovies(movieDetails);
                console.log(movieDetails)
            })
            .catch(err => console.error(err));
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div>
            <p>Movie Search Page</p>
            <input type="text" value={input} style={{ width: "300px"}} onChange={handleInputChange}/>
            <button onClick={handleSubmit}>Search</button>
            {movies &&
                <ul>
                    {movies.map((item) => {
                        return <li key={item.id}>{item.title}</li>;
                    })}
                </ul>
            }
        </div>
    )
}

export default MovieSearchPage;
