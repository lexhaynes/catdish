import axios from 'axios'
import { useEffect, useState } from 'react'
import collection from 'lodash/collection'
import {classnames} from 'tailwindcss-classnames';
import TabPage from '@layouts/TabPage'
import { useSelectedFiltersState } from '@context/selectedFilters'
import ErrorDisplay from '@components/ErrorDisplay'
import Loading from '@components/Loading'
import Btn from '@components/Btn'
import { ViewGridIcon, ViewListIcon, SortAscendingIcon, SortDescendingIcon} from '@heroicons/react/outline';
import { InformationCircleIcon } from '@heroicons/react/solid'
import { XCircleIcon } from '@heroicons/react/outline'



const apiPath = '/api/filters?';
const LIMIT = 10; //limit of values returned by DB

/* fetch data from server*/
const ResultsData = ({query, offset, setOffset}) => {
  const endpoint = `${apiPath}${query}&offset=${offset}&limit=${LIMIT}`;
  const [sortOrder, setSortOrder] = useState('')
  const [results, setResults] = useState(null)
  const [ingredients, setIngredients] = useState(null)
  const [totalResultsCount, setTotalResultsCount] = useState(null)
  const [httpState, setHttpState] = useState()

  /* @param order: can be "asc" or "dsc" */
  const sortResults = (order) => setSortOrder(order);

  const requestData = () => {
    axios.get(endpoint)
    .then((response) => {
      const { results, count, ingredients } = response.data;
      if (results.length < 1) {
        setHttpState("no_match_error");
      } else {

        setResults(prevResults => ([...prevResults, ...results]));
        setIngredients(ingredients);
        setTotalResultsCount(count);
        setOffset(prevOffset => prevOffset + LIMIT)
        setHttpState("ok");

      }
    })
    .catch((error) => {
      // handle error
      setHttpState("request_error");
      console.log("request error: ", error);
    })
  /*  .then(function () {
      // always executed
    });
  */
  }

  //make data request whenever query changes
  useEffect(() => {
    requestData()
  }, [query])

   //when sortOrder changes, sort results
  useEffect(() => {
    //const sorted = data.sort //<-- sort data here
    const sorted = collection.orderBy(results, 'brand', sortOrder);
    setResults(sorted) //<-- results
  }, [sortOrder])

  
  if (httpState === "request_error") return <ResultsError />

  if (httpState === "no_match_error") return <ResultsError variant="no_match" />

  if (httpState === "ok") {
    return <ResultsDisplay data={results} ingredients={ingredients} sortResults={sortResults} totalCount={totalResultsCount} offset={offset} loadMore={requestData} /> 
  }

  return (
    <div className="mx-auto">
      <Loading />
    </div>
  )
}

/* render data */

const ResultsDisplay = ({data, ingredients, sortResults, totalCount, offset, loadMore}) => {
  //set results display to grid or list
  const [displayType, setDisplayType] = useState('list')
  const [ingredientsShowing, setIngredientsShowing] = useState([])

  const toggleIngredients = (id) => {
    //either remove the ID from state or add it in
    const newState = ingredientsShowing.indexOf(id) > -1
                    ? ingredientsShowing.filter(item => item !== id)
                    : [...ingredientsShowing, id] 
    
      setIngredientsShowing(newState);
  }

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

  const gridItemClasses = classnames('GRID', 'border', 'border-gray-100', 'mb-6 p-4', 'rounded-md');
  const listItemClasses = classnames('LIST', 'md:justify-between', 'md:flex-row', 'pt-6', 'mb-2');

  //compose resultsData item  styles based on viewType (grid or list)
  const itemStyle = (viewType) => (
    classnames('flex', 'flex-col', {
      [gridItemClasses]: viewType === "grid",
      [listItemClasses]: viewType === "list",
    })
  )
  
  return (
        <div className="container">
          <div className="mb-6 flex justify-between items-center">
            
            <ResultsDisplayControl currentDisplay={displayType} setDisplay={setDisplayType} />
            <SortBy sortResults={sortResults} />
            <ResultsCountHeader count={totalCount} offset={offset} />
          </div>
                   

          <div className={displayStyle(displayType)}>
            {
              data.map( ({brand, product_line, flavor, texture, _id}, i) => {
                return <div key={`result_${i}`} className={itemStyle(displayType)}>

        
                {/* LEFT SIDE OF CARD */}
                  <div className="card-left">
                    <p className="font-bold text-xl mb-1">{brand}</p>
                    <p className="text-lg mb-1">{product_line}</p>
                    <p className="italic mb-3">{flavor}</p>
                    <p className="mb-6 px-3 py-1 rounded-2xl bg-red-100 inline-block text-sm">      
                      {texture}
                    </p>
                  </div>

                  {/* RIGHT SIDE OF CARD  */}
                    <div className="card-right w-full md:w-1/2">
                        {
                          ingredientsShowing.indexOf(_id) > -1 
                            ? <div>
                                <p className="float-right w-8 h-8 p-1 cursor-pointer rounded-md hover:bg-gray-200 transition"
                                  onClick={() => toggleIngredients(_id)}>
                                  <XCircleIcon />
                                </p>
                                <IngredientsDisplay data={ingredients[_id]} />
                              </div>
                              
                            : <p className="float-right w-8 h-8 p-1 cursor-pointer rounded-md hover:bg-gray-200 transition"
                                onClick={() => toggleIngredients(_id)}>
                                <InformationCircleIcon />
                            </p>
                           
                        }
                        
                    </div>

                </div>
              })
            }
          </div>
          
          <div className="my-6 flex justify-center">
            <Btn onClick={loadMore}>Load More Results</Btn>
          </div>

          
        </div>
          )
}

const IngredientsDisplay = ({data}) => {
  return (
    <div className="rounded-lg p-6 bg-gray-50">
     {
        data.map((item, i) => (
          <span key={`ingredient_${i}`}>{`${item}${i !== data.length - 1 ? ', ' : ''}`}</span>
        ))
      } 
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
      subheading = "Please refresh the page. You won't lose your filters."
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

const ResultsCountHeader = ({count, offset}) => {
  return (
    <div className="w-1/3 text-right">
      <p>Displaying <strong>{count < offset ? count : offset}</strong> of <strong>{count}</strong> {`match${count === 1 ? '' : 'es'}`}</p>
    </div>
  )
} 

const ResultsPage = () => {
  const { filterQuery, filterCount } = useSelectedFiltersState();
  const [queryOffset, setQueryOffset] = useState(0); //the index at which the query will start searching colletion

  useEffect(() => {
    console.log("filter query is ", filterQuery);
  }, [])

  return (
      <TabPage title="CatDish: Results">

      <div className="my-6">
            <h2 className="text-2xl font-bold mb-2">Your Results </h2>
        </div>

        <div>

        {
          filterCount > 0  
            ? <ResultsData query={filterQuery} offset={queryOffset} setOffset={setQueryOffset} /> 
            : <ResultsError variant="no_filters" />
        }
        

        </div>

       

      </TabPage>
    )
}


export default ResultsPage