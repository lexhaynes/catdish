import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import AppShell from '@layouts/AppShell'
import SelectedFiltersDisplay from '@components/SelectedFiltersDisplay'
import TabList from '@components/TabList'
import navData from '@data/nav.json'

const TabPage = ({ title, children }) => {
    const router = useRouter()
    const currentPath = router.pathname.split("/")[1]
    const [activeTab, setActiveTab] = useState(currentPath);
    const tabs = navData.filter(item => item.name !== "home");

    useEffect(() => {
        updateTab();
    }, [activeTab])

    const updateTab = () => {
        setActiveTab(router.pathname.split("/")[1])
    }



    return (
        <AppShell title={title}>
            
            <section className="my-10 mx-auto">
                <SelectedFiltersDisplay />
            </section>
            
            {/* Tab View Section */ }           
             <section className="my-10 mx-auto">
                
                <div className="mb-4">
                    <TabList 
                        activeTab={activeTab} 
                        tabs={tabs} />
                </div>
                
                {/* Data Display Section */ }  
                <div className="mb-4">
                    {children}
                </div>

            </section>
              
        </AppShell>
    )
}

TabPage.propTypes = {
    title: PropTypes.string,
}


export default TabPage



