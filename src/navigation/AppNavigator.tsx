import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import LoadingScreen from '../screens/loading/LoadingScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import EmailSignUpScreen from '../screens/auth/EmailSignUpScreen';
import ProfileCompletionScreen from '../screens/auth/ProfileCompletionScreen';
import CompanyDetailsScreen from '../screens/auth/CompanyDetailsScreen';
import FidelityCardScreen from '../screens/auth/FidelityCardScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import QRScreen from '../screens/qr/QRScreen';
import EditCardScreen from '../screens/edit/EditCardScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MainScreen from '../screens/main/MainScreen';
import ConfigurationScreen from '../screens/configuration/ConfigurationScreen';
import BranchesScreen from '../screens/branches/BranchesScreen';
import CardsScreen from '../screens/cards/CardsScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';

// Import NavBar
import NavBar from '../components/common/NavBar';

// Define the stack navigator param list
export type MainTabParamList = {
  Branches: undefined;
  Main: undefined;
  Analytics: undefined;
  Configuration: undefined;
};

export type RootStackParamList = {
  Loading: undefined;
  EmailSignUp: undefined;
  ProfileCompletion: { email: string };
  CompanyDetails: { 
    email: string;
    fullName: string;
    password: string;
    companyName: string;
  };
  FidelityCard: {
    email: string;
    fullName: string;
    password: string;
    companyName: string;
    companyDetails: {
      address: string;
      phoneNumber: string;
      branchName: string;
      socialMedia: string;
    };
    customizedCard?: {
      backgroundColor?: string;
      stampImage?: string;
      squares?: string;
      filledStamps?: string;
      premio?: string;
      condiciones?: string;
    };
  };
  SignIn: undefined;
  SignUp: { 
    email: string;
    fullName: string;
    password: string;
    isCompany: boolean;
    companyName: string;
    companyDetails?: {
      address: string;
      phoneNumber: string;
      branchName: string;
      socialMedia: string;
    };
    stampImage?: string;
  };
  Dashboard: undefined;
  QR: undefined;
  EditCard: {
    cardId?: string;
    initialData?: {
      backgroundColor?: string;
      stampImage?: string;
      squares?: string;
      filledStamps?: string;
      premio?: string;
      condiciones?: string;
    };
  };
  Profile: undefined;
  Cards: undefined;
  MainTabs: {
    screen?: keyof MainTabParamList;
  };
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator 
      id={undefined}
      tabBar={props => <NavBar {...props} />} 
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Branches" component={BranchesScreen} />
      <Tab.Screen name="Card" component={CardsScreen} />
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Configuration" component={ConfigurationScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        id={undefined}
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
        <Stack.Screen name="ProfileCompletion" component={ProfileCompletionScreen} />
        <Stack.Screen name="CompanyDetails" component={CompanyDetailsScreen} />
        <Stack.Screen name="FidelityCard" component={FidelityCardScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="QR" component={QRScreen} />
        <Stack.Screen name="EditCard" component={EditCardScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Cards" component={CardsScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
