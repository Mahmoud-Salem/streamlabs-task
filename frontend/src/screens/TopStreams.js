import { useEffect, useState } from "react";
import Loading from '../components/Loading';
import HTTP from "../util/axios";
import CustomButton from '../components/CustomButton';
import './TopStreams.scss';

const arrayReverse = (arr)=>{
    var newArr = [];
    for(var i = arr.length-1 ;i >=0 ;i--)
    {
        newArr.push(arr[i]);
    }
    return newArr ;
}
const TopStreams = () => {
    const [streamSQL, setStreamSQL] = useState([]);
    const [streamCoding, setStreamCoding] = useState([]);
    const [asc , setAsc] = useState(true);
    const [loading, setLoading] = useState(true);
    const url = 'https://www.twitch.tv/';
    useEffect(() => {
        HTTP.get('topStreamsSQL', {})
        .then(({data}) => {
            setStreamSQL(data.games);
            HTTP.get('topStreamsCoding', {})
            .then(({data}) => {
                setStreamCoding(data.games);
                setLoading(false);
            }).catch(err=> console.log(err));
        }).catch(err=> {console.log(err);setLoading(false)});
    }, []);

    const Reverse = ()=>{
        var sqlList = arrayReverse(streamSQL) ;
        var codingList = arrayReverse(streamCoding) ;
        setStreamSQL(sqlList);
        setStreamCoding(codingList);
        var orderby = (asc)? false : true ;
        setAsc(orderby);
    };

    return (
            <div className="project-unapproved">
                <h1> Top 100 streamers Leaderboard</h1>
                <div style={{display: 'flex', width: '86%', marginTop: '5vh'}}>
                        <div style={{width: '50%'}}>
                            <CustomButton onClick={Reverse} title={'Reverse'} />
                        </div>
                    </div>

                <div className="projects-card-list">
                    {loading ? (
                        <Loading height="20vh" />
                    )
                    : 
                    streamSQL.map((value,index) => {
                        return (
                            <div className="project-card">
                                <div className="project-card-header">
                                </div>
                                <div className="project-data">
                                    <span> Position {(asc)?index+1:streamSQL.length-index} </span>
                                    <span >Stream SQL    : {streamSQL[index].channel} : {streamSQL[index].viewers} Viewers. <a style={{ color:'blue' }} href={url+streamSQL[index].channel} target="_blank" rel="noopener noreferrer" >Visit</a> </span> 
                                    <span >Stream Coding : {streamCoding[index].channel} : {streamCoding[index].viewers} Viewers. <a  style={{ color:'blue' }} href={url+streamCoding[index].channel} target="_blank" rel="noopener noreferrer" >Visit</a>  </span> 
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
}

export default TopStreams;