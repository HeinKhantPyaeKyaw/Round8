import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";

function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Routes>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</Box>
	);
}

export default App;
