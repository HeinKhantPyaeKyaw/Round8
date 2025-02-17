import { Container, SimpleGrid, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Image, Badge } from "@chakra-ui/react";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setProducts(data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const [version, setVersion] = useState("A");
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setPopupVisible(true), 5000);
    }, []);

    return (
        <Box minH="100vh" bgGradient="linear(to-r, gray.100, white)" color="gray.900">
            <Flex as="header" p={4} justify="space-between" align="center" bg="white" boxShadow="lg" wrap="wrap">
                <Heading size="lg" color="teal.600">ROUND8</Heading>
                <Button onClick={() => setVersion(version === "A" ? "B" : "A")} colorScheme={version === "A" ? "blue" : "green"} variant="outline">
                    Switch to Version {version === "A" ? "B" : "A"}
                </Button>
            </Flex>

            <Box textAlign="center" p={10} bg={version === "A" ? "blue.300" : "green.300"} borderRadius="md" boxShadow="xl">
                <Heading size={{ base: "lg", md: "xl" }} fontWeight="bold" color="white">
                    {version === "A" ? "Join Now and Receive 50% Discount Code!" : "Experience High Quality at Affordable Prices"}
                </Heading>
                <Button mt={4} px={6} py={2} size={{ base: "md", md: "lg" }} colorScheme="whiteAlpha" variant="solid">
                    {version === "A" ? "Get Your Discount" : "Shop Sustainably"}
                </Button>
            </Box>

            <Container maxW="container.xl" p={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                    {products.map((product) => (
                        <Box key={product._id} bg="white" p={5} borderRadius="lg" boxShadow="xl" cursor="pointer" _hover={{ transform: "scale(1.05)", transition: "0.3s" }} onClick={() => { setSelectedProduct(product); onOpen(); }}>
                            <Image src={product.image} alt={product.name} borderRadius="lg" objectFit="cover" boxSize="250px" mx="auto" />
                            <Heading size="md" mt={4} color="teal.700">{product.name}</Heading>
                            <Badge colorScheme="green" mt={2} fontSize="0.9em">฿{product.price}</Badge>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>

            {selectedProduct && (
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedProduct.name}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image src={selectedProduct.image} alt={selectedProduct.name} borderRadius="md" boxSize="full" mb={4} />
                            <Text><b>Category:</b> {selectedProduct.category}</Text>
                            <Text><b>Price:</b> ฿{selectedProduct.price}</Text>
                            <Text><b>Availability:</b> {selectedProduct.availableStatus}</Text>
                            <Text><b>Seller:</b> {selectedProduct.sellerName}</Text>
                            <Text><b>Description:</b> {selectedProduct.description}</Text>
                            <Text><b>Review:</b> {selectedProduct.review}</Text>
                            <Text><b>Additional Information:</b> {selectedProduct.additionalInformation}</Text>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}

            {popupVisible && (
                <Box position="fixed" bottom={5} right={5} bg="white" p={4} boxShadow="xl" borderRadius="md" w={{ base: "80%", md: "auto" }}>
                    <Text fontSize="sm">Sign up now for exclusive deals!</Text>
                    <Button onClick={() => setPopupVisible(false)} colorScheme="red" ml={4}>
                        Close
                    </Button>
                </Box>
            )}

            <Box as="footer" p={4} textAlign="center" bg="gray.900" color="white" mt={10} boxShadow="md">
                ROUND8 | Sustainability Matters
            </Box>
        </Box>
    );
};

export default HomePage;