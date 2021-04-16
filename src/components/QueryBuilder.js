import PropTypes from 'prop-types'
import Link from 'next/link'
import { useSelectedFiltersUpdate } from '@context/selectedFilters'
import { getNavPath } from '@utils/data'

//format the language on the filter button label
const Heading = ({category}) => {

    if (category === "brand" || category === "texture" ) {
        return (
            <div className="my-6">
                <h2 className="text-2xl font-bold mb-2">I want to filter by {category} </h2>
                <h4 className="text-l font-medium">Results will match <span className="underline">one or more</span> of the {category}s you select</h4>
            </div>
        )
    }

    return (
        <div className="my-6">
            <h2 className="text-2xl font-bold mb-2">I want to {category} ingredients </h2>
            <h4 className="text-l font-medium">Results will {category} <span className="underline">all of</span> the ingredients you select</h4>
        </div>
    )
    
  }

const QueryBuilder = ({tabName, optionList}) => {
    const { addFilter } = useSelectedFiltersUpdate();

    const handleAddFilter = (e) => {
       addFilter(tabName, e.target.dataset["filter"])
    }

    const resultsTabPageLink = getNavPath("results");


    return (
        <>
            <Heading category={tabName} />
            <p>SearchBar TBD</p>
            <p>OptionListHeader TBD</p>
            <ul>
            {
                optionList.map((item, i) => (
                <li key={`${tabName}_${i}`}>
                    <button data-filter={item} onClick={handleAddFilter}>{item}</button>
                </li>
                ))
            } 
            </ul>    
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
