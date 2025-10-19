import React from 'react'

export const YellowButton = (props) => {
    return (
        <div>
            <button className='px-3 py-1 text-black bg-amber rounded-md' type={!props.title ? null : props.title}>
                {props.title}
            </button>
        </div>
    )
}
