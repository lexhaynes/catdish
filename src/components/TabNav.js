import Link from 'next/link'
import navData from '@data/nav.json'


const TabNav = () => {
    return (
        <div>  
            {
                navData.filter(nav => nav.name !== "home").map((tab, i) => (
                    <span key={`tablist_${i}`}>
                        <Link href={tab.path}>
                            <a>{tab.displayName}</a>
                        </Link>
                        {` `}
                    </span>
                ))  
            }
            
        </div>
    )
}


export default TabNav