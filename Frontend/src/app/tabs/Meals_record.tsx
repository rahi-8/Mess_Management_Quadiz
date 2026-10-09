import { View, Text, Pressable, TextInput, Button,  } from 'react-native'
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


const MealRecord = () => {
  const [month, setMonth] = useState(new Date());
  const { members } = useLocalSearchParams();
  const memberList = JSON.parse(members as string);
  const [showExport, setShowExport] = useState(false);

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
    <SafeAreaView className="flex-1 bg-white">

      <View className="mb-5">
        <Pressable className="flex-row items-center border-x-2 border-b-2 rounded-3xl border-gray-100 px-5 py-10" onPress={() => router.push("./Meal")} >
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#3F3F46" />
          <Text className="ml-3 text-center font-semibold flex-1 text-xl text-[#18181B]"> Meals Record </Text>
        </Pressable>
      </View>

      {/* Month */}
      <View className="px-5 py-2">
        <View className="flex-row items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-4">
          <Pressable onPress={() => changeMonth(-1)}>
            <SimpleLineIcons name="arrow-left" size={18} color="#3F3F46" />
          </Pressable>

          <Text className="text-[#3F3F46] font-semibold"> {formattedMonth} </Text>

          <Pressable onPress={() => changeMonth(1)}>
            <SimpleLineIcons name="arrow-right" size={18} color="#3F3F46"/>
          </Pressable>

        </View>
      </View>

      {/* Members */}
      {memberList.map((member: any) => {

        const total =
  Number(member.breakfast) +
  Number(member.lunch) +
  Number(member.dinner) +
  Number(member.guest || 0);

        return (
          <View key={member.id} className="rounded-lg border-2 border-gray-200 mx-5 my-2" >
            <View className="py-5 flex-row items-center justify-between px-4">
              <Text className="font-semibold text-2xl"> {member.name} </Text>

              <View>
                <Text className="font-semibold text-xl"> {total} </Text>
                <Text className='font-semibold'>Meal</Text>
              </View>
            </View>

            <View className="h-[1px] bg-gray-200 mx-5" />

            <View className="p-5 flex-row items-center justify-between">

              <View className="flex-row">
                <BreakfastIcon width={18} height={18} />
                <Text className="text-[#3F3F46] pl-2"> Breakfast: {Number(member.breakfast)} </Text>
              </View>

              <View className="flex-row">
                <LunchIcon width={18} height={18} />
                <Text className="text-[#3F3F46] pl-2"> Lunch: {Number(member.lunch)} </Text>
              </View>

              <View className="flex-row">
                <DinnerIcon width={18} height={18} />
                <Text className="text-[#3F3F46] pl-2"> Dinner: {Number(member.dinner)} </Text>
              </View>

            </View>

          </View>
        );
      })}


        <Pressable
      className="flex-row items-center justify-center ml-3 rounded-xl bg-[#71717A14] px-5 py-5"
      onPress={() => setShowExport(true)}
    >
      <ExportIcon width={18} height={18} />

      <Text className="ml-2 text-xl text-[#18181B]">
        Export
      </Text>
    </Pressable>

    <ExportModal
      isVisible={showExport}
      onCancel={() => setShowExport(false)}
      onExport={(format) => {
        console.log("Selected:", format);
        setShowExport(false);
      }}
    />

  </SafeAreaView>
);
};

export default MealRecord;