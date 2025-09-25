module.exports = [
"[project]/src/components/SubmitButton.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 파스칼 케이스
// 이름 짓는 방법
// 케밥케이스, 카멜케이스, 파스칼케이스
// 파스칼 케이스는 = 대문자로 시작, 단어시작이 대문자
__turbopack_context__.s([
    "SubmitButton",
    ()=>SubmitButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function SubmitButton({ children, isPending, loadingText = '처리중...' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "submit",
        disabled: isPending,
        className: `px-6 py-2 rounded text-white transition-all ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}
    `,
        children: isPending ? loadingText : children
    }, void 0, false, {
        fileName: "[project]/src/components/SubmitButton.js",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/actions/data:77f431 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"601fff1fcffd8a8c32cc2e3cbc27595f53691955ff":"createComment"},"src/app/actions/post-actions.js",""] */ __turbopack_context__.s([
    "createComment",
    ()=>createComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var createComment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("601fff1fcffd8a8c32cc2e3cbc27595f53691955ff", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "createComment"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcG9zdC1hY3Rpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgcmVkaXJlY3QgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJztcblxuLy8gcG9zdC1hY3Rpb25zLmpzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUG9zdChwcmV2U3RhdGUsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRpdGxlID0gZm9ybURhdGEuZ2V0KCd0aXRsZScpO1xuICBjb25zdCBjb250ZW50ID0gZm9ybURhdGEuZ2V0KCdjb250ZW50Jyk7XG5cbiAgaWYgKCF0aXRsZSB8fCB0aXRsZS5sZW5ndGggPCAzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiAn7KCc66qp7J2AIOy1nOyGjCAz7J6QIOydtOyDgSDsnoXroKXtlbTso7zshLjsmpQuJyxcbiAgICAgIHZhbHVlczogeyB0aXRsZSwgY29udGVudCB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoIWNvbnRlbnQgfHwgY29udGVudC5sZW5ndGggPCAxMCkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogJ+uCtOyaqeydgCDstZzshowgMTDsnpAg7J207IOBIOyeheugpe2VtOyjvOyEuOyalC4nLFxuICAgICAgdmFsdWVzOiB7IHRpdGxlLCBjb250ZW50IH0sXG4gICAgfTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8g7Iuk7KCc66GcIERC7JeQIOyggOyepe2VmOqxsOuCmCBBUEnrpbwg7Zi47Lac7ZW07JW87ZWoLlxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDMwMDApKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6ICfqsozsi5zquIAg7J6R7ISx7JeQIOyEseqzte2WiOyKteuLiOuLpCEnLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiAn7ISc67KEIOyYpOulmOqwgCDrsJzsg53tlojsirXri4jri6QuIOuLpOyLnCDsi5zrj4TtlbTso7zshLjsmpQuJyxcbiAgICAgIHZhbHVlczogeyB0aXRsZSwgY29udGVudCB9LFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQocHJldlN0YXRlLCBmb3JtRGF0YSkge1xuICBjb25zdCBjb250ZW50ID0gZm9ybURhdGEuZ2V0KCdjb250ZW50Jyk7XG5cbiAgaWYgKCFjb250ZW50IHx8IGNvbnRlbnQubGVuZ3RoIDwgMSkge1xuICAgIHJldHVybiB7IGVycm9yOiAn64yT6riA7J2EIOyeheugpe2VtOyjvOyEuOyalCcgfTtcbiAgfVxuXG4gIC8vIOuMk+q4gCDsoIDsnqUgKOyYiOyLnClcbiAgLy8gYXdhaXQgZGIuY29tbWVudC5jcmVhdGUoe1xuICAvLyAgIHBvc3RJZCxcbiAgLy8gICBjb250ZW50LFxuICAvLyAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKVxuICAvLyB9KVxuXG4gIGNvbnN0IHBvc3RJZCA9ICcxJztcblxuICBjb25zb2xlLmxvZygn7IOIIOuMk+q4gDonLCB7IHBvc3RJZCwgY29udGVudCB9KTtcblxuICAvLyDtmITsnqwg7Y6Y7J207KeAIOyDiOuhnOqzoOy5qCAo7LqQ7IucIOustO2aqO2ZlClcbiAgLy8gcmV2YWxpZGF0ZVBhdGgoYC9wb3N0c2ApO1xuXG4gIC8vIOuYkOuKlCDri6Trpbgg7Y6Y7J207KeA66GcIOydtOuPmVxuICByZWRpcmVjdChgL3Bvc3QvJHtwb3N0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVQb3N0KCkge1xuICAvLyDqsozsi5zquIAg7IKt7KCcICjsmIjsi5wpXG4gIC8vIGF3YWl0IGRiLnBvc3QuZGVsZXRlKHsgd2hlcmU6IHsgaWQgfSB9KVxuXG4gIGNvbnN0IGlkID0gJzEnO1xuICBjb25zb2xlLmxvZygn6rKM7Iuc6riAIOyCreygnCA6JywgaWQpO1xuXG4gIC8vIOuqqeuhnSDtjpjsnbTsp4DroZwg7J2064+ZXG4gIHJlZGlyZWN0KCcvcG9zdHMnKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1NBd0NzQiJ9
}),
"[project]/src/app/post/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SubmitButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SubmitButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$77f431__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:77f431 [app-ssr] (ecmascript) <text/javascript>");
'use client';
;
;
;
;
function PostPage() {
    const [state, formAction, isPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActionState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$77f431__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createComment"], {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-4",
                children: "댓글 작성"
            }, void 0, false, {
                fileName: "[project]/src/app/post/page.js",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                action: formAction,
                className: "space-y-4 max-w-2xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block mb-2 font-semibold",
                            children: "내용"
                        }, void 0, false, {
                            fileName: "[project]/src/app/post/page.js",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            name: "content",
                            rows: "6",
                            className: "w-full px-3 py-2 border rounded",
                            placeholder: "내용을 입력해주세요 (최소 10자)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/post/page.js",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SubmitButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubmitButton"], {
                            isPending: isPending,
                            children: "작성하기"
                        }, void 0, false, {
                            fileName: "[project]/src/app/post/page.js",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/post/page.js",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/post/page.js",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/post/page.js",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file must be bundled in the app's client layer, it shouldn't be directly
// imported by the server.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    callServer: null,
    createServerReference: null,
    findSourceMapURL: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    callServer: function() {
        return _appcallserver.callServer;
    },
    createServerReference: function() {
        return _client.createServerReference;
    },
    findSourceMapURL: function() {
        return _appfindsourcemapurl.findSourceMapURL;
    }
});
const _appcallserver = __turbopack_context__.r("[project]/node_modules/next/dist/client/app-call-server.js [app-ssr] (ecmascript)");
const _appfindsourcemapurl = __turbopack_context__.r("[project]/node_modules/next/dist/client/app-find-source-map-url.js [app-ssr] (ecmascript)");
const _client = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-server-dom-turbopack-client.js [app-ssr] (ecmascript)"); //# sourceMappingURL=action-client-wrapper.js.map
}),
];

//# sourceMappingURL=_4ad49d2d._.js.map