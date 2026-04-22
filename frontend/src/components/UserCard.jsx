import React from 'react';
import {
  Box,
  Avatar,
  Badge,
  Text,
  IconButton,
  Tooltip,
  HStack,
  VStack,
  Divider,
  Tag,
  Flex,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { FiMapPin, FiBriefcase } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

/**
 * UserCard — displays a single user in a glassmorphism card
 * @param {object}   user     - user data object
 * @param {Function} onDelete - callback to remove user from UI state
 */
const UserCard = ({ user, onDelete }) => {
  const roleColor = user.role?.toLowerCase().includes('manager') ||
    user.role?.toLowerCase().includes('chief') ||
    user.role?.toLowerCase().includes('director')
    ? 'purple'
    : user.role?.toLowerCase().includes('engineer') ||
      user.role?.toLowerCase().includes('developer')
    ? 'cyan'
    : 'gray';

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      bg="rgba(255,255,255,0.04)"
      backdropFilter="blur(12px)"
      border="1px solid rgba(255,255,255,0.08)"
      borderRadius="2xl"
      p={5}
      position="relative"
      _hover={{
        border: '1px solid rgba(128,25,255,0.4)',
        boxShadow: '0 8px 30px rgba(102,0,230,0.2)',
        transform: 'translateY(-3px)',
      }}
      transition="all 0.25s ease"
      role="group"
    >
      {/* Delete button */}
      <Tooltip label="Remove from list" placement="top" hasArrow>
        <IconButton
          id={`delete-user-${user.id}`}
          icon={<DeleteIcon />}
          size="xs"
          aria-label="Delete user"
          colorScheme="red"
          variant="ghost"
          position="absolute"
          top={3}
          right={3}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.2s"
          onClick={() => onDelete(user.id)}
        />
      </Tooltip>

      <HStack spacing={4} align="flex-start">
        {/* Avatar */}
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          src={user.image}
          size="md"
          border="2px solid"
          borderColor="brand.500"
        />

        {/* Info */}
        <VStack align="flex-start" spacing={1} flex={1} overflow="hidden">
          <Text fontWeight="700" fontSize="md" noOfLines={1}>
            {user.firstName} {user.lastName}
          </Text>
          <Badge colorScheme={roleColor} borderRadius="full" px={2} fontSize="xs">
            {user.role || 'N/A'}
          </Badge>

          <Divider borderColor="whiteAlpha.100" my={1} />

          <HStack spacing={2} color="whiteAlpha.600" fontSize="xs">
            <FiBriefcase size={11} />
            <Text noOfLines={1}>{user.company || '—'}</Text>
          </HStack>

          <HStack spacing={2} color="whiteAlpha.600" fontSize="xs">
            <FiMapPin size={11} />
            <Text noOfLines={1}>{user.country || '—'}</Text>
          </HStack>

          {user.email && (
            <Text fontSize="xs" color="brand.300" noOfLines={1}>
              {user.email}
            </Text>
          )}
        </VStack>
      </HStack>
    </MotionBox>
  );
};

export default UserCard;
