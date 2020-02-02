import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator({          // Isso ta no guia do react navigation
    Main: {
      screen: Main, // Componente que será renderizado
      navigationOptions: {
        title: 'DevRadar'
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil no Github'
      }
    },
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7d40e7', // não tem herança de estilos
      },
      headerTintColor: '#FFF',
    },
  })
);

export default Routes
