import { useEffect, useState } from "react";
import Loading from '../components/Loading';
import HTTP from "../util/axios";
import './StreamsPerGame.scss';


const StreamsPerGame = () => {
    const [gamesSQL, setGamesSQL] = useState({});
    const [gamesCoding, setGamesCoding] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        HTTP.get('totalAmountOfStreamsSQL', {})
        .then(({data}) => {
            setGamesSQL(data.games);
            HTTP.get('totalAmountOfStreamsCoding', {})
            .then(({data}) => {
                setGamesCoding(data.games);
                setLoading(false);
            })
        }).catch(setLoading(false));
    }, []);
    return (
            <div className="project-unapproved">
                <h1> Number of streams for each game.</h1>
                <div className="projects-card-list">
                    {loading ? (
                        <Loading height="20vh" />
                    )
                    : Object.keys(gamesSQL).map((key,index) => {
                        return (
                            <div className="project-card">
                                <div className="project-card-header">
                                </div>
                                <div className="project-data">
                                    <span >Game : {key}</span>
                                    <span >Number of Streams SQL    : {gamesSQL[key]}</span> 
                                    <span >Number of Streams Coding : {gamesCoding[key]}</span> 
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
}

export default StreamsPerGame;