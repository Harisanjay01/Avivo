import React from 'react';
import { Box, Avatar, Text, VStack, Badge } from '@chakra-ui/react';

const UserCard = ({ user }) => (
  <Box p={4} bg="whiteAlpha.100" borderRadius="lg" textAlign="center">
    <Avatar src={user.image} size="xl" mb={4} />
    <VStack spacing={1}>
      <Text fontWeight="bold">{user.firstName} {user.lastName}</Text>
      <Badge colorScheme="purple">{user.role}</Badge>
      <Text fontSize="sm" opacity={0.6}>{user.company}</Text>
    </VStack>
  </Box>
);

export default UserCard;
