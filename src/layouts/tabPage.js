import PropTypes from 'prop-types'
import AppShell from '@layouts/AppShell'
import TabNav from '@components/TabNav'
import SelectedFiltersDisplay from '@components/SelectedFiltersDisplay'
import QueryBuilder from '@components/QueryBuilder'

const TabPage = ({ title, tabName, data }) => {

    return (
        <AppShell title={title}>
            <SelectedFiltersDisplay />

            <TabNav />

            {
                data && data.length > 0
                    ? <QueryBuilder tabName={tabName} optionList={data} />
                    : <div>Problem retrieving data.</div>
            }
        </AppShell>
    )
}

TabPage.propTypes = {
    title: PropTypes.string,
    tabName: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
}


export default TabPage



