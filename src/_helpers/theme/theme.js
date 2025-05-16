import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { setColor } from '../redux/themeReducer'
import store from '../../store';
import { ApplicationProvider, IconRegistry, useTheme } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as     appTheme from './custom-theme.json'
import * as eva from '@eva-design/eva';
import { useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';

export const switchTheme = () => {
    const currentVal = store.getState().theme.value
    const value = currentVal === 'light' ? 'dark' : 'light'
    const action = setColor({ value })
    store.dispatch(action)
    return setItemAsync('app_theme', value)
}
export const initTheme = async () => {
    const savedTheme = await getItemAsync('app_theme')
    if (!savedTheme) {
        await setItemAsync('app_theme', 'light')
        const action = setColor({ value })
        return 'light'
    }
    const action = setColor({ value: savedTheme })
    store.dispatch(action)
    return savedTheme
}
export const getFullTheme = () => {
    const theme = useTheme()
    return theme
}

export const ThemeWrapper = ({ children }) => {
    const theme = useSelector(state => state.theme.value)
    const dispatch = useDispatch()
    useEffect(() => {
        initTheme().then(res => {
            const action = setColor({ value: res });
            dispatch(action)
        })
    }, [dispatch])
    return (<>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva[theme], ...appTheme }}>
            {children}
        </ApplicationProvider>
        <FlashMessage floating={true} position={'bottom'} style={{position:'absolute'}} />
    </>)
}