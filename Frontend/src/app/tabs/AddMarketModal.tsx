
import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useTheme } from '../../../context/ThemeContext';

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

const formatDate = (date: Date): string => {
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

  // Reject invalid calendar dates
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  // Reject future dates
  const today = new Date();
  today.setHours(23, 59, 59, 999);

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

  const { isDark } = useTheme();

  const selectedMember = members.find(
    (member) => String(member.id) === String(selectedMemberId)
  );

  const parsedAmount = Number(amount);
  const validDate = parseDate(joinDate);

  const isValid =
    selectedMemberId !== null &&
    !!selectedMember &&
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
    if (isVisible) {
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

    const chosenDate = new Date(date);
    chosenDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (chosenDate > today) return;

    setSelectedDate(chosenDate);
    setJoinDate(formatDate(chosenDate));
  };

  const handleManualDateChange = (value: string) => {
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

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');

    const formatted =
      parts.length > 2
        ? `${parts[0]}.${parts.slice(1).join('')}`
        : cleaned;

    setAmount(formatted);
  };

  const handleAdd = () => {
    if (
      !isValid ||
      selectedMemberId === null ||
      !validDate
    ) {
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

  // Theme colors
  const colors = {
    modal: isDark ? '#18181B' : '#FFFFFF',
    input: isDark ? '#27272A' : '#FFFFFF',
    border: isDark ? '#3F3F46' : '#D4D4D8',
    divider: isDark ? '#3F3F46' : '#F4F4F5',
    text: isDark ? '#FAFAFA' : '#18181B',
    secondary: isDark ? '#D4D4D8' : '#18181B',
    placeholder: '#A1A1AA',
    icon: isDark ? '#D4D4D8' : '#52525B',
    handle: isDark ? '#52525B' : '#D4D4D8',
    cancelBorder: isDark ? '#52525B' : '#D4D4D8',
  };

  const inputClass = cn(
    'flex-1 text-sm',
    isDark ? 'text-[#D4D4D8]' : 'text-[#18181B]'
  );

  const fieldClass = cn(
    'flex-row items-center rounded-lg border px-3',
    isDark
      ? 'border-[#3F3F46] bg-[#27272A]'
      : 'border-[#D4D4D8] bg-white'
  );

  const labelClass = cn(
    'mb-2 text-sm font-medium',
    isDark ? 'text-[#D4D4D8]' : 'text-[#18181B]'
  );

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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
          className={cn(
            'max-h-[90%] rounded-t-3xl px-5 pb-8 pt-3',
            isDark ? 'bg-[#18181B]' : 'bg-white'
          )}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Modal Handle */}
            <View
              className={cn(
                'mb-5 h-1 w-9 self-center rounded-full',
                isDark ? 'bg-[#A1A1AA]' : 'bg-[#71717A]'
              )}
            />

            {/* Modal Title */}
            <Text
              className={cn(
                'mb-6 text-center text-lg font-semibold',
                isDark ? 'text-white' : 'text-[#18181B]'
              )}
            >
              Add Market
            </Text>

            {/* Date */}
            <View className="mb-5">
              <Text className={labelClass}>Date</Text>

              <View
                className={cn(fieldClass, 'py-5')}
              >
                <TextInput
                  className={cn(inputClass, 'ml-1 py-1')}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={colors.placeholder}
                  value={joinDate}
                  onChangeText={handleManualDateChange}
                  keyboardType="number-pad"
                  maxLength={10}
                  onFocus={() => setShowDatePicker(false)}
                />

                <Pressable
                  onPress={() => {
                    setShowDropdown(false);
                    setShowDatePicker((previous) => !previous);
                  }}
                  hitSlop={8}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={22}
                    color={colors.icon}
                  />
                </Pressable>
              </View>

              {/* Date Picker */}
              {showDatePicker && (
                <View
                  className={cn(
                    'mt-2 overflow-hidden rounded-xl border',
                    isDark
                      ? 'border-[#3F3F46] bg-[#27272A]'
                      : 'border-zinc-200 bg-white'
                  )}
                >
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={
                      Platform.OS === 'ios' ? 'spinner' : 'default'
                    }
                    maximumDate={new Date()}
                    onChange={handleDateChange}
                    themeVariant={isDark ? 'dark' : 'light'}
                  />

                  {Platform.OS === 'ios' && (
                    <Pressable
                      className={cn(
                        'items-center border-t py-3',
                        isDark
                          ? 'border-[#3F3F46]'
                          : 'border-zinc-200'
                      )}
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text
                        className={cn(
                          'font-semibold',
                          isDark ? 'text-white' : 'text-zinc-900'
                        )}
                      >
                        Done
                      </Text>
                    </Pressable>
                  )}
                </View>
              )}

              {!!joinDate && !validDate && (
                <Text className="mt-1 text-xs text-red-500">
                  Enter a valid date in DD/MM/YYYY format.
                  Future dates are not allowed.
                </Text>
              )}
            </View>

            {/* Member Name */}
            <View className="mb-5">
              <Text className={labelClass}>Member Name</Text>

              <Pressable
                className={cn(fieldClass, 'justify-between py-5')}
                onPress={() => {
                  setShowDatePicker(false);
                  setShowDropdown((previous) => !previous);
                }}
              >
                <Text
                  className={cn(
                    'text-sm',
                    selectedMember
                      ? isDark
                        ? 'text-[#D4D4D8]'
                        : 'text-[#18181B]'
                      : isDark
                        ? 'text-[#A1A1AA]'
                        : 'text-[#71717A]'
                  )}
                >
                  {selectedMember?.name ?? 'Select Member'}
                </Text>

                <Ionicons
                  name={showDropdown ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.icon}
                />
              </Pressable>

              {/* Member Dropdown */}
              {showDropdown && (
                <View
                  className={cn(
                    'mt-1 overflow-hidden rounded-lg border',
                    isDark
                      ? 'border-[#3F3F46] bg-[#27272A]'
                      : 'border-[#E4E4E7] bg-white'
                  )}
                >
                  {members.length > 0 ? (
                    members.map((member) => (
                      <Pressable
                        key={member.id}
                        className={cn(
                          'flex-row items-center justify-between border-b px-3 py-3.5',
                          isDark
                            ? 'border-[#3F3F46]'
                            : 'border-[#F4F4F5]'
                        )}
                        onPress={() => selectMember(member.id)}
                      >
                        <Text
                          className={cn(
                            'flex-1 text-sm',
                            isDark
                              ? 'text-[#D4D4D8]'
                              : 'text-[#18181B]'
                          )}
                        >
                          {member.name}
                        </Text>

                        {selectedMemberId === member.id && (
                          <Ionicons
                            name="checkmark"
                            size={20}
                            color={colors.icon}
                          />
                        )}
                      </Pressable>
                    ))
                  ) : (
                    <Text
                      className={cn(
                        'px-3 py-4 text-sm',
                        isDark
                          ? 'text-[#D4D4D8]'
                          : 'text-[#18181B]'
                      )}
                    >
                      No members available
                    </Text>
                  )}
                </View>
              )}
            </View>

            {/* Product */}
            <View className="mb-5">
              <Text className={labelClass}>
                What They Bought
              </Text>

              <View className={cn(fieldClass, 'py-5')}>
                <TextInput
                  className={cn(inputClass, 'p-0')}
                  placeholder="e.g. Rice, Fish, Vegetables"
                  placeholderTextColor={colors.placeholder}
                  value={product}
                  onChangeText={setProduct}
                  autoCapitalize="sentences"
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Amount */}
            <View className="mb-6">
              <Text className={labelClass}>Amount</Text>

              <View className={cn(fieldClass, 'py-5')}>
                <TextInput
                  className={cn(inputClass, 'p-0')}
                  placeholder="Enter amount"
                  placeholderTextColor={colors.placeholder}
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />

                <Text
                  className={cn(
                    'mr-2 text-base font-medium',
                    isDark ? 'text-[#D4D4D8]' : 'text-[#18181B]'
                  )}
                >
                  ৳
                </Text>
              </View>
            </View>

            {/* Add Market */}
            <Pressable
              className={cn(
                'items-center rounded-lg py-5',
                isDark
                  ? isValid
                    ? 'bg-white'
                    : 'bg-white/50'
                  : isValid
                    ? 'bg-black'
                    : 'bg-black/40'
              )}
              disabled={!isValid}
              onPress={handleAdd}
            >
              <Text
                className={cn( 'text-sm font-semibold', isDark ? 'text-[#18181B]' : 'text-white' )} > Add Market
              </Text>
            </Pressable>

            {/* Cancel */}
            <Pressable
              className={cn(
                'mt-3 items-center rounded-lg border py-5',
                isDark ? 'border-white' : 'border-[#18181B]'
              )}
              onPress={handleCancel}
            >
              <Text
                className={cn(
                  'text-sm font-medium',
                  isDark ? 'text-[#FAFAFA]' : 'text-[#18181B]'
                )}
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

export default AddMarketModal;
