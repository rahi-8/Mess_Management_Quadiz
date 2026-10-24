import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import ExportIcon from "../../../assets/icons/export.svg";
import ExportModal from "./export";
import { useTheme } from "../../../context/ThemeContext";


const MEMBERS = [
  {
    id: "1",
    name: "Sakib",
    meals: 45,
    cost: "৳2000",
    paid: "৳2500",
    due: "৳500",
  },
  {
    id: "2",
    name: "Jadab",
    meals: 40,
    cost: "৳2000",
    paid: "৳2000",
    due: "৳0",
  },
  {
    id: "3",
    name: "Rahi",
    meals: 48,
    cost: "৳3000",
    paid: "৳2800",
    due: "-৳200",
  },
  {
    id: "4",
    name: "Adil",
    meals: 42,
    cost: "৳2100",
    paid: "৳2500",
    due: "৳400",
  },
];

const MonthlyReport = () => {
  const [month, setMonth] = useState(new Date());
  const [showExport, setShowExport] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const changeMonth = (value: number) => {
    setMonth((prev) => {
      const next = new Date(prev);
      next.setDate(1);
      next.setMonth(next.getMonth() + value);
      return next;
    });
  };

  const formattedMonth = month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#18181B]" : "bg-white"}`}>
          <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-100"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
            <View className={` ${isDark ? "bg-black" : "bg-gray-100"}`}>


        <Pressable className={`mb-5  flex-row items-center border-b-2 px-5 py-10 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} onPress={() => router.back()} >
          <MaterialIcons name="keyboard-arrow-left" size={32} color={isDark ? "#D4D4D8" : "#52525B"} />
          <Text className={`ml-3 flex-1 text-center text-xl font-semibold ${isDark ? "text-white" : "text-[#18181B]" }`}>  Monthly Report </Text>
          <View className="w-8" />
        </Pressable>

        {/* Month Selector */}
        <View className={`mx-5 my-5 flex-row items-center justify-between rounded-xl border-2  px-4 py-5 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} >
          <Pressable onPress={() => changeMonth(-1)}>
            <SimpleLineIcons name="arrow-left" size={18} color={isDark ? "#D4D4D8" : "#52525B"} />
          </Pressable>

          <Text className={`font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> {formattedMonth}</Text>

          <Pressable onPress={() => changeMonth(1)}>
            <SimpleLineIcons name="arrow-right" size={18} color={isDark ? "#D4D4D8" : "#52525B"} />
          </Pressable>
        </View>


        {/*Total Count Cards */}
        <View className="mx-5 flex-row py-1">
          <View className={`mr-1 flex-1 items-center rounded-xl border  p-3 shadow-md ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Text className={`text-center text-lg font-semibold ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> 900 </Text>
            <Text className={`text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Total Meals</Text>
          </View>

          <View className={`mx-1 flex-1 items-center rounded-xl border p-3 shadow-md ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Text className={`text-center text-lg font-semibold ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> ৳45,000 </Text>
            <Text className={`text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Total Cost</Text>
          </View>

          <View className={`ml-1 flex-1 items-center rounded-xl border  p-3 shadow-md  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Text className={`text-center text-lg font-semibold ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> ৳50,480 </Text>
            <Text className={`text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Meal Rate </Text>
          </View>
        </View>

        {/* Members Table */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className={`mx-5 mb-5 mt-4 overflow-hidden rounded-xl border ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            
            <View className={`flex-row border-b-2 py-5 px-1  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" }`}>
              <Text className={`w-24 px-3 font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Member </Text>
              <Text className={`w-20 text-center font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Meals </Text>
              <Text className={`w-20 text-center font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Cost </Text>
              <Text className={`w-20 text-center font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Paid </Text>
              <Text className={`w-20 text-center font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Due/Rec. </Text>
            </View>

            {/* Table List */}
            {MEMBERS.map((member) => (
              <View key={member.id} className={`flex-row items-center border-b py-5 px-1 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" }`} >
                <Text className={`w-24 px-5 text-base ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> {member.name} </Text>

                <Text className={`w-20 text-center text-base ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> {member.meals} </Text>

                <Text className={`w-20 text-center text-base ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> {member.cost} </Text>

                <Text className={`w-20 text-center text-base ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> {member.paid} </Text>

               
                <Text className={`w-20 text-center text-base font-semibold ${
                    member.due.startsWith("-") || member.due === "৳0"
                      ? isDark
                        ? "text-[#74DFA2]"
                        : "text-[#12A150]"
                      : isDark
                        ? "text-[#F871A0]"
                        : "text-[#C20E4D]"
                  }`}
                >
                  {member.due}
                </Text>

              </View>
            ))}
          </View>
        </ScrollView>


          <Pressable className="flex-row items-center justify-center  m-6 rounded-xl border border-[#A1A1AA] px-5 py-5" onPress={() => setShowExport(true)} >
            <ExportIcon width={18} height={18} color={isDark ? "#FFFFFF" : "#18181B"}/>
            <Text className={`ml-2 text-xl ${isDark ? "text-white" : "text-[#18181B]" }`}> Export </Text>
          </Pressable>

        <ExportModal isVisible={showExport} onCancel={() => setShowExport(false)} onExport={(format) => { console.log("Selected:", format); setShowExport(false); }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MonthlyReport;
