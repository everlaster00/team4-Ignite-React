// src/lib/socket_io/socketPromise.js

// 💡 1. 전역 인스턴스를 저장할 변수를 추가합니다. (get/set이 공유)
let globalIoInstance = null; 

// 2. Promise를 해결할 함수와 Promise 자체를 관리합니다.
let resolveIo = null;
let ioPromise = null;

// 💡 3. Promise를 생성하는 함수
const createIoPromise = () => new Promise(resolve => {
    resolveIo = resolve;
});


/**
 * Socket.IO 인스턴스를 Promise로 반환합니다. 
 * 인스턴스가 아직 생성되지 않았다면, 생성될 때까지 기다립니다.
 * @returns {Promise<import('socket.io').Server>} Socket.IO 서버 인스턴스
 */
export const getSocketIoPromise = () => {
    // 💡 A. 인스턴스가 이미 존재하면 (즉, setSocketIoInstance가 이미 호출되었다면)
    // 새로운 Promise를 만들어 즉시 그 인스턴스로 해결되도록 보장합니다.
    if (globalIoInstance) {
        return Promise.resolve(globalIoInstance);
    }
    
    // B. 인스턴스가 아직 생성되지 않았다면, 현재 ioPromise를 사용하거나 새로 만듭니다.
    if (!ioPromise) {
        ioPromise = createIoPromise();
    }
    
    // C. Promise를 반환하여 인스턴스가 생성될 때까지 기다리도록 강제합니다.
    return ioPromise; 
};

/**
 * Socket.IO 서버 인스턴스가 성공적으로 생성되었을 때 호출되어 Promise를 해결합니다.
 * @param {import('socket.io').Server} io - 생성된 Socket.IO 서버 인스턴스
 */
export const setSocketIoInstance = (io) => {
    // 💡 1. 전역 인스턴스 변수에 저장합니다. (생성되었음을 기록)
    globalIoInstance = io; 
    
    // 2. 대기 중인 Promise를 해결합니다.
    if (resolveIo) {
        resolveIo(io);
        // resolve는 한 번만 작동해야 하므로 이후 대기는 globalIoInstance를 통해 처리됩니다.
        resolveIo = null;
        ioPromise = null; 
    }
};