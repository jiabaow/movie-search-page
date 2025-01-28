import {useState} from "react";

const MovieSearchPage = () => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div>
            <p>Movie Search Page</p>
            <input type="text" value={input} style={{ width: "300px"}} onChange={handleInputChange}/>
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default MovieSearchPage;
