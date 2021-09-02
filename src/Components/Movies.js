import React, { Component } from 'react'
import { getMovies } from './getMovies'
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            movies: getMovies(),
            searchText: ""
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

    sorted = (key, order) => {
        let tempArr = [...this.state.movies]
        if (key === "stock") {
            tempArr.sort(function (keyA, keyB) {
                if (order === "dsc") {
                    return keyA.numberInStock - keyB.numberInStock;
                }
                else {
                    return keyB.numberInStock - keyA.numberInStock;
                }
            })
        }
        else {
            tempArr.sort(function (keyA, keyB) {
                if (order === "dsc") {
                    return keyA.dailyRentalRate - keyB.dailyRentalRate;
                }
                else {
                    return keyB.dailyRentalRate - keyA.dailyRentalRate;
                }
            })
        }
        this.setState({ movies: tempArr })
    }

    render() {
        let filteredArr = [];
        let { movies, searchText } = this.state;
        if (searchText === "") {
            filteredArr = movies;
        }
        else {
            filteredArr = movies.filter((movie) => {
                let title = movie.title.toLowerCase();
                if (title.includes(searchText.toLowerCase())) {
                    return true;
                }
                return false;
            })
        }
        let count = 0;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        Hello
                    </div>
                    <div className="col-9">
                        <div className="input-group mb-3">
                            <input onChange={(e) => { this.setState({ searchText: e.target.value }) }} type="text" className="form-control" placeholder="Search Movie" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">
                                        <i className="fas fa-sort-up" onClick={() => {
                                            this.sorted("stock", "asc");
                                        }} ></i>
                                        Stock
                                        <i className="fas fa-sort-down" onClick={() => {
                                            this.sorted("stock", "dsc");
                                        }}></i>
                                    </th>
                                    <th scope="col">
                                        <i className="fas fa-sort-up" onClick={() => {
                                            this.sorted("rental", "asc");
                                        }}></i>
                                        Rental
                                        <i className="fas fa-sort-down" onClick={() => {
                                            this.sorted("rental", "dsc");
                                        }}></i>
                                    </th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredArr.map((movie) => {
                                        return (
                                            <tr key={movie._id}>
                                                <th scope="row">{++count}</th>
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