import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface Member {
  id: number;
  name: string;
}

interface GuestModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onAdd: (memberId: number | null, mealCount: number) => void;
  members?: Member[];
}

const GuestModal = ({
  isVisible,
  onCancel,
  onAdd,
  members = [],
}: GuestModalProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [mealCount, setMealCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const isValid = selectedMemberId !== null && mealCount > 0;

  const reset = () => {
    setSelectedMemberId(null);
    setMealCount(0);
    setShowDropdown(false);
  };

  const handleAdd = () => {
    onAdd(selectedMemberId, mealCount);
    reset();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const selectMember = (id: number) => {
    setSelectedMemberId(id);
    setShowDropdown(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={handleCancel}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">
        <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
        <Pressable className="absolute inset-0" onPress={handleCancel} />

        <View className="rounded-t-3xl bg-white px-5 pb-8 pt-3">
          <View className="mb-5 h-1 w-9 self-center rounded-full bg-zinc-400" />

          <Text className="mb-6 text-center text-lg font-semibold text-zinc-900">
            Add Guest Meal
          </Text>

          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-zinc-900">Member</Text>

            <Pressable className="flex-row items-center justify-between rounded-lg border border-zinc-200 px-3 py-3" onPress={() => setShowDropdown((p) => !p)} >
              <Text className={cn( "text-sm", selectedMember ? "text-zinc-900" : "text-zinc-400" )}> {selectedMember?.name ?? "Select Member"} </Text>
              <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"}size={20} color="#71717A"/>
            </Pressable>

            {showDropdown && (
              <View className="mt-1 overflow-hidden rounded-lg border border-zinc-200 bg-white divide-y divide-zinc-100">
                {members.map((member) => (
                  <Pressable key={member.id} className="px-3 py-3" onPress={() => selectMember(member.id)} >
                    <Text className="text-sm text-zinc-900">{member.name}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Meal */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-zinc-900">Meal</Text>
            <View className="flex-row items-center justify-between rounded-lg border border-zinc-200 px-4 py-2">
              <Pressable className="p-2" onPress={() => setMealCount((p) => (p > 0 ? p - 1 : 0))} >
                <Text className="text-2xl text-zinc-500">−</Text>
              </Pressable>

              <Text className="text-base font-medium text-zinc-900"> {mealCount} </Text>
              <Pressable className="p-2" onPress={() => setMealCount((p) => p + 1)} >
                <Text className="text-2xl text-zinc-500">+</Text>
              </Pressable>
            </View>
          </View>

          {/* Add Button */}
          <Pressable className={cn( "mt-2 items-center rounded-lg py-3.5", isValid ? "bg-black" : "bg-black/40" )} disabled={!isValid} onPress={handleAdd} >
            <Text className="text-sm font-semibold text-white">Add Meal</Text>
          </Pressable>

          {/* Cancel */}
          <Pressable className="mt-3 items-center rounded-lg border border-zinc-900 py-3.5" onPress={handleCancel} >
            <Text className="text-sm font-medium text-zinc-900">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default GuestModal;