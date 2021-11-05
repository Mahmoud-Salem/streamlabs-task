import { useEffect, useState } from "react";
import Loading from '../components/Loading';
import HTTP from "../util/axios";
import './BiggestStreamPerGame.scss';

const BiggestStreamPerGame = () => {
    const [gamesSQL, setGamesSQL] = useState({});
    const [gamesCoding, setGamesCoding] = useState({});
    const [loading, setLoading] = useState(true);
    const url = 'https://www.twitch.tv/';
    useEffect(() => {
        HTTP.get('highestViewerPerGameSQL', {})
        .then(({data}) => {
            setGamesSQL(data.games);
            HTTP.get('highestViewerPerGameCoding', {})
            .then(({data}) => {
                setGamesCoding(data.games);
                setLoading(false);
            }).catch(err=> console.log(err));
        }).catch(err=> {console.log(err);setLoading(false)});
    }, []);
    return (
            <div className="project-unapproved">
                <h1> Biggest streamer for each game.</h1>
                <div className="projects-card-list">
                    {loading ? (
                        <Loading height="20vh" />
                    )
                    : 
                    Object.keys(gamesSQL).map((key,index) => {
                        return (
                            <div className="project-card">
                                <div className="project-card-header">
                                </div>
                                <div className="project-data">
                                    <span >Game : {key}</span>
                                    <span >Biggest Stream SQL    : {gamesSQL[key].channel} : {gamesSQL[key].viewers} Viewers. <a  style={{ color:'blue' }} href={url+gamesSQL[key].channel} target="_blank" rel="noopener noreferrer" >Visit</a> </span> 
                                    <span >Biggest Stream Coding : {gamesCoding[key].channel} : {gamesCoding[key].viewers} Viewers. <a style={{ color:'blue' }} href={url+gamesCoding[key].channel} target="_blank" rel="noopener noreferrer" >Visit</a>  </span> 
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
}

export default BiggestStreamPerGame;