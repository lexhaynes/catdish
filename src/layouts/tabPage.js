import PropTypes from 'prop-types'
import Page from '@layouts/page'
import TabList from '@components/tabList'
import SelectedFiltersDisplay from '@components/selectedFiltersDisplay'
import { useSelectedFiltersUpdate } from '@context/selectedFilters'

const TabPage = ({title, tabName, data}) => {
    const { addFilter } = useSelectedFiltersUpdate();

    const handleAddFilter = (e) => {
       addFilter(tabName, e.target.dataset["filter"])
    }

    return (
        <Page title={title}>
            <SelectedFiltersDisplay />

            <TabList />

            <h1>{tabName}</h1>
            <ul>
            {
                data.map((item, i) => (
                <li key={`${tabName}_${i}`}>
                    <button data-filter={item} onClick={handleAddFilter}>{item}</button>
                </li>
                ))
            } 
            </ul>
        </Page>
    )
}

TabPage.propTypes = {
    title: PropTypes.string,
    tabName: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
}


export default TabPage



