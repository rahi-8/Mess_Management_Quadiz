import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Pressable onPress={() => router.push("/")}>
        <Text>Go to Index</Text>
      </Pressable>
    </SafeAreaView>

  )
}

export default Home