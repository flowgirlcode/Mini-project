import React from 'react'
import styled from 'styled-components'

function Button({name, icon, onClick, bg, bPad}) {
    return (
        <ButtonStyled style={{ background:bg,padding: bPad, }} onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
`;


export default Button