import { useSelectedFiltersState, useSelectedFiltersUpdate } from '@context/selectedFilters'

const FilterListDisplay = ({filters}) => {
    const {deleteFilter} = useSelectedFiltersUpdate();

    const handleDeleteFilter = (e) => {
        deleteFilter(e.target.dataset["category"], e.target.dataset["filter"])
  
    }

    return (
        <>
            <ul>
              {
                Object.keys(filters).map(key => (
                  filters[key].map( (filter, i) => (
                    <li key={`filter-${key}_${i}`}>
                      {`${key} is ${filter}`}<button data-filter={filter} data-category={key} onClick={handleDeleteFilter}>x</button>
                    </li>
                  ))
                ))
              }
            </ul>
        </>
    )
}

const SelectedFiltersDisplay = () => {
    const { selectedFilters} = useSelectedFiltersState();
    return (
      <>
        <h2>Selected Filter Display</h2>
        <FilterListDisplay filters={selectedFilters} />
      </>
    )
}

export default SelectedFiltersDisplay;