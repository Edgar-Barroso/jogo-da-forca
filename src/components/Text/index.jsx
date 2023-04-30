import { TextContainer } from "./style";

export function Text(props){
    return(

        <TextContainer style={{color:props.color}}>{props.text}</TextContainer>
    )
}