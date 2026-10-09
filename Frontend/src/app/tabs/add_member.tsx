
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";

import ProfileIcon from "../../../assets/icons/profile.svg";
import CalanderIcon from "../../../assets/icons/calander.svg";

const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export interface Member {
  id: string;
  name: string;
  phone: string;
  joindate: string;
}

interface AddMemberModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onAdd: (member: Member) => void | Promise<void>;
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

const AddMember = ({
  isVisible,
  onCancel,
  onAdd,
}: AddMemberModalProps) => {
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
        "Please enter a name, phone number, and valid join date."
      );
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      joindate: formatDate(date),
    };

    try {
      setIsSaving(true);
      await onAdd(newMember);
      reset();
      onCancel();
      router.replace("./member");
    } catch (error) {
      console.log("Error adding member:", error);
      Alert.alert("Error", "Unable to add member. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isSaving) return;

    reset();
    onCancel();
    router.replace("./member");
  };

  const handleValueChange = (_event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
      setJoinDate(formatDate(date));
    }
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={handleCancel} statusBarTranslucent>
      <View className="flex-1 justify-end">
        <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />

        <Pressable className="absolute inset-0" onPress={handleCancel} disabled={isSaving} />

        <View className="rounded-t-3xl bg-white px-5 pb-8 pt-3">
          <View className="mb-5 h-1 w-9 self-center rounded-full bg-zinc-400" />
          <Text className="mb-6 text-center text-lg font-semibold text-zinc-900">  Add Member </Text>

          {/* Name */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-zinc-900"> Name </Text>

            <View className="flex-row items-center rounded-lg border border-zinc-200 px-3 py-3">
              <ProfileIcon width={18} height={18} color="#52525B" />
              <TextInput className="ml-3 flex-1 text-sm text-zinc-900" placeholder="e.g. Yeamin Sakib" placeholderTextColor="#A1A1AA" value={name} onChangeText={setName} editable={!isSaving} autoCapitalize="words" />
            </View>
          </View>

          {/* Phone Number */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-zinc-900"> Phone Number </Text>

            <View className="flex-row items-center rounded-lg border border-zinc-200 px-3 py-3">
              <Feather name="phone" size={18} color="#52525B" />
              <TextInput  className="ml-3 flex-1 text-sm text-zinc-900" placeholder="017XXXXXXXX" placeholderTextColor="#A1A1AA" value={phone} onChangeText={setPhone} keyboardType="phone-pad" editable={!isSaving} />
            </View>
          </View>

          {/* Join Date */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-zinc-900"> Join Date </Text>

            <View className="flex-row items-center rounded-lg border border-zinc-200 px-3 py-2">
              <TextInput className="ml-1 flex-1 py-1 text-sm text-zinc-900" placeholder="DD/MM/YYYY" placeholderTextColor="#A1A1AA" value={joinDate} onChangeText={(value) => { setJoinDate(value);
                const parsed = parseDate(value);
                  if (parsed) setSelectedDate(parsed);
                }}
                keyboardType="numbers-and-punctuation" maxLength={10} editable={!isSaving} />

              <Pressable className="p-2" onPress={() => setShowDatePicker(true)} disabled={isSaving}>
                <CalanderIcon width={22} height={22} color="#52525B" />
              </Pressable>
            </View>

            {showDatePicker && (
              <DateTimePicker value={selectedDate} mode="date" display={Platform.OS === "ios" ? "spinner" : "default"} onChange={handleValueChange} maximumDate={new Date()} />
            )}

            {!!joinDate && !parseDate(joinDate) && (
              <Text className="mt-1 text-xs text-red-500"> Enter a valid date in DD/MM/YYYY format. </Text>
            )}
          </View>

          {/* Add Button */}
          <Pressable className={cn( "mt-2 items-center rounded-lg py-3.5", isValid && !isSaving ? "bg-black" : "bg-black/40" )}
            disabled={!isValid || isSaving} onPress={handleAdd} >
            <Text className="text-sm font-semibold text-white"> {isSaving ? "Saving..." : "Add Member"} </Text>
          </Pressable>

          {/* Cancel Button */}
          <Pressable className="mt-3 items-center rounded-lg border border-zinc-900 py-3.5" onPress={handleCancel} disabled={isSaving} >
            <Text className="text-sm font-medium text-zinc-900"> Cancel </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddMember;

