import axios from 'axios'
import { useEffect, useState } from 'react'
import collection from 'lodash/collection'
import {classnames} from 'tailwindcss-classnames';
import TabPage from '@layouts/TabPage'
import { useSelectedFiltersState } from '@context/selectedFilters'
import PropTypes from 'prop-types';
import ErrorDisplay from '@components/ErrorDisplay'
import Loading from '@components/Loading'
import { ViewGridIcon, ViewListIcon, SortAscendingIcon, SortDescendingIcon} from '@heroicons/react/outline';

const apiPath = '/api/filters?';


/* fetch data from server*/
const ResultsData = ({query}) => {
  const endpoint = apiPath+query;
  const [sortOrder, setSortOrder] = useState('')
  const [results, setResults] = useState(null)
  const [httpState, setHttpState] = useState()

  /* @param order: can be "asc" or "dsc" */
  const sortResults = (order) => setSortOrder(order);

  //make data request on page load
  useEffect(() => {
    axios.get(endpoint)
    .then((response) => {
      if (response.data.length < 1) {
        setHttpState("no_match_error");
      } else {
        setResults(response.data);
        setHttpState("ok");
      }
    })
    .catch((error) => {
      // handle error
      setHttpState("request_error");
      console.log(error);
    })
  /*  .then(function () {
      // always executed
    });
  */
  }, [])

   //when sortOrder changes, sort results
  useEffect(() => {
    //const sorted = data.sort //<-- sort data here
    const sorted = collection.orderBy(results, 'brand', sortOrder);
    setResults(sorted) //<-- results
  }, [sortOrder])

  
  if (httpState === "request_error") return <ResultsError />

  if (httpState === "no_match_error") return <ResultsError variant="no_match" />

  if (httpState === "ok") {
    return <ResultsDisplay data={results} sortResults={sortResults} /> 
  }

  return (
    <div className="mx-auto">
      <Loading />
    </div>
  )
}
ResultsData.propTypes = {
  query: PropTypes.string.isRequired,
}

/* render data */

const ResultsDisplay = ({data, sortResults}) => {
  //set results display to grid or list
  const [displayType, setDisplayType] = useState('list')

  //set all the classes for data display
  const gridDisplayClasses = classnames('grid', 'grid-cols-1', 'gap-2', 'sm:grid-cols-2', 'sm:gap-6', 'justify-between');
  const listDisplayClasses = classnames('divide-y');

  //compose resultsData container styles based on viewType (grid or list)
  const displayStyle = (viewType) => (
    classnames('mt-10', {
      [gridDisplayClasses]: viewType === "grid",
      [listDisplayClasses]: viewType === "list",
    })
  );

  const gridItemClasses = classnames('border', 'border-gray-100', 'mb-6 p-4', 'rounded-md');
  const listItemClasses = classnames('pt-6', 'mb-2');

  //compose resultsData item  styles based on viewType (grid or list)
  const itemStyle = (viewType) => (
    classnames('flex', 'flex-col', 'sm:flex-row', {
      [gridItemClasses]: viewType === "grid",
      [listItemClasses]: viewType === "list",
    })
  )
  
  return (
        <div className="container">
          <div className="mb-6 flex justify-between items-center">
            
            <ResultsDisplayControl currentDisplay={displayType} setDisplay={setDisplayType} />
            <SortBy sortResults={sortResults} />
            <ResultsCountHeader count={data.length} />
          </div>
                   

          <div className={displayStyle(displayType)}>
            {
              data.map( ({brand, product_line, flavor, texture}, i) => (
                <div key={`result_${i}`} className={itemStyle(displayType)}>

                {/* LEFT SIDE OF CARD image will go here */}
                  {/* <div className="w-full h-32 mb-3 sm:mx-0 sm:w-52 sm:h-30 bg-gray-100 rounded-sm flex-grow-0"></div> */}
                
                {/* RIGHT SIDE OF CARD */}
                  <div className="ml-3">
                    <p className="font-bold text-xl mb-1">{brand}</p>
                    <p className="text-lg mb-1">{product_line}</p>
                    <p className="italic mb-3">{flavor}</p>
                    <p className="mb-6 px-3 py-1 rounded-2xl bg-red-100 inline-block text-sm">      
                      {texture}
                    </p>
                    {/* <div className="pt-2 sm:pt-0 flex">
                      <Button>Buy on Chewy</Button>
                    </div> */}

                  </div>
                </div>
              ))
            }
          </div>
        </div>
          )
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
      subheading = "Please try refreshing the page. Don't worry, you won't lose your filters."
    break;

  }

  return (
      <ErrorDisplay heading={heading} subheading={subheading} />
  )
}


const IconBtn = ({ tooltip, active, children, ...props}) => {
  const [ tooltipVisible, setTooltipVisible ] = useState(false);
  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  }
  return (
    <div className="relative">
      <span 
      {...props}
        tabIndex={1} 
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
        className={`${active ? 'bg-gray-100' :'' } flex justify-center items-center w-10 h-10 cursor-pointer px-2 ml-1 text-gray-500 hover:bg-gray-100 focus:bg-gray-200 rounded-lg`}>
        {children}
      </span>
      <p className={`${tooltipVisible ? 'block': 'hidden'} absolute mt-1 -ml-2  text-xs w-auto whitespace-nowrap`}>{tooltip}</p>

    </div>
  
  )
}


const ResultsDisplayControl = ({currentDisplay, setDisplay}) => {
  
  const handleDisplay = (type) => {
    setDisplay(type);
  }

  return (
    <div className="flex justify-between items-center">
    <p className="font-semibold mr-2">Show items as: </p>
      <IconBtn 
        tooltip="List View"
        onClick={()=>handleDisplay("grid")}
        active={currentDisplay === "grid"}>
        <ViewGridIcon />
      </IconBtn>
         
      <IconBtn 
        tooltip="Grid View"
        onClick={()=>handleDisplay("list")}
        active={currentDisplay === "list"}>
        <ViewListIcon />
      </IconBtn>

    </div>
  )
}

const SortBy = ({sortResults}) => {

  return (
    <div className="flex justify-between items-center">
      <p className="font-semibold mr-2">Sort items: </p>
          <IconBtn 
          onClick={()=>sortResults("asc")}
          tooltip="Sort A - Z">
        <SortAscendingIcon />
      </IconBtn>

      <IconBtn 
        onClick={()=>sortResults("desc")}
        tooltip="Sort Z - A">
        <SortDescendingIcon />
      </IconBtn>
    </div>

  )
}

const ResultsCountHeader = ({count}) => {
  return (
    <div className="w-1/3 text-right">
    TODO: display n out of total
      <p><strong>{count}</strong> result{count > 1 && 's'} match{count <= 1 && 'es'} your query</p>
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