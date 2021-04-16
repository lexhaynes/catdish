import { useSelectedFiltersState, useSelectedFiltersUpdate } from '@context/selectedFilters'
import Button from '@components/button'
import {capitalize} from '@utils/misc'


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
    const { selectedFilters, countFilters } = useSelectedFiltersState();
    const { deleteFilter, deleteAllFilters} = useSelectedFiltersUpdate();

    
    return (
      <>
        <h2 className="text-2xl font-bold tracking-wide mb-5">Current Filters</h2>

        {
          countFilters() > 0
          ?   
            <>
              <div className="flex space-between flex-wrap my-4">
                {
                  Object.keys(selectedFilters).map(key => (
                    selectedFilters[key].map( (filter, i) => (
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
                  ))
                }
              </div>
              <Button variant="link" onClick={deleteAllFilters}> 
                Clear all filters
              </Button>
            </>
          : <div className="font-light italic">Add some filters below</div>
        }
        
      </>
    )
}

export default SelectedFiltersDisplay;