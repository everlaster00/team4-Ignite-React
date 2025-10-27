// src/stores/useSocketStore.js
import { create } from 'zustand';

// 💡 클라이언트 소켓 인스턴스 타입 선언
/**
 * @typedef {import('socket.io-client').Socket} ClientSocket
 */

export const useSocketStore = create((set) => ({
    /** @type {ClientSocket | null} */
    socket: null, 

    // 💡 연결된 소켓 인스턴스를 저장하는 함수
    /** @type {(newSocket: ClientSocket) => void} */
    setSocket: (newSocket) => set({ socket: newSocket }), 
}));