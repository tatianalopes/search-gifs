import { createGlobalStyle } from 'styled-components';

import colors from '../resources/colors';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    
    body {
        background-color: ${colors.lightBlue};
    }
`;