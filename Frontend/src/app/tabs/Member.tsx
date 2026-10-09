
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Alert,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import MoreIcon from "../../../assets/icons/more.svg";
import CopyIcon from "../../../assets/icons/copy.svg";
import AddIcon from "../../../assets/icons/add.svg";

import AddMember, { Member as MemberType } from "./add_member";

const INITIAL_MEMBERS: MemberType[] = [
  {
    id: "1",
    name: "Rahim",
    phone: "01712345678",
    joindate: "October 01, 2026",
  },
  {
    id: "2",
    name: "Adil",
    phone: "01712345678",
    joindate: "October 18, 2026",
  },
  {
    id: "3",
    name: "Nadim",
    phone: "01712345678",
    joindate: "September 15, 2026",
  },
  {
    id: "4",
    name: "Hasan Mahmud Emon",
    phone: "01712345678",
    joindate: "September 08, 2026",
  },
  {
    id: "5",
    name: "Mahbubur Rahman Rahi",
    phone: "01712345678",
    joindate: "November 21, 2026",
  },
  {
    id: "6",
    name: "Ruhan Miah",
    phone: "01712345678",
    joindate: "November 21, 2026",
  },
  {
    id: "7",
    name: "Jadab Lal sarkar",
    phone: "01712345678",
    joindate: "November 21, 2026",
  },
];

  const Member = () => {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<MemberType[]>(INITIAL_MEMBERS);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const copyPhone = async (phone: string) => {
    try {
      await Clipboard.setStringAsync(phone);
      Alert.alert("Copied", "Phone number copied successfully.");
    } catch (error) {
      Alert.alert("Error", "Unable to copy phone number.");
    }
  };

  const toggleMenu = (id: string) => {
    setActiveMenuId((previous) => (previous === id ? null : id));
  };

  const handleAddMember = (newMember: MemberType) => {
    setMembers((previous) => [...previous, newMember]);
    setShowAddMember(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="mb-5">
          <Pressable className="flex-row items-center border-x-2 border-b-2 border-gray-100 bg-white px-5 py-10" onPress={() => router.push("./Home")} >
            <MaterialIcons name="keyboard-arrow-left" size={32} color="#3F3F46" />
            <Text className="ml-3 flex-1 text-center text-xl font-semibold text-[#18181B]"> Members </Text>
            <View className="w-8" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="mx-5 my-3">
          <View className="flex-row items-center rounded-xl border-2 border-gray-200 bg-white px-4 py-3">
            <MaterialIcons name="search" size={24} color="#3F3F46" />

            <TextInput value={search} onChangeText={setSearch} placeholder="Search members..." placeholderTextColor="#A1A1AA" className="ml-3 flex-1 text-base text-[#18181B]" />
          </View>
        </View>

        {/* Member List */}
        <View className="mx-5 my-3">
          {filteredMembers.length === 0 ? (
            <View className="items-center rounded-xl border-2 border-gray-200 bg-white p-6">
              <Text className="text-base text-gray-500"> No member found </Text>
            </View>
          ) : (
            filteredMembers.map((member) => {
              const isMenuOpen = activeMenuId === member.id;

              return (
                <View key={member.id} className="mb-3 flex-row items-center">

                  {/* Edit Button */}
                  {isMenuOpen && (
                    <Pressable className="mr-2 h-[80px] w-[50px] items-center justify-center rounded-xl bg-[#D1F4E0]"
                      onPress={() => { setActiveMenuId(null); router.push({ pathname: "./edit_member", params: { id: member.id }, });
                      }} >
                      <AntDesign name="edit" size={20} color="#3F3F46" />
                      <Text className="mt-1 text-[10px] font-medium text-[#3F3F46]"> Edit </Text>
                    </Pressable>
                  )}

                  {/* Member card */}
                  <View className="flex-1 flex-row items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-5 py-4">
                    <View className="h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#F4F4F5]">
                      <Text className="text-lg font-normal text-[#52525B]">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </Text>
                    </View>

                    {/* Member Information */}
                    <View className="ml-3 flex-1">
                      <Text className="text-lg font-normal text-[#18181B]"> {member.name} </Text>

                      <View className="flex-row items-center">
                        <Text className="pr-2 text-sm text-[#52525B]"> {member.phone} </Text>

                        <Pressable onPress={() => copyPhone(member.phone)}>
                          <CopyIcon width={18} height={18} />
                        </Pressable>
                      </View>

                      <Text className="text-sm text-[#52525B]"> Joined: {member.joindate} </Text>
                    </View>

                    {/* Three-dot */}
                    <Pressable onPress={() => toggleMenu(member.id)} className="p-1" hitSlop={8} >
                      {isMenuOpen ? (
                        <AntDesign name="close" size={22} color="#3F3F46" />
                      ) : (
                        <MoreIcon width={24} height={24} />
                      )}
                    </Pressable>
                  </View>

                  {/* Delete Button */}
                  {isMenuOpen && (
                    <Pressable
                      className="ml-2 h-[80px] w-[50px] items-center justify-center rounded-xl bg-[#F4D1D1]"
                      onPress={() => { setActiveMenuId(null); router.push({ pathname: "./delete_member", params: { id: member.id }, });
                      }} >
                      <AntDesign name="delete" size={20} color="#EF4444" />

                      <Text className="mt-1 text-[10px] font-medium text-[#EF4444]"> Delete </Text>
                    </Pressable>
                  )}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Add Member Button */}
      <Pressable className="absolute bottom-6 right-6" onPress={() => { setActiveMenuId(null); setShowAddMember(true); }} >
        <AddIcon width={64} height={64} />
      </Pressable>

      {/* Add Member Modal */}
      <AddMember isVisible={showAddMember} onCancel={() => setShowAddMember(false)} onAdd={handleAddMember} />
    </SafeAreaView>
  );
};

export default Member;

