import { createGlobalStyle } from 'styled-components';

import colors from '../resources/values/colors';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    
    body {
        background-color: ${colors.lightBlue};

        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
`;