import Contact from "./Contact"

const ContactList = ({ names, deleteBtnHandler }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {names.map(p => <Contact key={p.name} contact={p} deleteBtnHandler={deleteBtnHandler} />)}
        </div>
    )
}

export default ContactList