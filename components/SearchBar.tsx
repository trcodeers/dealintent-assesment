
const SearchBar = ({ onSearchInput }: any) =>{

    return(
        <input
          className="border rounded-md mt-4 py-2 px-4 outline-none focus:border-blue-500"
          type="text"
          placeholder="Search by name"
          onChange={onSearchInput}
        />
    )
}

export default SearchBar;