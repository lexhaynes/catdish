import Link from 'next/link'
import Page from '@ayouts/page'
import data from '@data/nav.json'

 const Ingredients = () => {
    const includesPath = data.filter(item => item.name === "includes")[0].path;
    const excludesPath = data.filter(item => item.name === "excludes")[0].path;

    return (
        <Page name={`CatDish: Ingredients`}>
        <h1>Ingredients - Error</h1>
            <p>
                Do you want to <Link href={includesPath}><a>include</a></Link> ingredients or <Link href={excludesPath}><a>exclude</a></Link> ingredients? 
            </p>
        </Page>
    )
}

export default Ingredients