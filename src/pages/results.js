import axios from 'axios'
import {useEffect, useState} from 'react'
import Page from '@layouts/page';
import SelectedFiltersDisplay from '@components/selectedFiltersDisplay'
import TabList from '@components/tabList'
import { useSelectedFiltersState } from '@context/selectedFilters'

const apiPath = '/api/results?';

const ResultsData = ({query}) => {
  const [error, setError] = useState();
  const [data, setData] = useState();

  axios.get(query)
    .then((res) => {
      //success
      setData(res.data)
      setError(null)
    })
    .catch((e) => {
      setError(e)
    })

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return <div>hello {data.name}!</div>
}

const Results = () => {
  const [query, setQuery] = useState("");
  const { selectedFilters} = useSelectedFiltersState();

  //build query
  const generateQueryString = (filters) => {
    let queryString = '';

    Object.keys(filters).map((key, keyIndex) => (
      filters[key].map( (filter, filterIndex) => (
        //create query string; don't add ampersand after last value in array of last key
        queryString = queryString.concat(`${encodeURIComponent(key)}=${encodeURIComponent(filter)}${keyIndex < Object.keys(filters).length - 1 && filterIndex < filters[key].length - 1 ?  '&' : ''}`)
      ))
    ))

    return apiPath+queryString;
  }

  //watch the selected filters and update query as necessary
  useEffect(() => {
   if (countFilters(selectedFilters) > 0 ) {
      const queryString = generateQueryString(selectedFilters);
      setQuery(queryString);
      countFilters(selectedFilters);
    }
  }, [selectedFilters])

  return (
      <Page title="CatDish: Results">
        <h1>Results</h1>

        <SelectedFiltersDisplay />

        <TabList />
        {
          query.length > 0 ? <ResultsData query={query} /> : <p>add some filters!</p>
        }
        

      </Page>
    )
}

//count the number of total filters
const countFilters = (stateObj) => {
  let count = 0;
  Object.keys(stateObj).map(key => count = count + stateObj[key].length )
  return count;
}



export default Results