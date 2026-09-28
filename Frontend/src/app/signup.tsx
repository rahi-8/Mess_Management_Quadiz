import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <SafeAreaView >
      <KeyboardAvoidingView >
        <ScrollView >

          <View className="flex-row items-center justify-center py-10">
            <Text className="text-4xl font-bold ">Sign Up</Text>
          </View >

          {/* Sign Up Section and logo */}
          <View className="items-center justify-center py-5">
            <View className="items-center justify-center">
              <View className="h-20 w-20  border rounded-2xl bg-black" />
            <View className="items-center justify-center py-3">
              <Text className="text-3xl mt-2 font-bold text-black">Create Account</Text>
              <Text className="text-base text-gray-600">Sign up to get started with your mess management</Text>
            </View>
            </View>
          </View>

          {/* Email & password section */}
          <View className="mx-8  py-2"> 

            <View className=" py-3">  
                <Text className="text-lg font-bold text-black">Name</Text>
                <View className="flex-row items-center border border-gray-300 rounded-md">
                <Octicons className="pl-3" name="person" size={14} />
                <TextInput placeholder="e.g. Mahbubur Rahman Rahi" className="py-3 px-1" />
                </View>
            </View>

            <View className=" py-3">
              <Text className="text-lg font-bold text-black">Email</Text>
              <View className="flex-row items-center border border-gray-300 rounded-md">
                <MaterialCommunityIcons className="pl-3" name="email-outline" size={14} />
                <TextInput placeholder="example@gmail.com" className="flex-1 py-3" />
              </View>
            </View>

            <View className="py-2">
              <Text className="text-lg font-bold text-black">Password</Text>

              {/* Input + Eye-Icon*/}
              <View className="flex-row items-center border border-gray-300 rounded-md">
                <MaterialCommunityIcons className="pl-3" name="lock-outline" size={14} />
                <TextInput placeholder="************" secureTextEntry={!showPassword} className="flex-1 py-3 " />

                <TouchableOpacity className="px-4 py-3" onPress={() => setShowPassword(!showPassword)} >
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} />
                </TouchableOpacity>
              </View>
              
            </View>

            <View className=" py-2">  
              <Text className="text-lg font-bold text-black">Confirm Password</Text>
              
              <View className="flex-row items-center border border-gray-300 rounded-md">
                <MaterialCommunityIcons className="pl-3" name="lock-outline" size={14} />
                <TextInput placeholder="************" secureTextEntry={!showConfirmPassword} className="flex-1 py-3 " />

                <TouchableOpacity className="px-4 py-3" onPress={() => setShowConfirmPassword(!showConfirmPassword)} >
                  <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} />
                </TouchableOpacity>
              </View>
            </View>

          {/* Button section */}
           <View className=" py-5">
              <Pressable className="bg-black rounded-xl py-4 px-4 mt-5" >
                <Text className="text-center text-lg font-bold text-white" onPress={() => router.push("./tabs/Home")}>Sign Up</Text>
              </Pressable>
           </View>
           <View className="flex-row justify-center items-center">
            <Text className="text-base text-gray-600">
              Already have an account?
            </Text>

            <Pressable onPress={() => router.push("/")}>
              <Text className="text-black font-bold">
                {" "}Sign In
              </Text>
            </Pressable>
          </View>

          </View>
          

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;


