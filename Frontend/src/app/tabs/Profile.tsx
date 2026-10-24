import { View, Text, ScrollView, Pressable, Image} from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";

import ProfileIcon from "../../../assets/icons/profile.svg";
import SettingIcon from "../../../assets/icons/setting.svg";
import InfocircleIcon from "../../../assets/icons/info-circle.svg";
import LogoutIcon from "../../../assets/icons/logout.svg";


const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();

  return (
      <SafeAreaView className={`flex-1 ${isDark ? "bg-[#18181B]" : "bg-white"}`}>
        <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-100"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
          <View className={`h-full ${isDark ? "bg-black" : "bg-gray-100"}`}>
          
            <View className={`flex-col items-center justify-center py-10  border-b-2 border-x-2  rounded-b-3xl shadow-xl/20 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
              <View className={`h-36 w-36  border-2 rounded-full ${isDark ? "bg-white" : "bg-gray-100"}`} />  
              <Text className={`text-2xl font-bold  pt-10 ${ isDark ? "text-white" : "text-[#18181B]" }`}>Mahbubur Rahman Rahi</Text>
            </View>

            <View className=" py-10  ">

              {/* Profile info section */}
              <View className="px-5 py-2">
                <Pressable className={`flex-row items-center rounded-2xl  border-2  px-4 py-5 ${ isDark ? "border-[#27272A]" : "border-[#D4D4D8]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} onPress={() => router.push("./profile_info")}>
                  
                  <ProfileIcon width={24} height={24} color={isDark ? "#FAFAFA" : "#18181B"}/>
                  <Text className={`ml-3 flex-1 text-xl font-normal  ${ isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Profile Information </Text>
                  <MaterialIcons name="keyboard-arrow-right" size={32} color={isDark ? "#FAFAFA" : "#18181B"} />
                </Pressable>
              </View>


              <View className="px-5 py-2">
                <Pressable className={`flex-row items-center rounded-2xl  border-2   px-4 py-5 ${ isDark ? "border-[#27272A]" : "border-[#D4D4D8]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} onPress={() => router.push("./setting")}>
                  
                  <SettingIcon width={24} height={24} color={isDark ? "#FAFAFA" : "#18181B"}/>
                  <Text className={`ml-3 flex-1 text-xl font-normal  ${ isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Settings </Text>
                  <MaterialIcons name="keyboard-arrow-right" size={32}  color={isDark ? "#FAFAFA" : "#18181B"}/>
                </Pressable>
              </View>


              <View className="px-5 py-2">
                <Pressable className={`flex-row items-center rounded-2xl border-2 px-4 py-5 ${ isDark ? "border-[#27272A]" : "border-[#D4D4D8]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} >
                  
                  <InfocircleIcon width={24} height={24} color={isDark ? "#FAFAFA" : "#18181B"}/>
                  <Text className={`ml-3 flex-1 text-xl font-normal ${ isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> About App </Text>
                  <MaterialIcons name="keyboard-arrow-right" size={32} color={isDark ? "#FAFAFA" : "#18181B"} />
                </Pressable>
              </View>

              <Pressable className="m-10 flex-row items-center justify-center" onPress={() => { 
              alert("Logged out")
              router.push("/") }}>
                <LogoutIcon width={24} height={24} color={isDark ? "#F871A0" : "#C20E4D"} />
                <Text className={`ml-3    ${ isDark ? "text-[#F871A0]" : "text-[#C20E4D]" }`}>Logout</Text>
              </Pressable>

            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
  )
}

export default Profile