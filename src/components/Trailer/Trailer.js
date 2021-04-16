import React from 'react';
import classes from './Trailer.module.css'

const Trailer = (props) => {
    console.log('trailer Props', props)
    return <div style={{
        position: "fixed", width: "100%", flexDirection: 'column',
        height: "100vh", display: 'flex', alignItems:"center", overflow: 'hidden',
        justifyContent: 'center', zIndex: '1000', background: "rgba(0,0,0,.8)"}}>
        <button className={classes.button}
                onClick={() => props.setTrailerBool(false)}>X</button>
        <iframe id="ytplayer" type="text/html" width="720" height="405"
                src={`https://www.youtube.com/embed/${props.state.videoId}`}
                frameBorder="0" allowFullScreen />
    </div>
};

export default Trailer;