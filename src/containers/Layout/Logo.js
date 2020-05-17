import React from 'react'

import ilogo from '../../assets/original.png'
import classes from './Logo.css'

const logo = (props) => (
    <div className={ classes.Logo } style={{ height: props.height }}>
        <img src={ ilogo } alt="MyBurger" />
    </div>
)

export default logo
