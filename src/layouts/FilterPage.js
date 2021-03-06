import PropTypes from 'prop-types'
import TabPage from '@layouts/TabPage'
import QueryBuilder from '@components/QueryBuilder'
import ErrorDisplay from '@components/ErrorDisplay'

const FilterPage = ({ title, filterName, data, dataType }) => {
  return (
    <TabPage title={title}>
          {
              data && data.length > 0
              ? <QueryBuilder tabName={filterName} optionList={data} dataType={dataType} />
              : <ErrorDisplay heading="Something went wrong" subheading="There was a problem retrieving data."/>
          }
    </TabPage>
  )
}

FilterPage.propTypes = {
    title: PropTypes.string.isRequired,
    filterName: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired, //<-- can be either a list or an array of objects
    dataType: PropTypes.string.isRequired //<-- indicate type of data; either LIST or CATEGORIZED_LIST
}


export default FilterPage



