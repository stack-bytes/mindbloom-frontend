import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSessionStore } from "~/lib/useSession";
import {
  fetchUserInfo,
  addUserInterests,
  deleteUserInterest,
} from "~/actions/user";
import { useNavigation } from "@react-navigation/native";

export default function EditCategoriesScreen() {
  const { user } = useSessionStore();

  const navigation = useNavigation();

  const [userInterests, setUserInterests] = React.useState(user.interests);

  const defaultInterests: Array<string> = user.interests;

  const [newInterest, setNewInterest] = React.useState("");

  const [anotherInterests, setAnotherInterests] =
    React.useState(Array<string>());

  const [deletedInterests, setDeletedInterests] =
    React.useState(Array<string>());

  React.useEffect(() => {
    (async () => {
      const data = await fetchUserInfo(user.userId);

      if (data === null) {
        return;
      }

      const interests = data.interests;
      setUserInterests(interests);
      console.log(typeof data);
    })();
  }, []);

  const addInterest = () => {
    if (newInterest.trim() === "") {
      Alert.alert("Invalid Input", "Please enter a valid interest.");
      return;
    }

    // Update the main userInterests state
    setUserInterests((prevInterests) => [...prevInterests, newInterest.trim()]);

    // Update the anotherInterests state using a functional update
    setAnotherInterests((prevInterests) => [
      ...prevInterests,
      newInterest.trim(),
    ]);

    setNewInterest("");
  };

  const removeInterest = (interest: any) => {
    setUserInterests((prevInterests) =>
      prevInterests.filter((item) => item !== interest)
    );
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-6">
      <Text className="mb-0 text-3xl font-semibold text-gray-800">
        Edit your interests list!
      </Text>
      <Text className="mb-20 items-center text-xl font-normal text-gray-500">
        Add new interests or remove old ones
      </Text>

      {/* Text Input Container */}
      <View className="mb-6 w-full max-w-md rounded-lg border border-gray-300 bg-white p-4 shadow-md">
        <TextInput
          placeholder="Add a new interest"
          value={newInterest}
          onChangeText={setNewInterest}
          className="mb-4 h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-700"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          onPress={addInterest}
          style={{
            backgroundColor: "#4CAF50",
            paddingVertical: 10,
            borderRadius: 25,
            alignItems: "center",
          }}
        >
          <Text className="text-sm font-medium text-white">Add Interest</Text>
        </TouchableOpacity>
      </View>

      {/* Interests List */}
      <View className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-4 shadow-md">
        {userInterests.length > 0 ? (
          <FlatList
            data={userInterests}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="flex-1 text-base text-gray-800">{item}</Text>
                <TouchableOpacity
                  onPress={() => removeInterest(item)}
                  className="rounded-full"
                  style={{
                    backgroundColor: "#FF6347", // Tomato color for the remove button
                    justifyContent: "center",
                    alignItems: "center",
                    width: 30,
                    height: 30,
                  }}
                >
                  <Text className="text-lg font-bold text-white">X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text className="text-center text-base text-gray-500">
            No interests found.
          </Text>
        )}
      </View>

      {/* Exit Button */}
      <TouchableOpacity
        onPress={() => {
          if (anotherInterests.length > 0) {
            (async () => {
              const data = await addUserInterests(
                user.userId,
                anotherInterests
              );

              if (data === null) {
                Alert.alert("Error", "Failed to update user interests.");
                return;
              }
            })();
          }
          console.log(defaultInterests);
          console.log(userInterests);

          const deletedInterests = defaultInterests.filter(
            (item) => !userInterests.includes(item)
          );
          console.log("Deleted Interests:", deletedInterests);

          for (let i = 0; i < deletedInterests.length; i++) {
            (async () => {
              const data = await deleteUserInterest(
                user.userId,
                deletedInterests[i]
              );

              if (data === null) {
                Alert.alert("Error", "Failed to update user interests.");
                return;
              }
            })();
          }
          navigation.goBack();
        }}
        style={{
          backgroundColor: "#F44336", // Red color for the exit button
          paddingVertical: 12,
          borderRadius: 25,
          width: "80%",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text className="text-sm font-medium text-white">Exit</Text>
      </TouchableOpacity>
    </View>
  );
}
