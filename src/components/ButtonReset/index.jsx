import { ButtonResetContainer } from "./style";
import {TbReload} from 'react-icons/tb';
export function ButtonReset({handleResetGame}) {
    return (
        <ButtonResetContainer onClick={handleResetGame}>
            <TbReload/>
        </ButtonResetContainer>)
}