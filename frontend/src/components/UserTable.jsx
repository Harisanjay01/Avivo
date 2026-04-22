import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  HStack,
  Text,
  Badge,
  IconButton,
  Tooltip,
  Box,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { FiMapPin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MotionTr = motion(Tr);

/**
 * getRoleColor — returns a badge color based on job title keywords
 */
const getRoleColor = (role = '') => {
  const r = role.toLowerCase();
  if (r.includes('chief') || r.includes('manager') || r.includes('director')) return 'purple';
  if (r.includes('engineer') || r.includes('developer') || r.includes('architect')) return 'cyan';
  if (r.includes('analyst') || r.includes('specialist')) return 'teal';
  if (r.includes('admin')) return 'orange';
  return 'gray';
};

/**
 * UserTable — renders the list of users in a styled, animated table
 * @param {Array}    users    - array of user objects to display
 * @param {Function} onDelete - callback(id) to remove a user from UI state
 */
const UserTable = ({ users, onDelete }) => {
  if (users.length === 0) {
    return (
      <VStack py={20} spacing={3} color="whiteAlpha.400">
        <Text fontSize="4xl">🔍</Text>
        <Text fontSize="lg" fontWeight="600">No users found</Text>
        <Text fontSize="sm">Try adjusting your search or add a new user.</Text>
      </VStack>
    );
  }

  return (
    <TableContainer
      bg="rgba(255,255,255,0.03)"
      borderRadius="2xl"
      border="1px solid rgba(255,255,255,0.06)"
      overflowX="auto"
    >
      <Table variant="unstyled" size="md">
        <Thead>
          <Tr>
            {['#', 'User', 'Company', 'Role', 'Country', 'Actions'].map((h) => (
              <Th
                key={h}
                color="whiteAlpha.500"
                fontSize="xs"
                textTransform="uppercase"
                letterSpacing="wider"
                borderBottom="1px solid rgba(255,255,255,0.07)"
                py={4}
                px={6}
              >
                {h}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <AnimatePresence>
            {users.map((user, idx) => (
              <MotionTr
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.98 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                _hover={{ bg: 'rgba(255,255,255,0.04)' }}
                role="group"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              >
                {/* # */}
                <Td px={6} py={4} color="whiteAlpha.300" fontSize="xs" width="50px">
                  {idx + 1}
                </Td>

                {/* User — avatar + name + email */}
                <Td px={6} py={4} minW="200px">
                  <HStack spacing={3}>
                    <Avatar
                      name={`${user.firstName} ${user.lastName}`}
                      src={user.image}
                      size="sm"
                      border="2px solid"
                      borderColor="brand.600"
                      flexShrink={0}
                    />
                    <Box>
                      <Text fontWeight="600" fontSize="sm" lineHeight="1.3">
                        {user.firstName} {user.lastName}
                      </Text>
                      {user.email && (
                        <Text fontSize="xs" color="whiteAlpha.400" noOfLines={1}>
                          {user.email}
                        </Text>
                      )}
                    </Box>
                  </HStack>
                </Td>

                {/* Company */}
                <Td px={6} py={4} minW="160px">
                  <Text fontSize="sm" color="whiteAlpha.800" noOfLines={1}>
                    {user.company || '—'}
                  </Text>
                </Td>

                {/* Role */}
                <Td px={6} py={4} minW="160px">
                  <Badge
                    colorScheme={getRoleColor(user.role)}
                    borderRadius="full"
                    px={3}
                    py={0.5}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {user.role || 'N/A'}
                  </Badge>
                </Td>

                {/* Country */}
                <Td px={6} py={4} minW="140px">
                  <HStack spacing={1} color="whiteAlpha.600" fontSize="sm">
                    <FiMapPin size={12} />
                    <Text>{user.country || '—'}</Text>
                  </HStack>
                </Td>

                {/* Actions */}
                <Td px={6} py={4} width="80px">
                  <Tooltip label="Remove from list" placement="left" hasArrow>
                    <IconButton
                      id={`delete-user-${user.id}`}
                      icon={<DeleteIcon />}
                      size="sm"
                      aria-label={`Delete ${user.firstName}`}
                      colorScheme="red"
                      variant="ghost"
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.2s"
                      onClick={() => onDelete(user.id)}
                    />
                  </Tooltip>
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
