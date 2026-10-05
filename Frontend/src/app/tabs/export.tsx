import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import ExportIcon from "../../../assets/icons/export.svg";
import ImageIcon from "../../../assets/icons/image.svg";
import PdfIcon from "../../../assets/icons/pdf.svg";
import CsvtIcon from "../../../assets/icons/csv.svg";
import Checkbox from "expo-checkbox";

interface ExportModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onExport: (format: "pdf" | "csv" | "image") => void;
}

const ExportModal = ({
  isVisible,
  onCancel,
  onExport,
}: ExportModalProps) => {

  const [selectedFormat, setSelectedFormat] = useState<
    "pdf" | "csv" | "image"
  >("pdf");

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">

        <BlurView
          intensity={100}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />

        <Pressable
          className="absolute inset-0"
          onPress={onCancel}
        />

        <View className="rounded-t-3xl bg-white px-5 pb-8 pt-3">

          <View className="mb-5 h-1 w-9 self-center rounded-full bg-zinc-400" />

          <View className="h-16 w-16 self-center items-center justify-center rounded-full bg-gray-200">
            <ExportIcon width={24} height={24} />
          </View>

          <Text className="mt-3 text-center text-2xl font-semibold text-[#18181B]">
            Export Meal Record
          </Text>

          <Text className="mt-2 text-center text-sm text-[#52525B]">
            Choose a format to export your meal record
          </Text>

          {/* PDF */}
          <Pressable
            className="mx-5 my-2 rounded-lg border-2 border-gray-200"
            onPress={() => setSelectedFormat("pdf")}
          >
            <View className="flex-row items-center justify-between px-4 py-5">

              <View className="flex-row items-center">
                <PdfIcon width={24} height={24} />
                <Text className="ml-2 text-lg">
                  PDF
                </Text>
              </View>

              <Checkbox
                value={selectedFormat === "pdf"}
                onValueChange={() => setSelectedFormat("pdf")}
                color={
                  selectedFormat === "pdf"
                    ? "#52525B"
                    : undefined
                }
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 50,
                }}
              />

            </View>
          </Pressable>

          {/* CSV */}
          <Pressable
            className="mx-5 my-2 rounded-lg border-2 border-gray-200"
            onPress={() => setSelectedFormat("csv")}
          >
            <View className="flex-row items-center justify-between px-4 py-5">

              <View className="flex-row items-center">
                <CsvtIcon width={24} height={24} />
                <Text className="ml-2 text-lg">
                  CSV
                </Text>
              </View>

              <Checkbox
                value={selectedFormat === "csv"}
                onValueChange={() => setSelectedFormat("csv")}
                color={
                  selectedFormat === "csv"
                    ? "#52525B"
                    : undefined
                }
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 50,
                }}
              />

            </View>
          </Pressable>

          {/* Image */}
          <Pressable
            className="mx-5 my-2 rounded-lg border-2 border-gray-200"
            onPress={() => setSelectedFormat("image")}
          >
            <View className="flex-row items-center justify-between px-4 py-5">

              <View className="flex-row items-center">
                <ImageIcon width={24} height={24} />
                <Text className="ml-2 text-lg">
                  Image
                </Text>
              </View>

              <Checkbox
                value={selectedFormat === "image"}
                onValueChange={() => setSelectedFormat("image")}
                color={
                  selectedFormat === "image"
                    ? "#52525B"
                    : undefined
                }
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 50,
                }}
              />

            </View>
          </Pressable>

          {/* Export */}
          <Pressable
            className="mt-5 items-center rounded-lg bg-black py-3.5"
            onPress={() => onExport(selectedFormat)}
          >
            <Text className="text-sm font-semibold text-white">
              Export
            </Text>
          </Pressable>

          {/* Cancel */}
          <Pressable
            className="mt-3 items-center rounded-lg border border-zinc-900 py-3.5"
            onPress={onCancel}
          >
            <Text className="text-sm font-medium text-zinc-900">
              Cancel
            </Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};

export default ExportModal;