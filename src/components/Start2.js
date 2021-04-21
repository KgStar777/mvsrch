import React from 'react';
import classes from './Start2.module.css';
import * as axios from "axios";
import SliderDiv from "./Slider/Slider";
import { apiKey } from "../api/api";
import AWAKENING from "../assets/video/AWAKENING.mp4";
import Poster from "../assets/img/poster4.png"


class Start2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // searchField: '',
            searchField: this.props.location.inp ? this.props.location.inp.inp : '',
            films: {
                results: null
            }
        }
    }

    componentDidMount() {
        if (this.props.location.inp) {
            this.getMovies();
        }

    }

    handleChange(e) {
        this.setState({searchField: e.target.value})
    }

    getMovies() {
        const movie = this.state.searchField
        const baseUrl = `https://imdb-api.com/en/API/Search/${apiKey}/${movie}`

        axios.get(`${baseUrl}`)
            .then(resp => {
                this.setState({films: resp.data})
                this.setState({searchField: ''})
            })
    }

    render(props) {

        return (
            <div className={classes.videoBg}>

                <video width="720" height="540" loop="loop" poster={Poster} autoplay="autoplay" muted="muted">
                    <source src={AWAKENING}/>
                </video>

                {/*<iframe src="https://www.youtube.com/embed/gA0nQyDZR4A?autoplay=1&fs=0&loop=1"*/}
                {/*        width="720" height="540"*/}
                {/*        color="white"*/}
                {/*        frameBorder="0"*/}
                {/*        allow="autoplay"*/}
                {/*        autoPlay={true}*/}
                {/*        allowfullscreen="true" />*/}

                <div className={classes.effects}/>
                <div className={classes.videoContent}>
                    <h3>Unlimited movies, TV shows, and more.</h3>
                    <p>Watch anywhere. Cancel anytime.</p>
                    <div className={classes.inputWrapper}>
                        <input
                            placeholder="enter movie title..."
                            value={this.state.searchField}
                            onChange={this.handleChange.bind(this)}
                            onKeyPress={(e) => {if(e.key === 'Enter') {this.getMovies()} }}
                        />
                        <button
                            onClick={this.getMovies.bind(this)}
                        >Search
                        </button>
                    </div>
                    <div>
                    { ((this.state.films && this.state.films.results) !== null) ?
                        <div className={classes.filmsWrapper}>
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