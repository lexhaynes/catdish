import { createContext, useContext, useState } from 'react';

/* example here: https://github.com/netlify/explorers/blob/main/src/context/missions.js */

const SelectedFiltersContext = createContext();
const SelectedFiltersUpdateContext = createContext();

export function SelectedFiltersProvider({ children }) {
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    texture: [],
    include: [],
    exclude: [],
  });
  /*
    selectedFilters shape: 
    {
      brand: [],
      texture: [],
      include: [],
      exclude: []
    }
  */

  const state = {
    selectedFilters,
    //count the number of filters user has selected
    countFilters: () => {
      let count = 0;
      Object.keys(selectedFilters).map(key => count = count + selectedFilters[key].length )
      return count;
    }
    
  };

  const updateFns = {
    //add a filter
    addFilter: (category, addition) => {
      //check if filter already exists
      //if so, return, if not
      // add filter to list
      if (category in selectedFilters && selectedFilters[category].includes(addition)) return false;

      setSelectedFilters(prevState => ({
        ...prevState,
        [category] : [...prevState[category], addition]
      }));
        
    },

    //delete a filter
    deleteFilter: (category, deletion) => {
      //check if filter is NOT in list already
      //if so, return, if not
      //remove filter from list
      if (!category in selectedFilters || !selectedFilters[category].includes(deletion)) return false;
      
      //update category's array of values by creating a copy without the value to be deleted
      setSelectedFilters(prevState => ({
        ...prevState,
        [category] : prevState[category].filter(item => item != deletion)
      }))
    },

    //delete all filters
    deleteAllFilters: () => {
      setSelectedFilters({
        brand: [],
        texture: [],
        include: [],
        exclude: [],
      })
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
