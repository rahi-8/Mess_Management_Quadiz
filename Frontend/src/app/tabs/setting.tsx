import { View, Text, Pressable, TextInput, Button, ScrollView  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { MaterialIcons, Octicons,  } 
from "@expo/vector-icons";
import { router } from 'expo-router'
import SunIcon from "../../../assets/icons/sun.svg";
import { useTheme } from "../../../context/ThemeContext";



const setting = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#27272A]" : "bg-white"}`}>
        <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-100"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
          <View className={`h-full ${isDark ? "bg-black" : "bg-gray-100"}`}>
      <View className='mb-10'>
        <Pressable className={`flex-row items-center px-5 py-10 ${ isDark ? "bg-[#27272A]" : "bg-white" }`} onPress={() => router.push("./Profile")}>
          <MaterialIcons name="keyboard-arrow-left" size={32} color={isDark ? "white" : "#3F3F46"} />
          <Text className={`ml-3 text-center font-semibold flex-1 text-xl ${isDark ? "text-white" : "text-[#18181B]" } `}>Settings </Text>
        </Pressable>
      </View>



        {/* password_setting */}
        <View className="px-5 py-2">
          <View className={`flex-row items-center rounded-2xl border-2  px-4 py-5 ${ isDark ? "border-[#27272A]" : "border-[#E4E4E7]" } ${ isDark ? "bg-[#27272A]" : "bg-white" }`} >
            <Octicons color={isDark ? "#D4D4D8" : "#3F3F46"} name="key" size={22} />
            <Text className={`flex-1 text-xl font-normal ${ isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> Password </Text>

            <Pressable className={`flex-row items-center rounded-xl px-2 py-2 ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`} onPress={() => router.push("./password")} >
              <Text className={`text-base ${ isDark ? "text-white" : "text-black" }`}> Change </Text>
            </Pressable>

          </View>
        </View>

 
        
        {/* System_preferance_setting */}
        <View className="px-5 py-2">
          <View className={`flex-row items-center rounded-2xl border-2  px-4 py-5 ${ isDark ? "border-[#27272A]" : "border-[#E4E4E7]" } ${ isDark ? "bg-[#27272A]" : "bg-white" }`} >
            <SunIcon color={isDark ? "#D4D4D8" : "#3F3F46"} width={24} height={24} />
            <Text className={`flex-1 text-xl font-normal ${ isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> System Preference </Text>

            
            <Pressable onPress={toggleTheme} className={`flex-row items-center rounded-xl px-2 py-2 ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>

              <Text className={`text-base ${ isDark ? "text-white" : "text-black" }`} > System default </Text>

              <MaterialIcons name="keyboard-arrow-down" size={28} color={isDark ? "#D4D4D8" : "#3F3F46"}/>
            </Pressable>

          </View>
        </View>

        

      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default setting


