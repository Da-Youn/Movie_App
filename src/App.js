import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('http://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    // 영화 데이터 로딩!
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        <Header />
        {isLoading ? (
          <div className="loader">
            <span className="loafer_text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.large_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
        <Footer />
      </section>
    );
  }
}

export default App;
