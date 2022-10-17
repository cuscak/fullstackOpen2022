const Notification = ({ message, type }) => {

    console.log('msg rendered:', type)
    if (message === null) {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification