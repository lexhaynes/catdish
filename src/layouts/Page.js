import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import AppShell from '@layouts/AppShell'
import SelectedFiltersDisplay from '@components/SelectedFiltersDisplay'
import TabList from '@components/TabList'
import QueryBuilder from '@components/QueryBuilder'
import navData from '@data/nav.json'

const Page = ({ title, tabName, data }) => {
    const router = useRouter()
    const currentPath = router.pathname.split("/")[1]
    const [activeTab, setActiveTab] = useState(currentPath);


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
            
            <section className="my-10 mx-auto">
                
                <div className="mb-4">
                    <TabList 
                        activeTab={activeTab} 
                        tabs={navData.filter(item => item.name !== "home")} />
                </div>

                {
                    data && data.length > 0
                    ? <QueryBuilder tabName={tabName} optionList={data} />
                    : <div>Problem retrieving data.</div>
                }
            </section>
              
        </AppShell>
    )
}

Page.propTypes = {
    title: PropTypes.string,
    tabName: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
}


export default Page



