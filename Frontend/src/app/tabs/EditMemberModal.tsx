
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import ProfileIcon from "../../../assets/icons/profile.svg";
import { useTheme } from "../../../context/ThemeContext";

export interface MemberType {
  id: string;
  name: string;
  phone: string;
  joindate: string;
}

interface EditMemberModalProps {
  isVisible: boolean;
  member: MemberType | null;
  onCancel: () => void;
  onSave: (
    id: string,
    name: string,
    phone: string,
    date: Date
  ) => void;
}

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const parseDate = (value: string): Date | null => {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date > today) return null;

  return date;
};

const parseStoredDate = (value: string): Date => {
  // Supports both "DD/MM/YYYY" and "October 01, 2026"
  const parsed = parseDate(value);

  if (parsed) return parsed;

  const fallback = new Date(value);

  if (!Number.isNaN(fallback.getTime())) {
    return fallback;
  }

  return new Date();
};

const EditMemberModal = ({
  isVisible,
  member,
  onCancel,
  onSave,
}: EditMemberModalProps) => {
  const { isDark } = useTheme();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [joinDate, setJoinDate] = useState(formatDate(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!isVisible || !member) return;

    const date = parseStoredDate(member.joindate);

    setName(member.name);
    setPhone(member.phone);
    setJoinDate(formatDate(date));
    setSelectedDate(date);
    setShowDatePicker(false);
  }, [isVisible, member]);

  const validDate = parseDate(joinDate);
  const digitsOnly = phone.replace(/\D/g, "");

  const isValid =
    name.trim().length > 0 &&
    digitsOnly.length >= 10 &&
    digitsOnly.length <= 15 &&
    validDate !== null;

  const inputContainer = `flex-row items-center rounded-lg border px-3 py-3 ${
    isDark
      ? "border-[#3F3F46] bg-[#27272A]"
      : "border-[#E4E4E7] bg-white"
  }`;

  const inputTextColor = isDark ? "text-white" : "text-zinc-900";
  const labelColor = isDark ? "text-[#D4D4D8]" : "text-[#18181B]";

  const handleManualDateChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    let formatted = digits;

    if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    setJoinDate(formatted);

    const parsed = parseDate(formatted);

    if (parsed) {
      setSelectedDate(parsed);
    }
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    date?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "dismissed" || !date) return;

    const chosenDate = new Date(date);
    chosenDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (chosenDate > today) {
      Alert.alert("Invalid Date", "Future dates are not allowed.");
      return;
    }

    setSelectedDate(chosenDate);
    setJoinDate(formatDate(chosenDate));
  };

  const handleSave = () => {
    if (!member || !isValid || !validDate) {
      Alert.alert(
        "Invalid Information",
        "Please enter a valid name, phone number, and joining date."
      );
      return;
    }

    onSave(member.id, name.trim(), phone.trim(), validDate);
  };

  const handleCancel = () => {
    setShowDatePicker(false);
    onCancel();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={handleCancel}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        className="flex-1 justify-end"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <BlurView
          intensity={90}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />

        <Pressable
          className="absolute inset-0"
          onPress={handleCancel}
        />

        <View
          className={`max-h-[90%] rounded-t-3xl px-5 pb-8 pt-3 ${
            isDark ? "bg-[#18181B]" : "bg-white"
          }`}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Handle */}
            <View
              className={`mb-5 h-1 w-9 self-center rounded-full ${
                isDark ? "bg-[#52525B]" : "bg-[#D4D4D8]"
              }`}
            />

            <Text
              className={`mb-6 text-center text-lg font-semibold ${
                isDark ? "text-white" : "text-[#18181B]"
              }`}
            >
              Edit Member
            </Text>

            {/* Name */}
            <View className="mb-4">
              <Text className={`mb-2 text-sm font-medium ${labelColor}`}>
                Edit Name
              </Text>

              <View className={inputContainer}>
                <ProfileIcon
                  width={18}
                  height={18}
                  color={isDark ? "#D4D4D8" : "#52525B"}
                />

                <TextInput
                  className={`ml-3 flex-1 text-sm ${inputTextColor}`}
                  placeholder="e.g. Yeamin Sakib"
                  placeholderTextColor="#A1A1AA"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Phone */}
            <View className="mb-4">
              <Text className={`mb-2 text-sm font-medium ${labelColor}`}>
                Edit Phone Number
              </Text>

              <View className={inputContainer}>
                <Feather
                  name="phone"
                  size={18}
                  color={isDark ? "#D4D4D8" : "#52525B"}
                />

                <TextInput
                  className={`ml-3 flex-1 text-sm ${inputTextColor}`}
                  placeholder="017XXXXXXXX"
                  placeholderTextColor="#A1A1AA"
                  value={phone}
                  onChangeText={(value) =>
                    setPhone(value.replace(/[^0-9+\-\s]/g, ""))
                  }
                  keyboardType="phone-pad"
                  maxLength={16}
                />
              </View>

              {!!phone &&
                (digitsOnly.length < 10 || digitsOnly.length > 15) && (
                  <Text className="mt-1 text-xs text-red-500">
                    Enter a valid phone number.
                  </Text>
                )}
            </View>

            {/* Joining Date */}
            <View className="mb-5">
              <Text className={`mb-2 text-sm font-medium ${labelColor}`}>
                Edit Date
              </Text>

              <View className={inputContainer}>
                <TextInput
                  className={`flex-1 text-sm ${inputTextColor}`}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#A1A1AA"
                  value={joinDate}
                  onChangeText={handleManualDateChange}
                  keyboardType="number-pad"
                  maxLength={10}
                />

                <Pressable
                  onPress={() => setShowDatePicker((previous) => !previous)}
                  hitSlop={8}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={22}
                    color={isDark ? "#D4D4D8" : "#52525B"}
                  />
                </Pressable>
              </View>

              {showDatePicker && (
                <View
                  className={`mt-2 overflow-hidden rounded-xl border ${
                    isDark
                      ? "border-[#3F3F46] bg-[#27272A]"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={new Date()}
                    onChange={handleDateChange}
                    themeVariant={isDark ? "dark" : "light"}
                  />

                  {Platform.OS === "ios" && (
                    <Pressable
                      className="items-center border-t border-zinc-300 py-3"
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text className={labelColor}>Done</Text>
                    </Pressable>
                  )}
                </View>
              )}

              {!!joinDate && !validDate && (
                <Text className="mt-1 text-xs text-red-500">
                  Enter a valid date in DD/MM/YYYY format.
                  {"\n"}Future dates are not allowed.
                </Text>
              )}
            </View>

            {/* Save Changes */}
            <Pressable
              className={`items-center rounded-lg py-5 ${
                isValid
                  ? isDark
                    ? "bg-white"
                    : "bg-black"
                  : isDark
                    ? "bg-zinc-700"
                    : "bg-black/40"
              }`}
              disabled={!isValid}
              onPress={handleSave}
            >
              <Text
                className={`text-sm font-semibold ${
                  isDark && isValid ? "text-black" : "text-white"
                }`}
              >
                Done
              </Text>
            </Pressable>

            {/* Cancel */}
            <Pressable
              className={`mt-3 items-center rounded-lg border py-5 ${
                isDark ? "border-white" : "border-[#18181B]"
              }`}
              onPress={handleCancel}
            >
              <Text
                className={`text-sm font-medium ${
                  isDark ? "text-[#D4D4D8]" : "text-[#18181B]"
                }`}
              >
                Cancel
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditMemberModal;
