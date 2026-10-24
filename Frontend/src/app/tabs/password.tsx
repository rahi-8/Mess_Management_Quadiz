import { View, Text, Pressable, TextInput, TouchableOpacity , ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Feather } 
from "@expo/vector-icons";
import { router } from 'expo-router'
import { useTheme } from "../../../context/ThemeContext";



const password = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const { isDark, toggleTheme } = useTheme();

    const handleUpdatePassword = () => {
        if (!currentPassword || !newPassword) { alert("Please fill in all fields")
            return
        }

        alert("Password updated successfully")
        router.push("./setting")
    }


  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#27272A]" : "bg-white"}`}>
       <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-100"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
          <View className={`h-full ${isDark ? "bg-black" : "bg-gray-100"}`}>

      <View className='mb-10'>
        <Pressable className={`flex-row items-center px-5 py-10 ${ isDark ? "bg-[#27272A]" : "bg-white" }`} onPress={() => router.push("./setting")}>
          <MaterialIcons name="keyboard-arrow-left" size={32} color={isDark ? "white" : "#3F3F46"} />
          <Text className={`ml-3 text-center font-semibold flex-1 text-xl ${isDark ? "text-white" : "text-[#18181B]" } `}> Password Change </Text>
        </Pressable>
      </View>

        {/*Current_password */}
        <View className="px-4 pt-5">
            <Text className={`mb-2 text-xl font-semibold ${ isDark ? "text-white" : "text-[#18181B]" }`}> Current Password </Text>

            <View className={`flex-row items-center rounded-xl border ${ isDark ? "border-[#3F3F46]" : "border-[#E4E4E7]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
                <MaterialCommunityIcons color={isDark ? "#D4D4D8" : "#3F3F46"} name="lock-outline" size={20} className="ml-3" />

                <TextInput placeholder="*********"  placeholderTextColor={isDark ? "#E4E4E7" : "#52525B"}     value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry={!showCurrentPassword} className={`flex-1 py-5 px-3 ${ isDark ? "text-[#E4E4E7]" : "text-[#52525B]" }`} />

                <TouchableOpacity className="px-4 py-3 " onPress={() => setShowCurrentPassword(!showCurrentPassword)} >
                <Ionicons name={showCurrentPassword ? "eye-outline" : "eye-off-outline"} size={20} color={isDark ? "#D4D4D8" : "#3F3F46"} />
                </TouchableOpacity>
            </View>
        </View>

        {/*New_password */}
        <View className="px-4 pt-5">
            <Text className={`mb-2 text-xl font-semibold ${ isDark ? "text-white" : "text-[#18181B]" }`}> New Password </Text>

            <View className={`flex-row items-center rounded-xl border ${ isDark ? "border-[#3F3F46]" : "border-[#E4E4E7]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
                <MaterialCommunityIcons name="lock-outline" size={20} className="ml-3" />
                <TextInput placeholder="*********"  placeholderTextColor={isDark ? "#E4E4E7" : "#52525B"}  value={newPassword} onChangeText={setNewPassword} secureTextEntry={!showNewPassword} className={`flex-1 py-5 px-3 ${ isDark ? "text-[#E4E4E7]" : "text-[#52525B]" }`}/>

                <TouchableOpacity className="px-4 py-3" onPress={() => setShowNewPassword(!showNewPassword)} >
                    <Ionicons name={showNewPassword ? "eye-outline" : "eye-off-outline"} size={20} color={isDark ? "#D4D4D8" : "#3F3F46"} />
                </TouchableOpacity>
            </View>
        </View>


        <View className="m-5 py-5">
            <Pressable className={`mt-1 rounded-xl  px-4 py-6 ${ isDark ? "bg-white" : "bg-black" }`} onPress={handleUpdatePassword} >
                <Text className={`text-center text-lg font-bold  ${ isDark ? "text-[#18181B]" : "text-white" }`}> Update Password </Text>
            </Pressable>
        </View>


        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default password