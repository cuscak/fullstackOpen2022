const Contact = ({ contact, deleteBtnHandler }) => {

    return (
        <p> {contact.name} {contact.number} <button itemID={contact.id} onClick={deleteBtnHandler}>delete</button></p>
    )
}

export default Contact