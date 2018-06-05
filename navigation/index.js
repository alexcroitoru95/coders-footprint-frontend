import { createStackNavigator } from 'react-navigation';
import FullDetailsScreen from '../screens/FullDetailsScreen';
import PartialDetailsScreen from '../screens/PartialDetailsScreen';
import ReviewScreen from '../screens/ReviewScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const FullDetailsStack = createStackNavigator(
  {
    FullDetailsScreen: {
      screen: FullDetailsScreen
    },
    ReviewScreen: {
      screen: ReviewScreen
    }
  },
  {
    navigationOptions: () => ({
      headerMode: 'none',
      header: null,
      headerLeft: null,
      gesturesEnabled: false
    })
  }
);

const PartialDetailsStack = createStackNavigator(
  {
    PartialDetailsScreen: {
      screen: PartialDetailsScreen
    },
    ReviewScreen: {
      screen: ReviewScreen
    }
  },
  {
    navigationOptions: () => ({
      headerMode: 'none',
      header: null,
      headerLeft: null,
      gesturesEnabled: false
    })
  }
);

export const AppStack = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen
    },
    FullDetails: {
      screen: FullDetailsStack
    },
    PartialDetails: {
      screen: PartialDetailsStack
    }
  },
  {
    navigationOptions: () => ({
      headerMode: 'none',
      header: null,
      headerLeft: null,
      gesturesEnabled: false
    })
  }
);
