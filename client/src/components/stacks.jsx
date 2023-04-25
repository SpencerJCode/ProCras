import Hover3D from "../assets/js/hover3D";
import { Link } from "react-router-dom";

const Stacks  = (props) =>{
const {stacks, highlightedStack} = props
const createHoverEffect = () => {
    let hoverEffect = new Hover3D(".hover-effect");
  };

  setTimeout(createHoverEffect, 1000);

// creating a new stacks should also set that stack as the highlighted stack
    return (
        <div className="d-flex align-items-center gap-5 mt-3 col-11 m-auto">
            {stacks.map((stack, i) => {
                if (!(stack.studySession)) {
                return (
                <div className=" d-flex flex-column align-items-center col-3 m-auto">
                    <div onClick = {(e) => {highlightedStack(stack._id)}} className= "hover-deck-stack hover-effect">
                        <div className = "hover-deck-stack-content">
                            <h1 className="deck-stack-title">{stack.stackName}</h1>
                        </div>
                    </div>
                    <div className="stack-deck-buttons d-flex gap-3 mt-3">
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