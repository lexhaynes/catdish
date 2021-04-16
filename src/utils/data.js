import navData from '@data/nav.json'

export const getNavPath = (pathName) => {
    return navData.filter(item => item.name === pathName)[0].path;
}
