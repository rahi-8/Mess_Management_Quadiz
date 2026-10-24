import React, { useState, useEffect } from 'react';
import { View, Text,
  Pressable, Modal, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import DateTimePicker, { DateTimePickerEvent,} from '@react-native-community/datetimepicker';
import edit_member from './Frontend/src/app/tabs/EditMemberModal';

const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

interface Member {
  id: string;
  name: string;
}

interface AddMarketProps {
  isVisible: boolean;
  onCancel: () => void;
  onAdd: (
    memberId: string | null,
    product: string,
    amount: number,
    date: Date
  ) => void;
  members?: Member[];
}

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const parseDate = (value: string): Date | null => {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const parsed = new Date(year, month - 1, day);

  // Reject invalid dates ---- 32/01/2026
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  // Reject future dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsed > today) return null;

  return parsed;
};

const AddMarketModal = ({
  isVisible,
  onCancel,
  onAdd,
  members = [],
}: AddMarketProps) => {
  const [selectedMemberId, setSelectedMemberId] =
    useState<string | null>(null);

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');

  const [joinDate, setJoinDate] = useState(formatDate(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedMember = members.find(
    (member) => member.id === selectedMemberId
  );

  const parsedAmount = Number(amount);
  const validDate = parseDate(joinDate);

  const isValid =
    selectedMemberId !== null &&
    product.trim().length > 0 &&
    amount.trim().length > 0 &&
    Number.isFinite(parsedAmount) &&
    parsedAmount > 0 &&
    validDate !== null;

  const reset = () => {
    setSelectedMemberId(null);
    setProduct('');
    setAmount('');

    const today = new Date();
    setJoinDate(formatDate(today));
    setSelectedDate(today);

    setShowDatePicker(false);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (!isVisible) {
      reset();
    }
  }, [isVisible]);

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const selectMember = (id: string) => {
    setSelectedMemberId(id);
    setShowDropdown(false);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    date?: Date
  ) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event.type === 'dismissed' || !date) return;

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (date > today) return;

    setSelectedDate(date);
    setJoinDate(formatDate(date));
  };

  const handleManualDateChange = (value: string) => {
    //numbers and format as DD/MM/YYYY
    const digits = value.replace(/\D/g, '').slice(0, 8);

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

  const handleAdd = () => {
    if (!isValid || selectedMemberId === null || !validDate) {
      return;
    }

    onAdd(
      selectedMemberId,
      product.trim(),
      parsedAmount,
      validDate
    );

    reset();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={handleCancel}
      statusBarTranslucent
    >
      <KeyboardAvoidingView className="flex-1 justify-end" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />

        <Pressable className="absolute inset-0" onPress={handleCancel} />

        <View className="max-h-[90%] rounded-t-3xl bg-white px-5 pb-8 pt-3">
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
            {/* Modal Handle */}
            <View className="mb-5 h-1 w-9 self-center rounded-full bg-zinc-300" />

            <Text className="mb-6 text-center text-lg font-semibold text-zinc-900"> Add Market </Text>

            {/* Date - Before Member Name */}
            <View className="mb-5">
              <Text className="mb-2 text-sm font-medium text-zinc-900"> Date </Text>

              <Pressable className="flex-row items-center rounded-lg border border-zinc-200 px-3 py-2" onPress={() => { setShowDropdown(false); setShowDatePicker(true); }} >
                <TextInput className="ml-1 flex-1 py-1 text-sm text-zinc-900" placeholder="DD/MM/YYYY" placeholderTextColor="#A1A1AA" value={joinDate} onChangeText={handleManualDateChange} keyboardType="number-pad" maxLength={10} onFocus={() => setShowDatePicker(false)}/>

                <Ionicons name="calendar-outline" size={22} color="#52525B" />
              </Pressable>

              {showDatePicker && (
                <View className="mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white">
                  <DateTimePicker value={selectedDate} mode="date"
                    display={
                      Platform.OS === 'ios' ? 'spinner' : 'default'
                    }
                    maximumDate={new Date()}
                    onChange={handleDateChange}
                  />

                  {Platform.OS === 'ios' && (
                    <Pressable className="items-center border-t border-zinc-200 py-3" onPress={() => setShowDatePicker(false)} >
                      <Text className="font-semibold text-zinc-900"> Done </Text>
                    </Pressable>
                  )}
                </View>
              )}

              {!!joinDate && !validDate && (
                <Text className="mt-1 text-xs text-red-500"> Enter a valid date in DD/MM/YYYY format. </Text>
              )}
            </View>

            {/* Member Name */}
            <View className="mb-5">
              <Text className="mb-2 text-sm font-medium text-zinc-900"> Member Name </Text>

              <Pressable className="flex-row items-center justify-between rounded-lg border border-zinc-200 px-3 py-3.5" onPress={() => { setShowDatePicker(false); setShowDropdown((previous) => !previous); }} >
                <Text className={cn( 'text-sm',  selectedMember ? 'text-zinc-900' : 'text-zinc-400' )} >
                  {selectedMember?.name ?? 'Select Member'}
                </Text>

                <Ionicons name={showDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="#71717A" />
              </Pressable>

              {showDropdown && (
                <View className="mt-1 overflow-hidden rounded-lg border border-zinc-200 bg-white">
                  {members.length > 0 ? (
                    members.map((member) => (
                      <Pressable key={member.id} className="flex-row items-center justify-between border-b border-zinc-100 px-3 py-3.5"  onPress={() => selectMember(member.id)} >
                        <Text className="text-sm text-zinc-900"> {member.name} </Text>

                        {selectedMemberId === member.id && (
                          <Ionicons name="checkmark" size={20} color="#18181B" />
                        )}
                      </Pressable>
                    ))
                  ) : (
                    <Text className="px-3 py-4 text-sm text-zinc-400"> No members available </Text>
                  )}
                </View>
              )}
            </View>

            {/* Product */}
            <View className="mb-5">
              <Text className="mb-2 text-sm font-medium text-zinc-900"> What They Bought </Text>

              <View className="flex-row items-center rounded-lg border border-zinc-200 px-3 py-3.5">
                <TextInput className="flex-1 p-0 text-sm text-zinc-900" placeholder="e.g. Rice, Fish, Vegetables" placeholderTextColor="#A1A1AA" value={product} onChangeText={setProduct} autoCapitalize="sentences" returnKeyType="next" />
              </View>
            </View>

            {/* Amount */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-zinc-900">  Amount </Text>

              <View className="flex-row items-center rounded-lg border border-zinc-200 px-3 py-3.5">
                

                <TextInput className="flex-1 p-0 text-sm text-zinc-900"  placeholder="Enter amount" placeholderTextColor="#A1A1AA" value={amount} onChangeText={(value) => { const cleaned = value.replace(/[^0-9.]/g, '');
                    const parts = cleaned.split('.');
                    const formatted =
                      parts.length > 2
                        ? `${parts[0]}.${parts.slice(1).join('')}`
                        : cleaned;

                    setAmount(formatted);
                  }}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />
                <Text className="mr-2 text-base font-medium text-zinc-700"> ৳ </Text>
              </View>
            </View>

            {/* Add Market */}
            <Pressable className={cn( 'items-center rounded-lg py-3.5', isValid ? 'bg-black' : 'bg-black/40' )} disabled={!isValid} onPress={handleAdd} >
              <Text className="text-sm font-semibold text-white"> Add Market </Text>
            </Pressable>

            {/* Cancel */}
            <Pressable className="mt-3 items-center rounded-lg border border-zinc-200 py-3.5" onPress={handleCancel} >
              <Text className="text-sm font-medium text-zinc-900"> Cancel </Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddMarketModal;







// edit_member
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

import ProfileIcon from "../../../assets/icons/profile.svg";
import CalanderIcon from "../../../assets/icons/calander.svg";


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

const edit_member = () => {
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
    <Modal animationType="slide" transparent visible={true} onRequestClose={handleCancel} statusBarTranslucent >
      <View className="flex-1 justify-end">
        <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />

        <Pressable className="absolute inset-0" onPress={handleCancel} />

        <View className="rounded-t-3xl bg-white px-5 pb-8 pt-3">
          <View className="mb-5 h-1 w-9 self-center rounded-full bg-zinc-400" />
          <Text className="mb-6 text-center text-2xl font-semibold text-zinc-900">Edit Member </Text>

          {/* Name */}
          <View className="px-4 pt-3">
            <Text className="mb-2 text-lg font-semibold text-[#18181B]">Edit Name </Text>

            <View className="flex-row items-center rounded-2xl border-2 border-gray-200 px-4 py-2">
              <ProfileIcon width={18} height={18} color="#52525B" />
              <TextInput className="ml-3 flex-1 py-1 text-lg text-[#3F3F46]" placeholder="e.g. Yeamin Sakib" placeholderTextColor="#52525B" value={name} onChangeText={setName} editable={!isSaving} autoCapitalize="words" />
            </View>
          </View>

          {/* Phone Number */}
          <View className="px-4 pt-5">
            <Text className="mb-2 text-lg font-semibold text-[#18181B]">Edit Phone Number </Text>

            <View className="flex-row items-center rounded-2xl border-2 border-gray-200 px-4 py-2">
              <Feather name="phone" size={18} color="#52525B" />

              <TextInput
                className="ml-3 flex-1 py-1 text-lg text-[#3F3F46]"
                placeholder="017XXXXXXXX"
                placeholderTextColor="#52525B"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                editable={!isSaving}
              />
            </View>
          </View>

          {/* Join Date */}
          <View className="px-4 pt-5">
            <Text className="mb-2 text-lg font-semibold text-[#18181B]"> Edit Date </Text>

            <View className="flex-row items-center rounded-2xl border-2 border-gray-200 px-4 py-2">
              <TextInput className="ml-3 flex-1 py-1 text-lg text-[#3F3F46]" placeholder="DD/MM/YYYY" placeholderTextColor="#52525B" value={joinDate} onChangeText={(value) => {
                  setJoinDate(value);

                  const date = parseDate(value);

                  if (date) {
                    setSelectedDate(date);
                  }
                }} keyboardType="numbers-and-punctuation" maxLength={10} editable={!isSaving} />

              <Pressable onPress={() => setShowDatePicker(true)}  className="p-2" accessibilityRole="button" accessibilityLabel="Select join date" disabled={isSaving} >
                <CalanderIcon width={22} height={22} color="#52525B" />
              </Pressable>
            </View>

            {showDatePicker && (
              <DateTimePicker value={selectedDate} mode="date" display={
                  Platform.OS === "ios"
                    ? "spinner"
                    : "default"
                }  onChange={handleDateChange} maximumDate={new Date()} />
            )}

            {!!joinDate && !parseDate(joinDate) && (
              <Text className="mt-1 text-sm text-red-500"> Enter a valid date in DD/MM/YYYY format. </Text>
            )}
          </View>

          {/* Add Member */}
          <Pressable className={cn( "mx-4 mt-6 items-center rounded-lg py-3",
              isValid && !isSaving
                ? "bg-black"
                : "bg-black/40"
            )} disabled={!isValid || isSaving} onPress={handleAdd}>
            <Text className="text-lg font-semibold text-white">
              {isSaving ? "Saving..." : "Done"} </Text>
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


export default edit_member