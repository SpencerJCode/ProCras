import { Link } from "react-router-dom";
import axios from "axios";

const Stacks  = (props) =>{
const {stacks, highlightedStack, setStacksLoaded, setShowEditStack, setStackId, setShowDeleteWarning} = props

  const showDelete = (stackId) => {
    setShowDeleteWarning(true)
    setStackId(stackId)
  }

  const handleShowEdit = (stackId) => {
    setShowEditStack(true)
    setStackId(stackId)
    // console.log(stackId);
  }

    return (
        <div className="d-flex align-items-center stack-list">
            {stacks.map((stack, i) => {
                if (!(stack.studySession)) {
                return (
                <div className=" d-flex flex-column align-items-center m-auto">
                    <div onClick = {(e) => {highlightedStack(stack._id) }} className= "deck-stack hover-effect">
                        <div>
                            <h1>{stack.stackName}</h1>
                        </div>
                    </div>
                    <div id={`stack-deck-buttons-${stack._id}`} className="stack-deck-buttons d-flex gap-3 mt-3">
                            <Link>
                            <button className="btn btn-primary" value={stack._id} onClick={() => handleShowEdit(stack._id)} >Rename</button>
                            </Link>
                            <button className="btn btn-primary" onClick={() => showDelete(stack._id)} >Delete</button>
                        </div>
                </div>
                )
            }})}
        </div>
        )
}
export default Stacks