import PropTypes from 'prop-types'
import TabPage from '@layouts/TabPage'
import QueryBuilder from '@components/QueryBuilder'

const FilterPage = ({ title, filterName, data }) => {
  return (
    <TabPage title={title}>
          {
              data && data.length > 0
              ? <QueryBuilder tabName={filterName} optionList={data} />
              : <div>Problem retrieving data.</div>
          }
    </TabPage>
  )
}

FilterPage.propTypes = {
    title: PropTypes.string.isRequired,
    filterName: PropTypes.string.isRequired,
    data: PropTypes.array
}


export default FilterPage



