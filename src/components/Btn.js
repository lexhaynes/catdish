import PropTypes from 'prop-types'
import style from '@styles/Btn.module.scss'

const Btn = ({
    onClick,
    variant,
    active,
    icon,
    children,
    ...props
}) => {
    if (icon) {
        return (
            <button 
                type="button" 
                onClick={onClick} 
                className={`${style.button} ${style[variant || 'primary']}`}
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
            className={`${style.button} ${style[variant || 'primary']} ${active ? style.active : ""}`}
            {...props}
        >
            {children}  
        </button>
    )
}

export default Btn;

Btn.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.string,
    active: PropTypes.bool,
    icon: PropTypes.element
}
