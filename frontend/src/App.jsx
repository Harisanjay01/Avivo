import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box, Flex, Heading, Text, Button, HStack, VStack, Spinner, 
  Alert, AlertIcon, Stat, StatLabel, StatNumber, Divider, useToast
} from '@chakra-ui/react';
import { RepeatIcon, AddIcon } from '@chakra-ui/icons';
import { FiUsers } from 'react-icons/fi';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';

const API_BASE = 'http://localhost:5001';

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/users`);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const onAddUser = () => {
    const id = Date.now();
    const newUser = {
      id,
      firstName: 'Guest',
      lastName: `User ${id.toString().slice(-3)}`,
      email: `user-${id}@example.com`,
      company: 'Self Employed',
      role: 'Contributor',
      country: 'Global'
    };
    setUsers([newUser, ...users]);
    toast({ title: 'User added locally', status: 'success', duration: 2000 });
  };

  const removeUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const filtered = users.filter(u => {
    const term = search.toLowerCase();
    return (
      u.firstName.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.role.toLowerCase().includes(term) ||
      u.country.toLowerCase().includes(term)
    );
  });

  return (
    <Box minH="100vh" bg="#0d0d1a" color="white" p={[4, 8, 12]}>
      <Flex justify="space-between" align="center" mb={10} wrap="wrap" gap={4}>
        <HStack spacing={4}>
          <Box p={3} bg="purple.600" borderRadius="xl"><FiUsers size={24} /></Box>
          <VStack align="start" spacing={0}>
            <Heading size="lg">User Directory</Heading>
            <Text fontSize="xs" opacity={0.6}>Management Dashboard</Text>
          </VStack>
        </HStack>

        <HStack spacing={8}>
          <Stat><StatLabel opacity={0.5}>Active</StatLabel><StatNumber>{users.length}</StatNumber></Stat>
          <Stat><StatLabel opacity={0.5}>Matching</StatLabel><StatNumber>{filtered.length}</StatNumber></Stat>
        </HStack>
      </Flex>

      <Flex gap={4} mb={6} bg="whiteAlpha.50" p={4} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100" wrap="wrap">
        <SearchBar value={search} onChange={setSearch} />
        <HStack spacing={3} ml="auto">
          <Button leftIcon={<AddIcon />} colorScheme="purple" variant="outline" onClick={onAddUser}>Add</Button>
          <Button leftIcon={<RepeatIcon />} onClick={loadData} isLoading={loading}>Refresh</Button>
        </HStack>
      </Flex>

      {error && <Alert status="error" mb={6} borderRadius="lg"><AlertIcon />{error}</Alert>}

      {loading ? (
        <Flex py={20} justify="center"><Spinner color="purple.500" /></Flex>
      ) : (
        <UserTable users={filtered} onDelete={removeUser} />
      )}

      <Divider my={10} opacity={0.1} />
      <Text textAlign="center" fontSize="xs" opacity={0.3}>&copy; 2024 User Directory Dashboard</Text>
    </Box>
  );
};

export default App;
