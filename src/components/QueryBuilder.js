import PropTypes from 'prop-types'
import {classnames} from 'tailwindcss-classnames'
import querystring from 'querystring'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import Btn from '@components/Btn'
import { useSelectedFiltersUpdate, useSelectedFiltersState } from '@context/selectedFilters'
import { getNavPath } from '@utils/data'
import { capitalize } from '@utils/misc'
import lang from 'lodash/lang'

const headingStyles = "text-2xl font-bold mb-2";
const subheadStyles = "text-md font-medium";

//format the language on the filter button label
const Heading = ({category}) => {

    if (category === "brand" || category === "texture" ) {

        return (
            <div className="my-6">
                <h2 className={headingStyles}>I want to filter by {category} </h2>
                <h4 className={subheadStyles}>Results will match <span className="underline">one or more</span> of the {category}s you select</h4>
            </div>
        )
    }

    return (
        <div className="my-6">
            <h2 className={headingStyles}>I want to {category} ingredients </h2>
            <h4 className={subheadStyles}>Results will {category} <span className="underline">all of</span> the ingredients you select</h4>
        </div>
    )
    
  }

const SearchBar = ({searchInput, handleChange}) => {
    return (
     <div className="relative my-6 text-gray-600 h-10 w-1/2">
        <input className="border border-gray-400 bg-white w-full h-full px-4 rounded-lg text-sm focus:outline-none focus:border-yellow-500 focus:border-2"
          name="search" 
          placeholder={`Search the filters`} 
          value={searchInput} 
          onChange={handleChange} 
        />
        <span className="flex items-center h-full w-4 absolute right-0 top-0 mr-4 focus:outline-none">
            <SearchIcon className="text-gray-600 fill-current" />
        </span>
      </div> 
    )
}

const OptionItem = ({category, filter, isSelected, children}) => {
    const [selected, setSelected] = useState(false);
    const { addFilter, deleteFilter } = useSelectedFiltersUpdate();

    //set selected with prop value & re-render every time prop val changes!
    useEffect(() =>  setSelected(isSelected))

    const updateSelected = () => {
        setSelected(!selected)
    }
    
    const handleClick = () => {
        if (selected) {
            deleteFilter(category, filter);
        } else {
            addFilter(category, filter);
        }
        updateSelected();
    } 

    const baseClasses = "flex justify-center align-center border p-3 cursor-pointer focus:outline-none"
    const defaultClasses = "bg-white hover:bg-gray-700 hover:text-white"
    const selectedClasses = "bg-gray-700 text-white hover:bg-gray-500"
    

    return (
        <button
            onClick={() => handleClick()} 
            className={`${baseClasses} ${selected ? selectedClasses : defaultClasses}`}>
                <p>{children}</p>
                {selected ? <CheckCircleIcon className="w-6"/>: ''}
        </button>
    )
}

