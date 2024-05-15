import "./Layout.css";
import  sillycat from "./sillycat.jpg";
function About() {
    return (
        <div className="marginForAbtSection">
            <h1>About Section of my ToDo App</h1>
            <p>place holder</p>
            <p>by the way, REACT kinda lit</p>
            <p>eyyyy drnkd WATEEER white 🥤</p>
            <img src={sillycat} alt="sillyCat" />
        </div>
    );
}
export default About;