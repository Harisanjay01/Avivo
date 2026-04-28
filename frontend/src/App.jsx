import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import {
  Box, Flex, Heading, Text, Button, HStack, VStack, Spinner, 
  Alert, AlertIcon, Stat, StatLabel, StatNumber, Divider, useToast,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
  AlertDialogContent, AlertDialogOverlay, useDisclosure,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Avatar, Badge, IconButton, InputGroup, InputLeftElement, Input
} from '@chakra-ui/react';
import { RepeatIcon, AddIcon, InfoIcon, SearchIcon, DeleteIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://localhost:5001';

// --- Sub-components (Consolidated for "Whole Application" feel) ---

const SearchBar = ({ value, onChange }) => (
  <Box flex="1" maxW="400px">
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="purple.400" />
      </InputLeftElement>
      <Input
        placeholder="Find a community member..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="whiteAlpha.100"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="xl"
        _focus={{ bg: "whiteAlpha.200", borderColor: "purple.500", boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)" }}
      />
    </InputGroup>
  </Box>
);

const MotionTr = motion.create(Tr);

const UserTable = ({ users, onDelete }) => {
  if (!users.length) return (
    <VStack py={24} spacing={4} opacity={0.6}>
      <Text fontSize="xl" fontWeight="medium">The community is quiet right now...</Text>
      <Text fontSize="md">Try inviting someone or refreshing the list!</Text>
    </VStack>
  );

  return (
    <TableContainer bg="whiteAlpha.50" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden">
      <Table variant="simple">
        <Thead bg="whiteAlpha.100">
          <Tr>
            <Th color="whiteAlpha.600" py={5}>Member</Th>
            <Th color="whiteAlpha.600" py={5}>Collective</Th>
            <Th color="whiteAlpha.600" py={5}>Role</Th>
            <Th color="whiteAlpha.600" py={5}>Location</Th>
            <Th py={5}></Th>
          </Tr>
        </Thead>
        <Tbody>
          <AnimatePresence mode="popLayout">
            {users.map((u) => (
              <MotionTr
                key={u.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                _hover={{ bg: "whiteAlpha.50" }}
              >
                <Td borderBottom="1px solid" borderColor="whiteAlpha.50" py={4}>
                  <HStack spacing={4}>
                    <Avatar 
                      size="md" 
                      src={u.image} 
                      name={`${u.firstName} ${u.lastName}`}
                      border="2px solid"
                      borderColor="purple.500"
                    />
                    <Box>
                      <Text fontSize="md" fontWeight="bold">{u.firstName} {u.lastName}</Text>
                      <Text fontSize="xs" opacity={0.5}>{u.email}</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td borderBottom="1px solid" borderColor="whiteAlpha.50" fontSize="sm">{u.company}</Td>
                <Td borderBottom="1px solid" borderColor="whiteAlpha.50">
                  <Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full" textTransform="none">
                    {u.role}
                  </Badge>
                </Td>
                <Td borderBottom="1px solid" borderColor="whiteAlpha.50" fontSize="sm">{u.country}</Td>
                <Td borderBottom="1px solid" borderColor="whiteAlpha.50" textAlign="right">
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => onDelete(u)}
                    aria-label="Remove member"
                    _hover={{ bg: "red.500", color: "white" }}
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

// --- Main Application ---

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToDelete, setUserToDelete] = useState(null);
  const cancelRef = useRef();

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

  const onAddUser = async () => {
    const names = [
      { first: 'Sarah', last: 'Johnson', role: 'Designer', country: 'USA' },
      { first: 'Marcus', last: 'Chen', role: 'Engineer', country: 'Singapore' },
      { first: 'Elena', last: 'Rodriguez', role: 'Manager', country: 'Spain' },
      { first: 'Kofi', last: 'Arhin', role: 'Analyst', country: 'Ghana' },
      { first: 'Yuki', last: 'Tanaka', role: 'Architect', country: 'Japan' },
      { first: 'Aria', last: 'Voss', role: 'Researcher', country: 'Germany' },
      { first: 'Leo', last: 'Silva', role: 'Developer', country: 'Brazil' }
    ];
    const person = names[Math.floor(Math.random() * names.length)];
    
    const newUserRequest = {
      firstName: person.first,
      lastName: person.last,
      email: `${person.first.toLowerCase()}.${Date.now()}@example.com`,
      company: 'Future Collective',
      role: person.role,
      country: person.country,
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${person.first}${Date.now()}`
    };
    
    try {
      const { data: savedUser } = await axios.post(`${API_BASE}/users`, newUserRequest);
      setUsers([savedUser, ...users]);
      toast({ 
        title: 'Welcome aboard!', 
        description: `We've added ${person.first} to our team permanently.`,
        status: 'success', 
        duration: 3000,
        isClosable: true,
        variant: 'subtle',
        position: 'top-right'
      });
    } catch (err) {
      toast({
        title: 'Error adding member',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    onOpen();
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`${API_BASE}/users/${userToDelete.id}`);
        setUsers(users.filter(u => u.id !== userToDelete.id));
        toast({
          title: 'Member removed',
          description: `${userToDelete.firstName} has left the community.`,
          status: 'info',
          duration: 3000,
          isClosable: true,
          variant: 'left-accent'
        });
      } catch (err) {
        toast({
          title: 'Error removing member',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
    onClose();
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
    <Box minH="100vh" bg="#0d0d1a" color="white" p={[4, 8, 12]} fontFamily="'Inter', sans-serif">
      <Flex justify="space-between" align="center" mb={12} wrap="wrap" gap={6}>
        <HStack spacing={5}>
          <Box p={3} bg="purple.600" borderRadius="2xl" shadow="0 0 20px rgba(128, 90, 213, 0.4)">
            <InfoIcon color="white" w={8} h={8} />
          </Box>
          <VStack align="start" spacing={0}>
            <Heading size="xl" fontWeight="black" letterSpacing="tight">Our Community</Heading>
            <Text fontSize="sm" opacity={0.6}>Connected spirits, growing together</Text>
          </VStack>
        </HStack>

        <HStack spacing={10}>
          <Stat>
            <StatLabel opacity={0.5} fontSize="xs" textTransform="uppercase" letterSpacing="widest">Total Members</StatLabel>
            <StatNumber fontSize="3xl">{users.length}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel opacity={0.5} fontSize="xs" textTransform="uppercase" letterSpacing="widest">Searching</StatLabel>
            <StatNumber fontSize="3xl">{filtered.length}</StatNumber>
          </Stat>
        </HStack>
      </Flex>

      <Flex gap={4} mb={10} bg="whiteAlpha.50" p={6} borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" wrap="wrap" align="center" shadow="xl">
        <SearchBar value={search} onChange={setSearch} />
        <HStack spacing={4} ml="auto">
          <Button 
            leftIcon={<AddIcon />} 
            colorScheme="purple" 
            variant="solid" 
            onClick={onAddUser} 
            px={8} 
            size="lg" 
            borderRadius="xl"
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
          >
            Invite Member
          </Button>
          <Button 
            leftIcon={<RepeatIcon />} 
            onClick={loadData} 
            isLoading={loading} 
            size="lg" 
            variant="ghost" 
            borderRadius="xl"
          >
            Refresh
          </Button>
        </HStack>
      </Flex>

      {error && (
        <Alert status="error" mb={10} borderRadius="xl" variant="subtle" py={4}>
          <AlertIcon />
          <Box flex="1">
            <Text fontWeight="bold">Connection issue</Text>
            <Text fontSize="sm">{error}</Text>
          </Box>
        </Alert>
      )}

      {loading && users.length === 0 ? (
        <Flex py={32} justify="center" direction="column" align="center" gap={4}>
          <Spinner size="xl" thickness="4px" color="purple.500" />
          <Text opacity={0.5}>Bringing the community to you...</Text>
        </Flex>
      ) : (
        <UserTable users={filtered} onDelete={handleDeleteClick} />
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay backdropFilter="blur(8px)">
          <AlertDialogContent bg="#1a1a2e" color="white" borderRadius="2xl" p={2} border="1px solid" borderColor="whiteAlpha.200">
            <AlertDialogHeader fontSize="2xl" fontWeight="black">
              Remove Member?
            </AlertDialogHeader>

            <AlertDialogBody opacity={0.8}>
              Are you sure you want to remove <strong>{userToDelete?.firstName} {userToDelete?.lastName}</strong>? 
              They've been a valued part of the collective. This action is permanent.
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button ref={cancelRef} onClick={onClose} variant="ghost" color="whiteAlpha.700" borderRadius="xl">
                Wait, Keep Them
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} px={8} borderRadius="xl" shadow="0 0 15px rgba(229, 62, 62, 0.3)">
                Yes, Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Divider my={12} opacity={0.1} />
      <Text textAlign="center" fontSize="xs" opacity={0.3} letterSpacing="widest">
        &copy; {new Date().getFullYear()} COMMUNITY HUB &bull; BUILT WITH HEART
      </Text>
    </Box>
  );
};

export default App;
