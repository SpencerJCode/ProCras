import { Link } from "react-router-dom";
import axios from "axios";

const Stacks  = (props) =>{
const {stacks, highlightedStack, setStacksLoaded, setShowEditStack, setStackId} = props

  const handleDelete = (stackId) => {
    axios.delete('http://localhost:8000/api/stacks/' + stackId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    
    setStacksLoaded(false)
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
                            <button className="btn btn-primary" onClick={() => handleDelete(stack._id)} >Delete</button>
                        </div>
                </div>
                )
            }})}
        </div>
        )
}
export default Stacks