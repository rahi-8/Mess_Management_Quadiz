import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import MealIcon2 from "../../../assets/icons/meal2.svg";
import WalletIcon2 from "../../../assets/icons/wallet2.svg";
import UserIcon2 from "../../../assets/icons/user2.svg";
import HomeIcon2 from "../../../assets/icons/home2.svg";
import HomeIcon from "../../../assets/icons/home.svg";
import MealIcon from "../../../assets/icons/meal.svg";
import WalletIcon from "../../../assets/icons/wallet.svg";
import UserIcon from "../../../assets/icons/user.svg";


const _layout = () => {
  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#FFFFFF',
    headerShown: false,
    
    tabBarStyle: {
      backgroundColor: '#000000',
      borderWidth: 5,
      borderColor: '#000000',
      borderRadius: 50,
      paddingTop: 15,
      paddingLeft: 8,
      paddingRight: 8,
      marginBottom: 25,
      marginLeft: 15,
      marginRight: 15,
      height: 70,
    },
  }}
>
      {/* HomeTab */}
      <Tabs.Screen name="Home" options={{ tabBarIcon: ({ focused }) => (
       <View className="h-16 rounded-full flex-row items-center justify-center"
         style={{ width: focused ? 100 : 70, backgroundColor: focused ? '#FFFFFF' : '#272727', }}>
              {focused ? (
                <HomeIcon width={24} height={24} />
              ) : (
                <HomeIcon2 width={24} height={24} />
              )}
              {focused && (
                <Text className="p-2 text-black font-inter text-base">
                  Home
                </Text>
              )}
            </View>
          ),
        }}
      />

      {/* MealTab */}
      <Tabs.Screen name="Meal" options={{ tabBarIcon: ({ focused }) => (
       <View className="h-16 rounded-full flex-row items-center justify-center"
         style={{ width: focused ? 100 : 70, backgroundColor: focused ? '#FFFFFF' : '#272727', }}>
              {focused ? (
                <MealIcon width={24} height={24} />
              ) : (
                <MealIcon2 width={24} height={24} />
              )}
              {focused && (
                <Text className="p-2 text-black font-inter text-base">
                  Meal
                </Text>
              )}
            </View>
          ),
        }}
      />

      {/* StandingTab */}
      <Tabs.Screen name="Standing" options={{ tabBarIcon: ({ focused }) => (
       <View className="h-16 rounded-full flex-row items-center justify-center"
         style={{ width: focused ? 105 : 70, backgroundColor: focused ? '#FFFFFF' : '#272727', }}>
              {focused ? (
                <WalletIcon width={24} height={24} />
              ) : (
                <WalletIcon2 width={24} height={24} />
              )}
              {focused && (
                <Text className="p-2 text-black font-inter text-base">
                  Standing
                </Text>
              )}
            </View>
          ),
        }}
      />

      {/* ProfileTab */}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className="h-16 rounded-full flex-row items-center justify-center"
              style={{
                width: focused ? 100 : 70,
                backgroundColor: focused ? '#FFFFFF' : '#272727',
              }}
            >
              {focused ? (
                <UserIcon width={24} height={24} />
              ) : (
                <UserIcon2 width={24} height={24} />
              )}

              {focused && (
                <Text className=" p-2 text-black font-inter text-base">
                  Profile
                </Text>
              )}
            </View>
          ),
        }}
      />


        {/* Hiden Tabs of profile  */}
        <Tabs.Screen name="profile_info" options={{ href: null, tabBarStyle: { display: 'none' }, }}/>
        <Tabs.Screen name="setting" options={{ href: null, tabBarStyle: { display: 'none' }, }} />
        <Tabs.Screen name="about" options={{ href: null, tabBarStyle: { display: 'none' }, }} />
        <Tabs.Screen name="password" options={{ href: null, tabBarStyle: { display: 'none' }, }} />



    </Tabs>



  )
}

export default _layout

