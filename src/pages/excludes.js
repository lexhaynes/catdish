import FilterPage from '@layouts/FilterPage'
import filterData from '@data/filters.json'
const FILTER_NAME = "exclude";

const excludeFields = [
  "brand",
  "texture",
  "include",
  "exclude",
];
const data = filterData.filters.filter(item => !excludeFields.includes(item))

const Excludes = () => {
  return (
    <FilterPage 
      title="Exclude Ingredients" 
      filterName={FILTER_NAME}
      data={data}
    />
  )
}

export default Excludes