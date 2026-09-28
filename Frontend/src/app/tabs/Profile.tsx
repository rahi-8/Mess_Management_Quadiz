import { View, Text, ScrollView, Pressable, Image} from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from "@expo/vector-icons";

import ProfileIcon from "../../../assets/icons/profile.svg";
import SettingIcon from "../../../assets/icons/setting.svg";
import InfocircleIcon from "../../../assets/icons/info-circle.svg";
import LogoutIcon from "../../../assets/icons/logout.svg";


const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
      <SafeAreaView className="flex-1 bg-white">
      <ScrollView  className="flex-1" showsVerticalScrollIndicator={false}>
          
            <View className="flex-col items-center justify-center py-10 border-b-2 border-x-2 border-gray-200 rounded-b-3xl shadow-xl/20 ">
              <View className="h-36 w-36  border-2 rounded-full bg-gray-400" />  
              <Text className="text-2xl font-bold text-black pt-10">Mahbubur Rahman Rahi</Text>
            </View>

            <View className=" py-10  ">

              {/* Profile info section */}
              <View className="px-5 py-2">
                <Pressable className="flex-row items-center rounded-2xl border-2 border-gray-400 px-4 py-5" onPress={() => router.push("./profile_info")}>
                  
                  <ProfileIcon width={24} height={24} />
                  <Text className="ml-3 flex-1 text-xl font-normal text-[#3F3F46]"> Profile Information </Text>
                  <MaterialIcons name="keyboard-arrow-right" size={32} color="#3F3F46" />
                </Pressable>
              </View>


              <View className="px-5 py-2">
                <Pressable className="flex-row items-center rounded-2xl border-2 border-gray-400 px-4 py-5" onPress={() => router.push("./setting")}>
                  
                  <SettingIcon width={24} height={24} />
                  <Text className="ml-3 flex-1 text-xl font-normal text-[#3F3F46]"> Settings </Text>
                  <MaterialIcons name="keyboard-arrow-right" size={32} color="#3F3F46" />
                </Pressable>
              </View>


              <View className="px-5 py-2">
                <Pressable className="flex-row items-center rounded-2xl border-2 border-gray-400 px-4 py-5" >
                  
                  <InfocircleIcon width={24} height={24} />
                  <Text className="ml-3 flex-1 text-xl font-normal text-[#3F3F46]"> About App </Text>
                  <MaterialIcons name="keyboard-arrow-right" size={32} color="#3F3F46" />
                </Pressable>
              </View>

              <Pressable className="m-10 flex-row items-center justify-center" onPress={() => { 
              alert("Logged out")
              router.push("/") }}>
                <LogoutIcon width={24} height={24} />
                <Text className="ml-3 text-[#C20E4D]">Logout</Text>
              </Pressable>

            </View>


        </ScrollView>
      </SafeAreaView>
  )
}

export default Profile