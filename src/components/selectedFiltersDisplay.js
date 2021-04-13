import { useSelectedFiltersState, useSelectedFiltersUpdate } from '@context/selectedFilters'

const FilterListDisplay = ({list, type}) => {
    const {deleteBrandFilter, deleteTextureFilter, deleteIncludeFilter, deleteExcludeFilter} = useSelectedFiltersUpdate();

    const deleteFilter = (e) => {
      switch (type) {
          case "brands": 
              deleteBrandFilter(e.target.dataset["filter"])
          break;

          case "textures": 
              deleteTextureFilter(e.target.dataset["filter"])
          break;

          case "includes": 
              deleteIncludeFilter(e.target.dataset["filter"])
          break;

          case "excludes": 
              deleteExcludeFilter(e.target.dataset["filter"])
          break;
      }
    
  }

    return (
        <>
            <h3>{type}</h3>
            <ul>
              {
                list.map((filter, i) => (
                  <li key={`selected${type}_${i}`}>
                    {filter}<button data-filter={filter} onClick={deleteFilter}>x</button>
                  </li>
                ))
              }
            </ul>
        </>
    )
}

const SelectedFiltersDisplay = () => {
    const { selectedBrands, selectedTextures, selectedIncludes, selectedExcludes } = useSelectedFiltersState();
    return (
      <>
        <h2>Selected Filter Display</h2>
        <FilterListDisplay type="brands" list={selectedBrands} />
        <FilterListDisplay type="textures" list={selectedTextures} />
        <FilterListDisplay type="includes" list={selectedIncludes} />
        <FilterListDisplay type="excludes" list={selectedExcludes} /> 
      </>
    )
}

export default SelectedFiltersDisplay;