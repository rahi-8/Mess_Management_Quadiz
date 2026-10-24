import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import BreakfastIcon from '../../../assets/icons/Breakfast.svg';
import LunchIcon from '../../../assets/icons/Lunch.svg';
import DinnerIcon from '../../../assets/icons/Dinner.svg';
import { useTheme } from "../../../context/ThemeContext";

const MEMBERS = [
  {
    id: '1',
    name: 'Rahim Ahmed',
    breakfast: 1,
    lunch: 1,
    dinner: 1,
    guest: 0,
  },
  {
    id: '2',
    name: 'Karim Hossain',
    breakfast: 1,
    lunch: 0,
    dinner: 1,
    guest: 2,
  },
  {
    id: '3',
    name: 'Salam Khan',
    breakfast: 0,
    lunch: 1,
    dinner: 0,
    guest: 0,
  },
  {
    id: '4',
    name: 'Jadab',
    breakfast: 0,
    lunch: 1,
    dinner: 0,
    guest: 0,
  },
  {
    id: '5',
    name: ' Khan',
    breakfast: 0,
    lunch: 1,
    dinner: 0,
    guest: 0,
  },
];

const AllMeals = () => {
  const [date, setDate] = useState(new Date());
  const { members } = useLocalSearchParams();
  const [memberList, setMemberList] = useState<any[]>([]);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    console.log('Raw members param:', members);

    if (members) {
      try {
        const parsed = JSON.parse(members as string);
        console.log('Parsed members:', parsed);

        if (Array.isArray(parsed) && parsed.length > 0) {
          setMemberList(parsed);
        } else if (parsed && typeof parsed === 'object') {
          setMemberList([parsed]);
        } else {
          console.log('Parsed data is empty or invalid');
          setMemberList(MEMBERS);
        }
      } catch (error) {
        console.log('JSON Parse Error:', error);
        setMemberList(MEMBERS);
      }
    } else {
      console.log('No members param found, using dummy data');
      setMemberList(MEMBERS);
    }
  }, [members]);

  // Calculate all memberss 
  const totals = memberList.reduce(
    (acc, member) => {
      acc.breakfast += Number(member.breakfast || 0);
      acc.lunch += Number(member.lunch || 0);
      acc.dinner += Number(member.dinner || 0);
      acc.guest += Number(member.guest || 0);
      return acc;
    },
    { breakfast: 0, lunch: 0, dinner: 0, guest: 0 }
  );

  const grandTotal = totals.breakfast + totals.lunch + totals.dinner + totals.guest;

  // Change Daily Date
  const changeDate = (value: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + value);
    setDate(newDate);
  };

  // Format Date
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#18181B]" : "bg-white"}`}>
      <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-100"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
        <View className={` ${isDark ? "bg-black" : "bg-gray-100"}`}>
    
          <Pressable className={`flex-row items-center border-b-2 px-5 py-10  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} onPress={() => router.push('./Home')} >
          <MaterialIcons name="keyboard-arrow-left" size={32} color={isDark ? "#D4D4D8" : "#52525B"} />
          <Text className={`ml-3 flex-1 text-center text-xl font-semibold ${isDark ? "text-white" : "text-[#18181B]" }`}>
            All Meals
          </Text>
        </Pressable>
      </View>

      {/* Daily Date */}
      <View className="px-5 py-2 mt-5">
        <View className={`flex-row items-center justify-between rounded-xl border px-4 py-5  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
          <Pressable onPress={() => changeDate(-1)}>
            <SimpleLineIcons name="arrow-left" size={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
          </Pressable>

          <Text className={`text-center font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}>
            {formattedDate}
          </Text>

          <Pressable onPress={() => changeDate(1)}>
            <SimpleLineIcons name="arrow-right" size={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
          </Pressable>
        </View>
      </View>


      {/* Meal List */}
      {memberList.length === 0 ? (
        <View className="flex-1 items-center justify-center px-5">
          <Text className={`text-lg ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>No members found</Text>
        </View>
      ) : (
        memberList.map((member: any) => {
          const total =
            Number(member.breakfast || 0) +
            Number(member.lunch || 0) +
            Number(member.dinner || 0) +
            Number(member.guest || 0);

          return (
            <View
              key={member.id || Math.random().toString()}
              className={`mx-5 my-2 rounded-lg border-2 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
              {/* Member */}
              <View className="flex-row items-center justify-between px-5 py-5">
                <Text className={`text-2xl  font-semibold  ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}>{member.name || 'Unknown'}</Text>
                <View>
                  <Text className={`text-xl font-semibold text-center  ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`} >{total}</Text>
                  <Text className={`font-semibold text-xs  ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`} >Meals</Text>
                </View>
              </View>

              <View className={`mx-5 px-5 h-[1px] ${ isDark ? "bg-[#27272A]" : "bg-[#F4F4F5]" }`} />

              {/* Meal Details */}
              <View className="flex-row items-center justify-between p-5">
                <View className="flex-row items-center">
                  <BreakfastIcon width={18} height={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
                  <Text className={`pl-2 ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}>
                    Breakfast: {Number(member.breakfast || 0)}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <LunchIcon width={18} height={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
                  <Text className={`pl-2 ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}>
                    Lunch: {Number(member.lunch || 0)}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <DinnerIcon width={18} height={18}  color={isDark ? "#D4D4D8" : "#52525B"}/>
                  <Text className={`pl-2 ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}>
                    Dinner: {Number(member.dinner || 0)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })
      )}

      
    </ScrollView>

    {memberList.length > 0 && (
        <View className={`mt-4 mb-6  px-4  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
          {/* Meal Counts */}
          <View className="flex-row items-center justify-between mx-5 py-5">
            <View className="flex-row items-center">
              <BreakfastIcon width={18} height={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
              <Text className={`pl-2 ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Breakfast:{` `}
                <Text className={`text-lg font-bold ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> {totals.breakfast} </Text>
              </Text>
            </View>

            <View className="flex-row items-center">
              <LunchIcon width={18} height={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
              <Text className={`pl-2 ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Lunch:{` `}
                <Text className={`text-lg font-bold ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> {totals.lunch} </Text>
              </Text>
            </View>

            <View className="flex-row items-center">
              <DinnerIcon width={18} height={18} color={isDark ? "#D4D4D8" : "#52525B"}/>
              <Text className={`pl-2 ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Dinner:{` `}
                <Text className={`text-lg font-bold ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> {totals.dinner} </Text>
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className={`mx-5 mt-5 h-[1px] ${ isDark ? "bg-[#27272A]" : "bg-[#F4F4F5]" }`} />

          {/* Today's Total Meals */}
          <View className="flex-row items-center justify-between py-5 mx-4">
            <Text className={`text-2xl font-semibold ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> Today's total meals </Text>
            <Text className={`text-3xl font-bold  ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}>
              {grandTotal}
            </Text>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
};

export default AllMeals;