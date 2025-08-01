import React, { useState } from 'react';
import { Send, Search, Plus, Phone, Video, MoreVertical, Camera, Image, Play, X, Download } from 'lucide-react';

const Messaging: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const conversations = [
    {
      id: 1,
      name: 'Sarah Martinez',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Is Luna still available?',
      time: '2:30 PM',
      unread: 2,
      online: true,
      animalInterest: 'Luna - Golden Retriever'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Thank you for the additional photos',
      time: '1:45 PM',
      unread: 0,
      online: false,
      animalInterest: 'Max - German Shepherd'
    },
    {
      id: 3,
      name: 'Emma Laurent',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Can we schedule a visit?',
      time: '11:20 AM',
      unread: 1,
      online: true,
      animalInterest: 'Bella - Labrador'
    },
    {
      id: 4,
      name: 'Pierre Martin',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'Perfect, looking forward to meeting you',
      time: 'Yesterday',
      unread: 0,
      online: false,
      animalInterest: 'Oliver - British Shorthair'
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      text: "Hi! I'm interested in Luna, the Golden Retriever. Is she still available?",
      time: '2:25 PM',
      type: 'received',
      messageType: 'text'
    },
    {
      id: 2,
      senderId: 'me',
      text: "Hello Sarah! Yes, Luna is still available. She's a beautiful 8-week-old puppy with all her vaccinations up to date.",
      time: '2:27 PM',
      type: 'sent',
      messageType: 'text'
    },
    {
      id: 3,
      senderId: 1,
      text: "That's wonderful! Could you tell me more about her temperament and health certificates?",
      time: '2:28 PM',
      type: 'received',
      messageType: 'text'
    },
    {
      id: 4,
      senderId: 'me',
      text: "Luna is very friendly and social. She loves playing with children and other dogs. She has her health certificate, LOOF registration, and microchip. All documents are ready for transfer.",
      time: '2:29 PM',
      type: 'sent',
      messageType: 'text'
    },
    {
      id: 5,
      senderId: 'me',
      text: "",
      time: '2:29 PM',
      type: 'sent',
      messageType: 'image',
      mediaUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      mediaName: 'luna_playing.jpg'
    },
    {
      id: 6,
      senderId: 1,
      text: "Is Luna still available?",
      time: '2:30 PM',
      type: 'received',
      messageType: 'text'
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logic to send message would go here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>, mediaType: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB for images, 50MB for videos)
    const maxSize = mediaType === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size too large. Maximum ${mediaType === 'image' ? '10MB' : '50MB'} allowed.`);
      return;
    }

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    const validTypes = mediaType === 'image' ? validImageTypes : validVideoTypes;
    
    if (!validTypes.includes(file.type)) {
      alert(`Invalid file type. Please select a valid ${mediaType} file.`);
      return;
    }

    setUploadingMedia(true);
    setShowMediaOptions(false);

    try {
      // Convert file to base64 for temporary storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target?.result as string;
        
        // Simulate sending media message
        console.log('Sending media message:', {
          type: mediaType,
          fileName: file.name,
          fileSize: file.size,
          data: base64Data
        });
        
        // In a real app, you would upload to a server here
        setTimeout(() => {
          setUploadingMedia(false);
          alert(`${mediaType === 'image' ? 'Photo' : 'Video'} sent successfully!`);
        }, 1500);
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading media:', error);
      setUploadingMedia(false);
      alert('Error uploading file. Please try again.');
    }

    // Reset input
    event.target.value = '';
  };

  const MediaMessage: React.FC<{ message: any }> = ({ message }) => {
    if (message.messageType === 'image') {
      return (
        <div className="relative group">
          <img
            src={message.mediaUrl}
            alt={message.mediaName || 'Shared image'}
            className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open(message.mediaUrl, '_blank')}
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => window.open(message.mediaUrl, '_blank')}
              className="bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    if (message.messageType === 'video') {
      return (
        <video
          src={message.mediaUrl}
          controls
          className="max-w-xs rounded-lg"
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    return null;
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-screen">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-black mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-[#A8E6CF] bg-opacity-20' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-black truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>
                    <p className="text-xs text-[#70C1B3] truncate">Re: {conversation.animalInterest}</p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <div className="bg-[#70C1B3] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversationData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedConversationData.avatar}
                      alt={selectedConversationData.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedConversationData.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium text-black">{selectedConversationData.name}</h2>
                    <p className="text-sm text-gray-600">
                      {selectedConversationData.online ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center">
                  <div className="bg-[#A8E6CF] text-black px-3 py-1 rounded-full text-sm inline-block">
                    Inquiry about: {selectedConversationData.animalInterest}
                  </div>
                </div>
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'sent'
                          ? 'bg-[#A8E6CF] text-black'
                          : 'bg-gray-100 text-black'
                      }`}
                    >
                      {message.messageType === 'text' ? (
                        <p className="text-sm">{message.text}</p>
                      ) : (
                        <MediaMessage message={message} />
                      )}
                      {message.text && message.messageType !== 'text' && (
                        <p className="text-sm mt-2">{message.text}</p>
                      )}
                      <p className="text-xs opacity-70 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
                
                {uploadingMedia && (
                  <div className="flex justify-end">
                    <div className="bg-[#A8E6CF] text-black px-4 py-2 rounded-lg max-w-xs">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                        <span className="text-sm">Uploading...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <button 
                      onClick={() => setShowMediaOptions(!showMediaOptions)}
                      className={`p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors ${
                        uploadingMedia ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={uploadingMedia}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    
                    {showMediaOptions && (
                      <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-1 z-10">
                        <label className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                          <Image className="w-4 h-4" />
                          <span>Photo</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif"
                            onChange={(e) => handleMediaUpload(e, 'image')}
                            className="hidden"
                          />
                        </label>
                        <label className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                          <Play className="w-4 h-4" />
                          <span>Video</span>
                          <input
                            type="file"
                            accept="video/mp4,video/webm,video/ogg"
                            onChange={(e) => handleMediaUpload(e, 'video')}
                            className="hidden"
                          />
                        </label>
                        <label className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                          <Camera className="w-4 h-4" />
                          <span>Camera</span>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => handleMediaUpload(e, 'image')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      disabled={uploadingMedia}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={uploadingMedia}
                    className={`bg-[#A8E6CF] text-black p-2 rounded-full hover:bg-[#70C1B3] transition-colors ${
                      uploadingMedia ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#A8E6CF] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-[#70C1B3]" />
                </div>
                <h3 className="text-lg font-medium text-black mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging;