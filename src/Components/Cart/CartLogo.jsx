import { Flex, Image, Text, Container } from "@chakra-ui/react";
import React from "react";
import logo from "../../Utils/logo.png";

const CartLogo = () => {
  return (
    <Container mt={0} maxW="full" p={0}>
      <Flex
        pt={5}
        pb={5}
        bg={"gray.50"}
        m="auto"
        justifyContent={"center"}
        gap={4}
      >
        <Image src={logo} alt="cartlogo" w={[50, 80, 100]} />
        <Text py={2}>
          Limited-time deals to expand your vision with instant discount on
          UPI/netbanking & no cost EMI*{" "}
        </Text>
      </Flex>
    </Container>
  );
};

export default CartLogo;
