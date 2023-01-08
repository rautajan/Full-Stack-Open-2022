const Filter = (props) => {

    return (
        <>
        filter shown with{" "}

        <input value={props.matchingChar} onChange={props.onChange}/>
        </>
    )
}

export default Filter