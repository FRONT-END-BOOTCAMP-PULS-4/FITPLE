'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ChatBox.module.scss';
import { useAuthStore } from '@/stores/authStore';

interface ChatMessage {
  id: number;
  team_id: number;
  user_id: number;
  message: string;
  created_at: string;
}

interface ChatBoxProps {
  teamId: string;
}

const ChatBox = ({ teamId }: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const userId = useAuthStore((state) => state.id);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/member/chat/${teamId}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('채팅 불러오기 실패:', err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      await fetch(`/api/member/chat/${teamId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          message: input,
        }),
      });

      setInput('');
      await fetchMessages();
    } catch (err) {
      console.error('채팅 전송 실패:', err);
    }
  };

  // 메시지 자동 갱신 (polling)
  useEffect(() => {
    if (!teamId) return;

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [teamId]);

  // 메시지 자동 스크롤
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageBubble} ${
              msg.user_id === userId ? styles.myMessage : styles.otherMessage
            }`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
};

export default ChatBox;
