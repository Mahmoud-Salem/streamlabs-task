import { Link } from 'react-router-dom';
import './Navbar.scss';
import home from './home.png';
import games from './games.png';
import biggestStream from './biggestStream.png';
import median from './median.png';
import leaderboard from './leaderboard.png';


const Navbar = () => {

    return (
        <div className="navbar-container" >
            <NavbarLink title={'Home'} to={'/'} src={home}  />
            <NavbarLink title={'Streams per Game'} to={'/StreamsPerGame'} src={games}  />
            <NavbarLink title={'Biggest Stream per Game'} to={'/BiggestStreamPerGame'} src={biggestStream}  />
            <NavbarLink title={'Median of Viewers'} to={'/MedianViewers'} src={median}  />
            <NavbarLink title={'Odd Streams'} to={'/OddNumStreams'} src={biggestStream}  />
            <NavbarLink title={'Even Streams'} to={'/EvenNumStreams'} src={biggestStream}  />
            <NavbarLink title={'Top Streams'} to={'/TopStreams'} src={leaderboard}  />
            <NavbarLink title={'Stream with Same Viewers'} to={'/StreamsWithSame'} src={biggestStream}  />

        </div>
    )
}

const NavbarLink = ({src, title, to}) => (
    <Link className="navbar-link" to={to}>
        <img alt="icon" src={src} />
        <span>{title}</span>
    </Link>
)

export default Navbar;