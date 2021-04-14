import useSWR from 'swr'
import {useEffect, useState} from 'react'
import Page from '@layouts/page';
import SelectedFiltersDisplay from '@components/selectedFiltersDisplay'
import TabList from '@components/tabList'
import { useSelectedFiltersState } from '@context/selectedFilters'

const apiPath = '/api/results?';

/* data fetched from server */
//TODO: consider sending query to server as request header body instead of URL param
const ResultsData = ({query}) => {

    const fetcher = url => fetch(url).then(res => res.json())
    const { data, error } = useSWR(query, fetcher)
        
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    if (data.length < 1) return (
      <p>No results found. Try removing some filters.</p>
    )

    return (
      <ul>
        <h3>Results from Server:</h3>
        <p>Num results: {data.length}</p>
        {
          data.map(item => (
            <li>
            {
              Object.keys(item).map(key => (
                <p> {`${key}: ${item[key]}`}</p>
                
              ))
            }
            </li>
          ))
        }
      </ul>
    )
}

const Results = () => {
  const [query, setQuery] = useState("");
  const { selectedFilters } = useSelectedFiltersState();

  //build query from filters
  const generateQueryString = (filters) => {
    let queryString = '';

    Object.keys(filters).map((key, keyIndex) => (
      filters[key].map( (filter, filterIndex) => (
        //create query string; don't add ampersand after last value in array of last key
        queryString = queryString.concat(`${encodeURIComponent(key)}=${encodeURIComponent(filter)}&`)
      ))
    ))

    return apiPath+queryString;
  }

  //watch the selected filters and update query as necessary
  useEffect(() => {
   if (countFilters(selectedFilters) > 0 ) {
      const queryString = generateQueryString(selectedFilters);
      setQuery(queryString);
    }
  }, [selectedFilters])


  return (
      <Page title="CatDish: Results">
        <h1>Results</h1>

        <SelectedFiltersDisplay />

        <TabList />

        {
          countFilters(selectedFilters) > 0  ? <ResultsData query={query} /> : <p>add some filters!</p>
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