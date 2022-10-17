const SearchContact = ({ filter, handler }) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={handler} />
        </div>
    )
}

export default SearchContact