
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useState} from 'react'
import querystring from 'querystring'
import classnames from 'tailwindcss-classnames'
import { AdjustmentsIcon, XIcon } from '@heroicons/react/outline'
import Logo from '@components/Logo'
import IconBtn from '@components/IconBtn'
import Btn from '@components/Btn'
import styles from '@styles/TabPage.module.scss'



//@links is a list of links
//@tablist is a TabLsit component
const NavBar = ({ activeTab, tabs }) => {
    const [ filtersDropped, setFiltersDropped ] = useState(false);
    const toggleFilters = () => setFiltersDropped(!filtersDropped);
    const router = useRouter();


    return (
    <>
      <header className={classnames('w-full', 'z-40', 'bg-white', 'py-1 px-3', 'flex', 'md:items-center',
          {
              [styles.border + ' sticky top-0'] : tabs, //if navbar includes fulter tabs, add these styles
              ['h-16'] : !tabs
          }
      )}>
        {/* header left */}
        <div>
            <Link href="/" passhref>
                <Logo  />  
            </Link>
        </div>

        { /* header right */
            tabs ? (
                <div className="w-full flex justify-end md:justify-center">
                <div className='hidden  mx-auto md:inline-flex md:shadow-none md:w-auto shadow-lg '>
                    {
                        tabs.map((tab, i) => (
                            <div key={`tablist_${i}`} className="mx-2 relative">
                                <Link href={tab.path + '/?' + querystring.stringify(router.query)} scroll={false}>
                                    <a className="block">
                                        <Btn 
                                            variant="tab" 
                                            active={tab.name === activeTab}
                                            >
                                            {tab.displayName}
                                        </Btn>
                                    </a>
                                </Link>
                            </div>
                        ))  
                    }
                </div>
                <div className="md:hidden">
                    <IconBtn 
                        tooltipText="Toggle filters"
                        tooltipPosition="bottom"
                        onClick={toggleFilters}
                        isActive={filtersDropped}>
                        {
                            filtersDropped 
                            ? <XIcon />
                            : <AdjustmentsIcon />
                        }
                    </IconBtn>
                    
                </div>
                </div>
            )
            : ''
        }
    </header>
    { /* header dropdown */
            tabs && filtersDropped 
            ? <div className="sticky top-12 -mt-2 bg-white divide-y rounded-b-md shadow-lg py-3 z-50 md:hidden">
                {
                    tabs.map((tab, i) => (
                        <Link key={`filter-link-${i}`}  href={tab.path + '/?' + querystring.stringify(router.query)} scroll={false}>
                            <a className={classnames('block py-2 px-4 font-bold hover:bg-gray-200 hover:text-red-400 cursor-pointer ', {
                                ['bg-gray-200 text-red-400'] : tab.name === activeTab
                            })}>
                            {tab.displayName}
                            </a>
                        </Link>
                        
                    ))
                }
            </div>
            : '' 
        }
    </>
    )
}
  

export default NavBar
