import React from "react";
import Start2 from "./components/Start2";
import {Route, Switch} from "react-router-dom";
import Film from "./components/FIlm/Film";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            expression: '',
            movies: [],
            videoURL: 'https://www.youtube.com/watch?v=gA0nQyDZR4A&ab_channel=SawtoStuudio'
        }
    }

    componentDidMount() {}

    render() {

        return (
            <Switch>
                <Route exact path="/" component={Start2}/>
                <Route path="/film/:filmId" component={Film}/>
            </Switch>
        )
    }
}

export default App;
