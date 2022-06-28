import React, { useLayoutEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	ToastAndroid,
	ActivityIndicator,
} from "react-native";

// Toast
const Toast = ({ visible, message }) => {
	if (visible) {
		console.log(1);
		ToastAndroid.showWithGravityAndOffset(
			message,
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM,
			25,
			50
		);
		return null;
	}
	return null;
};
// Toast

// Nav
export default function DetailsScreen({ route, navigation }) {
	// useState
	const [isLoading, setLoading] = useState(false);
	const { id, user_id, title, body } = route.params;
	const [visibleToast, setVisibleToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	// useState

	// Request
	const deleteRequest = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://gorest.co.in/public/v2/posts/${id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"Bearer " +
							"61e9de0b8cb50890b6e546f85c622947880f8bba1649e1457050850fc595bb7c",
					},
				}
			);
			if (response.status == 204) {
				setToastMessage(`Post with id: ${id} deleted`);
			} else {
				setToastMessage("Unknown error");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			setVisibleToast(true);
			navigation.navigate("Home");
		}
	};
	// Request

	// Header Button
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={deleteRequest}>
					<Image
						source={require("../img/trash.png")}
						style={styles.trashButton}
					/>
				</TouchableOpacity>
			),
		});
	}, [navigation]);
	// Header Button

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.infoParent}>
				<Text style={styles.info}>by {user_id}</Text>
				<Text style={styles.info}>id: {id}</Text>
			</View>
			<Text style={styles.body}>{body}</Text>

			<TouchableOpacity
				style={styles.postButton}
				onPress={() => {
					navigation.navigate("Update", {
						id: id,
						user_id: user_id,
						title: title,
						body: body,
					});
				}}
			>
				<Image
					source={require("../img/pencil.png")}
					style={{ width: 24, height: 24 }}
				/>
			</TouchableOpacity>
			{isLoading ? (
				<ActivityIndicator
					size="large"
					color="#19C279"
					style={{
						position: "absolute",
						top: "42%",
						right: "45%",
					}}
				/>
			) : (
				<Toast visible={visibleToast} message={toastMessage} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		marginHorizontal: 24,
		flex: 1,
	},
	body: {
		marginTop: 10,
		fontSize: 14,
		lineHeight: 24,
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
	},

	infoParent: {
		// Info
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	info: {
		fontWeight: "200",
		fontStyle: "italic",
		fontSize: 10,
	},
	postButton: {
		// Post
		position: "absolute",
		backgroundColor: "#F2F2F2",
		width: 56,
		height: 56,
		bottom: "0.5%",
		right: "-2.6%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		borderWidth: 1,
	},
	trashButton: {
		// Delete
		width: 24,
		height: 24,
	},
});
