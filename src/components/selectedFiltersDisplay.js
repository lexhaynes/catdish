import Button from '@components/button'
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

    return (
      <>
        <h2 className="text-2xl font-bold tracking-wide mb-5">Current Filters</h2>

        {
          filterCount > 0
          ?   
            <>
              <div className="flex space-between flex-wrap my-4">
               {
                  Object.keys(readOnlyFilters).map(key => {
                    if (Array.isArray(readOnlyFilters[key])) {

                      return readOnlyFilters[key].map( (filter, i) => (
                        <span key={`filter-${key}_${i}`} className="mr-2 mb-2">
                        
                        <Button 
                          variant="pill" 
                          onClick={ () => deleteFilter(key, filter)}
                          icon={<>&#215;</>}
                        >
                          <FormatBtnLabel category={key} filter={filter} />
                        </Button>

                        </span>
                      ))

                    } else {
                      return (
                        <span className="mr-2 mb-2">
                        
                        <Button 
                          variant="pill" 
                          onClick={ () => deleteFilter(key, readOnlyFilters[key])}
                          icon={<>&#215;</>}
                        >
                          <FormatBtnLabel category={key} filter={readOnlyFilters[key]} />
                        </Button>

                        </span>
                      )}
                  })
                }
              </div>
              <div className="flex w-64 justify-between">
                <p className="text-semibold"><strong>{filterCount}</strong>{` filter${filterCount > 1 ? 's' :'' } selected`}</p>
                <Button variant="link" onClick={() => deleteAllFilters()}> 
                  Clear all filters
                </Button>
              </div>
        
            </>
          : <div className="font-light italic">Add some filters below</div>
        }
        
      </>
    )
}

export default SelectedFiltersDisplay;