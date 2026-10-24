import { View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons"
import GuestModal from "./GuestModal";
// import GuestModal from "../../../components/GuestModal"
import { router } from 'expo-router'
import { useTheme } from "../../../context/ThemeContext";


 const Meal = () => {
  const { isDark, toggleTheme } = useTheme();
  const [date, setDate] = useState(new Date());
  const [guestMeals, setGuestMeals] = useState<{
    [date: string]: {
      [memberId: number]: number;
    };
  }>({});

  const dateKey = date.toISOString().split("T")[0];

  const [showGuest, setShowGuest] = useState(false);

  const changeDate = (day: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + day);
    setDate(newDate);
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Rahi",
      breakfast: false,
      lunch: false,
      dinner: false,
    },
    {
      id: 2,
      name: "Nadim",
      breakfast: false,
      lunch: false,
      dinner: false,
    },
    {
      id: 3,
      name: "Jadab",
      breakfast: false,
      lunch: false,
      dinner: false,
    },
    {
      id: 4,
      name: "Khan",
      breakfast: false,
      lunch: false,
      dinner: false,
    },
  ]);

  const updateMeal = (id: number, meal: string) => {
    setMembers(
      members.map((member) =>
        member.id === id
          ? {
              ...member,
              [meal]: !member[meal as keyof typeof member],
            }
          : member
      )
    );
  };

  const handleAddGuest = (
    memberId: number | null,
    mealCount: number
  ) => {
    if (memberId === null) return;

    setGuestMeals((prev) => ({
      ...prev,

      [dateKey]: {
        ...prev[dateKey],

        [memberId]:
          (prev[dateKey]?.[memberId] || 0) + mealCount,
      },
    }));

    setShowGuest(false);
  };

  const totalMeals = members.reduce((total, member) => {
    const meal =
      Number(member.breakfast) +
      Number(member.lunch) +
      Number(member.dinner);

    const guest =
      guestMeals[dateKey]?.[member.id] || 0;

    return total + meal + guest;
  }, 0);

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#18181B]" : "bg-white"}`}>
           <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-100"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
              <View className={`h-full ${isDark ? "bg-black" : "bg-gray-100"}`}>
    

      <View className='mb-5'>
        <View className={`flex-row items-center shadow-gray-800 px-5 py-10 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} >
          <Text className={`ml-3 text-center font-semibold flex-1 text-xl ${isDark ? "text-white" : "text-[#18181B]" }`}>Meals </Text>
        </View>
      </View>

      <View >
        {/* Total meal */}
        <View className="px-5 py-2">
          <View className={`flex-row items-center rounded-xl border-2  px-4 py-5  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Text className={`flex-1 text-base font-normal   ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" } `}> Current Month Total Meals </Text>
            <Text className={`mr-4 text-base font-bold ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" } `}> {totalMeals} </Text>

            <Pressable  onPress={() => router.push({ pathname: "./Meals_record", params: { members: JSON.stringify(
                  members.map((member) => ({
                    ...member, guest: guestMeals[dateKey]?.[member.id] || 0,
                  }))
                ),
              },
            }) }>
              <SimpleLineIcons name="arrow-right" size={18} color={isDark ? "white" : "#3F3F46"} />
            </Pressable>
          </View>
        </View>

        {/* Date and add-guest */}
        <View className="px-5 py-2  items-center flex-row">
          <View className={`flex-row items-center rounded-xl border-2  px-2 py-5 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Pressable onPress={() => changeDate(-1)}>
              <SimpleLineIcons name="arrow-left" size={18} color={isDark ? "white" : "#3F3F46"} />
            </Pressable>

            <Text className={`mx-2  font-semibold  ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" } `} > {formattedDate} </Text>

            <Pressable onPress={() => changeDate(1)}>
              <SimpleLineIcons name="arrow-right" size={18} color={isDark ? "white" : "#3F3F46"} />
            </Pressable>
          </View>

          <Pressable className={`flex-row items-center rounded-xl border-2  px-2 py-5 ml-2 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} onPress={() => setShowGuest(true)}>
            <Ionicons name="add" size={24} color={isDark ? "white" : "#3F3F46"} />
            <Text className={`pl-2 text-lg font-semibold ${isDark ? "text-white" : "text-[#18181B]" } `} >Guest</Text>
          </Pressable>
        </View>

        {/* Meal checkbox */}
        <View className="px-5 py-2">
          <View className={`rounded-xl border-2  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <View className={`flex-row items-center  border-b-2  py-4  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } `}>
              <Text className={`flex-1 pl-4 font-semibold text-xl ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" } `} >
                Member
              </Text>

              <Text className={`w-16 text-xl text-center font-semibold ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" } `} >B</Text>
              <Text className={`w-16 text-xl text-center font-semibold ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" } `}>L</Text>
              <Text className={`w-16 text-xl text-center font-semibold ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" } `}>D</Text>
              <Text className={`w-20 text-xl text-center font-semibold ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" } `}>Total</Text>
            </View>



            {/* Member */}
            <View className="flex-col mx-2 items-center py-4 " >
              {members.map((member) => (
                <View key={member.id} className={`flex-row items-center border-b-2  py-4 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } `} style={{ minHeight: 70 }}>
                  <Text className={`flex-1 pl-4 ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" } `} > {member.name}</Text>
                  <View className="w-16 items-center">
                    <Checkbox value={member.breakfast} onValueChange={() => updateMeal(member.id, "breakfast")} color={isDark ? "#FFFFFF" : "#000000"} style={{ borderRadius: 50, width: 18, height: 18, }}/>
                  </View>

                  <View className="w-16 items-center">
                    <Checkbox value={member.lunch} onValueChange={() => updateMeal(member.id, "lunch")} color="black" style={{ borderRadius: 50, width: 18, height: 18,}} />
                  </View>

                  <View className="w-16 items-center">
                    <Checkbox value={member.dinner} onValueChange={() => updateMeal(member.id, "dinner")} color="black" style={{ borderRadius: 50, width: 18, height: 18,}} />
                  </View>


                  <View className="w-20 items-center">
                    <Text className={`text-center font-semibold ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" } `} > {Number(member.breakfast) + Number(member.lunch) + Number(member.dinner) + (guestMeals[dateKey]?.[member.id] || 0)}</Text>

                    {/* Guest Number */}
                    {(guestMeals[dateKey]?.[member.id] || 0) > 0 && (
                      <View className="mt-1 ">
                        <Text className={`text-xs  font-medium p-1 rounded-xl ${isDark ? "text-[#FFFFFF] " : "text-[#18181B]"}  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" } `}> Guest +{guestMeals[dateKey]?.[member.id]} </Text>
                      </View>
                    )}
                  </View> 
                </View>
              ))}

            </View>

            <View className="flex-row items-center justify-between py-4 px-4">
              <Text className={`font-semibold ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" } `}  > Total Meal</Text>
              <Text className={`font-semibold ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" } `}  > {totalMeals} </Text>
            </View>

          </View>
        </View>

      </View>

      <GuestModal isVisible={showGuest} onCancel={() => setShowGuest(false)} onAdd={handleAddGuest} members={members.map((m) => ({ id: m.id, name: m.name, }))} />

      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Meal