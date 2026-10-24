import { View, Text, Pressable, TextInput, Button, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { MaterialIcons, SimpleLineIcons } 
from "@expo/vector-icons";
import { router } from 'expo-router'
import BreakfastIcon from "../../../assets/icons/Breakfast.svg";
import LunchIcon from "../../../assets/icons/Lunch.svg";
import DinnerIcon from "../../../assets/icons/Dinner.svg";
import ExportIcon from "../../../assets/icons/export.svg";
import { useLocalSearchParams } from "expo-router";
import ExportModal from "./export";
import { useTheme } from "../../../context/ThemeContext";


const MealRecord = () => {
  const [month, setMonth] = useState(new Date());
  const { members } = useLocalSearchParams();
  const memberList = JSON.parse(members as string);
  const [showExport, setShowExport] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const changeMonth = (value: number) => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() + value);
    setMonth(newMonth);
  };

  const formattedMonth = month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#18181B]" : "bg-white"}`}>
      <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-100"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
        <View className={`h-full ${isDark ? "bg-black" : "bg-gray-100"}`}>

      <View className="mb-5">
        <Pressable className={`flex-row items-center  px-5 py-10 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} onPress={() => router.push("./Meal")} >
          <MaterialIcons name="keyboard-arrow-left" size={32} color={isDark ? "#D4D4D8" : "#52525B"} />
          <Text className={`ml-3 text-center font-semibold flex-1 text-xl ${isDark ? "text-white" : "text-[#18181B]" }`}> Meals Record </Text>
        </Pressable>
      </View>

      {/* Month */}
      <View className="px-5 py-2">
        <View className={`flex-row items-center justify-between rounded-xl border-2 px-4 py-5  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
          <Pressable onPress={() => changeMonth(-1)}>
            <SimpleLineIcons name="arrow-left" size={18} color={isDark ? "#D4D4D8" : "#52525B"} />
          </Pressable>

          <Text className={` font-semibold  ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> {formattedMonth} </Text>

          <Pressable onPress={() => changeMonth(1)}>
            <SimpleLineIcons name="arrow-right" size={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
          </Pressable>

        </View>
      </View>

      {/* Members */}
      {memberList.map((member: any) => {

        const total = Number(member.breakfast) + Number(member.lunch) + Number(member.dinner) + Number(member.guest || 0);

        return (
          <View key={member.id} className={`rounded-lg border-2  mx-5 my-2 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} >
            <View className="py-5 flex-row items-center justify-between px-4 ">
              <Text className={`font-semibold text-2xl ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`} > {member.name} </Text>

              <View>
                <Text className={`font-semibold text-xl ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`} > {total} </Text>
                <Text className={`font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`} >Meal</Text>
              </View>
            </View>

            <View className={`h-[1px]  mx-5 ${ isDark ? "bg-[#27272A]" : "bg-[#F4F4F5]" }`} />

            <View className="p-5 flex-row items-center justify-between">

              <View className="flex-row">
                <BreakfastIcon width={18} height={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
                <Text className={` pl-2  ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Breakfast: {Number(member.breakfast)} </Text>
              </View>

              <View className="flex-row">
                <LunchIcon width={18} height={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
                <Text className={` pl-2  ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Lunch: {Number(member.lunch)} </Text>
              </View>

              <View className="flex-row">
                <DinnerIcon width={18} height={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
                <Text className={` pl-2  ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}>Dinner: {Number(member.dinner)} </Text>
              </View>

            </View>

          </View>
        );
      })}


        <Pressable className={`flex-row items-center justify-center m-5 rounded-xl border  px-5 py-5 ${ isDark ? "border-[#71717A]" : "border-[#A1A1AA]" } `} onPress={() => setShowExport(true)} >
          <ExportIcon width={18} height={18} color={isDark ? "#FFFFFF" : "#18181B"}/>
          <Text className={`ml-2 text-xl    ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> Export </Text>
        </Pressable>

    <ExportModal isVisible={showExport} onCancel={() => setShowExport(false)} onExport={(format) => { console.log("Selected:", format); setShowExport(false); }} />

      </View>
    </ScrollView>
  </SafeAreaView>
);
};

export default MealRecord;