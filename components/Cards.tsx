import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { Models } from 'react-native-appwrite'

interface Props {
  item: Models.Document
  onPress?: () => void
}

export const FeaturedCards = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={{ uri: image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-2 right-2">
        <Image source={icons.star} className="size-4" />
        <Text className="text-sm font-rubik-bold text-primary-300 ml-1">
          {rating}
        </Text>
      </View>

      <View className="items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-base font-rubik text-white">{address}</Text>

        <View className="flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${price}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const Card = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-2 py-2 rounded-lg bg-white shadow-lg shadow-blue-100/70 relative"
    >
      <View className="flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-4" />
        <Text className="text-sm font-rubik-bold text-primary-300 ml-1">
          {rating}
        </Text>
      </View>

      <Image source={{ uri: image }} className="w-full h-40 rounded-lg" />

      <View className="items-start mt-2">
        <Text
          className="text-base font-rubik-extrabold text-black-300"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-xs font-rubik text-black-200">{address}</Text>

        <View className="w-full flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            ${price}
          </Text>
          <Image
            source={icons.heart}
            className="size-5 mr-2"
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}
