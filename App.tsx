import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeScreen } from '@/screens/HomeScreen';
import { ForestScreen } from '@/screens/ForestScreen';
import { AnalyticsScreen } from '@/screens/AnalyticsScreen';
import { WeeklyReviewScreen } from '@/screens/WeeklyReviewScreen';
import { CommunicationLabScreen } from '@/screens/CommunicationLabScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { AppProvider } from '@/store/AppContext';
import { palette } from '@/theme/palette';

const Tab = createBottomTabNavigator();

const screenMap = {
  Home: { component: HomeScreen, icon: 'home' as const },
  Forest: { component: ForestScreen, icon: 'forest' as const },
  Analytics: { component: AnalyticsScreen, icon: 'query-stats' as const },
  'Weekly Review': { component: WeeklyReviewScreen, icon: 'auto-awesome' as const },
  'Communication Lab': { component: CommunicationLabScreen, icon: 'record-voice-over' as const },
  Settings: { component: SettingsScreen, icon: 'settings' as const }
};

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer
        theme={{
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: palette.bg,
            card: palette.surface,
            primary: palette.primary,
            text: palette.text
          }
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: palette.surface,
              borderTopColor: palette.border,
              height: 68,
              paddingBottom: 8
            },
            tabBarActiveTintColor: palette.primary,
            tabBarInactiveTintColor: palette.muted,
            tabBarIcon: ({ color, size }) => {
              const icon = screenMap[route.name as keyof typeof screenMap].icon;
              return <MaterialIcons name={icon} size={size} color={color} />;
            }
          })}
        >
          {Object.entries(screenMap).map(([name, def]) => (
            <Tab.Screen key={name} name={name} component={def.component} />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
