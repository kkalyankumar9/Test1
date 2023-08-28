import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
const navigate=useNavigate("")
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.msg);
        alert('User registered successfully || if your existing user Login successfully')
        navigate("/home")
      } else {
        setMessage(data.err);
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  return (
    <Box p={4} m={"auto"} w={"40%"} boxShadow= "rgba(0, 0, 0, 0.16) 0px 1px 4px">
      <Heading as="h1" size="xl">User Registration</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mt={4}>
          <FormLabel>Name:</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Email:</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password:</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">Register</Button>
      </form>
      {message && <Text mt={4}>{message}</Text>}
    </Box>
  );
};

export default Authentication;
