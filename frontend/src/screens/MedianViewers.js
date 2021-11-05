import { useEffect, useState } from "react";
import Loading from '../components/Loading';
import HTTP from "../util/axios";

const MedianViewers = () => {
    const [medianSQL, setMedianSQL] = useState(0);
    const [medianCoding, setMedianCoding] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        HTTP.get('medianAmountOfViewersSQL', {})
        .then(({data}) => {
            setMedianSQL(data.median);
            HTTP.get('medianAmountOfViewersSQL', {})
            .then(({data}) => {
                setMedianCoding(data.median);
                setLoading(false);
            })
        }).catch(setLoading(false));
    }, []);
    return (
        <div>
                {loading ? (
                    <Loading height="20vh" />
                )
                : (
                    <>
                    <h1> Median viewers for all streams SQL : {medianSQL}</h1>
                    <h1> Median viewers for all streams Coding : {medianCoding}</h1>
                    </>
                )}
        </div>
    )
}

export default MedianViewers;