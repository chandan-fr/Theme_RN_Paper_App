/**
 * @format
 */

import { AppRegistry, useColorScheme } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

const AppWrapper = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
            <App isDarkMode={isDarkMode} />
        </PaperProvider>
    )
};

AppRegistry.registerComponent(appName, () => AppWrapper);
