import React, { useState, useEffect } from 'react';
import { View, Text, Pressable,TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from "../../../context/ThemeContext";
import Wallet2Icon from '../../../assets/icons/wallet-3.svg';
import WalletMinus from '../../../assets/icons/wallet-minus.svg';
import UserIcon from '../../../assets/icons/user.svg';
import TrashIcon from '../../../assets/icons/trash.svg';
import Add_1Icon from '../../../assets/icons/add-1.svg';

const BILLS = [
  { 
    id: '1', 
    bill: 'House Rent', 
    cost: '৳15.000' 
  },
  { 
    id: '2', 
    bill: 'Electricity Bill', 
    cost: '৳15.000' 
  },
  { 
    id: '3', 
    bill: 'Gas Bill', 
    cost: '' 
  },
  { 
    id: '4', 
    bill: 'Wifi Bill', 
    cost: null 
  },
  { 
    id: '5', 
    bill: 'Cook Bill', 
    cost: null 
  },
];

const getNumericAmount = (value: any): number => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const amount = String(value).replace(/[৳,\s]/g, '');

  if (/^\d{1,3}(?:\.\d{3})+$/.test(amount)) {
    return Number(amount.replace(/\./g, ''));
  }

  const number = Number(amount);
  return Number.isFinite(number) ? number : 0;
};

