import React, { useState } from 'react';
import RecordRTC from 'recordrtc';
import { Box, Button, Heading, Text, useToast } from '@chakra-ui/react';

const HomePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const toast = useToast();
  const handleback=()=>{
    window.history.back();
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const recorderInstance = RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm'
      });
      setRecorder(recorderInstance);
      recorderInstance.startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!recorder) return;
    recorder.stopRecording(() => {
      const blob = recorder.getBlob();
      const videoUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'recorded-video.webm';
      a.click();
      setIsRecording(false);
      toast({ title: 'Recording stopped', status: 'info', duration: 3000, isClosable: true });
    });
  };

  return (
    <Box p={4}>
      <Heading size="lg">Recording Page</Heading>
      <Text>{isRecording ? 'Recording in progress' : 'Not recording'}</Text>
      <Button onClick={isRecording ? stopRecording : startRecording} mt={4} colorScheme={isRecording ? 'red' : 'green'}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>

      <Button onClick={handleback} p={"25px"} mt={"25px"} border={"none"} bg={"none"}>Back</Button>
    </Box>
  );
};

export default HomePage;
