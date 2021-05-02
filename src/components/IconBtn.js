import { useState } from 'react'
import {classnames} from 'tailwindcss-classnames'

/*
    @param tooltip : tooltip text
*/
const IconBtn = ({ tooltipText, tooltipPosition = 'top', isActive, children, ...props}) => {
    const [ tooltipVisible, setTooltipVisible ] = useState(false);
    
    const toggleTooltip = () => {
      setTooltipVisible(!tooltipVisible);
    }

    const iconStyles = classnames('flex justify-center items-center w-10 h-10 cursor-pointer px-2 ml-1 text-gray-500 hover:bg-gray-200 focus:bg-gray-200 rounded-lg `', 
    {
        ['bg-gray-200']: isActive,
    });

    const tooltipStyles = classnames('absolute text-xs text-white w-auto whitespace-nowrap bg-gray-800 shadow-sm p-2 rounded-md', {
        ['block']: tooltipVisible,
        ['hidden']: !tooltipVisible,
        ['-mt-20 ']: tooltipPosition == 'top', //default tooltip to top
        ['-ml-10 mt-3']: tooltipPosition == 'bottom',
    })

    //has tooltip
    if (tooltipText) {
        return (
            <div className="relative">
            <p 
            {...props}
              tabIndex={1} 
              onMouseEnter={toggleTooltip}
              onMouseLeave={toggleTooltip}
              className={iconStyles}>
              {children}
            </p>
            <p className={tooltipStyles}>{tooltipText}</p>
          </div>
        )
    }
    //no tooltip
    return (
      <div className="relative">
        <p 
        {...props}
          tabIndex={1} 
          className={iconStyles}>
          {children}
        </p>
      </div>
    
    )
  }

  export default IconBtn