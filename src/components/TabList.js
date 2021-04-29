import {useState} from 'react'
import querystring from 'querystring'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Button from '@components/Button'
import { useRouter } from 'next/router'

const TabList = ({activeTab, tabs}) => {

    const router = useRouter();
     return (
            <div className={`flex flex-row justify-center`}>  
            {
                tabs.map((tab, i) => (
                    <span key={`tablist_${i}`} className="mr-2">
                        <Link href={tab.path + '/?' + querystring.stringify(router.query)} scroll={false} passHref>
                            <a>
                            <Button 
                                variant="tab" 
                                active={tab.name === activeTab}
                                >
                                {tab.displayName}
                            </Button>
                            </a>
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
      name: PropTypes.string.isRequired,
    })).isRequired,
 } 


export default TabList