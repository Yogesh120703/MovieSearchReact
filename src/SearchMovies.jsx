import React, { useState } from 'react'




function SearchMovies() {

    const [query,setQuery] = useState("");
    const [movies,setMovies] = useState([]);

    const searchMovies = async(e) => {
        //window.location.reload(false);
        e.preventDefault();
        
        console.log("submitting");

        //const query = "Jurassic Park";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=b654a11ca911650809de99db754ad21b&language=en-US&query=${query}&page=1&include_adult=false`;

        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results);
            setMovies(data.results);
        }
        catch(err){
            console.log(err);
        }
        
    }
    //`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`
  return (
    <div>
        <form className='form' onSubmit={searchMovies}>
            <label htmlFor="query" className="label">Movie Name: </label>
            <input type="text" name="query" placeholder='i.e The Revenent' className="input" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button className="button" type="submit" >search</button>
        </form>
        <div className="card-list">
            {movies.filter(movie =>movie.poster_path).map(movie => (
                <div className="card">
                    <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt={movie.title+ 'poster'} className="card--image" key={movie.id} />
                    <div className="card-content"></div>
                    <h3 className="card--title">{movie.title}</h3>
                    <p><small>release date: {movie.release_date}</small></p>
                    <p><small>rating: {movie.vote_average}</small></p>
                    <p className="card-desc">{movie.overview}</p>
                </div>
            ))}
        </div>
    </div>
  )
}



export default SearchMovies