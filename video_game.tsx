'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from 'framer-motion';
import { Heart, MessageSquare, Bookmark, ChevronRight, ArrowLeft, Moon, Sun, Keyboard, Star, Settings, Home, User, Sword, Shield, Trophy, Lock, Unlock, Edit, LogOut, Plus } from 'lucide-react';
import { Press_Start_2P, Orbitron } from 'next/font/google';
import Image from 'next/image';

// Fonts configured with preloading
const gameFont = Press_Start_2P({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-game'
});

const headerFont = Orbitron({ 
  subsets: ['latin'], 
  weight: ['500', '700'],
  variable: '--font-header'
});

// Game data with placeholder images
const gamePosts = [
  {
    id: 1,
    title: 'LEVEL 1: AI REVOLUTION',
    excerpt: 'How artificial intelligence is changing everything',
    content: `Artificial intelligence is transforming industries at an unprecedented pace. From healthcare diagnostics to autonomous vehicles, AI applications are becoming ubiquitous. This post explores the latest breakthroughs in machine learning and their real-world implications.

## The Current Landscape

AI has progressed from simple pattern recognition to complex problem-solving capabilities. Recent advancements in transformer architectures have enabled models like GPT-4 to demonstrate remarkable language understanding and generation abilities.

## Key Applications

1. **Healthcare**: AI-powered diagnostic tools can detect diseases from medical images with accuracy rivaling human experts.
2. **Finance**: Algorithmic trading and fraud detection systems leverage machine learning to process vast amounts of transaction data.
3. **Manufacturing**: Predictive maintenance systems use AI to anticipate equipment failures before they occur.`,
    likes: 1893,
    rating: 4.7,
    comments: [
      { 
        id: 1, 
        user: 'TechWarrior', 
        avatar: '/default-avatar.jpg',
        text: 'Mind-blowing stuff! The future is now.', 
        likes: 5, 
        rating: 5,
        date: '2023-10-15T14:30:00Z'
      },
      { 
        id: 2, 
        user: 'CodeNinja', 
        avatar: '/default-avatar.jpg',
        text: 'What about job displacement though?', 
        likes: 2, 
        rating: 3,
        date: '2023-10-16T09:15:00Z'
      }
    ],
    image: '/tech-bg.jpg',
    author: {
      name: 'AI Explorer',
      avatar: '/default-avatar.jpg',
      bio: 'Tech enthusiast exploring the frontiers of artificial intelligence',
      level: 42,
      xp: 15600,
      posts: 28,
      joined: '2021-03-15'
    },
    date: '2023-10-10T08:00:00Z',
    readTime: '8 min',
    unlocked: true,
    tags: ['TECH', 'FUTURE', 'AI'],
    bgColor: 'bg-purple-900',
    difficulty: 'Medium'
  },
  {
    id: 2,
    title: 'LEVEL 2: QUANTUM LEAP',
    excerpt: 'Understanding quantum computing basics',
    content: `Quantum computers leverage quantum-mechanical phenomena to perform calculations. Unlike classical computers that use bits, quantum computers use quantum bits or qubits. This post breaks down how quantum computing works and its potential to revolutionize fields like cryptography and drug discovery.

## Qubits Explained

Qubits can exist in superposition, representing both 0 and 1 simultaneously. This property enables quantum computers to process vast amounts of data in parallel.

## Quantum Supremacy

Google's 2019 demonstration showed a quantum computer solving a problem in 200 seconds that would take a supercomputer 10,000 years. While controversial, this marked a significant milestone.

## Practical Applications

- **Drug Discovery**: Simulating molecular interactions at quantum levels
- **Cryptography**: Breaking current encryption methods and creating quantum-proof alternatives
- **Optimization**: Solving complex logistics and scheduling problems`,
    likes: 1245,
    rating: 4.3,
    comments: [],
    image: '/science-bg.jpg',
    author: {
      name: 'Quantum Pioneer',
      avatar: '/default-avatar.jpg',
      bio: 'Physicist exploring the quantum realm and its computational potential',
      level: 38,
      xp: 12400,
      posts: 19,
      joined: '2020-07-22'
    },
    date: '2023-09-28T10:30:00Z',
    readTime: '10 min',
    unlocked: true,
    tags: ['SCIENCE', 'TECH', 'QUANTUM'],
    bgColor: 'bg-blue-900',
    difficulty: 'Hard'
  },
  {
    id: 3,
    title: 'LEVEL 3: CYBER SECURITY',
    excerpt: 'Protecting your digital life in 2023',
    content: `With increasing cyber threats, understanding security fundamentals is crucial. This guide covers essential practices for individuals and businesses to protect against common attacks.

## Common Threats

1. **Phishing**: Deceptive emails attempting to steal credentials
2. **Ransomware**: Malware that encrypts files until payment is made
3. **Supply Chain Attacks**: Compromising software dependencies

## Best Practices

- Use strong, unique passwords and enable 2FA
- Keep all software updated
- Be skeptical of unsolicited communications
- Regularly back up important data

## Advanced Protection

For businesses, consider:
- Zero Trust Architecture
- Endpoint Detection and Response (EDR) solutions
- Regular security audits and penetration testing`,
    likes: 1567,
    rating: 4.5,
    comments: [
      { 
        id: 3, 
        user: 'SecurityGuard', 
        avatar: '/default-avatar.jpg',
        text: 'Great overview! Would love to see more on enterprise security.', 
        likes: 3, 
        rating: 4,
        date: '2023-10-05T16:45:00Z'
      }
    ],
    image: '/security-bg.jpg',
    author: {
      name: 'Cyber Sentinel',
      avatar: '/default-avatar.jpg',
      bio: 'Security professional dedicated to making the digital world safer',
      level: 45,
      xp: 17800,
      posts: 32,
      joined: '2019-11-03'
    },
    date: '2023-10-05T08:15:00Z',
    readTime: '6 min',
    unlocked: true,
    tags: ['SECURITY', 'TECH', 'HOW-TO'],
    bgColor: 'bg-green-900',
    difficulty: 'Medium'
  },
  {
    id: 4,
    title: 'LEVEL 4: VR FRONTIERS',
    excerpt: 'The future of virtual reality experiences',
    content: `Virtual reality technology has evolved beyond gaming into diverse applications. This post explores cutting-edge VR developments and their potential impacts.

## Current Applications

- **Education**: Immersive historical recreations and scientific visualizations
- **Therapy**: Treating phobias and PTSD through controlled exposure
- **Remote Work**: Virtual offices with spatial collaboration tools

## Emerging Technologies

**Haptic Feedback**: Advanced gloves and suits that simulate touch
**Eye Tracking**: More natural interactions and foveated rendering
**Varifocal Displays**: Solving the vergence-accommodation conflict

## Future Outlook

The metaverse concept envisions persistent virtual worlds with seamless transitions between VR and AR. While still early, the foundations are being laid today.`,
    likes: 982,
    rating: 4.1,
    comments: [
      { 
        id: 4, 
        user: 'VRExplorer', 
        avatar: '/default-avatar.jpg',
        text: 'Tried the new Quest 3 and it\'s amazing! The passthrough is game-changing.', 
        likes: 7, 
        rating: 5,
        date: '2023-10-12T11:20:00Z'
      },
      { 
        id: 5, 
        user: 'TechSkeptic', 
        avatar: '/default-avatar.jpg',
        text: 'Still waiting for the killer app that makes VR mainstream', 
        likes: 2, 
        rating: 3,
        date: '2023-10-13T14:50:00Z'
      }
    ],
    image: '/vr-bg.jpg',
    author: {
      name: 'VR Visionary',
      avatar: '/default-avatar.jpg',
      bio: 'Exploring the boundaries of virtual and augmented reality',
      level: 35,
      xp: 11200,
      posts: 15,
      joined: '2022-01-10'
    },
    date: '2023-10-01T09:45:00Z',
    readTime: '7 min',
    unlocked: true,
    tags: ['VR', 'TECH', 'FUTURE'],
    bgColor: 'bg-orange-900',
    difficulty: 'Easy'
  }
];

