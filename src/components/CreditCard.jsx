import React from 'react'

import { Box, Image, Badge, Button, Flex, Spacer } from "@chakra-ui/react";
import Cards from 'react-credit-cards';
const CreditCard = (props) => {
    const [flip, setFlip] = React.useState(false)
    const [focus, setFocus] = React.useState('')
    const cardFlip = () => {
        if (flip) {
            setFlip(false)
            setFocus('')
        } else {
            setFlip(true)
            setFocus('cvc')
        }
    }
    return (
        <Box
            onMouseEnter={cardFlip}
            onMouseLeave = {cardFlip}
            >
            <Cards
                cvc={props.cvc}
                expiry={props.expiry}
                focused={focus}
                name={props.name}
                number={props.number}
            />
        </Box>
    )
}

export default CreditCard