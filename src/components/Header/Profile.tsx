import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex
            align="center"
        >
            {showProfileData && (
                <Box mr="4" textAlign="right" >
                    <Text>Matheus Kafuri</Text>
                    <Text fontSize="sm" color="gray.300">
                        kafurimatheus@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar size="md" name="Matheus Kafuri" src="https://github.com/matheuskafuri.png" />
        </Flex>
    )
}