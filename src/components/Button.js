import PropTypes from 'prop-types'
import style from '@styles/Button.module.scss'

/* button variants */

/*
    pill
    default

*/

const Button = ({
    onClick,
    variant,
    active,
    icon,
    children
}) => {
    if (icon) {
        return (
            <button 
                type="button" 
                onClick={onClick} 
                className={`${style.button} ${style[variant]}`}
            >
                {children}
                <span className={style.icon}>{icon}</span> 
            </button>
        )  
    }
    return (
        <button 
            type="button" 
            onClick={onClick} 
            className={`${style.button} ${style[variant]} ${active ? style.active : ""}`}
        >
            {children}  
        </button>
    )
}

export default Button;

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.string,
    active: PropTypes.bool,
    icon: PropTypes.element
}