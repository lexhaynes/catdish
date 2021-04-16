import useSWR from 'swr'
import {useEffect, useState} from 'react'
import AppShell from '@layouts/AppShell';
import SelectedFiltersDisplay from '@components/SelectedFiltersDisplay'
import TabList from '@components/TabList'
import { useSelectedFiltersState } from '@context/selectedFilters'

const apiPath = '/api/filters?';

/* data fetched from server */
//TODO: consider hashing query and unhashing on server if the url query gets super long...
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
          data.map( (item, h) => (
            <li key={`result_${h}`}>
            {
              Object.keys(item).map((key,i) => (
                <p key={`resultsub_${i}`}> {`${key}: ${item[key]}`}</p>
                
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
  const { selectedFilters, countFilters } = useSelectedFiltersState();

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
   if (countFilters() > 0 ) {
      const queryString = generateQueryString(selectedFilters);
      setQuery(queryString);
    }
  }, [selectedFilters])


  return (
      <AppShell title="CatDish: Results">
        <h1>Results</h1>

        <SelectedFiltersDisplay />

        <TabList />

        {
          countFilters(selectedFilters) > 0  ? <ResultsData query={query} /> : <p>add some filters!</p>
        }
        

      </AppShell>
    )
}


export default Results