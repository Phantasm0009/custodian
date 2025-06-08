"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/channels/route";
exports.ids = ["app/api/channels/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchannels%2Froute&page=%2Fapi%2Fchannels%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchannels%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchannels%2Froute&page=%2Fapi%2Fchannels%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchannels%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Pramod_Tiwari_Downloads_discord_bot_dashboard_app_api_channels_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/channels/route.ts */ \"(rsc)/./app/api/channels/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/channels/route\",\n        pathname: \"/api/channels\",\n        filename: \"route\",\n        bundlePath: \"app/api/channels/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Pramod Tiwari\\\\Downloads\\\\discord-bot\\\\dashboard\\\\app\\\\api\\\\channels\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Pramod_Tiwari_Downloads_discord_bot_dashboard_app_api_channels_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/channels/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjaGFubmVscyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY2hhbm5lbHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjaGFubmVscyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNQcmFtb2QlMjBUaXdhcmklNUNEb3dubG9hZHMlNUNkaXNjb3JkLWJvdCU1Q2Rhc2hib2FyZCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDUHJhbW9kJTIwVGl3YXJpJTVDRG93bmxvYWRzJTVDZGlzY29yZC1ib3QlNUNkYXNoYm9hcmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3lDO0FBQ3RIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGl2ZW1pbmQtZGFzaGJvYXJkLz8yODdmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFByYW1vZCBUaXdhcmlcXFxcRG93bmxvYWRzXFxcXGRpc2NvcmQtYm90XFxcXGRhc2hib2FyZFxcXFxhcHBcXFxcYXBpXFxcXGNoYW5uZWxzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jaGFubmVscy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NoYW5uZWxzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jaGFubmVscy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFByYW1vZCBUaXdhcmlcXFxcRG93bmxvYWRzXFxcXGRpc2NvcmQtYm90XFxcXGRhc2hib2FyZFxcXFxhcHBcXFxcYXBpXFxcXGNoYW5uZWxzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9jaGFubmVscy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchannels%2Froute&page=%2Fapi%2Fchannels%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchannels%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/channels/route.ts":
/*!***********************************!*\
  !*** ./app/api/channels/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { searchParams } = new URL(request.url);\n        const guildId = searchParams.get(\"guildId\");\n        if (!guildId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Guild ID required\"\n            }, {\n                status: 400\n            });\n        }\n        // Get user's Discord access token from the database\n        const account = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.account.findFirst({\n            where: {\n                userId: session.user.id,\n                provider: \"discord\"\n            }\n        });\n        if (!account?.access_token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Discord access token not found\"\n            }, {\n                status: 400\n            });\n        } // Fetch guild channels from Discord API\n        // Use the bot token for guild endpoints, as user tokens can't directly access these endpoints\n        const discordResponse = await fetch(`https://discord.com/api/v10/users/@me/guilds/${guildId}/channels`, {\n            headers: {\n                \"Authorization\": `Bearer ${account.access_token}`,\n                \"Content-Type\": \"application/json\"\n            }\n        });\n        if (!discordResponse.ok) {\n            const error = await discordResponse.text();\n            console.error(\"Discord API error:\", discordResponse.status, discordResponse.statusText, error) // If unauthorized, it might be an expired token or insufficient permissions\n            ;\n            if (discordResponse.status === 401) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"Discord access token expired or has insufficient permissions. Please sign out and sign in again.\",\n                    code: \"TOKEN_EXPIRED\",\n                    channels: [\n                        {\n                            id: \"fallback-1\",\n                            name: \"general\",\n                            type: \"text\",\n                            category: \"Fallback Channels\"\n                        },\n                        {\n                            id: \"fallback-2\",\n                            name: \"announcements\",\n                            type: \"text\",\n                            category: \"Fallback Channels\"\n                        },\n                        {\n                            id: \"fallback-3\",\n                            name: \"help\",\n                            type: \"text\",\n                            category: \"Fallback Channels\"\n                        }\n                    ],\n                    isFallback: true\n                }, {\n                    status: 401\n                });\n            }\n            // If forbidden, the user might not have the necessary permissions\n            if (discordResponse.status === 403) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"Access denied to this Discord server. You may not have permission to view channels.\",\n                    code: \"ACCESS_DENIED\",\n                    channels: [\n                        {\n                            id: \"fallback-1\",\n                            name: \"general\",\n                            type: \"text\",\n                            category: \"Fallback Channels\"\n                        },\n                        {\n                            id: \"fallback-2\",\n                            name: \"announcements\",\n                            type: \"text\",\n                            category: \"Fallback Channels\"\n                        },\n                        {\n                            id: \"fallback-3\",\n                            name: \"help\",\n                            type: \"text\",\n                            category: \"Fallback Channels\"\n                        }\n                    ],\n                    isFallback: true\n                }, {\n                    status: 403\n                });\n            }\n            // For other errors, provide fallback with error details\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to fetch Discord channels\",\n                details: `Discord API returned ${discordResponse.status}`,\n                channels: [\n                    {\n                        id: \"fallback-1\",\n                        name: \"general\",\n                        type: \"text\",\n                        category: \"Fallback Channels\"\n                    },\n                    {\n                        id: \"fallback-2\",\n                        name: \"announcements\",\n                        type: \"text\",\n                        category: \"Fallback Channels\"\n                    },\n                    {\n                        id: \"fallback-3\",\n                        name: \"help\",\n                        type: \"text\",\n                        category: \"Fallback Channels\"\n                    }\n                ],\n                isFallback: true\n            }, {\n                status: 500\n            });\n        }\n        const channels = await discordResponse.json();\n        // Filter to only text channels (type 0) and voice channels (type 2) \n        // and exclude categories (type 4) and threads\n        const filteredChannels = channels.filter((channel)=>channel.type === 0 || channel.type === 2) // 0 = text, 2 = voice\n        .map((channel)=>({\n                id: channel.id,\n                name: channel.name,\n                type: channel.type === 0 ? \"text\" : \"voice\",\n                category: channel.parent_id ? channels.find((c)=>c.id === channel.parent_id)?.name : null,\n                position: channel.position || 0\n            })).sort((a, b)=>a.position - b.position);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            channels: filteredChannels,\n            guildId\n        });\n    } catch (error) {\n        console.error(\"Error fetching channels:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch channels\",\n            channels: [\n                {\n                    id: \"fallback-1\",\n                    name: \"general\",\n                    type: \"text\",\n                    category: \"Fallback Channels (Error)\"\n                },\n                {\n                    id: \"fallback-2\",\n                    name: \"announcements\",\n                    type: \"text\",\n                    category: \"Fallback Channels (Error)\"\n                },\n                {\n                    id: \"fallback-3\",\n                    name: \"help\",\n                    type: \"text\",\n                    category: \"Fallback Channels (Error)\"\n                }\n            ],\n            isFallback: true\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qm9CLFFBQVFwQixLQUFLLENBQUMsNEJBQTRCQTtRQUMxQyxPQUFPUixxREFBWUEsQ0FBQ08sSUFBSSxDQUN0QjtZQUNFQyxPQUFPO1lBQ1B1QixVQUFVO2dCQUNSO29CQUFFWCxJQUFJO29CQUFjWSxNQUFNO29CQUFXQyxNQUFNO29CQUFRQyxVQUFVO2dCQUE0QjtnQkFDekY7b0JBQUVkLElBQUk7b0JBQWNZLE1BQU07b0JBQWlCQyxNQUFNO29CQUFRQyxVQUFVO2dCQUE0QjtnQkFDL0Y7b0JBQUVkLElBQUk7b0JBQWNZLE1BQU07b0JBQVFDLE1BQU07b0JBQVFDLFVBQVU7Z0JBQTRCO2FBQ3ZGO1lBQ0RDLFlBQVk7UUFDZCxHQUNBO1lBQUUxQixRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hpdmVtaW5kLWRhc2hib2FyZC8uL2FwcC9hcGkvY2hhbm5lbHMvcm91dGUudHM/YjQxNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnXHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcclxuICAgIGlmICghc2Vzc2lvbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKVxyXG4gICAgY29uc3QgZ3VpbGRJZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ2d1aWxkSWQnKVxyXG5cclxuICAgIGlmICghZ3VpbGRJZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogJ0d1aWxkIElEIHJlcXVpcmVkJyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHVzZXIncyBEaXNjb3JkIGFjY2VzcyB0b2tlbiBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IHByaXNtYS5hY2NvdW50LmZpbmRGaXJzdCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgdXNlcklkOiAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQsXHJcbiAgICAgICAgcHJvdmlkZXI6ICdkaXNjb3JkJ1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGlmICghYWNjb3VudD8uYWNjZXNzX3Rva2VuKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRGlzY29yZCBhY2Nlc3MgdG9rZW4gbm90IGZvdW5kJyB9LCB7IHN0YXR1czogNDAwIH0pXHJcbiAgICB9ICAgIC8vIEZldGNoIGd1aWxkIGNoYW5uZWxzIGZyb20gRGlzY29yZCBBUElcclxuICAgIC8vIFVzZSB0aGUgYm90IHRva2VuIGZvciBndWlsZCBlbmRwb2ludHMsIGFzIHVzZXIgdG9rZW5zIGNhbid0IGRpcmVjdGx5IGFjY2VzcyB0aGVzZSBlbmRwb2ludHNcclxuICAgIGNvbnN0IGRpc2NvcmRSZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2Rpc2NvcmQuY29tL2FwaS92MTAvdXNlcnMvQG1lL2d1aWxkcy8ke2d1aWxkSWR9L2NoYW5uZWxzYCwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YWNjb3VudC5hY2Nlc3NfdG9rZW59YCxcclxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgaWYgKCFkaXNjb3JkUmVzcG9uc2Uub2spIHtcclxuICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCBkaXNjb3JkUmVzcG9uc2UudGV4dCgpXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Rpc2NvcmQgQVBJIGVycm9yOicsIGRpc2NvcmRSZXNwb25zZS5zdGF0dXMsIGRpc2NvcmRSZXNwb25zZS5zdGF0dXNUZXh0LCBlcnJvcikgICAgICAvLyBJZiB1bmF1dGhvcml6ZWQsIGl0IG1pZ2h0IGJlIGFuIGV4cGlyZWQgdG9rZW4gb3IgaW5zdWZmaWNpZW50IHBlcm1pc3Npb25zXHJcbiAgICAgIGlmIChkaXNjb3JkUmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcclxuICAgICAgICAgIGVycm9yOiAnRGlzY29yZCBhY2Nlc3MgdG9rZW4gZXhwaXJlZCBvciBoYXMgaW5zdWZmaWNpZW50IHBlcm1pc3Npb25zLiBQbGVhc2Ugc2lnbiBvdXQgYW5kIHNpZ24gaW4gYWdhaW4uJyxcclxuICAgICAgICAgIGNvZGU6ICdUT0tFTl9FWFBJUkVEJyxcclxuICAgICAgICAgIGNoYW5uZWxzOiBbXHJcbiAgICAgICAgICAgIHsgaWQ6ICdmYWxsYmFjay0xJywgbmFtZTogJ2dlbmVyYWwnLCB0eXBlOiAndGV4dCcsIGNhdGVnb3J5OiAnRmFsbGJhY2sgQ2hhbm5lbHMnIH0sXHJcbiAgICAgICAgICAgIHsgaWQ6ICdmYWxsYmFjay0yJywgbmFtZTogJ2Fubm91bmNlbWVudHMnLCB0eXBlOiAndGV4dCcsIGNhdGVnb3J5OiAnRmFsbGJhY2sgQ2hhbm5lbHMnIH0sXHJcbiAgICAgICAgICAgIHsgaWQ6ICdmYWxsYmFjay0zJywgbmFtZTogJ2hlbHAnLCB0eXBlOiAndGV4dCcsIGNhdGVnb3J5OiAnRmFsbGJhY2sgQ2hhbm5lbHMnIH1cclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBpc0ZhbGxiYWNrOiB0cnVlXHJcbiAgICAgICAgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gICAgICB9XHJcbiAgICAgICAgLy8gSWYgZm9yYmlkZGVuLCB0aGUgdXNlciBtaWdodCBub3QgaGF2ZSB0aGUgbmVjZXNzYXJ5IHBlcm1pc3Npb25zXHJcbiAgICAgIGlmIChkaXNjb3JkUmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcclxuICAgICAgICAgIGVycm9yOiAnQWNjZXNzIGRlbmllZCB0byB0aGlzIERpc2NvcmQgc2VydmVyLiBZb3UgbWF5IG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gdmlldyBjaGFubmVscy4nLFxyXG4gICAgICAgICAgY29kZTogJ0FDQ0VTU19ERU5JRUQnLFxyXG4gICAgICAgICAgY2hhbm5lbHM6IFtcclxuICAgICAgICAgICAgeyBpZDogJ2ZhbGxiYWNrLTEnLCBuYW1lOiAnZ2VuZXJhbCcsIHR5cGU6ICd0ZXh0JywgY2F0ZWdvcnk6ICdGYWxsYmFjayBDaGFubmVscycgfSxcclxuICAgICAgICAgICAgeyBpZDogJ2ZhbGxiYWNrLTInLCBuYW1lOiAnYW5ub3VuY2VtZW50cycsIHR5cGU6ICd0ZXh0JywgY2F0ZWdvcnk6ICdGYWxsYmFjayBDaGFubmVscycgfSxcclxuICAgICAgICAgICAgeyBpZDogJ2ZhbGxiYWNrLTMnLCBuYW1lOiAnaGVscCcsIHR5cGU6ICd0ZXh0JywgY2F0ZWdvcnk6ICdGYWxsYmFjayBDaGFubmVscycgfVxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIGlzRmFsbGJhY2s6IHRydWVcclxuICAgICAgICB9LCB7IHN0YXR1czogNDAzIH0pXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC8vIEZvciBvdGhlciBlcnJvcnMsIHByb3ZpZGUgZmFsbGJhY2sgd2l0aCBlcnJvciBkZXRhaWxzXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxyXG4gICAgICAgIGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIERpc2NvcmQgY2hhbm5lbHMnLFxyXG4gICAgICAgIGRldGFpbHM6IGBEaXNjb3JkIEFQSSByZXR1cm5lZCAke2Rpc2NvcmRSZXNwb25zZS5zdGF0dXN9YCxcclxuICAgICAgICBjaGFubmVsczogW1xyXG4gICAgICAgICAgeyBpZDogJ2ZhbGxiYWNrLTEnLCBuYW1lOiAnZ2VuZXJhbCcsIHR5cGU6ICd0ZXh0JywgY2F0ZWdvcnk6ICdGYWxsYmFjayBDaGFubmVscycgfSxcclxuICAgICAgICAgIHsgaWQ6ICdmYWxsYmFjay0yJywgbmFtZTogJ2Fubm91bmNlbWVudHMnLCB0eXBlOiAndGV4dCcsIGNhdGVnb3J5OiAnRmFsbGJhY2sgQ2hhbm5lbHMnIH0sXHJcbiAgICAgICAgICB7IGlkOiAnZmFsbGJhY2stMycsIG5hbWU6ICdoZWxwJywgdHlwZTogJ3RleHQnLCBjYXRlZ29yeTogJ0ZhbGxiYWNrIENoYW5uZWxzJyB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBpc0ZhbGxiYWNrOiB0cnVlXHJcbiAgICAgIH0sIHsgc3RhdHVzOiA1MDAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGFubmVscyA9IGF3YWl0IGRpc2NvcmRSZXNwb25zZS5qc29uKClcclxuXHJcbiAgICAvLyBGaWx0ZXIgdG8gb25seSB0ZXh0IGNoYW5uZWxzICh0eXBlIDApIGFuZCB2b2ljZSBjaGFubmVscyAodHlwZSAyKSBcclxuICAgIC8vIGFuZCBleGNsdWRlIGNhdGVnb3JpZXMgKHR5cGUgNCkgYW5kIHRocmVhZHNcclxuICAgIGNvbnN0IGZpbHRlcmVkQ2hhbm5lbHMgPSBjaGFubmVsc1xyXG4gICAgICAuZmlsdGVyKChjaGFubmVsOiBhbnkpID0+IGNoYW5uZWwudHlwZSA9PT0gMCB8fCBjaGFubmVsLnR5cGUgPT09IDIpIC8vIDAgPSB0ZXh0LCAyID0gdm9pY2VcclxuICAgICAgLm1hcCgoY2hhbm5lbDogYW55KSA9PiAoe1xyXG4gICAgICAgIGlkOiBjaGFubmVsLmlkLFxyXG4gICAgICAgIG5hbWU6IGNoYW5uZWwubmFtZSxcclxuICAgICAgICB0eXBlOiBjaGFubmVsLnR5cGUgPT09IDAgPyAndGV4dCcgOiAndm9pY2UnLFxyXG4gICAgICAgIGNhdGVnb3J5OiBjaGFubmVsLnBhcmVudF9pZCA/IGNoYW5uZWxzLmZpbmQoKGM6IGFueSkgPT4gYy5pZCA9PT0gY2hhbm5lbC5wYXJlbnRfaWQpPy5uYW1lIDogbnVsbCxcclxuICAgICAgICBwb3NpdGlvbjogY2hhbm5lbC5wb3NpdGlvbiB8fCAwXHJcbiAgICAgIH0pKVxyXG4gICAgICAuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IGEucG9zaXRpb24gLSBiLnBvc2l0aW9uKVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIGNoYW5uZWxzOiBmaWx0ZXJlZENoYW5uZWxzLFxyXG4gICAgICBndWlsZElkXHJcbiAgICB9KSAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNoYW5uZWxzOicsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IFxyXG4gICAgICAgIGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIGNoYW5uZWxzJyxcclxuICAgICAgICBjaGFubmVsczogW1xyXG4gICAgICAgICAgeyBpZDogJ2ZhbGxiYWNrLTEnLCBuYW1lOiAnZ2VuZXJhbCcsIHR5cGU6ICd0ZXh0JywgY2F0ZWdvcnk6ICdGYWxsYmFjayBDaGFubmVscyAoRXJyb3IpJyB9LFxyXG4gICAgICAgICAgeyBpZDogJ2ZhbGxiYWNrLTInLCBuYW1lOiAnYW5ub3VuY2VtZW50cycsIHR5cGU6ICd0ZXh0JywgY2F0ZWdvcnk6ICdGYWxsYmFjayBDaGFubmVscyAoRXJyb3IpJyB9LFxyXG4gICAgICAgICAgeyBpZDogJ2ZhbGxiYWNrLTMnLCBuYW1lOiAnaGVscCcsIHR5cGU6ICd0ZXh0JywgY2F0ZWdvcnk6ICdGYWxsYmFjayBDaGFubmVscyAoRXJyb3IpJyB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBpc0ZhbGxiYWNrOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiR0VUIiwicmVxdWVzdCIsInNlc3Npb24iLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJndWlsZElkIiwiZ2V0IiwiYWNjb3VudCIsImZpbmRGaXJzdCIsIndoZXJlIiwidXNlcklkIiwidXNlciIsImlkIiwicHJvdmlkZXIiLCJhY2Nlc3NfdG9rZW4iLCJkaXNjb3JkUmVzcG9uc2UiLCJmZXRjaCIsImhlYWRlcnMiLCJvayIsInRleHQiLCJjb25zb2xlIiwic3RhdHVzVGV4dCIsImNvZGUiLCJjaGFubmVscyIsIm5hbWUiLCJ0eXBlIiwiY2F0ZWdvcnkiLCJpc0ZhbGxiYWNrIiwiZGV0YWlscyIsImZpbHRlcmVkQ2hhbm5lbHMiLCJmaWx0ZXIiLCJjaGFubmVsIiwibWFwIiwicGFyZW50X2lkIiwiZmluZCIsImMiLCJwb3NpdGlvbiIsInNvcnQiLCJhIiwiYiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/channels/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/discord */ \"(rsc)/./node_modules/next-auth/providers/discord.js\");\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma),\n    providers: [\n        (0,next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: \"1380362496774246572\",\n            clientSecret: \"8JqV5zcdp3YmZUk4PCKqlI1VPTqauiGi\",\n            authorization: {\n                params: {\n                    scope: \"identify email guilds guilds.members.read bot\"\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async session ({ session, user }) {\n            if (session.user) {\n                session.user.id = user.id;\n            }\n            return session;\n        },\n        async signIn ({ user, account, profile }) {\n            // Only allow users who are admins in at least one guild\n            if (account?.provider === \"discord\" && profile) {\n                // You can add additional validation here\n                return true;\n            }\n            return false;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\",\n        error: \"/auth/error\"\n    },\n    session: {\n        strategy: \"database\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ3lEO0FBQ0w7QUFDbkI7QUFFMUIsTUFBTUcsY0FBK0I7SUFDMUNDLFNBQVNILG1FQUFhQSxDQUFDQywyQ0FBTUE7SUFDN0JHLFdBQVc7UUFDVEwsdUVBQWVBLENBQUM7WUFDZE0sVUFBVUMscUJBQTZCO1lBQ3ZDRyxjQUFjSCxrQ0FBaUM7WUFDL0NLLGVBQWU7Z0JBQ2JDLFFBQVE7b0JBQ05DLE9BQU87Z0JBQ1Q7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFQyxJQUFJLEVBQUU7WUFDN0IsSUFBSUQsUUFBUUMsSUFBSSxFQUFFO2dCQUNoQkQsUUFBUUMsSUFBSSxDQUFDQyxFQUFFLEdBQUdELEtBQUtDLEVBQUU7WUFDM0I7WUFDQSxPQUFPRjtRQUNUO1FBQ0EsTUFBTUcsUUFBTyxFQUFFRixJQUFJLEVBQUVHLE9BQU8sRUFBRUMsT0FBTyxFQUFFO1lBQ3JDLHdEQUF3RDtZQUN4RCxJQUFJRCxTQUFTRSxhQUFhLGFBQWFELFNBQVM7Z0JBQzlDLHlDQUF5QztnQkFDekMsT0FBTztZQUNUO1lBQ0EsT0FBTztRQUNUO0lBQ0Y7SUFDQUUsT0FBTztRQUNMSixRQUFRO1FBQ1JLLE9BQU87SUFDVDtJQUNBUixTQUFTO1FBQ1BTLFVBQVU7SUFDWjtBQUNGLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoaXZlbWluZC1kYXNoYm9hcmQvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCBEaXNjb3JkUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9kaXNjb3JkJ1xuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gJ0BhdXRoL3ByaXNtYS1hZGFwdGVyJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi9wcmlzbWEnXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSkgYXMgYW55LFxuICBwcm92aWRlcnM6IFtcbiAgICBEaXNjb3JkUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkRJU0NPUkRfQ0xJRU5UX0lEISxcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuRElTQ09SRF9DTElFTlRfU0VDUkVUISxcbiAgICAgIGF1dGhvcml6YXRpb246IHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgc2NvcGU6ICdpZGVudGlmeSBlbWFpbCBndWlsZHMgZ3VpbGRzLm1lbWJlcnMucmVhZCBib3QnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdXNlciB9KSB7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHVzZXIuaWRcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uXG4gICAgfSxcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50LCBwcm9maWxlIH0pIHtcbiAgICAgIC8vIE9ubHkgYWxsb3cgdXNlcnMgd2hvIGFyZSBhZG1pbnMgaW4gYXQgbGVhc3Qgb25lIGd1aWxkXG4gICAgICBpZiAoYWNjb3VudD8ucHJvdmlkZXIgPT09ICdkaXNjb3JkJyAmJiBwcm9maWxlKSB7XG4gICAgICAgIC8vIFlvdSBjYW4gYWRkIGFkZGl0aW9uYWwgdmFsaWRhdGlvbiBoZXJlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2F1dGgvc2lnbmluJyxcbiAgICBlcnJvcjogJy9hdXRoL2Vycm9yJ1xuICB9LFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6ICdkYXRhYmFzZSdcbiAgfVxufSJdLCJuYW1lcyI6WyJEaXNjb3JkUHJvdmlkZXIiLCJQcmlzbWFBZGFwdGVyIiwicHJpc21hIiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiRElTQ09SRF9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJESVNDT1JEX0NMSUVOVF9TRUNSRVQiLCJhdXRob3JpemF0aW9uIiwicGFyYW1zIiwic2NvcGUiLCJjYWxsYmFja3MiLCJzZXNzaW9uIiwidXNlciIsImlkIiwic2lnbkluIiwiYWNjb3VudCIsInByb2ZpbGUiLCJwcm92aWRlciIsInBhZ2VzIiwiZXJyb3IiLCJzdHJhdGVneSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hpdmVtaW5kLWRhc2hib2FyZC8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@auth","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchannels%2Froute&page=%2Fapi%2Fchannels%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchannels%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();