import FilterPage from '@layouts/FilterPage'
import filterData from '@data/filters.json'
const FILTER_NAME = "include"

const DATA = filterData.groupedFilters;

const Includes = () => {
  return (
    <FilterPage 
      title="Include Ingredients" 
      filterName={FILTER_NAME}
      data={DATA}
      dataType="CATEGORIZED_LIST"
    />
  )
}

export default Includes