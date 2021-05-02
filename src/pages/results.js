import axios from 'axios'
import { useEffect, useState } from 'react'
import collection from 'lodash/collection'
import {classnames} from 'tailwindcss-classnames';
import TabPage from '@layouts/TabPage'
import { useSelectedFiltersState } from '@context/selectedFilters'
import ErrorDisplay from '@components/ErrorDisplay'
import Loading from '@components/Loading'
import Btn from '@components/Btn'
import IconBtn from '@components/IconBtn'
import { ViewGridIcon, ViewListIcon, SortAscendingIcon, SortDescendingIcon} from '@heroicons/react/outline';
import { ExclamationCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { XCircleIcon, CollectionIcon } from '@heroicons/react/outline'



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

  /* group results by brand */
  const groupResults = () => {
    console.log("grouping results")
  }

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
  //  let isMounted = true;
    requestData()
    //return () => { isMounted = false };
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
    return <ResultsDisplay data={results} 
      ingredients={ingredients} 
      groupResults={groupResults} 
      sortResults={sortResults} 
      totalCount={totalResultsCount} 
      offset={offset} 
      loadMore={requestData} /> 
  }

  return (
    <div className="mx-auto">
      <Loading />
    </div>
  )
}

/* render data */

const ResultsDisplay = ({data, ingredients, sortResults, groupResults, totalCount, offset, loadMore}) => {
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
    classnames({
      [gridDisplayClasses]: viewType === "grid",
      [listDisplayClasses]: viewType === "list",
    })
  );

  const gridItemClasses = classnames('GRID', 'mb-6 p-4', 'rounded-lg', 'shadow-md');
  const listItemClasses = classnames('LIST', 'p-4', 'mb-2', 'rounded-md', 'md:justify-between', 'md:flex-row');

  //compose resultsData item  styles based on viewType (grid or list)
  const itemStyle = (viewType) => (
    classnames('flex', 'flex-col', {
      [gridItemClasses]: viewType === "grid",
      [listItemClasses]: viewType === "list",
    })
  )
  
  return (
        <div className="container">
          <div className="mb-3 pb-2 shadow-sm flex items-center">
            <span className="mr-6">
              <ResultsDisplayControl currentDisplay={displayType} setDisplay={setDisplayType} />

            </span>
            <SortBy sortResults={sortResults} />
           {/*  <GroupBy groupResults={groupResults} /> */}
          </div>
                   
          <div className="mt-10 mb-3 flex justify-end">
            <ResultsCountHeader count={totalCount} offset={offset} />
          </div>

          <div className={displayStyle(displayType)}>
            {
              data.map( ({brand, product_line, flavor, texture, _id}, i) => {
                return <div key={`result_${i}`} className={itemStyle(displayType)}>

        
                {/* LEFT SIDE OF CARD */}
                  <div className="card-left">
                    <p className="font-bold text-xl mb-1">{brand}</p>
                    <p className="text-lg mb-1 font-semibold">{product_line}</p>
                    <p className="italic mb-3">{flavor}</p>
                    <p className="mb-6 px-3 py-1 rounded-2xl bg-red-100 inline-block text-sm">      
                      {texture}
                    </p>
                  </div>

                  {/* RIGHT SIDE OF CARD  */}
                    <div className={`card-right w-full ${displayType === "list" ? 'md:w-1/2' : ''} md:items-end relative`}>
                        {
                          ingredientsShowing.indexOf(_id) > -1 
                            ? <div className="inline-flex justify-end items-start">
                              <p className="absolute w-8 h-8 p-1 cursor-pointer rounded-md hover:bg-gray-200 transition"
                                  onClick={() => toggleIngredients(_id)}>
                                  <XCircleIcon />
                              </p>
                              <IngredientsDisplay data={ingredients[_id]} id={_id} />
                            </div>
                              
                              
                            : <div className={`flex ${displayType === "list" ? 'md:justify-end' : ''} items-center`}>
                                {/* inner wrapper specifically for bg on hover */}
                                <div className="flex justify-end items-center cursor-pointer rounded-md hover:bg-gray-200 transition px-3" 
                                     onClick={() => toggleIngredients(_id)}>
                                  <span className="font-semibold pr-2 text-red-400">See Ingredients</span>
                                    <p className="w-8 h-8 p-1 text-red-400">
                                        <PlusCircleIcon />
                                    </p>
                                </div>
                              
                            </div>                           
                        }
                        
                    </div>

                </div>
              })
            }
          </div>
          {
            totalCount > LIMIT 
            ? <div className="my-6 flex justify-center">
               <Btn onClick={loadMore}>Load More Results</Btn>
              </div>
            : ''
          }
          

          
        </div>
          )
}

const IngredientsDisplay = ({data, id}) => {
  const reportItem = () => {
    alert("TODO: report item");
  }
  return (
    <div className="rounded-lg p-6 bg-gray-100">
      <div className="rounded-md p-3 mt-3 bg-white">
        {
          data.map((item, i) => (
            <span key={`ingredient_${i}`}>{`${item}${i !== data.length - 1 ? ', ' : ''}`}</span>
          ))
        } 
      </div>

      <div className="flex mt-3 items-center">
        {/* inner wrapper for bg hover */}
        <div className="flex justify-end items-center cursor-pointer rounded-md hover:bg-gray-200 transition px-3" 
             onClick={reportItem}>
          <p className="w-8 h-8 p-1 mr-2 transition">
          <ExclamationCircleIcon />
          </p>
          <p>Report an inaccuracy</p>
        </div>
 
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
      subheading = "Please refresh the page. You won't lose your filters."
    break;

  }

  return (
      <ErrorDisplay heading={heading} subheading={subheading} />
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
        tooltipText="List View"
        onClick={()=>handleDisplay("grid")}
        isActive={currentDisplay === "grid"}>
        <ViewGridIcon />
      </IconBtn>
         
      <IconBtn 
        tooltipText="Grid View"
        onClick={()=>handleDisplay("list")}
        isActive={currentDisplay === "list"}>
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
          tooltipText="Sort A - Z">
        <SortAscendingIcon />
      </IconBtn>

      <IconBtn 
        onClick={()=>sortResults("desc")}
        tooltipText="Sort Z - A">
        <SortDescendingIcon />
      </IconBtn>
    </div>

  )
}

const GroupBy = ({groupResults}) => {

  return (
    <div className="flex justify-between items-center">
      <p className="font-semibold mr-2">Group by brand </p>
          <IconBtn 
          onClick={()=>groupResults()}
          tooltipText="">
        <CollectionIcon />
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