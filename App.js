import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import Favourites from './screens/Favourites';
import Events from './screens/Events';

const Stack = createNativeStackNavigator();


export default function App() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Events"component={Events} />
            <Stack.Screen name="Favourites"component={Favourites} />
        </Stack.Navigator>
        </NavigationContainer>  
        );
    }
