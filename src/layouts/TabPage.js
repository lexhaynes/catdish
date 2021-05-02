import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import AppShell from '@layouts/AppShell'
import SelectedFiltersDisplay from '@components/SelectedFiltersDisplay'
import Navbar from '@components/Navbar'
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

            
            {/* Tab View Section */ }           
             <section className="mx-auto h-full">
     
               <Navbar activeTab={activeTab} tabs={tabs} />

                <div className="overflow-hidden">       
                    <article className={`relative mb-10 py-6 mx-auto bg-red-400 z-20`}>
                        <div className="w-11/12 lg:w-2/3 mx-auto">
                            <SelectedFiltersDisplay />
                        </div>
                    </article>
                    {/* attractive blob */}
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    className="-mt-20 w-full h-48 relative z-10"
                    viewBox="0 0 1440 320" preserveAspectRatio="none" style={{transform: "scaleY(-1)"}}><path fill="#F87171" d="M0,224L40,218.7C80,213,160,203,240,213.3C320,224,400,256,480,240C560,224,640,160,720,144C800,128,880,160,960,149.3C1040,139,1120,85,1200,96C1280,107,1360,181,1400,218.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
                    
                    {/* Data Display Section */ }  
                    <article className="mb-4 -mt-20">
                        <div className="w-11/12 lg:w-2/3 mx-auto rounded-xl">
                            {children}
                        </div>
                    </article>
                </div> 

            </section>
        
        </AppShell>
    )
}

TabPage.propTypes = {
    title: PropTypes.string,
}


export default TabPage



