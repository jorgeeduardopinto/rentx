import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

interface Props {
    isFocused: boolean;
}

export const Container = styled.View`
    flex-direction: row;

    margin-bottom: 8px;

`;

export const IconContainer = styled.View<Props>`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;

    ${({ isFocused, theme }) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};    
    `}

    margin-right: 2px;

    background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled(TextInput)<Props>`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    ${({ isFocused, theme }) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};    
    `}

    padding: 0 23px;
`;