const OptionItemExpandable = ({ingredientGroup, category, options}) => {
  const { readOnlyFilters } = useSelectedFiltersState(); //determine which, if any, filters are already selected
  const { addFilter, deleteFilter } = useSelectedFiltersUpdate();

  const [categorySelected, setCategorySelected] = useState(false)



  const toggleCategorySelected = () => {
    setCategorySelected(!categorySelected)
  }
  
  const toggleExpansion = () => {
    toggleCategorySelected();
  } 

  const isOptionItemSelected = (filter) => {
    
    let isSelected = false;
    for (let key in readOnlyFilters) {
      const transformedFilters = readOnlyFilters[key].map(filter => filter.toLowerCase())
      if (transformedFilters.includes(filter.toLowerCase())) {
        isSelected = true;
        break;
      }
    }
    return isSelected;
  }

  //when sub item is clicked, either add or remove filter
  const handleItemClick = (isSelected, filter) => {
    if (isSelected) {
      deleteFilter(category, filter);
    } else addFilter(category, filter);
  }

  //classes for the group header
  const baseGroupClasses = classnames('flex', 'justify-between', 'align-center', 'shadow-lg', 'p-3', 'w-full', 'text-left', 'cursor-pointer', 'focus:outline-none');
  const defaultGroupClasses = classnames('bg-white', 'hover:bg-gray-700', 'hover:text-white', 'rounded-lg');
  const selectedGroupClasses = classnames('bg-gray-700', 'text-white', 'hover:bg-gray-500', 'pb-5', 'rounded-t-lg');
 
  //classes for the group sub-item
  const defaultItemClasses = classnames('cursor-pointer', 'bg-white', 'hover:bg-gray-600', 'hover:text-white');
  
  const buttonStyle = (selected) => (
    classnames(baseGroupClasses, {
      [selectedGroupClasses]: selected,
      [defaultGroupClasses]: selected,
    })
    );

  return (
    <div className="my-4">
      <button
          onClick={() => toggleExpansion()} 
          className={buttonStyle(categorySelected)}>
          <span className="text-lg font-medium">{ingredientGroup}</span>
      </button>
      {
        categorySelected 
        ? <div className="bg-white shadow-lg rounded-b-lg divide-y divide-gray-300 -mt-2">
        {
          options.map((filter, i) => {
            const filterIsSelected = isOptionItemSelected(filter);
    
            return <div key={`optionListItemExpandable_${i}`} 
                        className={`${defaultItemClasses} flex justify-between p-2`} 
                        onClick={() => handleItemClick(filterIsSelected, filter)} 
                        >
                          <span className="ml-4">{capitalize(filter).replace(/_/g, " ")}</span>
                          { filterIsSelected
                            && <CheckCircleIcon className="mr-4 w-6" />
                              
                          }
            </div>
          })
        }
      </div>
        : null
      }
   
    </div>
  )
}

