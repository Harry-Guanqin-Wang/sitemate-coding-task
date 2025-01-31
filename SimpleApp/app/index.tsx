import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";

import useFetch from "../hooks/useFetch";
import { searchNews } from "../api/searchService";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("tech");
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetchNews = useCallback(() => {
    if (shouldFetch) {
      return searchNews({ query: searchQuery });
    }
    return Promise.resolve(null);
  }, [searchQuery, shouldFetch]);

  const { data, loading, error } = useFetch(fetchNews);

  const handleSearch = () => {
    setShouldFetch(true);
  };

  console.log(data);
  // if (loading) {
  //   return <ActivityIndicator size={"large"} />;
  // }

  return (
    <SafeAreaView className="flex-1 h-full bg-white">
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
      </View>
    </SafeAreaView>
  );
}
