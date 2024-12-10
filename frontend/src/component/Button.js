import React from 'react'
function Button({title, onClick, variant, disabled, fullwidth, type}) {
    let className = 'bg-brown-500 p-1 text-white mt-1 rounded-lg ring-2 hover:ring-offset-2'
    if(fullwidth) {
        className += " w-full"
    }
    if(variant === 'outlined') {
        className = className.replace('bg-primary' , 'border border-primary text-primary bg-white')
    }
    return (
        <button className={className} type={type}>
            {title}
        </button>
    )
}
export default Button;
