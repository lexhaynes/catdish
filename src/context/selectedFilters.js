import { createContext, useContext, useState } from 'react';

/* example here: https://github.com/netlify/explorers/blob/main/src/context/missions.js */

const SelectedFiltersContext = createContext();
const SelectedFiltersUpdateContext = createContext();

export function SelectedFiltersProvider({ children }) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTextures, setSelectedTextures] = useState([]);
  const [selectedIncludes, setSelectedIncludes] = useState([]);
  const [selectedExcludes, setSelectedExcludes] = useState([]);

  const state = {
    selectedBrands,
    selectedTextures,
    selectedIncludes,
    selectedExcludes
  };

  const updateFns = {
    //add a filter to one of the lists
    addBrandFilter: (update) => {
      if (selectedBrands.includes(update)) return false;
      setSelectedBrands( prevState => [...prevState, update])
    },
    addTextureFilter: (update) => {
      if (selectedTextures.includes(update)) return false;
      setSelectedTextures( prevState => [...prevState, update])
    },
    addIncludeFilter: (update) => {
      if (selectedIncludes.includes(update)) return false;
      setSelectedIncludes( prevState => [...prevState, update])
    },
    addExcludeFilter: (update) => {
      if (selectedExcludes.includes(update)) return false;
      setSelectedExcludes( prevState => [...prevState, update])
    },
    //delete a filter
    deleteBrandFilter: (update) => {
      if (!selectedBrands.includes(update)) return false;
      setSelectedBrands( selectedBrands.filter(item => item !== update) )
    },
    deleteTextureFilter: (update) => {
      if (!selectedTextures.includes(update)) return false;
      setSelectedTextures( selectedTextures.filter(item => item !== update) )
    },
    deleteIncludeFilter: (update) => {
      if (!selectedIncludes.includes(update)) return false;
      setSelectedIncludes( selectedIncludes.filter(item => item !== update) )
    },
    deleteExcludeFilter: (update) => {
      if (!selectedExcludes.includes(update)) return false;
      setSelectedExcludes( selectedExcludes.filter(item => item !== update) )
    },
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
