const AddContact = (props) => {
    const addPerson = props.onSubmit
    const nameInputValue = props.name
    const onNameChange = props.onNameChange
    const numberInputValue = props.number
    const onNumberChange = props.onNumberChange

    return (
        <div>
            <h2>Add new contact:</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                        value={nameInputValue}
                        onChange={onNameChange}
                    />
                </div>
                <div>
                    number: <input
                        value={numberInputValue}
                        onChange={onNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddContact