import PropTypes from 'prop-types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { CheckCircleIcon } from '@heroicons/react/outline'
import Button from '@components/Button'
import { useSelectedFiltersUpdate, useSelectedFiltersState } from '@context/selectedFilters'
import { getNavPath } from '@utils/data'

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
        <input className="border border-gray-400 bg-white w-full h-full px-4 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:border-2"
          name="search" 
          placeholder="Search" 
          value={searchInput} 
          onChange={handleChange} 
        />
        <span className="flex items-center h-full w-4 absolute right-0 top-0 mr-4 focus:outline-none">
            <SearchIcon className="text-gray-600 fill-current" />
        </span>
      </div> 
    )
}

//TODO: set card as selected or not based on the URL!!
const Card = ({category, filter, isSelected, children}) => {
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

    const baseClasses = "flex justify-between align-center shadow-lg rounded-lg p-3 my-4 w-full text-left cursor-pointer focus:outline-none"
    const defaultClasses = "bg-white hover:bg-gray-700 hover:text-white"
    const selectedClasses = "bg-gray-700 text-white hover:bg-gray-500"
    

    return (
        <button
            onClick={() => handleClick()} 
            className={`${baseClasses} ${selected ? selectedClasses : defaultClasses}`}>
                {children}
                {selected ? <CheckCircleIcon className="w-6"/>: ''}
        </button>
    )
}

const OptionList = ({category, options, clearSearch}) => {
    const { readOnlyFilters } = useSelectedFiltersState();

//see: https://stackoverflow.com/questions/50749152/render-a-list-of-names-alphabetically-and-groupedByFirstLetter-by-their-first-char
//group options into alphabetized sections; return an object where the key is "0-9" or letter of alphabet, and value is array of options
const groupedByFirstLetter = options
    .sort((firstWord, secondWord) => firstWord.localeCompare(secondWord)) //alphabetize list
    .reduce((accumulator, currentValue) => {
      const firstLetter = currentValue[0];
      const key = firstLetter.match(/[0-9]/g) ? "0-9" : firstLetter; //set key of final object to "0-9" or the letter of alphabet under which word belongs
      if (!accumulator[key]) accumulator[key] = [];
      accumulator[key].push(currentValue);
      return accumulator;
    }, {})

    if (options.length > 0) {
        return (
            <>
            {
                Object.entries(groupedByFirstLetter)
                    .map(([letter, optionList], i) => { //<-- note: the array here is a destructuring of the Object.entries() return val, which is an array; the first val is groupedByFirstLetter's KEY; the second val is groupedByFirstLetter[key], which is an array 
                        return (
                            <div key={`${category}wrapper_${i}`}>
                                <h3 className="m-3 text-3xl text-indigo-500 font-extrabold">{letter}</h3>
                                <div className="flex flex-wrap ">
                                {
                                    optionList.map((filter, j) => {
                                        const isSelected = readOnlyFilters[category] && readOnlyFilters[category].includes(filter);
                                        return <div key={`${category}_${j}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mr-3">
                                                <Card category={category} filter={filter} isSelected={isSelected} >
                                                    {filter}
                                                </Card>
                                            </div>
                                    })
                                }
                                </div>
                            </div>
                        )
                    })
            }
            </>
        )   
    }
    return (
        <>
            <p className="italic">No results match your search.</p>
            <Button variant="link" onClick={() => clearSearch()}> 
                Clear search terms
            </Button>
        </>
    )
}

const QueryBuilder = ({tabName, optionList}) => {
    const resultsTabPageLink = getNavPath("results");
    const [searchInput, setSearchInput] = useState('');    
    const [filteredOptions, setFilteredOptions] = useState([...optionList]);  
  

    const handleSearch = (e) => {
        setSearchInput(() => e.target.value)
    }

    const clearSearch = () => {
        setSearchInput(() => '')
    }

    
    useEffect(() => {
        setFilteredOptions(() => optionList.filter(item => {
            const filterListItem = item.toLowerCase().replace(/[-,.&']/g, ""); //set filter to lower case and remove special chars for easier searching
            const input = searchInput.toLowerCase().replace(/[-,.&']/g, ""); //set serach term to lower case and remove special chars for easier searching
            return filterListItem.includes(input)
        }))
    }, [searchInput])


    return (
        <>
            <Heading category={tabName} />
            <SearchBar searchInput={searchInput} handleChange={handleSearch}/>

            <h4 className={subheadStyles}>Select your {tabName}s</h4>

           
            <OptionList category={tabName} options={filteredOptions} clearSearch={clearSearch}  />

            <div>
                <button>
                    <Link href={resultsTabPageLink}>Get Results</Link>
                </button>
            </div>   
              
            
        </>
    )
}

QueryBuilder.propTypes = {
    tabName: PropTypes.string.isRequired,
    optionList: PropTypes.array.isRequired,
}

export default QueryBuilder
