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
import Add1Icon from "../../../assets/icons/add-1.svg";
import AddMemberModal from "./AddMemberModal";
import { useTheme } from "../../../context/ThemeContext";


const Home = () => {
  const { isDark, toggleTheme } = useTheme();
  const [date, setDate] = useState(new Date());
  const [showMember, setShowMember] = useState(false);
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
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#18181B]" : "bg-white"}`}>
      <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-100"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
        <View className={`h-full ${isDark ? "bg-black" : "bg-gray-100"}`}>

          <View className="flex-row p-5 ">
            <View className={`m-2 h-20 w-20 border-2 rounded-full ${ isDark ? "bg-white" : "bg-[#18181B]" }`}/>  
              <View>
                <Text className={`text-3xl font-semibold pt-5  mx-2 ${isDark ? "text-white" : "text-[#18181B]" }`}>Hello Rahi!</Text>
                <Text className={`mx-2 py-3 text-base font-normal ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}>Today: {formattedDate} </Text>
              </View>
            </View>

          <View className="flex-row justify-between px-5 py-3">
            <View className={`w-full rounded-xl  p-5  flex-row justify-between items-center ${ isDark ? "bg-[#FA8D491A]" : "bg-[#FA8D491A]" }`} >
              <View className="flex-col p-2">
                <Text className={`font-semibold text-xl py-2 ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Today’s Total Meals </Text>

                <View className="flex-row items-center">
                  <Text className={`text-3xl font-semibold  ${isDark ? "text-white" : "text-[#18181B]" }`}> {totalMeals} </Text>
                  <Text className={`py-2 ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> Meals  </Text>
                </View>
                
                <Text className={` ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> All meals summary for today </Text>
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
          <Text className={`font-normal  text-xl ${isDark ? "text-white" : "text-[#18181B]" }`}>Today’s Meals</Text>
          
          <Pressable  className="flex-row items-center mr-2" onPress={() => router.push("./all_meals")} >
            <Text className={`font-normal text-sm ${isDark ? "text-white" : "text-[#18181B]" }`}>View Details</Text>
            <MaterialIcons name="keyboard-arrow-right" size={18} color="#3F3F46" />
          </Pressable>
        </View>


        {/* Todays Meal card */}
        <View className="flex-row justify-between mx-5 py-1">

          <View className={`flex-1 flex-col rounded-xl items-center shadow-md p-4 mr-1  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <View className={`h-[44] w-[44] bg-[#71717A14] rounded-xl items-center justify-center  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>
              <Breakfast2Icon width={24} height={24} color={isDark ? "#E4E4E7" : "#3F3F46"}/>
            </View>

            <Text className={`font-semibold  py-2 text-lg ${isDark ? "text-[#FFFFFF]" : "text-[#171717]" }`}>  Breakfast </Text>
            <Text className={`font-semibold text-center text-lg  ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`} >12</Text>
            <Text className={`font-normal text-center  text-sm ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> Meals </Text>
          </View>


          <View className={`flex-1 flex-col rounded-xl items-center shadow-md p-4 mx-1  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <View className={`h-[44] w-[44] rounded-xl items-center justify-center  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>
              <Lunch2Icon width={24} height={24} color={isDark ? "#E4E4E7" : "#3F3F46"}/>
            </View>

            <Text className={`font-semibold  py-2 text-lg ${isDark ? "text-[#FFFFFF]" : "text-[#171717]" }`}> Lunch </Text>
            <Text className={`font-semibold text-center text-lg  ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}>15</Text>
            <Text className={`font-normal text-center  text-sm ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> Meals </Text>
          </View>


          <View className={`flex-1 flex-col rounded-xl items-center shadow-md p-4 ml-1   ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <View className={`h-[44] w-[44] rounded-xl items-center justify-center  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>
              <Dinner2Icon width={24} height={24} color={isDark ? "#E4E4E7" : "#3F3F46"}/>
            </View>

            <Text className={`font-semibold  py-2 text-lg ${isDark ? "text-[#FFFFFF]" : "text-[#171717]" }`}>Dinner</Text>
            <Text className={`font-semibold text-center text-lg  ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}>18</Text>
            <Text className={`font-normal text-center  text-sm ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> Meals </Text>
          </View>

        </View>

        {/* Daily Cost */}
        <View className={`flex-row items-center mx-5 px-3 py-4 mt-5  rounded-xl border  shadow-lg  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
          <View className="flex-row items-center">
            <View className={`h-[44] w-[44] rounded-xl items-center justify-center mr-3  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>
              <ShoppingcartIcon width={24} height={24} color={isDark ? "#E4E4E7" : "#3F3F46"}/>
            </View>

            <View>
              <Text className={`font-semibold  text-2xl  ${isDark ? "text-white" : "text-[#18181B]" }`}> ৳2,250 </Text>
              <Text className={`font-normal text-[#171717] text-lg  ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Today’s Cost</Text>
            </View>
          </View>

          <Pressable className="ml-auto" onPress={() => router.push("./MarketCost")} >
            <MaterialIcons name="keyboard-arrow-right" size={32} color={isDark ? "#D4D4D8" : "#52525B"}/>
          </Pressable>

        </View>


        {/* Monthly Cost */}
        <View className={`flex-row items-center mx-5  px-3 py-4 mt-3 rounded-xl border  shadow-lg ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
          <View className="flex-row items-center">
            <View className={`h-[44] w-[44]  rounded-xl items-center justify-center mr-3  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>
              <Wallet2Icon width={24} height={24} color={isDark ? "#E4E4E7" : "#3F3F46"}/>
            </View>

            <View>
              <Text className={`font-semibold text-2xl ${isDark ? "text-white" : "text-[#18181B]" }`}> ৳12,250 </Text>
              <Text className={`font-normal text-lg ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Current Month Cost </Text>
            </View>
          </View>

          <Pressable className="ml-auto" onPress={() => router.push("./MonthCost")} >
            <MaterialIcons name="keyboard-arrow-right" size={32} color={isDark ? "#D4D4D8" : "#52525B"}/>
          </Pressable>

        </View>



        {/* Member overview card */}
        <View className={`flex-col items-center mx-5   px-5 py-4 mt-3 rounded-xl border shadow-lg  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
          <View className="flex-row items-center justify-between w-full mb-3">
              <Text className={`font-normal text-lg ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}>Members Overview</Text>
              <Pressable  className="flex-row items-center mr-2" onPress={() => router.push("./Member")} >
                <Text className={`font-normal text-sm  ${isDark ? "text-[#D4D4D8]" : "text-[#3F3F46]" }`}>View Details</Text>
                <MaterialIcons name="keyboard-arrow-right" size={18} color="#3F3F46" />
              </Pressable>
          </View>

          <View className="flex-row items-center justify-between w-full mb-3 mt-5">
            <View className="flex-row items-center">
              <View className={`h-[52] w-[52]  rounded-2xl items-center justify-center mr-3 ${ isDark ? "bg-[#FFFFFF]" : "bg-[#000000]" }`}>
                <PeopleIcon width={24} height={24}  color={isDark ? "#18181B" : "#FFFFFF"}/>
              </View>

              <View>
                <Text className={`font-semibold text-2xl ${isDark ? "text-white" : "text-[#18181B]" }`}> 56 </Text>
                <Text className={`font-normal text-base  ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}>Total Members</Text>
              </View>
            </View>

            <View className="ml-auto "  >
              <View className={`h-[25] w-[32] rounded-lg items-center justify-center ml-10 ${ isDark ? "bg-[#27272A]" : "bg-[#F4F4F5]" }`}>
                <Text className={`${isDark ? "text-[#D4D4D8]" : "text-[#18181B]" }`}>+5</Text>
              </View>
              <Text className={` text-sm ${isDark ? "text-[#FFFFFF]" : "text-[#3F3F46]" }`} >This Month</Text>
            </View>
          </View>

        </View>
      </View>





        <View className={`m-5 p-5 border ${ isDark ? "bg-white" : "bg-black" }`}>
          <Pressable  onPress={() => router.push("./monthly_report")} >
            <Text className='text-red-600'>it will remove -- click there</Text>
          </Pressable>
        </View>

      </ScrollView>


        {/* Add Member Button */}
        <Pressable className={`absolute bottom-12 right-8 h-16 w-16 items-center justify-center rounded-2xl ${ isDark ? "bg-white" : "bg-[#18181B]" }`} onPress={() => setShowMember(true)}>
          <Add1Icon width={40} height={40} color={isDark ? "#18181B" : "#FFFFFF"}/>
        </Pressable>



      <AddMemberModal isVisible={showMember} onCancel={() => setShowMember(false)} onAdd={(name, phone, date) => { console.log("New Member:", { name, phone, date }); setShowMember(false); }}/>
    </SafeAreaView>

  )
}

export default Home