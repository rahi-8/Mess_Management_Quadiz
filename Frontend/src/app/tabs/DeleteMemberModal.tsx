import React, { useState } from "react";

import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DeleteIcon from "../../../assets/icons/Delete.svg";
import { useTheme } from "../../../context/ThemeContext";

interface Member {
  id: string;
  name: string;
  phone: string;
  joindate: string;
}

const DeleteMemberModal = () => {
  const { isDark } = useTheme();

  const params = useLocalSearchParams<{
    id?: string | string[];
    name?: string | string[];
  }>();

  const memberId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const memberName = Array.isArray(params.name)
    ? params.name[0]
    : params.name;

  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => {
    if (isDeleting) return;

    router.back();
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    if (!memberId) {
      Alert.alert(
        "Member Not Found",
        "Please select a member again."
      );
      return;
    }

    try {
      setIsDeleting(true);

      const storedData = await AsyncStorage.getItem("members");

      if (!storedData) {
        Alert.alert(
          "No Data Found",
          "The member list could not be loaded."
        );
        return;
      }

      const members: Member[] = JSON.parse(storedData);

      if (!Array.isArray(members)) {
        throw new Error("Invalid members data.");
      }

      const memberExists = members.some(
        (member) => String(member.id) === String(memberId)
      );

      if (!memberExists) {
        Alert.alert(
          "Member Not Found",
          "This member may have already been deleted."
        );
        return;
      }

      const updatedMembers = members.filter(
        (member) => String(member.id) !== String(memberId)
      );

      await AsyncStorage.setItem(
        "members",
        JSON.stringify(updatedMembers)
      );

      router.back();
    } catch (error) {
      console.error("Error deleting member:", error);

      Alert.alert(
        "Delete Failed",
        "Unable to delete this member. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible
      statusBarTranslucent
      onRequestClose={handleCancel}
    >
      <View className="flex-1 justify-end">
        {/* Background Blur */}
        <BlurView
          intensity={100}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />

        {/* Outside Press */}
        <Pressable
          className="absolute inset-0"
          onPress={handleCancel}
          disabled={isDeleting}
        />

        {/* Bottom Sheet */}
        <View
          className={`rounded-t-3xl px-5 pb-8 pt-3 ${
            isDark ? "bg-[#18181B]" : "bg-white"
          }`}
        >
          {/* Modal Handle */}
          <View className="mb-5 h-1 w-9 self-center rounded-full bg-[#71717A]" />

          {/* Confirmation Content */}
          <View
            className={`items-center ${
              isDark ? "bg-[#18181B]" : "bg-white"
            }`}
          >
            <DeleteIcon
              width={56}
              height={56}
            />

            <Text
              className={`pt-5 text-center text-xl font-semibold ${
                isDark ? "text-white" : "text-[#18181B]"
              }`}
            >
              Delete
            </Text>

            <Text
              className={`pb-1 text-center text-xl font-semibold ${
                isDark ? "text-white" : "text-[#18181B]"
              }`}
            >
              {memberName || "this member"}?
            </Text>

            <Text
              className={`px-4 pb-5 text-center text-base ${
                isDark ? "text-[#D4D4D8]" : "text-[#52525B]"
              }`}
            >
              Are you sure you want to delete{" "}
              {memberName || "this member"}? This action can’t be undone.
            </Text>
          </View>

          {/* Delete Button */}
          <Pressable
            className={`mx-4 mt-6 min-h-12 items-center justify-center rounded-lg py-3 ${
              isDeleting
                ? "bg-[#F31260]/60"
                : "bg-[#F31260]"
            }`}
            onPress={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-lg font-semibold text-white">
                Delete
              </Text>
            )}
          </Pressable>

          {/* Cancel Button */}
          <Pressable
            className={`mx-4 mt-3 min-h-12 items-center justify-center rounded-lg border py-5 ${
              isDark ? "border-white" : "border-[#18181B]"
            }`}
            onPress={handleCancel}
            disabled={isDeleting}
          >
            <Text
              className={`text-lg font-medium ${
                isDark ? "text-[#FAFAFA]" : "text-[#18181B]"
              }`}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteMemberModal;
