import Btn from '@components/Btn'
import {capitalize} from '@utils/misc'
import { 
  useSelectedFiltersState, 
  useSelectedFiltersUpdate 
} from '@context/selectedFilters'


//format the language on the filter button label
const FormatBtnLabel = ({category, filter}) => {
  let subject = '';
  let verb = '';
  let object = '';

  switch(category) {
    case "include":
      subject = "Ingredient";
      verb = "includes";
      object = filter;
    break;

    case "exclude":
      subject = "Ingredient";
      verb = "excludes";
      object = filter;
    break;

    default:
      subject = capitalize(category);
      verb = "is";
      object = filter;
    break;
  }
  
  
  return (
    <>
      <span className="font-semibold">{subject} &nbsp;</span> 
      {verb} 
      <span className="font-semibold">&nbsp;{object}</span>
    </>
  )
}

const SelectedFiltersDisplay = () => {
    const { readOnlyFilters, filterCount } = useSelectedFiltersState();
    const { deleteFilter, deleteAllFilters } = useSelectedFiltersUpdate();
    
    if (filterCount < 1) {
      return <div className="font-light text-white">Add some filters</div>
    }

    return (
      <>
         <h2 className="text-2xl font-bold tracking-wide mb-5 text-red-50">Current Filters</h2>
 
        {  
            <>
              <div className="flex space-between flex-wrap my-4">
               { 
                  Object.entries(readOnlyFilters).map( ([category, filterList] ) => (
                      filterList.map( (filter, i) => (
                        <span key={`filter-${category}_${i}`} className="mr-2 mb-2">
                        
                        <Btn 
                          variant="pill" 
                          onClick={ () => deleteFilter(category, filter)}
                          icon={<>&#215;</>}
                        >
                          <FormatBtnLabel category={category} filter={filter} />
                        </Btn>

                        </span>
                      ))
                  ))
                }
              </div>
              
              <div className="flex w-64 justify-between ml-1 text-gray-800">
                <p className="text-semibold"><strong>{filterCount}</strong>{` filter${filterCount > 1 ? 's' :'' } selected`}</p>
                <Btn variant="link" onClick={() => deleteAllFilters()}> 
                  Clear all filters
                </Btn>
              </div>
            </>
        }
        
      </>
    )
}

export default SelectedFiltersDisplay;