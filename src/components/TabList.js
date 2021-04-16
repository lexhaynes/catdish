import PropTypes from 'prop-types'
import Link from 'next/link'
import Button from '@components/Button'

const TabList = ({activeTab, tabs}) => {
     return (
        <div className="flex border-b border-gray-300">  
            {
                tabs.map((tab, i) => (
                    <span key={`tablist_${i}`} className="mr-2">
                        <Link href={tab.path} passHref>
                            <Button variant="tab" active={tab.name === activeTab}>

                                {tab.displayName}
                            </Button>
                        </Link>
                    </span>
                ))  
            }
            
        </div>
    )
    
}

TabList.propTypes = {
    activeTab: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    })).isRequired,
 }


export default TabList