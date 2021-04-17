import useSWR from 'swr'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import TabPage from '@layouts/TabPage'
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
  const { selectedFilters, countFilters, serializeFilters } = useSelectedFiltersState();
  const router = useRouter();

  //watch the selected filters and update query as necessary
/*    useEffect(() => {
   if (countFilters() > 0 ) {
      setQuery(apiPath + serializeFilters(selectedFilters));
    }
  }, [selectedFilters])  */

  //set the filters based on the URLQuery



  return (
      <TabPage title="CatDish: Results">


        {
          countFilters(selectedFilters) > 0  ? <ResultsData query={query} /> : <p>add some filters!</p>
        }
        

      </TabPage>
    )
}


export default Results