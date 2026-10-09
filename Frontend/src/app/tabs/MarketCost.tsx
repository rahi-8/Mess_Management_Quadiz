import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

const MEMBERS = [
  {
    id: '1',
    name: 'Rahim ',
    date: 'May 01, 2026',
    product: 'Rice',
    cost: 3000,
  },
  {
    id: '2',
    name: 'Adil',
    date: 'August 18, 2026',
    product: 'Vegetables',
    cost: 400,
  },
  {
    id: '3',
    name: 'Nadim',
    date: 'September 15, 2026',
    product: 'Meat',
    cost: 800,
  },
  {
    id: '4',
    name: 'Emon',
    date: 'September 8, 2026',
    product: 'Fish',
    cost: 700,
  },
  {
    id: '5',
    name: 'Jadab',
    date: 'September 21, 2026',
    product: 'Spices',
    cost: 200,
  },
];

const MarketCost = () => {
  const [date, setDate] = useState(new Date());

  const { members } = useLocalSearchParams();

  const [memberList, setMemberList] = useState<any[]>([]);

  useEffect(() => {
    if (members) {
      try {
        const parsed = JSON.parse(members as string);

        if (Array.isArray(parsed) && parsed.length > 0) {
          setMemberList(parsed);
        } else if (parsed && typeof parsed === 'object') {
          setMemberList([parsed]);
        } else {
          setMemberList(MEMBERS);
        }
      } catch (error) {
        setMemberList(MEMBERS);
      }
    } else {
      setMemberList(MEMBERS);
    }
  }, [members]);

  // Total Cost
  const TotalCost = memberList.reduce(
    (acc, member) => acc + Number(member.cost || 0),
    0
  );

  //  Date
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
    <SafeAreaView className="flex-1 bg-gray-50 ">
      <ScrollView className="h-full bg-gray-50 ">
        <View className="mb-5">
          <Pressable className="flex-row items-center  border-x-2 border-b-2 border-gray-100 bg-white px-5 py-10" onPress={() => router.push('./Home')} >
            <MaterialIcons name="keyboard-arrow-left" size={32} color="#3F3F46" />
            <Text className="ml-3 flex-1 text-center text-xl font-semibold text-[#18181B]"> Market Cost </Text>
          </Pressable>
        </View>

        {/* Daily Date */}
        <View className="px-5 py-2">
          <View className="flex-row items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-4 py-4">
            <Pressable onPress={() => changeDate(-1)}>
              <SimpleLineIcons name="arrow-left" size={18} color="#3F3F46"/>
            </Pressable>

            <Text className="text-center font-semibold text-[#3F3F46]"> {formattedDate} </Text>

            <Pressable onPress={() => changeDate(1)}>
              <SimpleLineIcons name="arrow-right" size={18} color="#3F3F46" />
            </Pressable>

          </View>
        </View>

        {/* Market Cost List */}
        {memberList.length === 0 ? (
          <View className="items-center justify-center px-5 py-10 ">
            <Text className="text-lg text-gray-500"> No market cost found </Text>
          </View>
        ) : (
          memberList.map((member: any) => (

            <View key={member.id} className="mx-5 my-2 rounded-xl border-2 border-gray-200 bg-white " >
              {/* Member */}
              <View className="p-5">
                <Text className="text-gray-500 text-base"> {member.date || 'Unknown'} </Text>
                <Text className="text-xl pl-1 font-semibold">{member.name || 'Unknown'}</Text>
              </View>

              <View className="mx-5 h-[1px] bg-gray-200" />

              {/* Product & Cost */}
              <View className="flex-row items-center justify-between p-5">
                <Text className="text-xl font-semibold text-[#18181B]"> {member.product || 'Unknown'} </Text>
                <Text className="text-xl font-semibold text-[#18181B]"> ৳{member.cost || 0} </Text>
              </View>

            </View>
          ))
        )}

        
      </ScrollView>

      {/* Today's Total Cost */}
        <View className="mx-5 mb-10 flex-row items-center justify-between py-5 ">
          <Text className="text-2xl font-semibold text-[#18181B]"> Today's total cost</Text>
          <Text className="text-3xl font-bold text-[#18181B] "> ৳{TotalCost} </Text>

        </View>

    </SafeAreaView>
  );
};

export default MarketCost;