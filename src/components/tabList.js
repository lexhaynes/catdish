import Link from 'next/link'
import navData from '@data/nav.json'


const TabList = () => {
    return (
        <ul>
            <h2>TabList</h2>
            {
                navData.filter(nav => nav.name !== "home").map((tab, i) => (
                    <li key={`tablist_${i}`}>
                        <Link href={tab.path}>
                            <a>{tab.displayName}</a>
                        </Link>
                    </li>
                ))  
            }
            
        </ul>
    )
}


export default TabList