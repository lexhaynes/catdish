import {useEffect, useState, useRef} from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import AppShell from '@layouts/AppShell'
import SelectedFiltersDisplay from '@components/SelectedFiltersDisplay'
import Logo from '@components/Logo'
import TabList from '@components/TabList'
import navData from '@data/nav.json'
import { StickyContainer, Sticky } from 'react-sticky'
import styles from '@styles/TabPage.module.scss'

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

            
            {/* Tab View Section */ }           
             <section className="mx-auto h-full">

                          
                <header className={`z-50 pt-3 ${styles.border}  bg-white sticky top-0`}>
                        {/* header left */}
                        <div className='-mt-1  ml-4 absolute'>
                            <Logo color='yellow-500' />   
                        </div>
                        
                        {/* header right */}
                        <div className='w-5/12 mx-auto'>
                            <TabList 
                            activeTab={activeTab} 
                            tabs={tabs} />
                        </div>
                      
                    
                </header>
             
                        
                <article className="my-10 mx-auto">
                    <div className="sm:w-11/12 lg:w-2/3 mx-auto">
                        <SelectedFiltersDisplay />
                    </div>
                </article>
                
                {/* Data Display Section */ }  
                <article className="mb-4">
                    <div className="sm:w-11/12 lg:w-2/3 mx-auto rounded-xl">
                        {children}
                    </div>
                </article>

            </section>
        
        </AppShell>
    )
}

TabPage.propTypes = {
    title: PropTypes.string,
}


export default TabPage



