import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Navigator
import HomeScreen from "./pages/homeScreen";
import CreateScreen from "./pages/createScreen";
import DetailsScreen from "./pages/detailsScreen";
import UpdateScreen from "./pages/updateScreen";
// Navigator

const Stack = createNativeStackNavigator();

// Nested nav
function Post() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#19C279",
				},
				headerTitleStyle: {
					fontSize: 20,
					fontWeight: "bold",
				},
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen
				name="Details"
				component={DetailsScreen}
				options={{ title: "Details" }}
			/>
			<Stack.Screen
				name="Update"
				component={UpdateScreen}
				options={{ title: "Update" }}
			/>
		</Stack.Navigator>
	);
}
// Nested nav

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: "#19C279",
					},
					headerTitleStyle: {
						fontSize: 20,
						fontWeight: "bold",
					},
					animation: "slide_from_right",
				}}
			>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						title: "My Posts",
					}}
				/>
				<Stack.Screen
					name="Create"
					component={CreateScreen}
					options={{
						title: "Create New Post",
					}}
				/>
				<Stack.Screen
					name="Post"
					component={Post}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
