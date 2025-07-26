'use client';

import { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Send } from 'lucide-react';
import { Card, CardFooter } from 'components/ui/card';
import { ScrollArea } from 'components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isUser: boolean;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI coding assistant. How can I help you today?",
      timestamp: '01:19 PM',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'd be happy to help you with that! What specific coding task would you like assistance with?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden border-1 border-accent bg-accent/30">
      <ScrollArea className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            className={`flex flex-col space-y-1 ${message.isUser ? 'items-end' : 'items-start'}`}
            key={message.id}
          >
            <div className={'max-w-[85%] rounded-xl p-4'}>
              <p className="text-sm">{message.content}</p>
            </div>
            <span className="text-muted-foreground text-xs">
              {message.timestamp}
            </span>
          </div>
        ))}
      </ScrollArea>

      <CardFooter className="flex flex-col space-y-2 border-t p-2">
        <div className="flex w-full items-center space-x-2">
          <Input
            className="flex-1 rounded-lg border-border/50 bg-background/50 transition-all focus:bg-background"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            value={input}
          />
          <Button className="rounded-lg px-4" onClick={handleSend} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">
          Obby may make mistakes. Please use with discretion.
        </p>
      </CardFooter>
    </Card>
  );
}
