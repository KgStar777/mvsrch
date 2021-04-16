import React from 'react';
import classes from './Start2.module.css';
import * as axios from "axios";
import SliderDiv from "./Slider/Slider";
import { apiKey } from "../api/api";


class Start2 extends React.Component {
    constructor(props) {
        // console.log(props)
        super(props);
        this.state = {
            searchField: '',
            films: {
                results: null
            }
        }
    }

    componentDidMount() {
        // console.log("CDM: ", this.props)
        if (this.props.location.inp) {
            this.setState({searchField: this.props.location.inp.inp});
            this.getMovies();
        }
    }

    handleChange(e) {
        this.setState({searchField: e.target.value})
    }


    getMovies() {
        const movie = this.state.searchField
        const baseUrl = `https://imdb-api.com/en/API/Search/${apiKey}/${movie}`
        console.log('getMovies GO: ', baseUrl);
        // console.log('this.state.searchField: ', this.state.searchField, movie)
        axios.get(`${baseUrl}`)
            .then(resp => {
                this.setState({films: resp.data})
                // console.log("film", resp.data)
            })
    }

    render(props) {
        // console.log(this.state)
        return (
            <div className={classes.videoBg}>

                <iframe src="https://www.youtube.com/embed/gA0nQyDZR4A?autoplay=1&fs=0&loop=1"
                        width="720" height="540"
                        color="white"
                        frameBorder="0"
                        allow="autoplay"
                        autoPlay={true}
                        allowfullscreen="true" />

                <div className={classes.effects}/>
                <div className={classes.videoContent}>
                    <h3>Unlimited movies, TV shows, and more.</h3>
                    <p>Watch anywhere. Cancel anytime.</p>
                    <div className={classes.inputWrapper}>
                        <input
                            value={this.state.searchField}
                            onChange={this.handleChange.bind(this)}
                        />
                        <button
                            onClick={this.getMovies.bind(this)}
                        >Search
                        </button>
                    </div>
                    <div>
                    { ((this.state.films && this.state.films.results) !== null) ?
                        <div className={classes.filmsWrapper}>
                            {/*{ console.log("films.result: " , this.state.films.results) }*/}
                            {
                                <SliderDiv films={this.state.films.results} />

                            }
                    </div>
                        : null }
                    </div>
                </div>
            </div>
        )
    }
};

export default Start2;