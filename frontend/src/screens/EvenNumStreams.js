import { useEffect, useState } from "react";
import Loading from '../components/Loading';
import HTTP from "../util/axios";
import './EvenNumStreams.scss';


const EvenNumStreams = () => {
    const url = 'https://www.twitch.tv/';
    const [gamesSQL, setGamesSQL] = useState({});
    const [gamesCoding, setGamesCoding] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        HTTP.get('evenViewersStreamSQL', {})
        .then(({data}) => {
            setGamesSQL(data.games);
            HTTP.get('evenViewersStreamCoding', {})
            .then(({data}) => {
                setGamesCoding(data.games);
                setLoading(false);
            }).catch(err=> console.log(err));
        }).catch(err=> {console.log(err);setLoading(false)});
    }, []);
    return (
            <div className="project-unapproved">
                <h1> Streamers with even number of viewers.</h1>
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
                                    <span >Stream SQL    : {gamesSQL[key].channel} : {gamesSQL[key].viewers} Viewers. <a style={{ color:'blue' }} href={url+gamesSQL[key].channel} target="_blank" rel="noopener noreferrer" >Visit</a> </span> 
                                    <span >Stream Coding : {gamesCoding[key].channel} : {gamesCoding[key].viewers} Viewers. <a  style={{ color:'blue' }} href={url+gamesCoding[key].channel} target="_blank" rel="noopener noreferrer" >Visit</a>  </span> 
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
}

export default EvenNumStreams;