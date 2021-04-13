import '@styles/globals.css'
import { SelectedFiltersProvider } from '@context/selectedFilters'


function CatDishApp({ Component, pageProps }) {
  return (
    <SelectedFiltersProvider>
      <Component {...pageProps} />
    </SelectedFiltersProvider>
  )
}

export default CatDishApp
