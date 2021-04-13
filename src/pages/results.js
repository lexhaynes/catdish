import {useEffect, useState} from 'react'
/* import dbConnect from '@utils/dbConnect'
import WetFood from '@models/WetFood' */
import Page from '@layouts/page';
import SelectedFiltersDisplay from '@components/selectedFiltersDisplay'
import TabList from '@components/tabList'


 const Results = () => {
  const [dataLoading, setDataLoading] = useState(true);
  
  useEffect(() => {
      setTimeout(() => { 
        setDataLoading(false)
      }, 1500)
  })

  return (
      <Page title="CatDish: Results">
        <h1>Results</h1>

        <SelectedFiltersDisplay />

        <TabList />
        
        { dataLoading 
          ? <div>Loading data...</div>
          : <p>Results are here. This will be client-side data fetching.</p>
        }

      </Page>
    )
}





export default Results