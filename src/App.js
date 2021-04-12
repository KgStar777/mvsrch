import classes from './App.module.css';
import React from "react";
import Start2 from "./components/Start2";
import * as axios from "axios";
import SliderDiv from "./components/Slider/Slider";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            expression: '',
            movies: [
                // {
                //     description: '',
                // },
            ],
            videoURL: 'https://www.youtube.com/watch?v=gA0nQyDZR4A&ab_channel=SawtoStuudio'
        }
    }


    componentDidMount () {

    }

    render() {


        return (
            <div className={classes.body}>
                <Start2 state={this.state}/>
            </div>
        );
    }
}

export default App;
