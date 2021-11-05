import logo from './streamlabs.png';

const Home = () => {
    return (
        <div style={{ 
                    backgroundImage: `url(${logo})` ,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    width:'95%',
                    height:'50vw'
                }}
                >            
                <h1>Welcome to the StreamLabs Analytics</h1>
                
        </div>
    )
}

export default Home;