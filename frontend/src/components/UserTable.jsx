import React from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Avatar, HStack, Text, Badge, IconButton, Tooltip, Box
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';

const MotionTr = motion(Tr);

const UserTable = ({ users, onDelete }) => {
  if (!users.length) return <Box py={10} textAlign="center" opacity={0.5}>No users found</Box>;

  return (
    <TableContainer bg="whiteAlpha.50" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
      <Table variant="simple">
        <Thead borderBottom="2px solid" borderColor="whiteAlpha.100">
          <Tr>
            <Th color="whiteAlpha.600">User</Th>
            <Th color="whiteAlpha.600">Company</Th>
            <Th color="whiteAlpha.600">Role</Th>
            <Th color="whiteAlpha.600">Country</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <AnimatePresence>
            {users.map((u) => (
              <MotionTr
                key={u.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                _hover={{ bg: "whiteAlpha.50" }}
              >
                <Td border="none">
                  <HStack>
                    <Avatar size="sm" src={u.image} name={u.firstName} />
                    <Box>
                      <Text fontSize="sm" fontWeight="bold">{u.firstName} {u.lastName}</Text>
                      <Text fontSize="xs" opacity={0.5}>{u.email}</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td border="none" fontSize="sm">{u.company}</Td>
                <Td border="none">
                  <Badge colorScheme="purple" variant="subtle" px={2} borderRadius="md">
                    {u.role}
                  </Badge>
                </Td>
                <Td border="none" fontSize="sm">{u.country}</Td>
                <Td border="none">
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => onDelete(u.id)}
                    aria-label="Delete"
                  />
                </Td>
              </MotionTr>
            ))}
          </AnimatePresence>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
