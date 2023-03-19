import React from 'react'
import styled from 'styled-components'


import FormLogoSvg from "../../assets/svg/form_header.svg"

const Logo = styled.img`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
       width: 5rem;
       transform: translate(-40%, -75%);
  `};

`


export default () => {
    return (
        <div>
            <Logo src={FormLogoSvg} />
        </div>
    )
}