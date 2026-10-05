import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons"
import GuestModal from "./GuestModal";
// import GuestModal from "../../../components/GuestModal"
import { router } from 'expo-router'


 const Meal = () => {

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
    <SafeAreaView className="flex-1 bg-white">
      <View className='mb-5'>
        <View className="flex-row items-center border-x-2 border-b-2 rounded-3xl border-gray-200 shadow-gray-800  px-5 py-10" >
          <Text className="ml-3 text-center font-semibold flex-1 text-xl text-[#18181B]">Meals </Text>
        </View>
      </View>

      <View >
        {/* Total meal */}
        <View className="px-5 py-2">
          <View className="flex-row items-center rounded-xl border-2 border-gray-200 px-4 py-4">
            <Text className=" flex-1 text-base font-normal text-[#52525B]"> Current Month Total Meals </Text>
            <Text className="mr-4 text-base font-bold text-black"> {totalMeals} </Text>

            <Pressable  onPress={() => router.push({
  pathname: "./Meals_record",
  params: {
    members: JSON.stringify(
      members.map((member) => ({
        ...member,
        guest: guestMeals[dateKey]?.[member.id] || 0,
      }))
    ),
  },
}) }>
              <SimpleLineIcons name="arrow-right" size={18} color="#3F3F46" />
            </Pressable>
          </View>
        </View>

        {/* Date and add-guest */}
        <View className="px-5 py-2  items-center flex-row">
          <View className="flex-row items-center rounded-xl border-2 border-gray-200 px-2 py-4">
            <Pressable onPress={() => changeDate(-1)}>
              <SimpleLineIcons name="arrow-left" size={18} color="#3F3F46" />
            </Pressable>

            <Text className="mx-2 text-[#3F3F46] font-semibold"> {formattedDate} </Text>

            <Pressable onPress={() => changeDate(1)}>
              <SimpleLineIcons name="arrow-right" size={18} color="#3F3F46" />
            </Pressable>
          </View>

          <Pressable className="flex-row items-center rounded-xl border-2 border-gray-400 px-2 py-4 ml-2" onPress={() => setShowGuest(true)}>
            <Ionicons name="add" size={24} color="#3F3F46" />
            <Text className='pl-2 text-lg font-semibold text-[#18181B]'>Guest</Text>
          </Pressable>
        </View>

        {/* Meal checkbox */}
        <View className="px-5 py-2">
          <View className="rounded-xl border-2 border-gray-200">
            <View className="flex-row items-center  border-b-2 border-gray-200 py-4">
              <Text className="flex-1 pl-4 font-semibold text-xl">
                Member
              </Text>

              <Text className="w-16 text-xl text-center font-semibold">B</Text>
              <Text className="w-16 text-xl text-center font-semibold">L</Text>
              <Text className="w-16 text-xl text-center font-semibold">D</Text>
              <Text className="w-20 text-xl text-center font-semibold mx-1">Total</Text>
            </View>

            {/* Member */}
            <View className="flex-col mx-2 items-center py-4">
              {members.map((member) => (
                <View key={member.id} className="flex-row items-center border-b-2 border-gray-200 py-4" style={{ minHeight: 70 }}>
                  <Text className="flex-1 pl-4"> {member.name}</Text>
                  <View className="w-16 items-center">
                    <Checkbox value={member.breakfast} onValueChange={() => updateMeal(member.id, "breakfast")} color="black" style={{ borderRadius: 50, width: 18, height: 18,}} />
                  </View>

                  <View className="w-16 items-center">
                    <Checkbox value={member.lunch} onValueChange={() => updateMeal(member.id, "lunch")} color="black" style={{ borderRadius: 50, width: 18, height: 18,}} />
                  </View>

                  <View className="w-16 items-center">
                    <Checkbox value={member.dinner} onValueChange={() => updateMeal(member.id, "dinner")} color="black" style={{ borderRadius: 50, width: 18, height: 18,}} />
                  </View>


                  <View className="w-20 items-center">
                    <Text className="text-center font-semibold"> {Number(member.breakfast) + Number(member.lunch) + Number(member.dinner) + (guestMeals[dateKey]?.[member.id] || 0)}</Text>

                    {/* Guest Number */}
                    {(guestMeals[dateKey]?.[member.id] || 0) > 0 && (
                      <View className="mt-1 ">
                        <Text className="text-xs text-[#18181B] font-medium bg-slate-200 p-1 rounded-xl"> Guest +{guestMeals[dateKey]?.[member.id]} </Text>
                      </View>
                    )}
                  </View> 
                </View>
              ))}

            </View>

            <View className="flex-row items-center justify-between py-4 px-4">
              <Text className="font-semibold"> Total Meal</Text>
              <Text className="font-semibold"> {totalMeals} </Text>
            </View>

          </View>
        </View>

      </View>

      <GuestModal isVisible={showGuest} onCancel={() => setShowGuest(false)} onAdd={handleAddGuest} members={members.map((m) => ({ id: m.id, name: m.name, }))} />
    </SafeAreaView>
  )
}

export default Meal