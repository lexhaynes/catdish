import useSWR from 'swr'
import TabPage from '@layouts/TabPage'
import { useSelectedFiltersState } from '@context/selectedFilters'
import PropTypes from 'prop-types';

const apiPath = '/api/filters?';

/* data fetched from server */
//TODO: consider hashing query and unhashing on server if the url query gets super long...
const ResultsData = ({query}) => {
  const endpoint = apiPath+query;
  console.log("ResultsData endpoint: ", endpoint);

  const fetcher = url => fetch(url).then(res => res.json())
    const { data, error } = useSWR(endpoint, fetcher)
        
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    if (data.length < 1) return (
      <p className="italic">No results found. Try removing some filters.</p>
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

ResultsData.propTypes = {
  query: PropTypes.string.isRequired,
}

const Results = () => {
  const { filterQuery, filterCount } = useSelectedFiltersState();

  return (
      <TabPage title="CatDish: Results">


        {
          filterCount > 0  ? <ResultsData query={filterQuery} /> : <p className="italic">Add some filters!</p>
        }
        

      </TabPage>
    )
}


export default Results