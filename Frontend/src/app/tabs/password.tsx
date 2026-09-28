import { View, Text, Pressable, TextInput, TouchableOpacity  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Feather } 
from "@expo/vector-icons";
import { router } from 'expo-router'



const password = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const handleUpdatePassword = () => {
        if (!currentPassword || !newPassword) { alert("Please fill in all fields")
            return
        }

        alert("Password updated successfully")
        router.push("./setting")
    }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='mb-10'>
        <Pressable className="flex-row items-center border-x-2 border-b-2 rounded-3xl border-gray-100 shadow-gray-800  px-5 py-10" onPress={() => router.push("./setting")}>
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#3F3F46" />
          <Text className="ml-3 text-center font-semibold flex-1 text-xl text-[#18181B]"> Password Change </Text>
        </Pressable>
      </View>

        {/*Current_password */}
        <View className="px-4 pt-5">
            <Text className="mb-2 text-xl font-semibold text-black"> Current Password </Text>

            <View className="flex-row items-center rounded-md border border-gray-300">
                <MaterialCommunityIcons name="lock-outline" size={20} className="ml-3" />

                <TextInput placeholder="Current Password" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry={!showCurrentPassword} className="flex-1 py-3 px-3" />

                <TouchableOpacity className="px-4 py-3" onPress={() => setShowCurrentPassword(!showCurrentPassword)} >
                <Ionicons name={showCurrentPassword ? "eye-outline" : "eye-off-outline"} size={20} />
                </TouchableOpacity>
            </View>
        </View>

        {/*New_password */}
        <View className="px-4 pt-5">
            <Text className="mb-2 text-xl font-semibold text-black"> New Password </Text>

            <View className="flex-row items-center rounded-md border border-gray-300">
                <MaterialCommunityIcons name="lock-outline" size={20} className="ml-3" />
                <TextInput placeholder="New Password" value={newPassword} onChangeText={setNewPassword} secureTextEntry={!showNewPassword} className="flex-1 py-3 px-3"/>

                <TouchableOpacity className="px-4 py-3" onPress={() => setShowNewPassword(!showNewPassword)} >
                    <Ionicons name={showNewPassword ? "eye-outline" : "eye-off-outline"} size={20} />
                </TouchableOpacity>
            </View>
        </View>


        <View className="m-4 py-5">
            <Pressable className="mt-5 rounded-xl bg-black px-4 py-6" onPress={handleUpdatePassword} >
                <Text className="text-center text-lg font-bold text-white"> Update Password </Text>
            </Pressable>
        </View>

    </SafeAreaView>
  )
}

export default password