import FilterPage from '@layouts/FilterPage'
import filterData from '@data/filters.json'
const FILTER_NAME = "exclude";

const DATA = filterData.groupedFilters;

const Excludes = () => {
  return (
    <FilterPage 
      title="Exclude Ingredients" 
      filterName={FILTER_NAME}
      data={DATA}
      dataType="CATEGORIZED_LIST"
    />
  )
}

export default Excludes