import './LoginScreen.scss';
import companyLogo from './streamlabs.png';

const url = `https://id.twitch.tv/oauth2/authorize
?client_id=cbps6ruufy38cafqgdmcovgctm62vs
&redirect_uri=http://localhost:3000/
&response_type=token
&scope=user:read:email`

const LoginScreen = () => {
    return (
        <div className="login-container">
            <div className="login-inner-container">
                <div className="login-left">
                    <div className="login-header">Login to <b>StreamLabsAnalytics</b></div>
                    <div style={{display: 'flex', width: '86%', marginTop: '5vh'}}>
                        <div className="button-twitch" >
                            <a href={url}>Continue with Twitch</a>
                        </div>
                    </div>
                </div>
                <div className="login-right">
                    <img alt="Stream Labs" className="login-right-image" src={companyLogo} />
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;