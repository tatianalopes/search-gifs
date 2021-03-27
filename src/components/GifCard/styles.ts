import styled from 'styled-components';
import colors from '../../resources/values/colors';

export const Container = styled.div`
     background-color: ${colors.silverPink};
     border-radius: 5px;
     box-shadow: 3px 4px 4px ${colors.darkBlue};
     cursor: pointer;
     display: flex;
     flex-direction: column;
     height: 263px;
     position: relative;
     width: 257px;

     img {
         width: 100%;
         height: 214px;
         border-top-left-radius: 5px;
         border-top-right-radius: 5px;
     }

     svg {
         opacity: 0;
         position: absolute;
         right: 8px;
         top: 8px;
     }

     &:hover {
         svg {
             color: ${colors.darkGray};
             transition: opacity 0.5s;
             opacity: 1;
         }
     }
`;

export const FavoriteButton = styled.div`
    background-color: transparent;
    border: none;
    outline: none;
`;

export const GifInfo = styled.div`
    display: flex;
    flex-direction: column;
    height: 50px;
    padding: 6px 10px 0 10px;
    width: 100%;
`;

export const GifTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const GifAuthor = styled.div`
    font-size: 14px;
    font-style: italic;
    opacity: 0.5;
`;