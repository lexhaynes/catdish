import useSWR from 'swr'
import TabPage from '@layouts/TabPage'
import { useSelectedFiltersState } from '@context/selectedFilters'
import PropTypes from 'prop-types';
import Button from '@components/Button';

const apiPath = '/api/filters?';


/* data fetched from server */
//TODO: consider hashing query and unhashing on server if the url query gets super long...
const ResultsData = ({query}) => {
  const endpoint = apiPath+query;

  const fetcher = url => fetch(url).then(res => res.json())
    const { data, error } = useSWR(endpoint, fetcher)
        
    if (error) return <ResultsError variant="no_db" />
    if (!data) return <div className="mx-auto">loading...</div>

    if (data.length < 1) return (
      <ResultsError variant="no_match" />
    )

    return (
      <>
       

        <div className="container border border-red-500">
          <div className="mb-6">
            <ResultsCountHeader count={data.length} />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 justify-between">
            {
              data.map( ({brand, product_line, flavor, texture}, i) => (
                <div key={`result_${i}`} className="border border-gray-100 mb-6 p-4 rounded-md flex flex-col sm:flex-row">

                {/* LEFT SIDE OF CARD */}
                  <div className="w-full h-32 mb-3 sm:mx-0 sm:w-52 sm:h-30 bg-gray-100 rounded-sm flex-grow-0"></div>
                
                {/* RIGHT SIDE OF CARD */}
                  <div className="ml-3">
                    <p className="font-bold text-xl mb-1">{brand}</p>
                    <p className="text-lg mb-1">{product_line}</p>
                    <p className="italic mb-3">{flavor}</p>
                    <p className="mb-6 px-3 py-1 rounded-2xl bg-gray-200 inline-block text-sm">      
                      {texture}
                    </p>
                    <div className="pt-2 sm:pt-0 flex">
                      <Button>Buy on Chewy</Button>
                    </div>

                  </div>
                </div>
              ))
            }
          </div>
        </div>
      
      </>
    )
}

ResultsData.propTypes = {
  query: PropTypes.string.isRequired,
}

const ResultsError = ({variant}) => {

  let heading;
  let subheading;

  switch (variant) {
    case "no_filters": 
     heading = "No filters selected"
     subheading = "You must add at least one filter to see results."
    break;

    case "no_db":
      heading = "Database error"
      subheading = "The connection to the database failed."
    break;

    case "no_match":
      heading = "No results found"
      subheading = "Try removing some filters."
    break;

    default:
      heading = "Something went wrong."
      subheading = "Please try reloading the page. Don't worry, you won't lose your filters."
    break;

  }

  return (
      <div className="flex flex-col justify-center items-center">
        <div className="bg-gray-300 rounded-full w-44 h-44 mb-6"></div>
        <p className="font-bold mb-2">{heading}</p>
        <p className="">{subheading}</p>
    </div>
  )
}

const ResultsCountHeader = ({count}) => {
  return (
    <div className="w-full text-right">
      <strong>{count}</strong> result{count > 1 && 's'} match{count <= 1 && 'es'} your query
    </div>
  )
} 

const ResultsPage = () => {
  const { filterQuery, filterCount } = useSelectedFiltersState();

  return (
      <TabPage title="CatDish: Results">

      <div className="my-6">
            <h2 className="text-2xl font-bold mb-2">Your Results </h2>
        </div>

        <div>

        {
          filterCount > 0  
            ? <ResultsData query={filterQuery} /> 
            : <ResultsError variant="no_filters" />
        }
        

        </div>

       

      </TabPage>
    )
}


export default ResultsPage