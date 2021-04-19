import FilterPage from '@layouts/FilterPage'
import filterData from '@data/filters.json'
const FILTER_NAME = "include";

const excludeFields = [
  "brand",
  "texture",
  "include",
  "exclude",
];
const data = filterData.filters.filter(item => !excludeFields.includes(item))

const Includes = () => {
  return (
    <FilterPage 
      title="Include Ingredients" 
      filterName={FILTER_NAME}
      data={data}
    />
  )
}

export default Includes