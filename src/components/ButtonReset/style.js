import styled from "styled-components";

export const ButtonResetContainer = styled.button`
    border: none;
    display: flex;
    text-align: center;
    border-radius: 50%;
    background: transparent;
    position: absolute;
    font-size:4rem;
    padding: 8px;
    left: 50%;
    top: 65%;
    border: 3px solid #171720;
    transform: translate(-50%, -50%);

    :hover{
        background:  #171720;
        color: white;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        transform: 0.25s;
    }

`