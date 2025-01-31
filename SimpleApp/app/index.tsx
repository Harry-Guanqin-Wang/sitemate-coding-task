import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";

import useFetch from "../hooks/useFetch";
import { searchNews } from "../api/searchService";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetchNews = useCallback(() => {
    if (shouldFetch) {
      return searchNews({ query: searchQuery });
    }
    return Promise.resolve(null);
  }, [searchQuery, shouldFetch]);

  const { data, loading, error } = useFetch(fetchNews);
  console.log(data, loading, error);

  const handleSearch = () => {
    setShouldFetch(true);
  };

  const renderNewsItem = ({ item }) => (
    <View className="p-4 border-b border-gray-200">
      <Text className="text-lg font-bold mb-2">{item.title}</Text>
      <Text className="text-sm text-gray-600 mb-2">{item.description}</Text>
      <View className="flex-row justify-between">
        <Text className="text-xs text-gray-500">{item.source.name}</Text>
        <Text className="text-xs text-gray-500">
          {new Date(item.publishedAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 h-full bg-white">
      {/* Searching Area */}
      <View className="p-4">
        <View className="flex-row">
          {/* Text Input box for search query */}
          <TextInput
            className="flex-1 h-10 px-4 border border-gray-300 rounded-lg"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Type in keyword to search news..."
          />

          {/* Search Button */}
          <TouchableOpacity
            className="bg-blue-500 px-4 rounded-lg justify-center"
            onPress={handleSearch}
          >
            <Text className="text-white">Search</Text>
          </TouchableOpacity>
        </View>

        {/* Display Area */}
        <View className="h-full items-center justify-center">
          {loading ? (
            <View className="justify-center items-center">
              <ActivityIndicator size="large" color="blue" />
            </View>
          ) : error ? (
            <View className="justify-center items-center">
              <Text className="text-red-500">Error: {error.message}</Text>
              <Text className="text-red-500">Please Retry</Text>
            </View>
          ) : data?.articles ? (
            <FlatList
              data={data.articles}
              renderItem={renderNewsItem}
              keyExtractor={(item) => item.url} // use url as the unique key
            />
          ) : (
            // Display the initial text without news
            <View className="justify-center items-center">
              <Text>Please search for news articles</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
