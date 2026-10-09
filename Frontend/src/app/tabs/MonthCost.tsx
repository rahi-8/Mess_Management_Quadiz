import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { MaterialIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

const MEMBERS = [
  {
    id: '1',
    name: 'Yasmin Ahmed Sakib',
    date: 'October 01, 2026',
    product: 'Rice',
    cost: 3000,
  },
  {
    id: '2',
    name: 'Jadab',
    date: 'October 01, 2026',
    product: 'Wheat',
    cost: 2500,
  },
  {
    id: '3',
    name: 'Mahbubur Rahman Rahi',
    date: 'October 01, 2026',
    product: 'Mango',
    cost: 1800,
  },
  {
    id: '4',
    name: 'Adil',
    date: 'October 02, 2026',
    product: 'Vegetables',
    cost: 400,
  },
];

const normalizeDate = (dateStr: string) => {
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
};

const MonthCost = () => {
  const [month, setMonth] = useState(new Date());
  const { members } = useLocalSearchParams();
  const [memberList, setMemberList] = useState<any[]>([]);
  const [expandedDates, setExpandedDates] = useState<{ [key: string]: boolean }>({});

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

  const TotalCost = memberList.reduce(
    (acc, member) => acc + Number(member.cost || 0),
    0
  );

  const changeMonth = (value: number) => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() + value);
    setMonth(newMonth);
  };

  const formattedMonth = month.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const getDatesInMonth = (date: Date) => {
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    const dates = [];

    for (let i = 1; i <= lastDay; i++) {
      const d = new Date(year, monthIndex, i);
      dates.push(
        d.toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })
      );
    }
    return dates;
  };

  const groupByDate = (members: any[]) => {
    const grouped: { [key: string]: any[] } = {};
    members.forEach((member) => {
      const date = normalizeDate(member.date);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(member);
    });
    return grouped;
  };

  const datesInMonth = getDatesInMonth(month);
  const groupedMembers = groupByDate(memberList);

  const toggleDate = (date: string) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="h-full bg-gray-50">
        <View className="mb-5">
          <Pressable className="flex-row items-center border-b-2 border-gray-100 bg-white px-5 py-5" onPress={() => router.push('./Home')} >
            <MaterialIcons name="keyboard-arrow-left" size={32} color="#3F3F46" />
            <Text className="ml-3 flex-1 text-center text-xl font-semibold text-[#18181B]"> Month Cost </Text>
            <View style={{ width: 32 }} />
          </Pressable>
        </View>

        {/* Month  */}
        <View className="mx-5 mb-5">
          <View className="flex-row items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-3 bg-white">
            <Pressable onPress={() => changeMonth(-1)}>
              <SimpleLineIcons name="arrow-left" size={18} color="#3F3F46" />
            </Pressable>

            <Text className="text-[#3F3F46] font-semibold"> {formattedMonth} </Text>

            <Pressable onPress={() => changeMonth(1)}>
              <SimpleLineIcons name="arrow-right" size={18} color="#3F3F46" />
            </Pressable>
          </View>
        </View>


        {/* Daily Cost List */}
        {datesInMonth.map(date => {
        const dayData = groupedMembers[date] || [];
        const isExpanded = !!expandedDates[date];

        const dayTotal = dayData.reduce(
            (sum, item) => sum + Number(item.cost || 0),
            0
        );

        return (
            <View key={date} className="mx-5 mb-3">
            <View className="rounded-xl bg-gray-200 overflow-hidden p-5">

                <Pressable onPress={() => toggleDate(date)} className="flex-row items-center justify-between px-5 py-4" >
                <Text className="text-base font-semibold text-[#3F3F46]"> {date} </Text>
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="#71717A" />
                </Pressable>

                {/* Product Information */}
                {isExpanded && (
                <View className="px-3 pb-3">
                    {dayData.length > 0 ? (
                    <>
                        {dayData.map((member, index) => (
                        <View key={member.id || index} className="mb-2 rounded-xl border border-gray-200 bg-white" >
                            <View className="p-4">
                            <Text className="text-lg font-semibold text-[#18181B]"> {member.name || 'Unknown'}</Text>
                            </View>

                            <View className="mx-4 h-[1px] bg-gray-200" />

                            <View className="flex-row items-center justify-between p-4">
                            <Text className="text-base font-medium text-[#18181B]"> {member.product || 'Unknown'} </Text>

                            <Text className="text-base font-semibold text-[#18181B]"> ৳{Number(member.cost || 0).toLocaleString()} </Text>
                            </View>
                        </View>
                        ))}

                        {/* Daily Total cost */}
                        <View className="  px-2 py-1">
                        <Text className="font-bold text-right text-[#18181B]">Cost - ৳{dayTotal.toLocaleString()}</Text>
                        </View>
                    </>
                    ) : (
                    <View className="rounded-lg px-2">
                        <Text className="text-sm text-[#52525B]"> No market cost for this day </Text>
                    </View>
                    )}
                </View>
                )}
            </View>
            </View>
        );
        })}

      </ScrollView>

      {/* Month's Total Cost */}
                
                <View className="mx-5 mb-5 flex-row items-center justify-between py-5">
                <Text className="text-xl font-semibold text-[#18181B]"> Total cost</Text>
                <Text className="text-2xl font-bold text-[#18181B]"> ৳{TotalCost.toLocaleString()} </Text>
                </View>


      </SafeAreaView>
    );
   };

export default MonthCost;
