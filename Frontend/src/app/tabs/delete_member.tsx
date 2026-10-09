import React, { useState } from "react";

import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TextInput,
  Platform,
  Alert,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DeleteIcon from "../../../assets/icons/Delete.svg";

const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface Member {
  id: string;
  name: string;
  phone: string;
  joindate: string;
}

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}/${date.getFullYear()}`;
};

const parseDate = (value: string): Date | null => {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);

  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
};


const delete_member = () => {
   const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);

  const reset = () => {
    setName("");
    setPhone("");
    setJoinDate("");
    setSelectedDate(new Date());
    setShowDatePicker(false);
  };

  const isValid =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    parseDate(joinDate) !== null;

  const handleAdd = async () => {
    const date = parseDate(joinDate);

    if (!name.trim() || !phone.trim() || !date) {
      Alert.alert(
        "Invalid Information",
        "Please enter the name, phone number, and a valid join date."
      );
      return;
    }

    try {
      setIsSaving(true);

      const existingData = await AsyncStorage.getItem("members");

      const members: Member[] = existingData
        ? JSON.parse(existingData)
        : [];

      const newMember: Member = {
        id: Date.now().toString(),
        name: name.trim(),
        phone: phone.trim(),
        joindate: formatDate(date),
      };

      const updatedMembers = [...members, newMember];

      await AsyncStorage.setItem(
        "members",
        JSON.stringify(updatedMembers)
      );

      reset();

      router.replace("./member");
    } catch (error) {
      console.log("Error adding member:", error);

      Alert.alert(
        "Error",
        "Unable to save the member. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    reset();
    router.replace("./member");
  };

  const handleDateChange = (
    event: { type?: string },
    date?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "dismissed" || !date) return;

    setSelectedDate(date);
    setJoinDate(formatDate(date));
  };

  return (
    <Modal animationType="slide" transparent visible={true} onRequestClose={handleCancel} statusBarTranslucent>
      <View className="flex-1 justify-end">
        <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />

        <Pressable className="absolute inset-0" onPress={handleCancel} />

        <View className="rounded-t-3xl bg-white px-5 pb-8 pt-3">
          <View className="mb-5 h-1 w-9 self-center rounded-full bg-zinc-400" />


        <View className="flex-col items-center bg-white">
            <DeleteIcon width={56} height={56} />
            <Text className="text-[#18181B] text-xl font-semibold pt-5">Delete </Text>
            <Text className="text-[#18181B] text-xl font-semibold pb-1 ">Motiur Rahman Shakil?</Text>
            <Text className="text-[#52525B] text-base font-regular px-4 pb-5">Are you sure want to delete Motiur Rahman Shakil? This action can’t be undone.</Text>
        </View>

          {/* Add Member */}
          <Pressable className="mx-4 mt-6 items-center rounded-lg py-3 bg-[#F31260]" disabled={!isValid || isSaving} onPress={handleAdd} >
            <Text className="text-lg font-semibold text-[#FFFFFF]">    {isSaving ? "Saving..." : "Delete"} </Text>
          </Pressable>

          {/* Cancel */}
          <Pressable className="mx-4 mt-3 items-center rounded-lg border border-zinc-900 py-3.5" onPress={handleCancel} disabled={isSaving} >
            <Text className="text-lg font-medium text-zinc-900"> Cancel </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default delete_member