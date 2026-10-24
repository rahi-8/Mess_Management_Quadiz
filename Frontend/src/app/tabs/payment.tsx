import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Add1Icon from '../../../assets/icons/add-1.svg';
import AddPaymentModal from './AddPaymentModal';
import { useTheme } from "../../../context/ThemeContext";


const PAYMENT = [
  { id: '1',
    date: '01 October 2026',
    name: 'Rahim Ahmed Raj', 
    cost: 3000 
  },
  { id: '2', 
    date: '02 October 2026', 
    name: 'Adil Hussain', 
    cost: 4000 
  },
  { id: '3', 
    date: '04 November 2026', 
    name: 'Nadim', 
    cost: 2000 
  },
  { id: '4', 
    date: '10 October 2026', 
    name: 'Emon', 
    cost: 1500 
  },
  { id: '5', 
    date: '04 October 2026', 
    name: 'Jadab Lal Sorkar', 
    cost: 2000 
  },
];

const Payment = () => {
  const { payment } = useLocalSearchParams();
  const [memberList, setMemberList] = useState<any[]>(PAYMENT);
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  const { isDark, toggleTheme } = useTheme();

const changeMonth = (value: number) => {
  setMonth((prev) => {
    const next = new Date(prev);
    next.setDate(1);
    next.setMonth(next.getMonth() + value);
    return next;
  });
};

const formattedMonth = month.toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
}).replace(' ', ', ');

  useEffect(() => {
    if (!payment) {
      setMemberList(PAYMENT);
      return;
    }

    try {
      const parsed = JSON.parse(
        Array.isArray(payment) ? payment[0] : payment
      );

      if (Array.isArray(parsed)) {
        setMemberList(parsed);
      } else if (parsed && typeof parsed === 'object') {
        setMemberList([parsed]);
      } else {
        setMemberList(PAYMENT);
      }
    } catch {
      setMemberList(PAYMENT);
    }
  }, [payment]);

  const [showPayment, setShowPayment] = useState(false);

const handleAddPayment = (
  memberId: string,
  product: string,
  amount: number,
  date: Date
) => {
  const selectedMember = memberList.find(
    (member) => String(member.id) === String(memberId)
  );

  if (!selectedMember) return;

  const newPayment = {
    id: Date.now().toString(),
    date: `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleDateString('en-US', {
      month: 'long',
    })} ${date.getFullYear()}`,
    name: selectedMember.name,
    cost: amount,
    product,
  };

  setMemberList((prev) => [...prev, newPayment]);

  setMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  setShowPayment(false);
};

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#18181B]" : "bg-white"}`} >
      <StatusBar style={isDark ? 'light' : 'dark'}/>
      <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-200"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
        <View className={` ${isDark ? "bg-black" : "bg-gray-200"}`}>      

        <View className="mb-5">
          <Pressable className={`flex-row items-center border-b-2 px-5 py-10  ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} onPress={() => router.push('./Standing')}  >
            <MaterialIcons name="keyboard-arrow-left" size={32} color={isDark ? "#D4D4D8" : "#52525B"} />
            <Text className={`ml-3 flex-1 text-center text-xl font-semibold ${isDark ? "text-white" : "text-[#18181B]" }`}> Payment </Text>
          </Pressable>
        </View>

        {/* Upper Buttons */}
        <View className="mx-5 my-5 flex-row">
          <Pressable className={`mr-1 flex-1 items-center rounded-xl  p-3  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`} onPress={() => router.push('./Standing')} >
            <Text className={`text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Market </Text>
          </Pressable>

          <View className={`mx-1 flex-1 items-center rounded-xl  p-3 ${ isDark ? "bg-[#FFFFFF]" : "bg-[#000000]" }`}>
            <Text className={`text-center text-sm ${isDark ? "text-[#18181B]" : "text-[#FFFFFF]" }`}> Payment </Text>
          </View>

          <Pressable className={`ml-1 flex-1 items-center rounded-xl p-3 ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`} onPress={() => router.push('./utilities')}>
            <Text className={`text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Utilities </Text>
          </Pressable>
        </View>


        {/* Month  */}
        <View className="mx-5 mb-5">
          <View className={`flex-row items-center justify-between rounded-xl border-2 px-4 py-5 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Pressable onPress={() => changeMonth(-1)}>
              <MaterialIcons name="keyboard-arrow-left" size={26} color={isDark ? "#D4D4D8" : "#52525B"} />
            </Pressable>

            <Text className={`font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> {formattedMonth} </Text>

            <Pressable onPress={() => changeMonth(1)}>
              <MaterialIcons name="keyboard-arrow-right" size={26} color={isDark ? "#D4D4D8" : "#52525B"} />
            </Pressable>
          </View>
        </View>




        {/* Payment List */}
        {memberList.length === 0 ? (
          <View className="mb-10 items-center justify-center px-5 py-10">
            <Text className="text-lg text-gray-500"> No payment found </Text>
          </View>
        ) : (
          memberList.map((item, index) => (
            <View key={item.id ?? index} className={`flex-row items-center justify-between mx-5 my-2 p-5 rounded-xl border-2 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} >
              {/* Member and Date */}
              <View className="p-5">
                <Text className={`text-sm font-normal ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> {item.date || 'Unknown'} </Text>
                <Text className={`text-base font-medium ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" }`} > {item.name || 'Unknown'}</Text>
              </View>

              {/* Payment Amount */}
              <View className="flex-row items-center justify-between p-5">
                <Text className={`text-lg font-semibold ${isDark ? "text-white" : "text-[#18181B]" }`}> ৳{Number(item.cost || 0).toLocaleString('en-BD')} </Text>
              </View>
            </View>
          ))
        )}

        </View>
      </ScrollView>

      {/* Add Payment Button */}
      <Pressable className={`absolute bottom-12 right-8 w-16 h-16 rounded-2xl items-center justify-center ${ isDark ? "bg-[#FFFFFF]" : "bg-[#18181B]" }`} onPress={() => setShowPayment(true)}>
        <Add1Icon width={40} height={40} color={isDark ? "#18181B" : "#FFFFFF"} />
      </Pressable>


      <AddPaymentModal isVisible={showPayment} onCancel={() => setShowPayment(false)} onAdd={handleAddPayment} members={memberList.map((member) => ({ id: String(member.id), name: member.name, }))} />
    </SafeAreaView>
  );
};


export default Payment;




