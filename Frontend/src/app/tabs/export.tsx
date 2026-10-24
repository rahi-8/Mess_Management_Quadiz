import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import ExportIcon from "../../../assets/icons/export.svg";
import ImageIcon from "../../../assets/icons/image.svg";
import PdfIcon from "../../../assets/icons/pdf.svg";
import CsvtIcon from "../../../assets/icons/csv.svg";
import Checkbox from "expo-checkbox";
import { useTheme } from "../../../context/ThemeContext";


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

  const { isDark, toggleTheme } = useTheme();
  

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

        <View className={`rounded-t-3xl  px-5 pb-8 pt-3 ${ isDark ? "bg-[#18181B]" : "bg-white" }`}>

          <View className="mb-5 h-1 w-9 self-center rounded-full bg-[#71717A]" />

          <View className={`h-16 w-16 self-center items-center justify-center rounded-full ${ isDark ? "bg-[#A1A1AA14]" : "bg-[#71717A14]" }`}>
            <ExportIcon width={24} height={24} color={isDark ? "#FFFFFF" : "#18181B"} />
          </View>

          <Text className={`mt-3 text-center text-2xl font-semibold ${ isDark ? "text-[white]" : "text-[#18181B]" }`}>
            Export Meal Record
          </Text>

          <Text className={`mt-2 text-center text-sm  ${ isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}>
            Choose a format to export your meal record
          </Text>

          {/* PDF */}
          <Pressable
            className={`mx-5 my-2 rounded-lg border-2 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" }`}
            onPress={() => setSelectedFormat("pdf")}
          >
            <View className="flex-row items-center justify-between px-4 py-5">

              <View className="flex-row items-center">
                <PdfIcon width={24} height={24}  color={isDark ? "#D4D4D8" : "#52525B"}/>
                <Text className={`ml-2 text-lg  ${ isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}>
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
            className={`mx-5 my-2 rounded-lg border-2 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" }`}
            onPress={() => setSelectedFormat("csv")}
          >
            <View className="flex-row items-center justify-between px-4 py-5">

              <View className="flex-row items-center">
                <CsvtIcon width={24} height={24} color={isDark ? "#D4D4D8" : "#52525B"}/>
                <Text className={`ml-2 text-lg  ${ isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}>
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
            className={`mx-5 my-2 rounded-lg border-2 ${ isDark ? "border-[#27272A]" : "border-[#F4F4F5]" }`}
            onPress={() => setSelectedFormat("image")}
          >
            <View className="flex-row items-center justify-between px-4 py-5">

              <View className="flex-row items-center">
                <ImageIcon width={24} height={24} color={isDark ? "#D4D4D8" : "#52525B"}/>
                <Text className={`ml-2 text-lg   ${ isDark ? "text-[#D4D4D8]" : "text-[#52525B]" }`}>
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
            className={`mt-5 items-center rounded-lg  py-5 ${ isDark ? "bg-white" : "bg-[#000000]" }`}
            onPress={() => onExport(selectedFormat)} 
          >
            <Text className={`text-xl font-semibold ${ isDark ? "text-[#18181B]" : "text-white" }`}>
              Export
            </Text>
          </Pressable>

          {/* Cancel */}
          <Pressable
            className={`mt-3 items-center rounded-lg border  py-5 ${ isDark ? "border-white" : "border-[#18181B]" }`}
            onPress={onCancel}
          >
            <Text className={`text-sm font-medium ${ isDark ? "text-[#FAFAFA]" : "text-[#18181B]" }`}>
              Cancel
            </Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};

export default ExportModal;