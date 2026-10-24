import React, { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import MoreIcon from "../../../assets/icons/more.svg";
import CopyIcon from "../../../assets/icons/copy.svg";
import Add1Icon from "../../../assets/icons/add-1.svg";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";
import { useTheme } from "../../../context/ThemeContext";

interface MemberType {
  id: string;
  name: string;
  phone: string;
  joindate: string;
}

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
  const { isDark } = useTheme();

  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<MemberType[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showMember, setShowMember] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberType | null>(null);

  // Search members
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  // Copy phone number
  const copyPhone = async (phone: string) => {
    try {
      await Clipboard.setStringAsync(phone);
      Alert.alert("Copied", "Phone number copied successfully.");
    } catch (error) {
      console.error("Error copying phone number:", error);
      Alert.alert("Error", "Unable to copy phone number.");
    }
  };

  // Toggle member menu
  const toggleMenu = (id: string) => {
    setActiveMenuId((previous) => (previous === id ? null : id));
  };

  // Add new member
  const handleAddMember = async (
    name: string,
    phone: string,
    date: Date
  ) => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      Alert.alert("Required", "Please enter the member name and phone number.");
      return;
    }

    const newMember: MemberType = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: trimmedName,
      phone: trimmedPhone,
      joindate: date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const storedData = await AsyncStorage.getItem("members");

      const parsedData: unknown = storedData
        ? JSON.parse(storedData)
        : INITIAL_MEMBERS;

      if (!Array.isArray(parsedData)) {
        throw new Error("Invalid members data");
      }

      const currentMembers = parsedData as MemberType[];
      const updatedMembers = [newMember, ...currentMembers];

      await AsyncStorage.setItem("members", JSON.stringify(updatedMembers));

      setMembers(updatedMembers);
      setSearch("");
      setActiveMenuId(null);
      setShowMember(false);
    } catch (error) {
      console.error("Error adding member:", error);
      Alert.alert("Error", "Unable to add member. Please try again.");
    }
  };

  // Edit existing member and save changes
  const handleEditMember = async (
    id: string,
    name: string,
    phone: string,
    date: Date
  ) => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      Alert.alert("Required", "Please enter the member name and phone number.");
      return;
    }

    const updatedMember: MemberType = {
      id,
      name: trimmedName,
      phone: trimmedPhone,
      joindate: date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const storedData = await AsyncStorage.getItem("members");

      const parsedData: unknown = storedData
        ? JSON.parse(storedData)
        : INITIAL_MEMBERS;

      if (!Array.isArray(parsedData)) {
        throw new Error("Invalid members data");
      }

      const currentMembers = parsedData as MemberType[];

      const updatedMembers = currentMembers.map((member) =>
        member.id === id ? updatedMember : member
      );

      await AsyncStorage.setItem("members", JSON.stringify(updatedMembers));

      setMembers(updatedMembers);
      setEditingMember(null);
      setActiveMenuId(null);
    } catch (error) {
      console.error("Error editing member:", error);
      Alert.alert("Error", "Unable to update member. Please try again.");
    }
  };

  

  // Load members whenever this screen becomes active
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadMembers = async () => {
        try {
          const storedData = await AsyncStorage.getItem("members");

          if (!isActive) return;

          if (storedData !== null) {
            const parsedData: unknown = JSON.parse(storedData);

            if (!Array.isArray(parsedData)) {
              throw new Error("Invalid members data");
            }

            setMembers(parsedData as MemberType[]);
          } else {
            await AsyncStorage.setItem(
              "members",
              JSON.stringify(INITIAL_MEMBERS)
            );

            if (isActive) {
              setMembers(INITIAL_MEMBERS);
            }
          }
        } catch (error) {
          console.error("Error loading members:", error);
          if (isActive) {
            Alert.alert("Error", "Unable to load members. Please try again.");
          }
        }
      };

      loadMembers();

      return () => {
        isActive = false;
      };
    }, [])
  );


  return (
    <SafeAreaView
      className={`flex-1 ${
        isDark ? "bg-black" : "bg-gray-100"
      }`}
    >
      <ScrollView
        className={`flex-1 ${
          isDark ? "bg-black" : "bg-gray-100"
        }`}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className={`flex-1 ${
            isDark ? "bg-black" : "bg-gray-100"
          }`}
        >
          {/* Header */}
          <View className="mb-5">
            <Pressable
              className={`flex-row items-center border-b-2 px-5 py-8 ${
                isDark
                  ? "border-[#27272A] bg-[#18181B]"
                  : "border-[#F4F4F5] bg-white"
              }`}
              onPress={() => router.push("./Home")}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={32}
                color={isDark ? "#D4D4D8" : "#52525B"}
              />

              <Text
                className={`ml-3 flex-1 text-center text-xl font-semibold ${
                  isDark ? "text-white" : "text-[#18181B]"
                }`}
              >
                Members
              </Text>

              <View className="w-8" />
            </Pressable>
          </View>

          {/* Search Bar */}
          <View className="mx-5 my-3">
            <View
              className={`flex-row items-center rounded-xl border-2 px-4 py-3 ${
                isDark
                  ? "border-[#27272A] bg-[#18181B]"
                  : "border-[#F4F4F5] bg-white"
              }`}
            >
              <MaterialIcons
                name="search"
                size={24}
                color={isDark ? "#D4D4D8" : "#52525B"}
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search members..."
                placeholderTextColor="#A1A1AA"
                className={`ml-3 flex-1 text-base ${
                  isDark ? "text-white" : "text-[#18181B]"
                }`}
              />
            </View>
          </View>

          {/* Member List */}
          <View className="mx-5 my-3">
            {filteredMembers.length === 0 ? (
              <View
                className={`items-center rounded-xl border p-6 ${
                  isDark
                    ? "border-[#27272A] bg-[#18181B]"
                    : "border-[#E4E4E7] bg-white"
                }`}
              >
                <Text
                  className={`text-base ${
                    isDark ? "text-[#D4D4D8]" : "text-[#71717A]"
                  }`}
                >
                  No member found
                </Text>
              </View>
            ) : (
              filteredMembers.map((member) => {
                const isMenuOpen = activeMenuId === member.id;

                return (
                  <View
                    key={member.id}
                    className="mb-3 flex-row items-center"  >

                    {/* Edit Button */}
                    {isMenuOpen && (
                      <Pressable className={`mr-2 h-[110px] w-[55px] items-center justify-center rounded-xl ${
                          isDark ? "bg-[#095028]" : "bg-[#D1F4E0]"
                        }`}
                        onPress={() => { setActiveMenuId(null); setEditingMember(member);}} >

                        <AntDesign
                          name="edit"
                          size={20}
                          color={isDark ? "#E8FAF0" : "#095028"}
                        />
                        <Text
                          className={`mt-1 text-[10px] font-medium ${
                            isDark ? "text-[#E8FAF0]" : "text-[#095028]"
                          }`}
                        >
                          Edit
                        </Text>
                      </Pressable>
                    )}

                    {/* Member Card */}
                    <View
                      className={`flex-1 flex-row items-center justify-between rounded-xl border-2 px-3 py-4 ${
                        isDark
                          ? "border-[#27272A] bg-[#18181B]"
                          : "border-[#F4F4F5] bg-white"
                      }`}
                    >
                      {/* Initials */}
                      <View
                        className={`h-[50px] w-[50px] items-center justify-center rounded-xl ${
                          isDark ? "bg-[#27272A]" : "bg-[#F4F4F5]"
                        }`}
                      >
                        <Text
                          className={`text-lg ${
                            isDark ? "text-[#D4D4D8]" : "text-[#52525B]"
                          }`}
                        >
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
                        <Text
                          className={`text-base font-medium ${
                            isDark ? "text-white" : "text-[#18181B]"
                          }`}
                        >
                          {member.name}
                        </Text>

                        <View className="mt-1 flex-row items-center">
                          <Text
                            className={`mr-1 text-sm ${
                              isDark
                                ? "text-[#D4D4D8]"
                                : "text-[#3F3F46]"
                            }`}
                          >
                            {member.phone}
                          </Text>

                          <Pressable
                            onPress={() => copyPhone(member.phone)}
                            hitSlop={8}
                          >
                            <CopyIcon
                              width={18}
                              height={18}
                              color={isDark ? "#E4E4E7" : "#3F3F46"}
                            />
                          </Pressable>
                        </View>

                        <Text
                          className={`mt-1 text-xs ${
                            isDark
                              ? "text-[#D4D4D8]"
                              : "text-[#3F3F46]"
                          }`}
                        >
                          Joined: {member.joindate}
                        </Text>
                      </View>

                      {/* Three-dot Menu */}
                      <Pressable
                        onPress={() => toggleMenu(member.id)}
                        className="p-1"
                        hitSlop={8}
                      >
                        <MoreIcon
                          width={24}
                          height={24}
                          color={isDark ? "#E4E4E7" : "#3F3F46"}
                        />
                      </Pressable>
                    </View>

                    {/* Delete Button */}
                    {isMenuOpen && (
                      <Pressable
                        className={`ml-2 h-[110px] w-[55px] items-center justify-center rounded-xl ${
                          isDark ? "bg-[#610726]" : "bg-[#FDD0DF]"
                        }`}
                        onPress={() => {
                        setActiveMenuId(null);

                        router.push({
                          pathname: "./DeleteMemberModal",
                          params: {
                            id: member.id,
                            name: member.name,
                          },
                        });
                      }}
                      >

                        <AntDesign
                          name="delete"
                          size={20}
                          color={isDark ? "#FDD0DF" : "#610726"}
                        />
                        <Text
                          className={`mt-1 text-[10px] font-medium ${
                            isDark ? "text-[#FDD0DF]" : "text-[#610726]"
                          }`}
                        >
                          Delete
                        </Text>
                      </Pressable>
                    )}
                  </View>
                );
              })
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add Member Button */}
      <Pressable className={`absolute bottom-8 right-6 h-16 w-16 items-center justify-center rounded-2xl ${ isDark ? "bg-white" : "bg-[#18181B]" }`}
        onPress={() => setShowMember(true)}>
        <Add1Icon width={32} height={32} color={isDark ? "#18181B" : "#FFFFFF"} />
      </Pressable>


      {/* Edit Member Modal */}
      <EditMemberModal
        isVisible={editingMember !== null}
        member={editingMember}
        onCancel={() => setEditingMember(null)}
        onSave={handleEditMember}
      />

      {/* Add Member Modal */}
      <AddMemberModal
        isVisible={showMember}
        onCancel={() => setShowMember(false)}
        onAdd={handleAddMember}
      />



    </SafeAreaView>
  );
};

export default Member;
