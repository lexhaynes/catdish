import { useSelectedFiltersState, useSelectedFiltersUpdate } from '@context/selectedFilters'
import Button from '@components/button'
import {capitalize} from '@utils/misc'

import filterData from '@data/filters.json'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { useState, useEffect } from 'react'

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
   // const { selectedFilters, countFilters } = useSelectedFiltersState();
   // const { deleteFilter, deleteAllFilters} = useSelectedFiltersUpdate();

    const router = useRouter();

    const getFiltersFromUrl = () => {
      //make sure query filters match acceptable filters 
      let filters = {};
      for (let key in router.query) {
        if (filterData.filters.includes(key)) { //check if the query param is in our master list of filters
          filters[key] = router.query[key]; 
        }
      } 
      return filters;
    }
    
    const getFilterCount = () => {
      let count = 0;
      for (let key in selectedFilters) {
        if (selectedFilters[key]) {
          if (Array.isArray (selectedFilters[key])) {
            count = count + selectedFilters[key].length
          } else count = count + 1;
          
        }
      }
      return count;
    }

   

    const [selectedFilters, setSelectedFilters] = useState(getFiltersFromUrl());
    const [filterCount, setFilterCount] = useState(getFilterCount());
    
 


    const deleteFilter = (category, deletion) => {
      //check if filter is NOT in list already
      //if so, return, if not
      //remove filter from list
      if (!category in selectedFilters || !selectedFilters[category].includes(deletion)) return false;  
      setSelectedFilters(prevState => ({
        ...prevState,
        [category] : prevState[category].filter(item => item != deletion)
      }))
    }

    //when filters change, update URL; when URl changes, update filters
    useEffect(() => {
      console.log("selected filters has changed")
    }, [selectedFilters])

    console.log("CURRENT STATE: ")
    console.log("router query:", router.query);
    console.log("selectedFilters ", selectedFilters);
    console.log("filterCount " + filterCount);

    
    return (
      <>
        <h2 className="text-2xl font-bold tracking-wide mb-5">Current Filters</h2>

        {
          filterCount > 0
          ?   
            <>
              <div className="flex space-between flex-wrap my-4">
               {
                  Object.keys(selectedFilters).map(key => {
                    if (Array.isArray(selectedFilters[key])) {

                      return selectedFilters[key].map( (filter, i) => (
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
                          onClick={ () => deleteFilter(key, selectedFilters[key])}
                          icon={<>&#215;</>}
                        >
                          <FormatBtnLabel category={key} filter={selectedFilters[key]} />
                        </Button>

                        </span>
                      )}
                  })
                }
              </div>
              <Button variant="link" onClick={() => console.log("delete all filters here")}> 
                Clear all filters
              </Button>
            </>
          : <div className="font-light italic">Add some filters below</div>
        }
        
      </>
    )
}

export default SelectedFiltersDisplay;