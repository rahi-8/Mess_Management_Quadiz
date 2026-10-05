import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const [date, setDate] = useState(new Date());
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  return (
    <SafeAreaView>
      
      <View>
        <View className="flex-col items-center justify-center py-10 border-b-2 border-x-2 border-gray-200 rounded-b-3xl shadow-xl/20 ">
            <View className="h-36 w-36  border-2 rounded-full bg-gray-400" >  
              <Text className="text-2xl font-bold text-black pt-10">Hello Rahi!</Text>
              <Text>Today: </Text>
              <Text className="mx-2 text-[#3F3F46] font-semibold"> {formattedDate} </Text>
            </View>
        </View>
      </View>



    </SafeAreaView>

  )
}

export default Home