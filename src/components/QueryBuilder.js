import PropTypes from 'prop-types'
import Link from 'next/link'
import { useSelectedFiltersUpdate } from '@context/selectedFilters'
import { getNavPath } from '@utils/data'

const QueryBuilder = ({tabName, optionList}) => {
    const { addFilter } = useSelectedFiltersUpdate();

    const handleAddFilter = (e) => {
       addFilter(tabName, e.target.dataset["filter"])
    }

    const resultsPageLink = getNavPath("results");


    return (
        <>
            <h2>I want to pick a {tabName}</h2>
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
                    <Link href={resultsPageLink}>Get Results</Link>
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
