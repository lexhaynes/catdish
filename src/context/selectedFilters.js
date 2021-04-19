import querystring from 'querystring'
import { createContext, useContext, useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import filterData from '@data/filters.json'

/* example here: https://github.com/netlify/explorers/blob/main/src/context/missions.js */

const SelectedFiltersContext = createContext();
const SelectedFiltersUpdateContext = createContext();

export function SelectedFiltersProvider({ children }) {

  const [readOnlyFilters, setReadOnlyFilters] = useState('');
  const [filterCount, setFilterCount] = useState(0);
  const [filterQuery, setFilterQuery] = useState('');
  
  const router = useRouter()


  //when URL changes, update the filterCount
  useEffect(() => {     
    setFilterCount(() => state.countFilters());
    setReadOnlyFilters(() => state.getFiltersFromUrl())
  }, [router.query])

  useEffect(() => {
    setFilterQuery(() => state.getQueryFromFilters())
  }, [readOnlyFilters])


  const state = {
    readOnlyFilters, //<-- exporting this as an easier way to access filters than parsing the URL
    filterCount,
    filterQuery,
    //convert the selectedFilters into URL string
    getQueryFromFilters: () => {
      return querystring.stringify(readOnlyFilters);
    },
    //count the number of filters user has selected
    countFilters: () => {
      let count = 0;
      for (let key in readOnlyFilters) {
        count = count + readOnlyFilters[key].length
      }
      return count;
    },
    getFiltersFromUrl: () => {
      //make sure query filters match acceptable filters 
      let filters = {};
      for (let key in router.query) {
        if (filterData.filters.includes(key)) { //check if the query param is in our master list of filters
          const val = router.query[key];
          if (val.length > 0 ) {
            filters[key] = typeof val === "string"
              ? [router.query[key]]
              : [...new Set(val)] //assume val is an array!!!; add val as a Set to ensure no duplication 
          }

        }
      }
      return filters;
    },   
  };

  const updateFns = {
    //add a filter to the URL
    //addition is a string
     addFilter: (category, addition) => {
      //check if addition already exists
      if (readOnlyFilters[category] && readOnlyFilters[category].includes(addition)) return;

      //if category does not exist, let's add it + vals to URL
      let newQuery;
      if (!(category in readOnlyFilters)) {
        newQuery = {...readOnlyFilters, [category]: addition }
      } //otherwise, insert addition as a set to avoid dupes
      else {
        const updatedVal = [ ...readOnlyFilters[category], addition]
        newQuery = {...readOnlyFilters, [category]: [...new Set(updatedVal)] }
      }
         
       //update the url
       router.push(router.pathname+`/?` + querystring.stringify(newQuery), undefined, {scroll:false, shallow:true})
    }, 

    //delete a filter from URL
    deleteFilter: (category, deletion) => {

      //delete the filter from the URL
      let updatedVals = {}
      if (router.query[category]) {
        updatedVals = Array.isArray(router.query[category])
                      ? router.query[category].filter(val => val !== deletion)
                      : [] //<-- set to empty array if the query's key value is a string (which means there is only one value)
      }

      let newQuery = {...router.query, [category]: updatedVals}
  

      //update the url
      router.push(router.pathname+`/?` + querystring.stringify(newQuery), undefined, {scroll:false, shallow:true})

    },
    //delete all filters from the URL
    deleteAllFilters: () => {
      router.push(router.pathname+`/`);
    } 
  };

  return (
    <SelectedFiltersContext.Provider value={state}>
      <SelectedFiltersUpdateContext.Provider value={updateFns}>
        {children}
      </SelectedFiltersUpdateContext.Provider>
    </SelectedFiltersContext.Provider>
  );
}

export function useSelectedFiltersState() {
  const state = useContext(SelectedFiltersContext);

  if (state === undefined) {
    throw new Error('useSelectedFiltersState must be used within a SelectedFiltersProvider');
  }

  return state;
}

export function useSelectedFiltersUpdate() {
  const updateFns = useContext(SelectedFiltersUpdateContext);

  if (updateFns === undefined) {
    throw new Error('useSelectedFiltersUpdate must be used within a SelectedFiltersProvider');
  }

  return updateFns;
}