const Utilities = () => {
  const { members } = useLocalSearchParams();
  const { isDark, toggleTheme } = useTheme();
  const [month, setMonth] = useState(new Date());
  const [memberList, setMemberList] = useState<any[]>(BILLS);
  const [showForm, setShowForm] = useState(false);
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState('');

  useEffect(() => {
    if (!members) {
      setMemberList(BILLS);
      return;
    }

    try {
      const param = Array.isArray(members) ? members[0] : members;
      const parsed = JSON.parse(param);

      if (Array.isArray(parsed)) {
        setMemberList(parsed);
      } else if (parsed && typeof parsed === 'object') {
        setMemberList([parsed]);
      } else {
        setMemberList(BILLS);
      }
    } catch {
      setMemberList(BILLS);
    }
  }, [members]);

  // Total Utilities Bill count
  const totalCost = memberList.reduce((total, item) => {
    const amount = item.amount ?? item.cost;
    return total + getNumericAmount(amount);
  }, 0);

  // Month 
  const changeMonth = (value: number) => {
    setMonth((previous) => {
      const nextMonth = new Date(previous);
      nextMonth.setDate(1);
      nextMonth.setMonth(nextMonth.getMonth() + value);
      return nextMonth;
    });
  };

  const formattedMonth = month.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Delete bill
  const handleDelete = (index: number) => {
    setMemberList((previous) =>
      previous.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#18181B]" : "bg-white"}`} >
          <StatusBar style={isDark ? 'light' : 'dark'}/>
          <ScrollView className={`flex-1 ${isDark ? "bg-black" : "bg-gray-200"}`} contentContainerStyle={{ paddingBottom: 100 }}>        
            <View className={` ${isDark ? "bg-black" : "bg-gray-200"}`}>     

        <View className="mb-5">
          <Pressable className={`flex-row items-center border-b-2 px-5 py-10 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} onPress={() => router.push('./Standing')} >
            <MaterialIcons name="keyboard-arrow-left" size={32} color={isDark ? "#D4D4D8" : "#52525B"}/>

            <Text className={`ml-3 flex-1 text-center text-xl font-semibold ${isDark ? "text-white" : "text-[#18181B]" }`}> Standing </Text>
            <View className="w-8" />
          </Pressable>
        </View>

        {/* Upper Buttons */}
        <View className="mx-5 my-5 flex-row">
          <Pressable className={`mr-1 flex-1 items-center rounded-xl  p-3  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`} onPress={() => router.push('./Standing')} >
            <Text className={`text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Market </Text>
          </Pressable>

          <Pressable className={`mr-1 flex-1 items-center rounded-xl  p-3  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`} onPress={() => router.push('./payment')} >
            <Text className={`text-center text-sm ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> Payment </Text>
          </Pressable>

          <View className={`ml-1 flex-1 items-center justify-center rounded-xl border ${ isDark ? "bg-[#FFFFFF]" : "bg-[#000000]" }`}>
            <Text className={`text-center  text-sm ${isDark ? "text-[#18181B]" : "text-[#FFFFFF]" }`}> Utilities </Text>
          </View>
        </View>

        {/* Month Selector */}
        <View className="mx-5 mb-5">
          <View className={`flex-row items-center justify-between rounded-xl border-2  px-4 py-5 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Pressable onPress={() => changeMonth(-1)}>
              <SimpleLineIcons name="arrow-left" size={18}  color={isDark ? "#D4D4D8" : "#52525B"} />
            </Pressable>

            <Text className={`font-semibold ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> {formattedMonth} </Text>

            <Pressable onPress={() => changeMonth(1)}>
              <SimpleLineIcons name="arrow-right" size={18} color={isDark ? "#D4D4D8" : "#52525B"} />
            </Pressable>
          </View>
        </View>

        {/* Total Utilities Bill */}
        <View className="flex-row justify-between px-5 py-3">
          <View className={`w-full flex-row items-center justify-between rounded-xl  p-5 ${ isDark ? "bg-[#FA8D491A]" : "bg-[#FA8D491A]" }`}>
            <View className="flex-row items-center">
              <View className={`mr-3 h-[44px] w-[44px] items-center justify-center rounded-xl  ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>
                <Wallet2Icon width={24} height={24} color={isDark ? "#D4D4D8" : "#52525B"}/>
              </View>

              <View>
                <Text className={`text-xl font-semibold   ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`} > ৳{totalCost.toLocaleString('en-BD')} </Text>

                <Text className={`py-2 ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> Total Utilities Bill</Text>
              </View>
            </View>

            <Pressable onPress={() => router.push('./utilities_Bill')}>
              <MaterialIcons name="keyboard-arrow-right" size={32}  color={isDark ? "#D4D4D8" : "#52525B"}/>
            </Pressable>
          </View>
        </View>

        {/* Per Head and Unpaid */}
        <View className="mx-5 flex-row justify-between py-2">
          <View className={`mr-1 flex-1 flex-row items-center rounded-xl p-4 shadow-md ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <View className={`h-[44px] w-[44px] items-center justify-center rounded-xl ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>
              <UserIcon width={24} height={24} color={isDark ? "#D4D4D8" : "#52525B"} />
            </View>

            <View className="flex-col items-start pl-3">
              <Text className={`text-lg font-semibold ${isDark ? "text-[#FFFFFF]" : "text-[#18181B]" }`}> ৳50 </Text>
              <Text className={`text-sm font-medium ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> Per Head </Text>
            </View>
          </View>

          <View className={`mr-1 flex-1 flex-row items-center rounded-xl p-4 shadow-md ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <View className={`h-[44px] w-[44px] items-center justify-center rounded-xl ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>
              <WalletMinus width={24} height={24} color={isDark ? "#D4D4D8" : "#52525B"}/>
            </View>

            <View className="flex-col items-start pl-3">
              <Text className={`text-lg font-semibold  ${isDark ? "text-[#F871A0]" : "text-[#C20E4D]" }`}> ৳450 </Text>
              <Text className={`text-sm font-medium ${isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}> Unpaid </Text>
            </View>
          </View>
        </View>

        {/* Bills  */}
        <View className="mx-5 my-2 flex-row items-center">
          <View className="ml-3 w-6" />
        </View>

        {/* Bills List */}
        {memberList.length === 0 ? (
          <View className={`mx-5 items-center rounded-xl  py-8 ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>
            <Text className="text-base text-[#71717A]"> No bills found </Text>
          </View>
        ) : (
          memberList.map((item, index) => {
            const amount = item.amount ?? item.cost;
            const hasAmount = amount !== null && amount !== undefined && String(amount).trim() !== '';

            return (
              <View key={item.id ?? index} className="mx-5 my-2 flex-row items-center" >
                {/* Bill and Amount Box */}
                <View className={`min-h-[64px] flex-1 flex-row items-center justify-between rounded-xl border-2 px-5 py-5 ${ isDark ? "border-[#F4F4F5]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} >
                  <Text className={`mr-3 flex-1 text-sm font-normal ${isDark ? "text-[#E4E4E7]" : "text-[#3F3F46]" }`}> {item.bill || item.name || 'Not Set'} </Text>

                  

                  <Text className={`text-right text-base font-medium ${ hasAmount ? isDark ? 'text-[#E4E4E7]' : 'text-[#3F3F46]' : isDark ? 'text-[#D4D4D8]' : 'text-[#52525B]' }`}>{hasAmount ? String(amount) : 'Not Set'} </Text>
                </View>

                {/* Delete Button*/}
                <Pressable className="ml-3 items-center justify-center" onPress={() => handleDelete(index)} hitSlop={10} >
                  <TrashIcon width={24} height={24} color={isDark ? "#D4D4D8" : "#52525B"}/>
                </Pressable>
              </View>
            );
          })
        )}

        {/* Bill Input */}
        {showForm && (
          <View className="mx-5 mb-4 mt-4 flex-row items-center gap-2">
            {/* Input Border  */}
            <View className={`flex-1 flex-row items-center rounded-xl border-2 px-3 py-3 ${ isDark ? "border-[#F4F4F5]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#18181B]" : "bg-white" }`} >
              <TextInput className={`my-2 mx-5 flex-1 rounded-xl border-2 px-5 py-2 text-sm ${
                  isDark
                    ? 'border-[#27272A] text-white'
                    : 'border-[#E4E4E7]  text-[#18181B]'
                }`}
                placeholder="Add Bill" placeholderTextColor={isDark ? '#A1A1AA' : '#71717A'} value={billName} onChangeText={setBillName}/>

              <TextInput className={`w-20 my-2 mr-5 rounded-xl border-2 px-5 py-2 text-sm ${
                isDark
                    ? 'border-[#27272A] text-white'
                    : 'border-[#E4E4E7] text-[#18181B]'
                }`}
                placeholder="৳0" placeholderTextColor={isDark ? '#A1A1AA' : '#71717A'} keyboardType="decimal-pad" value={billAmount} onChangeText={setBillAmount} />
            </View>

            {/* Check Button Outside */}
            <View className={`h-24 w-20 rounded-xl items-center justify-center ${ isDark ? "bg-[#FFFFFF]" : "bg-black" }`}>
              <Pressable className={`h-6 w-6 items-center justify-center rounded-full ${ isDark ? "bg-black" : "bg-white" }`} onPress={() => { if (!billName.trim()) {
                          return;
                        }

                        setMemberList((prev) => [
                          ...prev,
                          {
                            id: Date.now().toString(),
                            bill: billName.trim(),
                            cost: billAmount.trim() || null,
                            amount: billAmount.trim() || null,
                          },
                        ]);

                        setBillName('');
                        setBillAmount('');
                        setShowForm(false);
                      }} >
                      <MaterialIcons name="check" size={14} color={isDark ? "#D4D4D8" : "#52525B"} />
                    </Pressable>
                    </View>
                  
                  </View>
                )} 


        {/* Add New & Reset All Buttons */}
        <View className="mx-5 my-2 flex-row items-center">
          <Pressable className={`flex-1 flex-row items-center justify-center rounded-xl border  py-4 ${ isDark ? "border-[#71717A]" : "border-[#A1A1AA]" }`} onPress={() => setShowForm((prev) => !prev)} >
            <Add_1Icon width={24} height={24} color={isDark ? "#D4D4D8" : "#52525B"}/>
            <Text className={`ml-2 text-base font-semibold  ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" }`}> Add New </Text>
          </Pressable>

          <Pressable className={`ml-3 flex-1 items-center justify-center rounded-xl border py-4 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" } ${ isDark ? "bg-[#27272A]" : "bg-[#F4F4F5]" }`} onPress={() => { setMemberList((prev) =>
                prev.map((item) => ({
                  ...item,
                  cost: null,
                  amount: null,
                }))
              );
            }} >
            <Text className={`text-base font-semibold ${isDark ? "text-[#FAFAFA]" : "text-[#18181B]" }`}> Reset All </Text>
          </Pressable>
        </View>

       

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Utilities;