const lockedPosts = [
  {
    id: 5,
    title: 'LEVEL 5: NEURAL INTERFACES',
    excerpt: 'Brain-computer interfaces and the future of human-machine interaction',
    unlocked: false,
    tags: ['TECH', 'FUTURE', 'NEUROSCIENCE'],
    bgColor: 'bg-indigo-900',
    difficulty: 'Hard'
  },
  {
    id: 6,
    title: 'LEVEL 6: BLOCKCHAIN REVOLUTION',
    excerpt: 'Beyond cryptocurrency: decentralized applications changing industries',
    unlocked: false,
    tags: ['TECH', 'BLOCKCHAIN', 'FINANCE'],
    bgColor: 'bg-amber-900',
    difficulty: 'Medium'
  }
];

const categories = ['All', 'TECH', 'SCIENCE', 'SECURITY', 'VR', 'FUTURE', 'HOW-TO'];

const StarRating = ({ rating, setRating, interactive = true }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && setRating(star)}
          className={`focus:outline-none ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <Star
            className={`w-5 h-5 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
          />
        </button>
      ))}
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const ExperienceBar = ({ current, max, level }) => {
  const percentage = Math.min(100, (current / max) * 100);
  
  return (
    <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden relative">
      <motion.div 
        className="h-full bg-blue-500"
        initial={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">
          LVL {level} | {current}/{max} XP
        </span>
      </div>
    </div>
  );
};

export default function GameBlog() {
  const [currentView, setCurrentView] = useState('home');
  const [currentPost, setCurrentPost] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [inputComment, setInputComment] = useState('');
  const [commentRating, setCommentRating] = useState(5);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [keyboardMode, setKeyboardMode] = useState(false);
  const [activeStars, setActiveStars] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  
  const userProfile = {
    name: 'GameMaster',
    avatar: '/default-avatar.jpg',
    bio: 'Blog adventurer and knowledge seeker',
    level: 15,
    xp: 4200,
    posts: 3,
    joined: '2023-05-10',
    achievements: ['First Post', 'Commentator', 'Knowledge Seeker']
  };
  
  const postRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: postRef,
    offset: ["start start", "end start"]
  });
  
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboardMode) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (currentPost) {
          setCurrentPost(null);
        } else if (currentProfile) {
          setCurrentProfile(null);
        } else if (currentView !== 'home') {
          setCurrentView('home');
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        if (currentView === 'home') {
          const tabs = ['All', 'TECH', 'SCIENCE', 'SECURITY', 'VR', 'FUTURE', 'HOW-TO'];
          const currentIndex = tabs.indexOf(selectedCategory);
          const direction = e.key === 'ArrowUp' ? -1 : 1;
          setSelectedCategory(tabs[(currentIndex + direction + tabs.length) % tabs.length]);
        }
      } else if (e.key === 'Enter' && currentView === 'home' && !currentPost) {
        const firstPost = filteredPosts[0];
        if (firstPost) setCurrentPost(firstPost);
      } else if (e.key === ' ' && currentPost) {
        handleLike(currentPost.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardMode, selectedCategory, currentPost, currentProfile, currentView]);

  // Mobile category scroll
  useEffect(() => {
    if (categoryScrollRef.current) {
      const scrollContainer = categoryScrollRef.current;
      const activeTab = scrollContainer.querySelector('.active-tab');
      if (activeTab) {
        scrollContainer.scrollTo({
          left: activeTab.offsetLeft - scrollContainer.offsetWidth / 2 + activeTab.offsetWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedCategory]);

  const handleLike = (postId) => {
    const post = gamePosts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
      if (currentPost?.id === postId) {
        setCurrentPost({...post});
      }
    }
  };

  const addComment = () => {
    if (!inputComment.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: userProfile.name,
      avatar: userProfile.avatar,
      text: inputComment,
      likes: 0,
      rating: commentRating,
      date: new Date().toISOString()
    };

    currentPost.comments.push(newComment);
    setCurrentPost({...currentPost});
    setInputComment('');
    setCommentRating(5);
  };

  const likeComment = (commentId) => {
    const comment = currentPost.comments.find(c => c.id === commentId);
    if (comment) {
      comment.likes += 1;
      setCurrentPost({...currentPost});
    }
  };

  const ratePost = (rating) => {
    if (currentPost) {
      currentPost.rating = rating;
      setCurrentPost({...currentPost});
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
    setCurrentPost(null);
    setCurrentProfile(null);
  };

  const handleCreatePost = () => {
    setShowCreatePost(true);
    // In a real app, this would open a post creation form
    alert('Post creation form would open here');
    setTimeout(() => setShowCreatePost(false), 3000);
  };

  const filteredPosts = gamePosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.tags.includes(selectedCategory);
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const viewProfile = (profile) => {
    setCurrentProfile(profile);
    setCurrentView('profile');
  };

  const filteredCategories = ['All', ...new Set(gamePosts.flatMap(post => post.tags))];

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl max-w-md w-full text-center`}>
          <h1 className={`text-3xl font-bold mb-6 font-header ${darkMode ? 'text-green-400' : 'text-green-600'}`}>BLOG QUEST</h1>
          <p className="mb-6">You have been signed out. Please sign in to continue your adventure.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLoggedIn(true)}
            className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            SIGN IN
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-900'} ${gameFont.variable} ${headerFont.variable}`}>
      {/* Game HUD */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`fixed top-0 left-0 right-0 p-4 flex justify-between items-center border-b ${darkMode ? 'border-green-700 bg-gray-900/90' : 'border-gray-300 bg-white/90'} z-50 backdrop-blur-sm`}
      >
        <div className="flex items-center space-x-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentView('home');
              setCurrentPost(null);
              setCurrentProfile(null);
              setSelectedCategory('All');
            }}
            className="flex items-center space-x-2"
          >
            <h1 className={`text-xl font-bold font-header ${darkMode ? 'text-green-400' : 'text-green-700'}`}>BLOG QUEST</h1>
            {currentView !== 'home' && (
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentView === 'profile' ? '→ PROFILE' : currentView === 'settings' ? '→ SETTINGS' : ''}
              </span>
            )}
          </motion.button>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentView === 'home' && !currentPost && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              className={`overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg`}
            >
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`px-4 py-2 bg-transparent focus:outline-none w-64 ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
              />
            </motion.div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setKeyboardMode(!keyboardMode)}
            className={`p-2 rounded-lg ${keyboardMode ? (darkMode ? 'bg-green-700 text-white' : 'bg-green-400 text-white') : (darkMode ? 'bg-gray-800' : 'bg-gray-200')}`}
          >
            <Keyboard className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setCurrentProfile(userProfile);
              setCurrentView('profile');
            }}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          >
            <User className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-16 left-0 bottom-0 w-64 z-40 ${darkMode ? 'bg-gray-800 border-r border-green-700' : 'bg-white border-r border-gray-300'} shadow-xl`}
          >
            <div className="p-4 space-y-1">
              {[
                { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home' },
                { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
                { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' }
              ].map(tab => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentView(tab.id);
                    if (tab.id === 'profile') setCurrentProfile(userProfile);
                    setMenuOpen(false);
                    setSelectedCategory('All');
                  }}
                  className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${currentView === tab.id ? (darkMode ? 'bg-green-900/50 text-white' : 'bg-green-200 text-gray-900') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </motion.button>
              ))}
              
              <div className="border-t border-gray-700 my-2"></div>
              
              {filteredCategories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentView('home');
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${selectedCategory === category && currentView === 'home' ? (darkMode ? 'bg-green-900/50 text-white' : 'bg-green-200 text-gray-900') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                >
                  <span>{category}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 pb-16 px-4 max-w-7xl mx-auto">
        {/* Settings View */}
        {currentView === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <motion.h1 
              className={`text-3xl font-bold mb-6 font-header ${darkMode ? 'text-white' : 'text-gray-900'}`}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              SETTINGS
            </motion.h1>
            
            <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="p-6 border-b border-gray-700">
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h2>
                <div className="flex items-center justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Dark Mode</span>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 border-b border-gray-700">
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Controls</h2>
                <div className="flex items-center justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Keyboard Mode</span>
                  <button 
                    onClick={() => setKeyboardMode(!keyboardMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${keyboardMode ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${keyboardMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account</h2>
                <button 
                  onClick={handleSignOut}
                  className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${darkMode ? 'bg-red-900/50 hover:bg-red-800/50 text-red-300' : 'bg-red-200 hover:bg-red-300 text-red-700'}`}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile View */}
        {currentView === 'profile' && currentProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="flex items-start justify-between">
              <motion.button
                onClick={() => {
                  setCurrentView('home');
                  setSelectedCategory('All');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>BACK</span>
              </motion.button>
              
              {currentProfile.name === userProfile.name && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView('settings')}
                  className={`flex items-center space-x-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  <Settings className="w-5 h-5" />
                  <span>SETTINGS</span>
                </motion.button>
              )}
            </div>
            
            <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
              <div className={`relative h-48 w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
                <div className="absolute -bottom-16 left-6">
                  <div className={`relative h-32 w-32 rounded-full border-4 ${darkMode ? 'border-gray-800 bg-gray-700' : 'border-white bg-gray-300'} overflow-hidden`}>
                    <Image
                      src={currentProfile.avatar}
                      alt={currentProfile.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-20 px-6 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentProfile.name}
                    </h1>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Joined {formatDate(currentProfile.joined)}
                    </p>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-yellow-600'}`}>
                    <span className="font-bold">LVL {currentProfile.level}</span>
                  </div>
                </div>
                
                <p className={`my-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {currentProfile.bio}
                </p>
                
                <div className="mb-6">
                  <ExperienceBar 
                    current={currentProfile.xp % 1000} 
                    max={1000} 
                    level={currentProfile.level} 
                  />
                </div>
                
                {currentProfile.achievements && currentProfile.achievements.length > 0 && (
                  <div className="mt-8">
                    <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ACHIEVEMENTS
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {currentProfile.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                        >
                          <Trophy className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                          <span className="text-sm">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {currentProfile.name === userProfile.name ? (
              <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="p-6">
                  <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    YOUR POSTS
                  </h2>
                  
                  {gamePosts.filter(post => post.author.name === currentProfile.name).length > 0 ? (
                    <div className="space-y-4">
                      {gamePosts.filter(post => post.author.name === currentProfile.name).map(post => (
                        <motion.div
                          key={post.id}
                          whileHover={{ y: -2 }}
                          onClick={() => {
                            setCurrentPost(post);
                            setCurrentView('home');
                          }}
                          className={`p-4 rounded-lg cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                          <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{post.title}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <Heart className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.likes}</span>
                            </div>
                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {formatDate(post.date)}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      <p className="mb-4">You haven't created any posts yet</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCreatePost}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto ${darkMode ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                      >
                        <Plus className="w-4 h-4" />
                        <span>CREATE POST</span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="p-6">
                  <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    RECENT POSTS BY {currentProfile.name.toUpperCase()}
                  </h2>
                  
                  {gamePosts.filter(post => post.author.name === currentProfile.name).length > 0 ? (
                    <div className="space-y-4">
                      {gamePosts
                        .filter(post => post.author.name === currentProfile.name)
                        .slice(0, 3)
                        .map(post => (
                          <motion.div
                            key={post.id}
                            whileHover={{ y: -2 }}
                            onClick={() => {
                              setCurrentPost(post);
                              setCurrentView('home');
                            }}
                            className={`p-4 rounded-lg cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                          >
                            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{post.title}</h3>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <Heart className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.likes}</span>
                              </div>
                              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {formatDate(post.date)}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  ) : (
                    <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      <p>No posts yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Home/Posts View */}
        {currentView === 'home' && !currentPost && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1 
                className={`text-3xl md:text-4xl mb-4 font-header ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                BLOG ADVENTURE
              </motion.h1>
              <motion.p 
                className={`text-lg ${darkMode ? 'text-green-300' : 'text-green-700'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Select a post to begin your knowledge quest
              </motion.p>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              ref={categoryScrollRef}
              className="flex overflow-x-auto pb-2 scrollbar-hide touch-pan-x"
            >
              <div className="flex space-x-2">
                {filteredCategories.map(category => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedCategory === category ? 'active-tab ' + (darkMode ? 'bg-green-700 text-white' : 'bg-green-500 text-white') : (darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentPost(post);
                    setSelectedCategory('All');
                  }}
                  className={`relative overflow-hidden rounded-xl cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-all duration-300 shadow-lg h-96`}
                >
                  <div className={`absolute inset-0 ${post.bgColor} opacity-70`}></div>
                  <div className="absolute inset-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map(tag => (
                        <motion.span
                          key={tag}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 * post.tags.indexOf(tag) }}
                          className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-900/50 text-green-400' : 'bg-white/90 text-gray-800'}`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{post.title}</h2>
                    <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
              
              {lockedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (filteredPosts.length + index) * 0.1 + 0.3 }}
                  className={`relative overflow-hidden rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 shadow-lg h-96 grayscale`}
                >
                  <div className={`absolute inset-0 ${post.bgColor} opacity-70`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-center">
                    <Lock className={`w-12 h-12 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{post.title}</h2>
                    <p className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.excerpt}</p>
                    <div className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      LEVEL {post.id} LOCKED
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Single Post View */}
        {currentView === 'home' && currentPost && (
          <div ref={postRef} className="space-y-8">
            <motion.button
              onClick={() => {
                setCurrentPost(null);
                setSelectedCategory('All');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>BACK TO LEVELS</span>
            </motion.button>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-2xl`}
            >
              <motion.div 
                className="relative h-96 w-full"
                style={{ y: yPos }}
              >
                <div className={`absolute inset-0 ${currentPost.bgColor} opacity-80`}></div>
                <Image
                  src={currentPost.image}
                  alt={currentPost.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentPost.tags.map(tag => (
                      <motion.span 
                        key={tag}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 * currentPost.tags.indexOf(tag) }}
                        className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-900/50 text-green-400' : 'bg-white/90 text-gray-800'}`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`text-3xl md:text-4xl font-bold mb-4 font-header ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {currentPost.title}
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => viewProfile(currentPost.author)}
                      className={`flex items-center space-x-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} p-2 rounded-lg`}
                    >
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={currentPost.author.avatar}
                          alt={currentPost.author.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {currentPost.author.name}
                      </span>
                    </motion.button>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className={`text-lg ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{currentPost.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className={`w-5 h-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                        <span className={`text-lg ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{currentPost.likes}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between mb-6"
                >
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {formatDate(currentPost.date)} · {currentPost.readTime} read
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {currentPost.difficulty}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`prose max-w-none mb-8 ${darkMode ? 'prose-invert' : ''}`}
                >
                  {currentPost.content.split('\n\n').map((paragraph, i) => (
                    <motion.p 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                      className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}
                    >
                      {paragraph.startsWith('## ') ? (
                        <h2 className={`text-2xl font-bold mt-8 mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {paragraph.substring(3)}
                        </h2>
                      ) : paragraph.startsWith('1. ') ? (
                        <ol className="list-decimal pl-6 space-y-2">
                          {paragraph.split('\n').map((item, j) => (
                            <li key={j} className="pl-2">
                              {item.substring(3)}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        paragraph
                      )}
                    </motion.p>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between mb-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLike(currentPost.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <Heart className={`w-5 h-5 ${currentPost.likes > 0 ? (darkMode ? 'text-red-400 fill-red-400' : 'text-red-600 fill-red-600') : (darkMode ? 'text-gray-400' : 'text-gray-600')}`} />
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                      {currentPost.likes} {currentPost.likes === 1 ? 'Like' : 'Likes'}
                    </span>
                  </motion.button>
                  
                  <div className="flex flex-col items-end">
                    <span className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rate this post:</span>
                    <div 
                      className="flex"
                      onMouseLeave={() => setActiveStars(0)}
                    >
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => ratePost(star)}
                          onMouseEnter={() => setActiveStars(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${(activeStars || currentPost.rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-8`}
                >
                  <h2 className={`text-2xl font-bold mb-6 font-header ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    COMMENTS ({currentPost.comments.length})
                  </h2>

                  {currentPost.comments.length > 0 ? (
                    <div className="space-y-6">
                      {currentPost.comments.map((comment, index) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.9 }}
                          className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                <Image
                                  src={comment.avatar}
                                  alt={comment.user}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                  {comment.user}
                                </span>
                                <div className="flex items-center mt-1">
                                  <StarRating rating={comment.rating} setRating={() => {}} interactive={false} />
                                </div>
                              </div>
                            </div>
                            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {formatDate(comment.date)}
                            </div>
                          </div>
                          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {comment.text}
                          </p>
                          <div className="flex justify-end mt-3">
                            <button 
                              onClick={() => likeComment(comment.id)}
                              className={`flex items-center space-x-1 text-xs ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-600'}`}
                            >
                              <Heart className="w-3 h-3" />
                              <span>{comment.likes}</span>
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                    >
                      No comments yet. Be the first to share your thoughts!
                    </motion.p>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="mt-8"
                  >
                    <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ADD COMMENT
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your rating:</span>
                        <StarRating rating={commentRating} setRating={setCommentRating} />
                      </div>
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          value={inputComment}
                          onChange={(e) => setInputComment(e.target.value)}
                          placeholder="Share your thoughts..."
                          className={`flex-1 p-4 rounded-lg ${darkMode ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'}`}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addComment}
                          disabled={!inputComment.trim()}
                          className={`px-6 rounded-lg flex items-center justify-center ${!inputComment.trim() ? (darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400') : (darkMode ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white')}`}
                        >
                          POST
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.article>
          </div>
        )}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`fixed bottom-0 left-0 right-0 p-3 border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} text-center text-sm z-40`}
      >
        <div className="max-w-7xl mx-auto">
          {keyboardMode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mb-2 p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <span className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                KEYBOARD MODE: ↑↓ Navigate | ENTER Select | ESC Back | SPACE Like
              </span>
            </motion.div>
          )}
          <p className={darkMode ? 'text-gray-500' : 'text-gray-600'}>
            © 2023 BLOG QUEST | Press START to continue
          </p>
        </div>
      </motion.footer>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`rounded-xl p-6 max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create New Post</h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Post creation form would appear here with title, content, and image upload fields.</p>
              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreatePost(false)}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowCreatePost(false);
                    // In a real app, this would submit the form
                    alert('Post would be created here');
                  }}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                  Publish
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}