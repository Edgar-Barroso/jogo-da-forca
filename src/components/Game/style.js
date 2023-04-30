import styled from "styled-components";

export const GameContainer = styled.div`
    display: flex;
    justify-content: baseline;
    align-items: center;
    flex-direction: column;
    position: absolute;
    right: 200px;
    width: 400px;
    bottom: 200px;
    border-radius: 20px;
    z-index: 10;
    color: #bbbbbb;

    * {
        font-weight: 200;
        font-size: 1.5rem;
        color: white;
        margin: 20px;
    }

    form {
        input[type="text"] {
            text-align: center;
            color: #bbbbbb;
            border: none;
            width: 80px;
            height: 80px;
            font-size: 3rem;
            background: transparent;
            border-radius: 10px;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        }
    
    }
    h1 {
        letter-spacing: 1rem;
        font-size: 3rem;
        padding: 10px;

        text-align: center;
    }
    h2{
        letter-spacing: 0.5rem;
    }
`;
