import React, { Component } from 'react'
import { getMovies } from './getMovies'
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            movies: getMovies()
        }
    }
    onDelete = (id) => {
        let newArr = this.state.movies.filter(function (movie) {
            if (movie._id !== id) {
                return true;
            }
            return false;
        })
        this.setState({
            movies: newArr
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        Hello
                    </div>
                    <div className="col-9">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Rental</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.movies.map((movie) => {
                                        return (
                                            <tr key={movie._id}>
                                                <th scope="row"></th>
                                                <td>{movie.title}</td>
                                                <td>{movie.genre.name}</td>
                                                <td>{movie.numberInStock}</td>
                                                <td>{movie.dailyRentalRate}</td>
                                                <td><button type="button" className="btn btn-danger" onClick={
                                                    () => {
                                                        this.onDelete(movie._id);
                                                    }
                                                } >Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div >
            </div>
        )
    }
}