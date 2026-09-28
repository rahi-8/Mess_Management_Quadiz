import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView >
        <ScrollView >
          <View className="flex-row items-center justify-center py-10">
            <Text className="text-4xl font-bold ">Login</Text>
          </View>

          {/* Welcome Back Section and logo */}
          <View className="items-center justify-center mt-5 py-5">
            <View className="items-center justify-center">
              <View className="h-20 w-20  border rounded-2xl bg-black" />
              <View className="items-center justify-center py-3">
                <Text className="text-3xl mt-2 font-bold text-black">
                  Welcome Back!
                </Text>
                <Text className="text-lg text-gray-600">
                  Log in to continue your mess management
                </Text>
              </View>
            </View>
          </View>

          {/* Email & password section */}
          <View className="mx-8  py-2">
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
                <TextInput placeholder="************" secureTextEntry={!showPassword} className="flex-1 py-3 px-1" />

                <TouchableOpacity className="px-4 py-3" onPress={() => setShowPassword(!showPassword)} >
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} />
                </TouchableOpacity>
              </View>
              <View>
                <Text className="text-right text-base  text-black"> Forgot Password? </Text>
                {/* onPress={() => router.push("/forgot-password")} ---- For future*/}
              </View>
            </View>

            {/* Button section */}
            <View className=" py-5">
              <Pressable className="bg-black rounded-xl py-4 px-4 mt-5" onPress={() => router.push("./tabs/Home")} >
                <Text className="text-center text-lg font-bold text-white">
                  Sign In
                </Text>
              </Pressable>
            </View>
            <Text className="text-center text-base text-gray-600">
              Don’t have any account?
            <Text className="text-black font-bold" onPress={() => router.push("/signup")} > Sign Up </Text>
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;



                
