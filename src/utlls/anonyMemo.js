// src/utills/anonyMemo.js
const NICKNAME_KEY = "anonyNickname";
const PASSWORD_KEY = "anonyPassword";

export const saveAnonyMemo = (nickname, password) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(NICKNAME_KEY, nickname);
        localStorage.setItem(PASSWORD_KEY, password);
    }
};

export const getAnonyMemo = () => {
    if (typeof window !== 'undefined') {
        const nickname = localStorage.getItem(NICKNAME_KEY) || "";
        const password = localStorage.getItem(PASSWORD_KEY) || "";
        return { nickname, password };
    }
    return { nickname: "", password: "" };
};