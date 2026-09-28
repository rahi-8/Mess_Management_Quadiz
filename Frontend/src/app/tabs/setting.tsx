import { View, Text, Pressable, TextInput, Button,  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { MaterialIcons, Octicons,  } 
from "@expo/vector-icons";
import { router } from 'expo-router'
import SunIcon from "../../../assets/icons/sun.svg";



const setting = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='mb-10'>
        <Pressable className="flex-row items-center border-x-2 border-b-2 rounded-3xl border-gray-100 shadow-gray-800  px-5 py-10" onPress={() => router.push("./Profile")}>
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#3F3F46" />
          <Text className="ml-3 text-center font-semibold flex-1 text-xl text-[#18181B]">Settings </Text>
        </Pressable>
      </View>

        {/* password_setting */}
        <View className="px-5 py-2">
          <View className="flex-row items-center rounded-2xl border-2 border-gray-400 px-4 py-5">
            <Octicons name="key" size={22} />
            <Text className=" flex-1 text-xl font-normal text-[#52525B]"> Password </Text>

            <Pressable className="ml-3 rounded-xl bg-[#71717A14] px-2 py-2" onPress={() => router.push("./password")} >
              <Text className="text-base  text-balck"> Change </Text>
            </Pressable>

          </View>
        </View>


        {/* System_preferance_setting */}
        <View className="px-5 py-2">
          <View className="flex-row items-center rounded-2xl border-2 border-gray-400 px-4 py-5">
            <SunIcon width={24} height={24} />
            <Text className=" flex-1 text-xl font-normal text-[#52525B]"> System Preference </Text>

            <Pressable className="flex-row rounded-xl bg-[#71717A14] px-2 py-2" >
              <Text className="text-base  text-balck"> System default</Text>
              <MaterialIcons name="keyboard-arrow-down" size={28} color="#3F3F46" />
            </Pressable>

          </View>
        </View>
        


    </SafeAreaView>
  )
}

export default setting