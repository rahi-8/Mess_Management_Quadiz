import React, { useState, useEffect } from 'react';
import { View, Text, Pressable,TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import Wallet2Icon from '../../../assets/icons/wallet-3.svg';
import WalletMinus from '../../../assets/icons/wallet-minus.svg';
import UserIcon from '../../../assets/icons/user.svg';
import TrashIcon from '../../../assets/icons/trash.svg';
import Add_1Icon from '../../../assets/icons/add-1.svg';

const utilities_Bill = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} >
            <View className="mb-5">
              <Pressable className="flex-row items-center border-b-2 border-gray-100 bg-white px-5 py-10" onPress={() => router.push('./utilities')} >
                <MaterialIcons name="keyboard-arrow-left" size={32} color="#3F3F46"/>
    
                <Text className="ml-3 flex-1 text-center text-xl font-semibold text-[#18181B]"> Utilities Bill </Text>
                <View className="w-8" />
              </Pressable>
            </View>


        </ScrollView>
    </SafeAreaView>
  )
}

export default utilities_Bill