import React, { Fragment } from 'react'

import Button from '../../UI/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
        return <li key={ igKey }>
                    <span style={{textTransform: 'capitalize'}}>{ igKey }</span>
                    : { props.ingredients[igKey] }
                </li>
        })
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>The ingredients are:</p>
            <ul>
                { ingredientSummary }
            </ul>
            <p><strong>Total Price: $ { props.price.toFixed(2) }</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType="Danger" clicked={ props.purchaseCancel }>CANCEL</Button>
            <Button btnType="Success" clicked={ props.purchaseContinue }>CONTINUE</Button>
        </Fragment>
    )
}

export default orderSummary
