import { createContext, useContext, useState } from 'react';

/* example here: https://github.com/netlify/explorers/blob/main/src/context/missions.js */

const SelectedFiltersContext = createContext();
const SelectedFiltersUpdateContext = createContext();

export function SelectedFiltersProvider({ children }) {
  const [selectedBrands, setSelectedBrands] = useState(["brand"]);
  const [selectedTextures, setSelectedTextures] = useState(["texture"]);
  const [selectedIncludes, setSelectedIncludes] = useState(["include"]);
  const [selectedExcludes, setSelectedExcludes] = useState(["exclude"]);

  const state = {
    selectedBrands,
    selectedTextures,
    selectedIncludes,
    selectedExcludes
  };

  const updateFns = {
    // when we need to modify the selected filters, register those functions here!!!!
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
  const updateFns = React.useContext(SelectedFiltersUpdate);

  if (updateFns === undefined) {
    throw new Error('useSelectedFiltersUpdate must be used within a SelectedFiltersProvider');
  }

  return updateFns;
}
