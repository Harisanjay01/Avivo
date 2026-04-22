import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { RepeatIcon, AddIcon } from '@chakra-ui/icons';
import { FiUsers } from 'react-icons/fi';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';

// Backend API base URL
const API_BASE = 'http://localhost:5001';

// Static user template for "Add" button
let staticUserCounter = 1000;
const createStaticUser = () => {
  staticUserCounter++;
  return {
    id: staticUserCounter,
    firstName: 'New',
    lastName:  `User #${staticUserCounter - 1000}`,
    email:     `newuser${staticUserCounter}@avivo.local`,
    image:     '',
    company:   'Avivo Corp',
    role:      'New Member',
    country:   'United States',
    age:       25,
    gender:    'N/A',
    phone:     '+1 000-000-0000',
    username:  `newuser${staticUserCounter}`,
  };
};

const App = () => {
  const [users, setUsers]       = useState([]);    // full list from API
  const [search, setSearch]     = useState('');    // search query
  const [loading, setLoading]   = useState(false); // loading state
  const [error, setError]       = useState(null);  // error message
  const toast = useToast();

  // Fetch users from the backend API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/users`);
      setUsers(res.data);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Failed to fetch users.';
      setError(msg);
      toast({
        title: 'Error fetching users',
        description: msg,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Add a static user to local state only (not persisted)
  const handleAdd = () => {
    const newUser = createStaticUser();
    setUsers((prev) => [newUser, ...prev]);
    toast({
      title: 'User added (local only)',
      description: `${newUser.firstName} ${newUser.lastName} added to the list.`,
      status: 'success',
      duration: 2500,
      isClosable: true,
      position: 'top-right',
    });
  };

  // Remove a user from local UI state only (not from DB)
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast({
      title: 'User removed',
      description: 'Removed from the current view. Refresh to restore.',
      status: 'info',
      duration: 2500,
      isClosable: true,
      position: 'top-right',
    });
  };

  // Client-side search filter across all visible fields
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
      (u.company  || '').toLowerCase().includes(q) ||
      (u.role     || '').toLowerCase().includes(q) ||
      (u.country  || '').toLowerCase().includes(q) ||
      (u.email    || '').toLowerCase().includes(q) ||
      (u.username || '').toLowerCase().includes(q)
    );
  });

  return (
    <Box minH="100vh" bg="#0d0d1a" px={{ base: 4, md: 8, lg: 12 }} py={8}>

      {/* ── Header ── */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        mb={8}
        gap={4}
      >
        <VStack align="flex-start" spacing={1}>
          <HStack spacing={3}>
            <Box
              w={10} h={10}
              bg="linear-gradient(135deg, #8019ff, #4400cc)"
              borderRadius="xl"
              display="flex" alignItems="center" justifyContent="center"
              fontSize="lg"
            >
              <FiUsers color="white" />
            </Box>
            <Heading size="lg" bgGradient="linear(to-r, brand.300, brand.500)" bgClip="text">
              User Directory
            </Heading>
          </HStack>
          <Text fontSize="sm" color="whiteAlpha.500">
            Powered by DummyJSON · MySQL · Prisma
          </Text>
        </VStack>

        {/* Stats */}
        <HStack spacing={6}>
          <Stat textAlign="center">
            <StatLabel fontSize="xs" color="whiteAlpha.500">Total</StatLabel>
            <StatNumber fontSize="2xl" color="brand.300">{users.length}</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel fontSize="xs" color="whiteAlpha.500">Showing</StatLabel>
            <StatNumber fontSize="2xl" color="white">{filteredUsers.length}</StatNumber>
          </Stat>
        </HStack>
      </Flex>

      {/* ── Toolbar ── */}
      <Flex
        gap={3}
        mb={6}
        wrap="wrap"
        align="center"
        bg="rgba(255,255,255,0.03)"
        p={4}
        borderRadius="2xl"
        border="1px solid rgba(255,255,255,0.06)"
      >
        <SearchBar value={search} onChange={setSearch} />

        <HStack spacing={2} ml="auto">
          {/* Add static user */}
          <Button
            id="add-user-btn"
            leftIcon={<AddIcon />}
            onClick={handleAdd}
            size="md"
            bg="rgba(128,25,255,0.15)"
            color="brand.300"
            border="1px solid rgba(128,25,255,0.3)"
            borderRadius="xl"
            _hover={{ bg: 'rgba(128,25,255,0.3)', borderColor: 'brand.400' }}
            transition="all 0.2s"
          >
            Add User
          </Button>

          {/* Refresh */}
          <Button
            id="refresh-btn"
            leftIcon={<RepeatIcon />}
            onClick={fetchUsers}
            isLoading={loading}
            loadingText="Refreshing"
            size="md"
            bg="rgba(255,255,255,0.06)"
            color="whiteAlpha.800"
            border="1px solid rgba(255,255,255,0.1)"
            borderRadius="xl"
            _hover={{ bg: 'rgba(255,255,255,0.12)', borderColor: 'whiteAlpha.400' }}
            transition="all 0.2s"
          >
            Refresh
          </Button>
        </HStack>
      </Flex>

      {/* ── Error State ── */}
      {error && (
        <Alert status="error" borderRadius="xl" mb={6} bg="rgba(229,62,62,0.15)" border="1px solid rgba(229,62,62,0.3)">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* ── Loading State ── */}
      {loading && (
        <Flex justify="center" align="center" py={20} direction="column" gap={4}>
          <Spinner size="xl" color="brand.400" thickness="3px" speed="0.65s" />
          <Text color="whiteAlpha.500" fontSize="sm">Loading users…</Text>
        </Flex>
      )}

      {/* ── Table ── */}
      {!loading && (
        <UserTable users={filteredUsers} onDelete={handleDelete} />
      )}

      {/* ── Footer ── */}
      <Divider borderColor="whiteAlpha.100" mt={10} mb={4} />
      <Text textAlign="center" fontSize="xs" color="whiteAlpha.300">
        Data sourced from{' '}
        <Box as="a" href="https://dummyjson.com/users" target="_blank" color="brand.400" _hover={{ textDecoration: 'underline' }}>
          dummyjson.com
        </Box>
        {' '}· Built with React + Chakra UI + Express + Prisma + MySQL
      </Text>
    </Box>
  );
};

export default App;
