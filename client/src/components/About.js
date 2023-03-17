import { Link } from "react-router-dom";

const About = ({ setUserc }) => {
    const onclick = () => {
        window.alert("Are you really want to logout");
        setUserc('');
        window.location = "/";
    };
    return (
        <div className='container-version'>

            <div className='footer' >
                <h4 >Version 1.0.0</h4>
                <Link to="/" className="nav-link" onClick={onclick}>
                    Logout
                </Link>
            </div>

        </div>
    );
};

export default About;