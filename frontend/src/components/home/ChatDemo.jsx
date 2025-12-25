import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Package, AlertTriangle } from 'lucide-react';

const ChatDemo = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);
  const chatContainerRef = useRef(null);

  const demoConversations = [
    {
      user: "Show me products running low on stock",
      ai: "I found 8 products below your restock threshold. Your best seller \"Blue Widget\" only has 3 units left and will likely run out in 2 days based on current sales velocity.",
      products: [
        { name: 'Blue Widget', stock: 3, daysLeft: 2, urgent: true },
        { name: 'Red Gadget', stock: 5, daysLeft: 4, urgent: true },
        { name: 'Green Tool', stock: 8, daysLeft: 7, urgent: false }
      ]
    },
    {
      user: "What's my revenue this week?",
      ai: "Your revenue this week is $4,230 — that's a 12% increase from last week! You've had 67 orders with an average order value of $63.13. Your top seller was the Wireless Headphones Pro.",
      stats: [
        { label: 'Revenue', value: '$4,230', change: '+12%' },
        { label: 'Orders', value: '67', change: '+8%' },
        { label: 'AOV', value: '$63.13', change: '+4%' }
      ]
    },
    {
      user: "Create a 20% off coupon for VIP customers",
      ai: "I'll create a coupon with these settings:\n\nCode: VIP20OFF\nDiscount: 20% off entire order\nFor: VIP segment (156 customers)\nValid: 7 days\n\nReady to create this coupon?",
      action: true
    }
  ];

  useEffect(() => {
    let isMounted = true;
    
    const runDemo = async () => {
      if (!isMounted) return;
      setMessages([]);
      const demo = demoConversations[currentDemo];
      
      // Add user message
      await new Promise(r => setTimeout(r, 1000));
      if (!isMounted) return;
      setMessages([{ type: 'user', text: demo.user }]);
      
      // Show typing
      await new Promise(r => setTimeout(r, 500));
      if (!isMounted) return;
      setIsTyping(true);
      
      // Add AI response
      await new Promise(r => setTimeout(r, 2000));
      if (!isMounted) return;
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: demo.ai,
        products: demo.products,
        stats: demo.stats,
        action: demo.action
      }]);

      // Wait then switch to next demo
      await new Promise(r => setTimeout(r, 6000));
      if (!isMounted) return;
      setCurrentDemo(prev => (prev + 1) % demoConversations.length);
    };

    runDemo();
    
    return () => {
      isMounted = false;
    };
  }, [currentDemo]);

  // Scroll only within the chat container, not the page
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-3xl blur-2xl" />
      
      {/* Chat Window */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-purple-500/10 border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">WooASM Assistant</h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Online
            </p>
          </div>
        </div>

        {/* Messages - Internal scroll only */}
        <div 
          ref={chatContainerRef}
          className="h-[360px] overflow-y-auto p-6 space-y-4"
        >
          <AnimatePresence mode="wait">
            {messages.map((message, index) => (
              <motion.div
                key={`${currentDemo}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
                
                <div className={`max-w-[85%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>

                  {/* Product Cards */}
                  {message.products && (
                    <div className="mt-3 space-y-2">
                      {message.products.map((product, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            product.urgent 
                              ? 'bg-red-100 dark:bg-red-900/30' 
                              : 'bg-amber-100 dark:bg-amber-900/30'
                          }`}>
                            {product.urgent ? (
                              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            ) : (
                              <Package className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {product.stock} left • {product.daysLeft} days
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stats Cards */}
                  {message.stats && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {message.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-center"
                        >
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{stat.change}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  {message.action && (
                    <div className="mt-3 flex gap-2">
                      <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
                        Confirm
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-purple-600 dark:text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-700">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700">
            <input
              type="text"
              placeholder="Ask anything about your store..."
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 outline-none text-sm"
              disabled
            />
            <button className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition-colors">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {demoConversations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentDemo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentDemo === index
                ? 'bg-purple-600 w-6'
                : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatDemo;
