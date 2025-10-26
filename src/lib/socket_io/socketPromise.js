//src/lob/socketPromise.js
// io 인스턴스가 생성되었을 때 resolve 할 함수를 저장합니다.
let resolveIo;
const ioPromise = new Promise(resolve => {
    resolveIo = resolve;
});

/**
 * Socket.IO 인스턴스를 Promise로 반환합니다. 
 * 인스턴스가 아직 생성되지 않았다면, 생성될 때까지 기다립니다.
 * @returns {Promise<import('socket.io').Server>} Socket.IO 서버 인스턴스
 */
export const getSocketIoPromise = () => ioPromise;

/**
 * Socket.IO 서버 인스턴스가 성공적으로 생성되었을 때 호출되어 Promise를 해결합니다.
 * 이 함수는 src/app/api/socket.js 에서만 호출되어야 합니다.
 * @param {import('socket.io').Server} io - 생성된 Socket.IO 서버 인스턴스
 */
export const setSocketIoInstance = (io) => {
    if (resolveIo) {
        resolveIo(io);
        // resolve는 한 번만 작동해야 하므로 resolveIo를 null 처리해도 됩니다.
        // resolveIo = null;
    }
};