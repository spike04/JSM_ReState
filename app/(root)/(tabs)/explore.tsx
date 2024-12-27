import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '@/lib/useAppwrite'
import { getProperties } from '@/lib/appwrite'
import { Card } from '@/components/Cards'
import NoResults from '@/components/NoResults'
import Search from '@/components/Search'
import Filters from '@/components/Filters'
import icons from '@/constants/icons'

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>()

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      query: params.query!,
      filter: params.filter!,
      limit: 20,
    },
    skip: true,
  })

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    })
  }, [params.filter, params.query])

  const handleCardPress = (id: string) => router.push(`/properties/${id}`)

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        keyExtractor={(item) => item.$id}
        data={properties}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator className="text-primary-300 mt-5" size="large" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                onPress={() => router.back()}
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for Your Ideal Home
              </Text>

              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />

            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default Explore
