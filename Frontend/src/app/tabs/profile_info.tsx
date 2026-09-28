import { View, Text, Pressable, TextInput  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Feather } 
from "@expo/vector-icons";
import { router } from 'expo-router'
import ProfileIcon from "../../../assets/icons/profile.svg";


const profile_info = () => {
  const [editField, setEditField] = useState<'name' | 'email' | 'phone' | null>(null)
  const [name, setName] = useState('Mahbubur Rahman Rahi')
  const [email, setEmail] = useState('example@email.com')
  const [phone, setPhone] = useState('+880 1581108546')


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='mb-10'>
        <Pressable className="flex-row items-center border-x-2 border-b-2 rounded-3xl border-gray-100 shadow-gray-800  px-5 py-10" onPress={() => router.push("./Profile")}>
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#3F3F46" />
          <Text className="ml-3 text-center font-semibold flex-1 text-xl text-[#18181B]"> Profile Information </Text>
        </Pressable>
      </View>

        {/* Name_section_profile_info */}
        <View className="px-4 pt-5">
          <Text className="mb-2 text-xl font-normal text-[#6d6d71]"> Full Name </Text>
          <View className="flex-row items-center rounded-2xl border-2 border-gray-200 px-4 py-5">
            <ProfileIcon width={24} height={24} />

            {editField === 'name' ? ( <TextInput className="ml-3 flex-1 text-xl text-[#3F3F46]" value={name} onChangeText={setName} autoFocus />
            ) : ( <Text className="ml-3 flex-1 text-xl font-normal text-[#3F3F46]"> {name} </Text> )}

            <Pressable onPress={() => setEditField('name')}>
              <AntDesign name="edit" size={24} color="#3F3F46" />
            </Pressable>
          </View>
        </View>


        {/* Email_section--profile_info */}
        <View className="px-4 pt-5">
          <Text className="mb-2 text-xl font-normal text-[#6d6d71]">Email </Text>
          <View className="flex-row items-center rounded-2xl border-2 border-gray-200 px-4 py-5">
            <MaterialCommunityIcons  name="email-outline" size={24} />

            {editField === 'email' ? ( <TextInput className="ml-3 flex-1 text-xl text-[#3F3F46]" value={email} onChangeText={setEmail} autoFocus />
            ) : ( <Text className="ml-3 flex-1 text-xl font-normal text-[#3F3F46]"> {email} </Text> )}

            <Pressable onPress={() => setEditField('email')}>
              <AntDesign name="edit" size={24} color="#3F3F46" />
            </Pressable>
          </View>
        </View>


        {/* Phone_section--profile_info */}
        <View className="px-4 pt-5">
          <Text className="mb-2 text-xl font-normal text-[#6d6d71]"> Phone Number </Text>
          <View className="flex-row items-center rounded-2xl border-2 border-gray-200 px-4 py-5">
            <Feather  name="phone" size={24} />

            {editField === 'phone' ? ( <TextInput className="ml-3 flex-1 text-xl text-[#3F3F46]" value={phone} onChangeText={setPhone} keyboardType="phone-pad" autoFocus />
            ) : ( <Text className="ml-3 flex-1 text-xl font-normal text-[#3F3F46]"> {phone} </Text> )}

            <Pressable onPress={() => setEditField('phone')}>
              <AntDesign name="edit" size={24} color="#3F3F46" />
            </Pressable>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default profile_info