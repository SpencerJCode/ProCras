const Stacks  = (props) =>{
const {stacks, highlightedStack} = props

// creating a new stacks should also set that stack as the highlighted stack
    return (
        <div className="m-auto col-11 d-flex align-items-center">
            {stacks.map((stack, i) => {
                if (!(stack.studySession)) {
                return (
                <div onClick = {(e) => {highlightedStack(stack._id)}} className= "hover-deck-stack m-auto">
                    <div className = "hover-deck-stack-content">
                        <h1>{stack.stackName}</h1>
                    </div>
                </div>)
            }})}
        </div>
        )
}
export default Stacks