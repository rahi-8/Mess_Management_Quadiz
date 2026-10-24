import { View, Text, Pressable, TextInput ,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather } 
from "@expo/vector-icons";
import { router } from 'expo-router'
import ProfileIcon from "../../../assets/icons/profile.svg";
import { useTheme } from "../../../context/ThemeContext";


  const profile_info = () => {
  const [editField, setEditField] = useState<'name' | 'email' | 'phone' | null>(null)
  const [name, setName] = useState('Mahbubur Rahman Rahi')
  const [email, setEmail] = useState('example@email.com')
  const [phone, setPhone] = useState('+880 1581108546')
  const { isDark, toggleTheme } = useTheme();


  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#27272A]" : "bg-white"}`}>
      <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-100"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
        <View className={`h-full ${isDark ? "bg-black" : "bg-gray-100"}`}>

      <View className='mb-10'>
        <Pressable className={`flex-row items-center px-5 py-10 ${ isDark ? "bg-[#27272A]" : "bg-white" }`} onPress={() => router.push("./Profile")}>
          <MaterialIcons name="keyboard-arrow-left" size={32}  color={isDark ? "white" : "#3F3F46"}/>
          <Text className={`ml-3 text-center font-semibold flex-1 text-xl ${isDark ? "text-white" : "text-[#18181B]" } `}> Profile Information </Text>
        </Pressable>
      </View>

        {/* Name_section_profile_info */}
        <View className="px-5  ">
          
          <Text className={`mb-2 text-xl font-normal ${ isDark ? "text-[#D4D4D8]" : "text-[#6d6d71]" }`}> Full Name </Text>
          <View className={`flex-row items-center rounded-2xl border-2  px-4 py-5 ${ isDark ? "border-[#3F3F46]" : "border-[#D4D4D8]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <ProfileIcon color={isDark ? "#D4D4D8" : "#52525B"} width={24} height={24} />

            {editField === 'name' ? ( <TextInput className={`ml-3 flex-1 text-xl ${ isDark ? "text-[#D4D4D8]" : "text-[#6d6d71]" }`} value={name} onChangeText={setName} autoFocus />
            ) : ( <Text className={`ml-3 flex-1 text-xl font-normal  ${ isDark ? "text-[#D4D4D8]" : "text-[#6d6d71]" }`}> {name} </Text> )}

            <Pressable onPress={() => setEditField('name')}>
              <AntDesign name="edit" size={24} color={isDark ? "#D4D4D8" : "#52525B"} />
            </Pressable>
          </View>
        </View>


        {/* Email_section--profile_info */}
        <View className="px-5 pt-4">
          <Text className={`mb-2 text-xl font-normal  ${ isDark ? "text-[#D4D4D8]" : "text-[#6d6d71]" }`}>Email </Text>
          <View className={`flex-row items-center rounded-2xl border-2  px-4 py-5 ${ isDark ? "border-[#3F3F46]" : "border-[#D4D4D8]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <MaterialCommunityIcons color={isDark ? "#D4D4D8" : "#52525B"} name="email-outline" size={24} />

            {editField === 'email' ? ( <TextInput className={`ml-3 flex-1 text-xl  ${ isDark ? "text-[#D4D4D8]" : "text-[#6d6d71]" }`} value={email} onChangeText={setEmail} autoFocus />
            ) : ( <Text className={`ml-3 flex-1 text-xl font-normal  ${ isDark ? "text-[#D4D4D8]" : "text-[#6d6d71]" }`}> {email} </Text> )}

            <Pressable onPress={() => setEditField('email')}>
              <AntDesign name="edit" size={24} color={isDark ? "#D4D4D8" : "#52525B"}  />
            </Pressable>
          </View>
        </View>


        {/* Phone_section--profile_info */}
        <View className="px-5 pt-4">
          <Text className={`mb-2 text-xl font-normal  ${ isDark ? "text-[#D4D4D8]" : "text-[#6d6d71]" }`}> Phone Number </Text>
          <View className={`flex-row items-center rounded-2xl border-2  px-4 py-5 ${ isDark ? "border-[#3F3F46]" : "border-[#D4D4D8]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Feather color={isDark ? "#D4D4D8" : "#52525B"} name="phone" size={24} />

            {editField === 'phone' ? ( <TextInput className={`ml-3 flex-1 text-xl  ${ isDark ? "text-[#D4D4D8]" : "text-[#6d6d71]" }`} value={phone} onChangeText={setPhone} keyboardType="phone-pad" autoFocus />
            ) : ( <Text className={`ml-3 flex-1 text-xl font-normal  ${ isDark ? "text-[#D4D4D8]" : "text-[#6d6d71]" }`}> {phone} </Text> )}

            <Pressable onPress={() => setEditField('phone')}>
              <AntDesign name="edit" size={24}  color={isDark ? "#D4D4D8" : "#52525B"} />
            </Pressable>
          </View>
        </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default profile_info