import { useSelectedFiltersState } from '@context/selectedFilters'

const FilterListDisplay = ({list, type}) => {
    return (
        <>
            <h3>{type}</h3>
            <ul>
            {list.map((filter, i) => (<li key={`selected${type}_${i}`}>{filter}</li>))}
            </ul>
        </>
    )
}

const SelectedFiltersDisplay = () => {
    const { selectedBrands, selectedTextures, selectedIncludes, selectedExcludes } = useSelectedFiltersState();
    console.log(selectedBrands);
    return (
      <>
        <FilterListDisplay type="brands" list={selectedBrands} />
        <FilterListDisplay type="textures" list={selectedTextures} />
        <FilterListDisplay type="includes" list={selectedIncludes} />
        <FilterListDisplay type="excludes" list={selectedExcludes} /> 
      </>
    )
}

export default SelectedFiltersDisplay;