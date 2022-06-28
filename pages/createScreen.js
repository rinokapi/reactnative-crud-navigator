import { React, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
	Modal,
	Pressable,
	ActivityIndicator,
} from "react-native";

// Nav
export default function CreateScreen({ navigation }) {
	// useState
	const [isLoading, setLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	// useState

	// Request
	const postRequest = async () => {
		setLoading(true);
		const randomUserId = Math.floor(Math.random() * (3999 - 11 + 1) + 11);
		try {
			const response = await fetch("https://gorest.co.in/public/v2/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer " +
						"61e9de0b8cb50890b6e546f85c622947880f8bba1649e1457050850fc595bb7c",
				},
				body: JSON.stringify({
					user_id: randomUserId,
					title: title,
					body: body,
				}),
			});

			// Res status
			if (response.status == 201) {
				setModalMessage(`Post created with random user_id: ${randomUserId}`);
			} else {
				setModalMessage("Unknown error");
			}
			// Res status
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			setModalVisible(true);
		}
	};
	// Request

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				multiline
				onChangeText={setTitle}
				value={title}
				maxLength={200}
				placeholder="Enter post title"
			/>
			<TextInput
				style={styles.input}
				multiline
				onChangeText={setBody}
				value={body}
				placeholder="Enter post body"
			/>
			<TouchableOpacity style={styles.postButton} onPress={postRequest}>
				<Image
					source={require("../img/paper-plane.png")}
					style={{ width: 24, height: 24 }}
				/>
			</TouchableOpacity>

			{/* Loading */}
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
				<Modal animationType="fade" transparent={true} visible={modalVisible}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>{modalMessage}</Text>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() => navigation.navigate("Home")}
							>
								<Text style={styles.textStyle}>Back to home</Text>
							</Pressable>
						</View>
					</View>
				</Modal>
			)}
			{/* Loading */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		marginHorizontal: 24,
		flex: 1,
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
	},
	input: {
		// Text input
		borderRadius: 10,
		borderBottomWidth: 3,
		borderRightWidth: 3,
		borderTopWidth: 0.5,
		borderLeftWidth: 0.5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
		fontSize: 14,
		lineHeight: 24,
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
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		//Modal
		margin: 20,
		backgroundColor: "#F2F2F2",
		borderRadius: 10,
		paddingHorizontal: 35,
		paddingVertical: 20,
		alignItems: "center",
		borderBottomWidth: 3,
		borderRightWidth: 3,
		borderTopWidth: 0.5,
		borderLeftWidth: 0.5,
	},
	button: {
		borderRadius: 10,
		padding: 10,
	},
	buttonClose: {
		backgroundColor: "#50C27A",
		borderBottomWidth: 3,
		borderRightWidth: 3,
		borderTopWidth: 0.5,
		borderLeftWidth: 0.5,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		fontWeight: "bold",
		marginBottom: 14,
		textAlign: "center",
	},
});
