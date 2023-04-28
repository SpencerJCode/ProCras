import { useEffect } from "react";

const Stacks = (props) => {
  const { stacks, highlightedStack, setShowEditStack, setStackId, setShowDeleteStackWarning, stackId } = props

  const showDelete = (stackId) => {
    setShowDeleteStackWarning(true)
    setStackId(stackId)
  }

  const handleShowEdit = (stackId) => {
    setShowEditStack(true)
    setStackId(stackId)
  }

  //horizontal scroll on the stack-list
  useEffect(() => {
    const stackList = document.querySelector(".stack-list");
    stackList.addEventListener('wheel', (event) => {
      event.preventDefault();
      stackList.scrollBy({left: event.deltaY < 0 ? -10 : 10,});
    });
    let allStackElements = document.querySelectorAll(".stack")
    for (let i=0; i< allStackElements.length; i++) {
      allStackElements[i].style.opacity = ".5"
    }
    console.log(stackId);
    if (document.getElementById(stackId) !== null) {
      console.log(document.getElementById(stackId));
      document.getElementById(stackId).style.opacity = "1"
    }
  }, [stackId]);



  return (
    <div className="d-flex align-items-center stack-list">
      {stacks.map((stack, i) => {
        if (!(stack.studySession)) {
          return (
            <div className="d-flex flex-column align-items-center m-auto" key={i}>
              <div onClick={(e) => { highlightedStack(stack._id, stack.stackName) }} className="deck-stack stack" id={stack._id} >
                <div>
                  <h2>{stack.stackName}</h2>
                </div>
              </div>
              <div id={`stack-deck-buttons-${stack._id}`} className="stack-deck-buttons d-flex gap-3 mt-3">
                <button className="btn btn-create text-light my-shadow" value={stack._id} onClick={() => handleShowEdit(stack._id)} >Rename</button>
                <button className="btn btn-delete text-light my-shadow" onClick={() => showDelete(stack._id)} >Delete</button>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}
export default Stacks