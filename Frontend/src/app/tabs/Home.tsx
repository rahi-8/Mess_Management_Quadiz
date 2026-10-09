import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle } from "react-native-svg";
import FoodIcon from "../../../assets/icons/food.svg";
import Breakfast2Icon from "../../../assets/icons/Breakfast2.svg";
import Lunch2Icon from "../../../assets/icons/Lunch2.svg";
import Dinner2Icon from "../../../assets/icons/Dinner2.svg";
import ShoppingcartIcon from "../../../assets/icons/shoppingcart.svg";
import Wallet2Icon from "../../../assets/icons/wallet-2.svg";
import PeopleIcon from "../../../assets/icons/people.svg";
import AddIcon from '../../../assets/icons/add.svg';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';

const Home = () => {
  const [date, setDate] = useState(new Date());
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalMeals = 132;
  const maxMeals = 150;

  const percentage = Math.round((totalMeals / maxMeals) * 100);

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 100 }}>
    
      <View className="bg-gray-100 h-full ">
          <View className="flex-row p-5 ">
              <View className=" m-2 h-20 w-20 border-2 rounded-full bg-gray-400 "/>  
              <View>
                <Text className="text-3xl font-semibold pt-5 text-[#18181B] mx-2">Hello Rahi!</Text>
                <Text className="mx-2 py-3 text-[#52525B] text-base font-normal">Today: {formattedDate} </Text>
              </View>
          </View>

          <View className="flex-row justify-between px-5 py-3">
            <View className=" w-full rounded-xl bg-[#FA8D491A] p-5  flex-row justify-between items-center">
              <View className="flex-col p-2">
                <Text className="font-semibold text-xl py-2 text-[#3F3F46]"> Today’s Total Meals </Text>

                <View className="flex-row items-center">
                  <Text className="text-3xl font-semibold text-[#18181B]"> {totalMeals} </Text>
                  <Text className="py-2 text-[#52525B]"> Meals  </Text>
                </View>
                
                <Text className="text-[#52525B]"> All meals summary for today </Text>
              </View>

              {/* circle progress bar */}
              <View className="h-28 w-28 items-center justify-center">
                <Svg width={90} height={90}>
                  <Circle cx="45" cy="45"  r={36} stroke="#E4E4E7" strokeWidth="10" fill="none" />
                  <Circle cx="45" cy="45" r={36} stroke="#18181B"  strokeWidth="10" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" rotation="-90" origin="45, 45" />
                </Svg>

                <View className="absolute items-center">
                  <FoodIcon width={18} height={18} />
                  <Text className="text-xs font-semibold"> {totalMeals}/{maxMeals} </Text>
                </View>
              </View>
              </View>
            <View>
            
          </View>
        </View>

        {/* Todays Meal */}
        <View className="flex-row justify-between mx-5  py-2">
          <Text className="font-normal text-[#18181B] text-xl">Today’s Meals</Text>
          
          <Pressable  className="flex-row items-center mr-2" onPress={() => router.push("./all_meals")} >
            <Text className=" font-normal text-[#18181B] text-sm">View Details</Text>
            <MaterialIcons name="keyboard-arrow-right" size={18} color="#3F3F46" />
          </Pressable>
        </View>


        {/* Todays Meal card */}
        <View className="flex-row justify-between mx-5 py-1">

          <View className="flex-1 flex-col bg-white rounded-xl items-center shadow-md p-4 mr-1">
            <View className="h-[44] w-[44] bg-[#71717A14] rounded-xl items-center justify-center">
              <Breakfast2Icon width={24} height={24}/>
            </View>

            <Text className="font-semibold text-[#171717] py-2 text-lg">  Breakfast </Text>
            <Text className="font-semibold text-center text-lg">12</Text>
            <Text className="font-normal text-center text-[#52525B] text-sm"> Meals </Text>
          </View>


          <View className="flex-1 flex-col bg-white rounded-xl items-center shadow-md p-4 mx-1">
            <View className="h-[44] w-[44] bg-[#71717A14] rounded-xl items-center justify-center">
              <Lunch2Icon width={24} height={24}/>
            </View>

            <Text className="font-semibold text-[#171717] py-2 text-lg"> Lunch </Text>
            <Text className="font-semibold text-center text-lg">15</Text>
            <Text className="font-normal text-center text-[#52525B] text-sm"> Meals </Text>
          </View>


          <View className="flex-1 flex-col bg-white rounded-xl items-center shadow-md p-4 ml-1">
            <View className="h-[44] w-[44] bg-[#71717A14] rounded-xl items-center justify-center">
              <Dinner2Icon width={24} height={24}/>
            </View>

            <Text className="font-semibold text-[#171717] py-2 text-lg">Dinner</Text>
            <Text className="font-semibold text-center text-lg">18</Text>
            <Text className="font-normal text-center text-[#52525B] text-sm"> Meals </Text>
          </View>

        </View>

        {/* Daily Cost */}
        <View className="flex-row items-center mx-5 px-3 py-4 mt-5 bg-white rounded-xl border border-gray-200 shadow-lg">
          <View className="flex-row items-center">
            <View className="h-[44] w-[44] bg-[#71717A14] rounded-xl items-center justify-center mr-3">
              <ShoppingcartIcon width={24} height={24} />
            </View>

            <View>
              <Text className="font-semibold text-[#18181B] text-2xl"> ৳2,250 </Text>
              <Text className="font-normal text-[#171717] text-lg"> Today’s Cost</Text>
            </View>
          </View>

          <Pressable className="ml-auto" onPress={() => router.push("./MarketCost")} >
            <MaterialIcons name="keyboard-arrow-right" size={32} color="#3F3F46"/>
          </Pressable>

        </View>


        {/* Monthly Cost */}
        <View className="flex-row items-center mx-5  px-3 py-4 mt-3 bg-white rounded-xl border border-gray-200 shadow-lg">
          <View className="flex-row items-center">
            <View className="h-[44] w-[44] bg-[#71717A14] rounded-xl items-center justify-center mr-3">
              <Wallet2Icon width={24} height={24} />
            </View>

            <View>
              <Text className="font-semibold text-[#18181B] text-2xl"> ৳12,250 </Text>
              <Text className="font-normal text-[#171717] text-lg"> Current Month Cost </Text>
            </View>
          </View>

          <Pressable className="ml-auto" onPress={() => router.push("./MonthCost")} >
            <MaterialIcons name="keyboard-arrow-right" size={32} color="#3F3F46"/>
          </Pressable>

        </View>



        {/* Member overview card */}
        <View className="flex-col items-center mx-5   px-5 py-4 mt-3 bg-white rounded-xl border border-gray-200 shadow-lg">
          <View className="flex-row items-center justify-between w-full mb-3">
              <Text className="font-normal text-[#3F3F46] text-lg">Members Overview</Text>
              <Pressable  className="flex-row items-center mr-2" onPress={() => router.push("./Member")} >
                <Text className=" font-normal text-[#18181B] text-sm">View Details</Text>
                <MaterialIcons name="keyboard-arrow-right" size={18} color="#3F3F46" />
              </Pressable>
          </View>

          <View className="flex-row items-center justify-between w-full mb-3 mt-5">
            <View className="flex-row items-center">
              <View className="h-[52] w-[52] bg-[#000000] rounded-2xl items-center justify-center mr-3">
                <PeopleIcon width={24} height={24} />
              </View>

              <View>
                <Text className="font-semibold text-[#18181B] text-2xl"> 56 </Text>
                <Text className="font-normal text-[#3F3F46] text-base">Total Members</Text>
              </View>
            </View>

            <View className="ml-auto "  >
              <View className="h-[25] w-[32] bg-[#F4F4F5] rounded-lg items-center justify-center ml-10">
                <Text className='text-[#18181B]'>+5</Text>
              </View>
              <Text className="text-[#52525B] text-sm">This Month</Text>
            </View>
          </View>
          

        </View>
      </View>
      </ScrollView>

          {/* Add Member Button */}
          <Pressable className="absolute bottom-6 right-6" onPress={() => router.push('./add_member')} >
            <AddIcon width={64} height={64} />
          </Pressable>

    </SafeAreaView>

  )
}

export default Home