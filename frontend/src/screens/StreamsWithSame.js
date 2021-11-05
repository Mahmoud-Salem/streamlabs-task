import { useEffect, useState } from "react";
import Loading from '../components/Loading';
import HTTP from "../util/axios";
import './StreamsWithSame.scss';


const StreamsWithSame = () => {
    const url = 'https://www.twitch.tv/';
    const [streamsSQL, setStreamsSQL] = useState({});
    const [streamsCoding, setStreamsCoding] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        HTTP.get('streamsWithSameViewersSQL', {})
        .then(({data}) => {
            setStreamsSQL(data.games);
            HTTP.get('streamsWithSameViewersCoding', {})
            .then(({data}) => {
                setStreamsCoding(data.games);
                setLoading(false);
            }).catch(err=> console.log(err));
        }).catch(err=> {console.log(err);setLoading(false)});
    }, []);
    return (
            <div className="project-unapproved">
                <h1> Streamers with Same number of viewers.</h1>
                <div className="projects-card-list">
                    {loading ? (
                        <Loading height="20vh" />
                    ):
                    Object.keys(streamsSQL).map((key,index) => {
                        return (
                            <div className="project-card">
                                <div className="project-card-header">
                                </div>
                                <div className="project-data">
                                    <h2> Viewers : {key}</h2>
                                    <span> ------ SQL ------ </span>
                                    {
                                        
                                        streamsSQL[key].map((value,index)=>{
                                            return(
                                            <>
                                                <span >Stream : {streamsSQL[key][index].channel}  <a style={{ color:'blue' }} href={url+streamsSQL[key][index].channel} target="_blank" rel="noopener noreferrer" >Visit</a> </span> 
                                            </>
                                            )
                                        })
                                    }
                                    <span> ------ Coding ------</span>
                                    {
                                        streamsSQL[key].map((value,index)=>{
                                            return(
                                            <>
                                                <span >Stream : {streamsCoding[key][index].channel}  <a  style={{ color:'blue' }} href={url+streamsCoding[key][index].channel} target="_blank" rel="noopener noreferrer" >Visit</a>  </span> 
                                            </>
                                            )
                                        })

                                    }

                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
}

export default StreamsWithSame;