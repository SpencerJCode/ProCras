import Hover3D from "../assets/js/hover3D";
import { Link } from "react-router-dom";

const Stacks  = (props) =>{
const {stacks, highlightedStack} = props
const createHoverEffect = () => {
    let hoverEffect = new Hover3D(".hover-effect");
  };

  setTimeout(createHoverEffect, 1000);

  const showButtons = (id) => {
    document.getElementById(`stack-deck-buttons-${id}`).classList.toggle("hidden")
  }

// creating a new stacks should also set that stack as the highlighted stack
    return (
        <div className="d-flex align-items-center mt-3 m-auto">
            {stacks.map((stack, i) => {
                if (!(stack.studySession)) {
                return (
                <div className=" d-flex flex-column align-items-center m-auto">
                    <div onClick = {(e) => {highlightedStack(stack._id); showButtons(stack._id) }} className= "hover-deck-stack hover-effect">
                        <div className = "hover-deck-stack-content">
                            <h1 className="deck-stack-title">{stack.stackName}</h1>
                        </div>
                    </div>
                    <div id={`stack-deck-buttons-${stack._id}`} className="stack-deck-buttons d-flex gap-3 mt-3 hidden">
                            <Link>
                            <button className="btn btn-primary" >Edit</button>
                            </Link>
                            <Link>
                            <button className="btn btn-primary" >Delete</button>
                            </Link>
                        </div>
                </div>
                )
            }})}
        </div>
        )
}
export default Stacks