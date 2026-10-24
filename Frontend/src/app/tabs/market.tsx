import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MaterialIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import AddIcon from '../../../assets/icons/add.svg';
import Add1Icon from '../../../assets/icons/add-1.svg';
import AddMarketModal from './AddMarketModal';
import { useTheme } from "../../../context/ThemeContext";


const MEMBERS = [
  { id: '1', name: 'Rahim', product: 'Rice', cost: 3000 },
  { id: '2', name: 'Adil', product: 'Vegetables', cost: 400 },
  { id: '3', name: 'Nadim', product: 'Meat', cost: 800 },
  { id: '4', name: 'Emon', product: 'Fish', cost: 700 },
  { id: '5', name: 'Jadab', product: 'Spices', cost: 200 },
];

interface Member {
  id: string;
  name: string;
  product?: string;
  cost?: number;
}

interface MarketItem {
  id: string;
  memberId: string;
  name: string;
  product: string;
  cost: number;
}

const Market = () => {
  const { isDark, toggleTheme } = useTheme();
  const { members } = useLocalSearchParams<{
    members?: string;
  }>();

  const [date, setDate] = useState(new Date());
  const [showMarket, setShowMarket] = useState(false);
  const [memberList, setMemberList] = useState<Member[]>(MEMBERS);
  const [marketItems, setMarketItems] = useState<{
    [date: string]: MarketItem[];
  }>({});

  const dateKey = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');

  // Get members from route params
  useEffect(() => {
    if (!members) {
      setMemberList(MEMBERS);
      return;
    }

    try {
      const parsed = JSON.parse(members);

      if (Array.isArray(parsed)) {
        setMemberList(
          parsed.map((member: any, index: number) => ({
            ...member,
            id: String(member.id ?? index + 1),
            name: member.name ?? 'Unknown',
          }))
        );
      } else if (parsed && typeof parsed === 'object') {
        setMemberList([
          {
            ...parsed,
            id: String(parsed.id ?? '1'),
            name: parsed.name ?? 'Unknown',
          },
        ]);
      } else {
        setMemberList(MEMBERS);
      }
    } catch {
      setMemberList(MEMBERS);
    }
  }, [members]);

  // Change date
  const changeDate = (value: number) => {
    setDate((previousDate) => {
      const newDate = new Date(previousDate);
      newDate.setDate(newDate.getDate() + value);
      return newDate;
    });
  };

  // Format date
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Add market from modal
  const handleAddMarket = (
  memberId: string | null,
  product: string,
  amount: number,
  selectedDate: Date
) => {
  if (memberId === null) return;

  const selectedMember = memberList.find(
    (member) => String(member.id) === memberId
  );

  if (!selectedMember) return;

  const selectedDateKey = [
    selectedDate.getFullYear(),
    String(selectedDate.getMonth() + 1).padStart(2, '0'),
    String(selectedDate.getDate()).padStart(2, '0'),
  ].join('-');

  const newItem = {
    id: `${Date.now()}-${memberId}`,
    memberId,
    name: selectedMember.name,
    product,
    cost: amount,
  };

  setMarketItems((previous) => ({
    ...previous,
    [selectedDateKey]: [
      ...(previous[selectedDateKey] ?? []),
      newItem,
    ],
  }));

  setShowMarket(false);
};

  const todayItems = marketItems[dateKey] ?? [];

  const totalCost = todayItems.reduce(
    (total, item) => total + item.cost,
    0
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#18181B]" : "bg-white"}`}>
      <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-200"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
        <View className={` ${isDark ? "bg-black" : "bg-gray-200"}`}>
                   

        <View className="mb-5">
          <Pressable className={`flex-row items-center border-b-2  px-5 py-6 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} onPress={() => router.push('./Standing')} >
            <MaterialIcons name="keyboard-arrow-left" size={32} color={isDark ? "#D4D4D8" : "#52525B"} />

            <Text className={`ml-3 flex-1 text-center text-xl font-semibold ${isDark ? "text-white" : "text-[#18181B]" }`}> Standing </Text>
            
          </Pressable>
        </View>

        {/*Upper Button*/}
        <View className="mx-5 flex-row my-5">
          <Pressable className={`mr-1 flex-1 items-center rounded-xl  p-3  ${ isDark ? "bg-[#FFFFFF]" : "bg-[#000000]" }`} >
            <Text className={`text-center text-sm ${isDark ? "text-[#18181B]" : "text-[#FFFFFF]" }`}> Market</Text>
          </Pressable>
                 
          <Pressable className={`mx-1 flex-1 items-center rounded-xl p-3 ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`} onPress={() => router.push('./payment')}>
            <Text className={`text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Payment</Text>
          </Pressable>
                 
          <Pressable className={`ml-1 flex-1 items-center rounded-xl p-3 ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`} onPress={() => router.push('./utilities')}>
            <Text className={`text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Utilities </Text>
          </Pressable>
        </View>

        {/* Date */}
        <View className="mx-4 mb-5 flex-row items-center">
          <View className="mr-2 flex-1">
            <View className={`flex-row items-center justify-between rounded-xl border-2 px-3 py-4 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
              <Pressable onPress={() => changeDate(-1)}>
                <SimpleLineIcons name="arrow-left" size={18} color={isDark ? "#D4D4D8" : "#52525B"} />
              </Pressable>

              <Text className={`mx-2 flex-1 text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}>  {formattedDate} </Text>

              <Pressable onPress={() => changeDate(1)}>
                <SimpleLineIcons name="arrow-right" size={18} color={isDark ? "#D4D4D8" : "#52525B"} />
              </Pressable>
            </View>
          </View>

          <View className={`flex-row items-center rounded-xl border-2 px-3 py-4 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Text className={`text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Daily </Text>

            <SimpleLineIcons name="arrow-down" size={16} color={isDark ? "#D4D4D8" : "#52525B"} style={{ marginLeft: 8 }} />
          </View>
        </View>

        {/* Market list */}
        {todayItems.length === 0 ? (
          <View className="mb-10 items-center justify-center px-5 py-10">
            <Text className="text-lg text-gray-500"> No market cost found </Text>
          </View>
        ) : (
          todayItems.map((item) => (
            <View key={item.id} className={`mx-5 my-2 rounded-xl border-2 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} >
              <View className="p-5">
                <Text className={`pl-1 text-base font-medium ${isDark ? "text-white" : "text-[#18181B]" }`}> {item.name} </Text>
              </View>

              <View className="mx-5 h-[1px] bg-gray-200" />

              <View className="flex-row items-center justify-between p-5">
                <Text className={`text-lg font-semibold ${isDark ? "text-white" : "text-[#18181B]" }`}> {item.product} </Text>

                <Text className={`text-lg font-semibold ${isDark ? "text-white" : "text-[#18181B]" }`}> ৳{item.cost} </Text>
              </View>
            </View>
          ))
        )}

        {/* Total cost */}
        {/* {todayItems.length > 0 && (
          <View className="mx-5 mt-3 flex-row items-center justify-between rounded-xl bg-white p-5">
            <Text className="text-base font-semibold text-[#18181B]"> Total Cost </Text>

            <Text className="text-lg font-bold text-[#18181B]"> ৳{totalCost} </Text>
          </View>
        )} */}

        </View>
      </ScrollView>

      {/* Add market button */}
      <Pressable className={`absolute bottom-12 right-8 w-16 h-16 rounded-2xl items-center justify-center ${ isDark ? "bg-[#FFFFFF]" : "bg-[#18181B]" }`}onPress={() => setShowMarket(true)} >
        <Add1Icon width={40} height={40} color={isDark ? "#18181B" : "#FFFFFF"} />
      </Pressable>

      {/* Add Market Modal */}
      <AddMarketModal isVisible={showMarket} onCancel={() => setShowMarket(false)} onAdd={handleAddMarket} members={memberList.map((member) => ({ id: member.id, name: member.name, }))}/>
        
    </SafeAreaView>
  );
};

export default Market;