const OptionList = ({category, options, dataType}) => {
    const { readOnlyFilters } = useSelectedFiltersState(); 
    const optionsCopy = lang.clone(options)

      //if our data is a one-dimensional array from the server (e.g. brands or textures data)
      if (dataType === "LIST" && category === "brand") {
        //if category is BRANDS group options into alphabetized sections; return an object where the key is "0-9" or letter of alphabet, and value is array of options
        //see: https://stackoverflow.com/questions/50749152/render-a-list-of-names-alphabetically-and-groupedByFirstLetter-by-their-first-char
        
        const groupedByFirstLetter = optionsCopy
          .sort((firstWord, secondWord) => firstWord.localeCompare(secondWord)) //alphabetize list
          .reduce((accumulator, currentValue) => {
            const firstLetter = currentValue[0];
            const key = firstLetter.match(/[0-9]/g) ? "0-9" : firstLetter; //set key of final object to "0-9" or the letter of alphabet under which word belongs
            if (!accumulator[key]) accumulator[key] = [];
            accumulator[key].push(currentValue);
            return accumulator;
          }, {})

          return (
            <>
            {
                Object.entries(groupedByFirstLetter)
                    .map(([letter, optionList], i) => ( //<-- note: the array here is a destructuring of the Object.entries() return val, which is an array; the first val is groupedByFirstLetter's KEY; the second val is groupedByFirstLetter[key], which is an array 
                        <div key={`optionList_${i}`} className="p-4 rounded-2xl my-6 bg-white">
                            <h3 className="m-3 text-3xl text-yellow-500 font-extrabold">{letter.toUpperCase()}</h3>
                            <div className="space-y-2">
                            {
                                optionList.map((filter, j) => {
                                    const isSelected = readOnlyFilters[category] && readOnlyFilters[category].includes(filter);
                                    return (
                                        <div key={`optionListItem_${j}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mr-3">
                                            <OptionItem category={category} filter={filter} isSelected={isSelected} >
                                                {capitalize(filter).replace(/_/g, " ")}
                                            </OptionItem>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    ))
            }
            </>
          )
      } else if (dataType === "LIST" && category === "texture") { // for the textures, just display items ungroups

        return (
          <div className="w-full p-4 rounded-xl my-6">
          <div className="flex flex-wrap ">
          {
            optionsCopy.map((filter, j) => {
                  const isSelected = readOnlyFilters[category] && readOnlyFilters[category].includes(filter);
                  return (
                      <div key={`optionListItem_${j}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mr-3">
                          <OptionItem category={category} filter={filter} isSelected={isSelected} >
                              {capitalize(filter).replace(/_/g, " ")}
                          </OptionItem>
                      </div>
                  )
              })
          }
          </div>
      </div>
        )
      }
    
    //otherwise our data is an array of objects from filters.json (e.g. for includes/excludes)
    return (
        <>
          {
            options.map( ({display_name, filters}, i) => (
              <div key={`optionGroup_${i}`}>
                <OptionItemExpandable 
                  ingredientGroup={display_name} 
                  category={category} 
                  options={filters}
                  />
              </div>
            ))
          }
          
        </>
    )   
}

const QueryBuilder = ({tabName, optionList, dataType}) => {
    const router = useRouter();
    const resultsTabPageLink = getNavPath("results") + '/?' + querystring.stringify(router.query);
    //searchInput stores the the user-submitted search term in the search field
    const [searchInput, setSearchInput] = useState('');    
    //filteredOptions stores the options that match the user's searchInput, aka a filtered list of data
    const [filteredOptions, setFilteredOptions] = useState([...optionList]);  
  
    const handleSearch = (e) => {
        setSearchInput(() => e.target.value)
    }

    const clearSearch = () => {
        setSearchInput(() => '')
    }

    //transform a string so that it is lower case and has special chars removed
    //this is so that the string will be more easily searchable
    const makeStringSearchable = (str) => {
      return str.toLowerCase().replace(/[-,.&']/g, "")
    }

    //update the filteredOptions list when user enters a search term in the searcnbar
    useEffect(() => {
        const input = makeStringSearchable(searchInput); //transform serach term to lower case and remove special chars for easier searching
       
        //if input is empty, reset filteredOptions to value of optionList
        if (input.length === 0) {
          setFilteredOptions(optionList); 
        } else if (/\s/g.test(input) === false) { //make sure input isn't all whitespace
          
          //deep clone optionList so it doesn't get mutated
          const optionListCopy = lang.cloneDeep(optionList);

          //filter through one dimensional optionList to return only items that match search input
          if (dataType === "LIST") {
            const filteredOneDimensionalList = optionListCopy.filter(option => {
                const transformedOption = makeStringSearchable(option);
                return transformedOption.includes(input)
            })

            setFilteredOptions(() => filteredOneDimensionalList)
            
          } else {  //filter through two dimensional list (list of objects that contain arrays) to return any items that match search input

              //our goal is to create an array of object(s), whose own array of filters ONLY contains vals that match search term
                const filteredTwoDimensionalList = optionListCopy.reduce((accumulator, ingredientGroup) => {
                const { filters } = ingredientGroup;
                
                //filter through list of options and return only items that match search input
                const matchedOptions = filters.filter(option => {
                  const transformedOption = makeStringSearchable(option);
                  return transformedOption.includes(input)
                })
              
                // re-assign ingredientGroup filters only if we found a match (full or partial) to search input within the filters array!
                if (matchedOptions.length > 0) {
                  ingredientGroup.filters = matchedOptions;
                  accumulator = [...accumulator, ingredientGroup];
                }

                return accumulator;
              }, []) //end optionList.reduce

              
              setFilteredOptions(() => filteredTwoDimensionalList)

          }//end else (option list is 2d)
    
        } 
    }, [searchInput])

    return (
        <>
          <div className="p-4">

            <Heading category={tabName} />
            <SearchBar searchInput={searchInput} handleChange={handleSearch}/>

            <h4 className={subheadStyles}>Select your filters below</h4>

          </div>


          {
            filteredOptions.length > 0 
                  ?  <OptionList category={tabName} options={filteredOptions} dataType={dataType} clearSearch={clearSearch}  />
                  :   <>
                          <p className="italic">No results match your search.</p>
                          <Btn variant="link" onClick={() => clearSearch()}> 
                              Clear search terms
                          </Btn>
                      </>
          }
    
            <div className="my-12 flex justify-center">
                <Link href={resultsTabPageLink} passHref>
                    <a><Btn>Get Results</Btn></a>
                </Link>
            </div>   
        </>
    )
}

QueryBuilder.propTypes = {
    tabName: PropTypes.string.isRequired,
    optionList: PropTypes.array.isRequired,
}

export default QueryBuilder
