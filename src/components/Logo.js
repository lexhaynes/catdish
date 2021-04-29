import classnames from 'tailwindcss-classnames'

const Logo = ({color = "pink"}) => {
    const style = classnames('w-24', 'h-8');
    if (color == "black") return <img className={style} src="logo-black.png" />
    return <img className={style} src="logo-pink.png" />
  }
  

export default Logo