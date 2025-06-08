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
exports.id = "app/api/guilds/route";
exports.ids = ["app/api/guilds/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fguilds%2Froute&page=%2Fapi%2Fguilds%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fguilds%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fguilds%2Froute&page=%2Fapi%2Fguilds%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fguilds%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Pramod_Tiwari_Downloads_discord_bot_dashboard_app_api_guilds_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/guilds/route.ts */ \"(rsc)/./app/api/guilds/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/guilds/route\",\n        pathname: \"/api/guilds\",\n        filename: \"route\",\n        bundlePath: \"app/api/guilds/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Pramod Tiwari\\\\Downloads\\\\discord-bot\\\\dashboard\\\\app\\\\api\\\\guilds\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Pramod_Tiwari_Downloads_discord_bot_dashboard_app_api_guilds_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/guilds/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZndWlsZHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmd1aWxkcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmd1aWxkcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNQcmFtb2QlMjBUaXdhcmklNUNEb3dubG9hZHMlNUNkaXNjb3JkLWJvdCU1Q2Rhc2hib2FyZCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDUHJhbW9kJTIwVGl3YXJpJTVDRG93bmxvYWRzJTVDZGlzY29yZC1ib3QlNUNkYXNoYm9hcmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3VDO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGl2ZW1pbmQtZGFzaGJvYXJkLz82MTIxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFByYW1vZCBUaXdhcmlcXFxcRG93bmxvYWRzXFxcXGRpc2NvcmQtYm90XFxcXGRhc2hib2FyZFxcXFxhcHBcXFxcYXBpXFxcXGd1aWxkc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZ3VpbGRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZ3VpbGRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9ndWlsZHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxQcmFtb2QgVGl3YXJpXFxcXERvd25sb2Fkc1xcXFxkaXNjb3JkLWJvdFxcXFxkYXNoYm9hcmRcXFxcYXBwXFxcXGFwaVxcXFxndWlsZHNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2d1aWxkcy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fguilds%2Froute&page=%2Fapi%2Fguilds%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fguilds%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/guilds/route.ts":
/*!*********************************!*\
  !*** ./app/api/guilds/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || !session.user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { searchParams } = new URL(request.url);\n        const withBotOnly = searchParams.get(\"withBotOnly\") === \"true\";\n        // Get user's Discord access token from the database\n        const account = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.account.findFirst({\n            where: {\n                userId: session.user.id,\n                provider: \"discord\"\n            }\n        });\n        if (!account?.access_token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Discord access token not found\"\n            }, {\n                status: 400\n            });\n        }\n        // Fetch user's Discord guilds from Discord API\n        const discordResponse = await fetch(\"https://discord.com/api/v10/users/@me/guilds\", {\n            headers: {\n                \"Authorization\": `Bearer ${account.access_token}`,\n                \"Content-Type\": \"application/json\"\n            }\n        });\n        if (!discordResponse.ok) {\n            console.error(\"Discord API error:\", discordResponse.status, discordResponse.statusText);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to fetch Discord guilds\"\n            }, {\n                status: 500\n            });\n        }\n        const userGuilds = await discordResponse.json();\n        // Filter guilds where user can manage server (permission to invite bots)\n        const manageableGuilds = userGuilds.filter((guild)=>{\n            const permissions = BigInt(guild.permissions);\n            const MANAGE_GUILD = BigInt(0x20) // 32 - Manage Server permission\n            ;\n            const ADMINISTRATOR = BigInt(0x8) // 8 - Administrator permission\n            ;\n            return guild.owner || (permissions & (MANAGE_GUILD | ADMINISTRATOR)) !== BigInt(0);\n        }) // Check which guilds have the bot by looking for archived channels or watched channels\n        ;\n        const guildsWithBot = await Promise.all(manageableGuilds.map(async (guild)=>{\n            const [archivedCount, watchedCount] = await Promise.all([\n                _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.archivedChannel.count({\n                    where: {\n                        guildId: guild.id\n                    }\n                }),\n                _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.watchedChannel.count({\n                    where: {\n                        guildId: guild.id\n                    }\n                })\n            ]);\n            const hasBot = archivedCount > 0 || watchedCount > 0;\n            return {\n                ...guild,\n                hasBot,\n                canInvite: guild.owner || (BigInt(guild.permissions) & (BigInt(0x20) | BigInt(0x8))) !== BigInt(0),\n                stats: hasBot ? {\n                    archivedChannels: archivedCount,\n                    watchedChannels: watchedCount\n                } : undefined\n            };\n        }));\n        const filteredGuilds = withBotOnly ? guildsWithBot.filter((guild)=>guild.hasBot) : guildsWithBot;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            guilds: filteredGuilds,\n            total: filteredGuilds.length\n        });\n    } catch (error) {\n        console.error(\"Error fetching guilds:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch guilds\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSVU7WUFDTjtRQUNGO1FBR0YsTUFBTUMsaUJBQWlCeEMsY0FDbkJ3QixjQUFjUCxNQUFNLENBQUNDLENBQUFBLFFBQVNBLE1BQU1nQixNQUFNLElBQzFDVjtRQUVKLE9BQU90QyxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQ3ZCK0MsUUFBUUQ7WUFDUkUsT0FBT0YsZUFBZUcsTUFBTTtRQUM5QjtJQUNGLEVBQUUsT0FBT2hELE9BQU87UUFDZGtCLFFBQVFsQixLQUFLLENBQUMsMEJBQTBCQTtRQUN4QyxPQUFPVCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQXlCLEdBQ2xDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGl2ZW1pbmQtZGFzaGJvYXJkLy4vYXBwL2FwaS9ndWlsZHMvcm91dGUudHM/NmVlMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnXHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJ1xyXG5cclxuaW50ZXJmYWNlIERpc2NvcmRHdWlsZCB7XHJcbiAgaWQ6IHN0cmluZ1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIGljb246IHN0cmluZyB8IG51bGxcclxuICBvd25lcjogYm9vbGVhblxyXG4gIHBlcm1pc3Npb25zOiBzdHJpbmdcclxuICBwZXJtaXNzaW9uc19uZXc6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxyXG4gICAgaWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybClcclxuICAgIGNvbnN0IHdpdGhCb3RPbmx5ID0gc2VhcmNoUGFyYW1zLmdldCgnd2l0aEJvdE9ubHknKSA9PT0gJ3RydWUnXHJcblxyXG4gICAgLy8gR2V0IHVzZXIncyBEaXNjb3JkIGFjY2VzcyB0b2tlbiBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IHByaXNtYS5hY2NvdW50LmZpbmRGaXJzdCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgdXNlcklkOiAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQsXHJcbiAgICAgICAgcHJvdmlkZXI6ICdkaXNjb3JkJ1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGlmICghYWNjb3VudD8uYWNjZXNzX3Rva2VuKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRGlzY29yZCBhY2Nlc3MgdG9rZW4gbm90IGZvdW5kJyB9LCB7IHN0YXR1czogNDAwIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmV0Y2ggdXNlcidzIERpc2NvcmQgZ3VpbGRzIGZyb20gRGlzY29yZCBBUElcclxuICAgIGNvbnN0IGRpc2NvcmRSZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2Rpc2NvcmQuY29tL2FwaS92MTAvdXNlcnMvQG1lL2d1aWxkcycsIHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2FjY291bnQuYWNjZXNzX3Rva2VufWAsXHJcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGlmICghZGlzY29yZFJlc3BvbnNlLm9rKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Rpc2NvcmQgQVBJIGVycm9yOicsIGRpc2NvcmRSZXNwb25zZS5zdGF0dXMsIGRpc2NvcmRSZXNwb25zZS5zdGF0dXNUZXh0KVxyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCBEaXNjb3JkIGd1aWxkcycgfSwgeyBzdGF0dXM6IDUwMCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVzZXJHdWlsZHM6IERpc2NvcmRHdWlsZFtdID0gYXdhaXQgZGlzY29yZFJlc3BvbnNlLmpzb24oKVxyXG5cclxuICAgIC8vIEZpbHRlciBndWlsZHMgd2hlcmUgdXNlciBjYW4gbWFuYWdlIHNlcnZlciAocGVybWlzc2lvbiB0byBpbnZpdGUgYm90cylcclxuICAgIGNvbnN0IG1hbmFnZWFibGVHdWlsZHMgPSB1c2VyR3VpbGRzLmZpbHRlcihndWlsZCA9PiB7XHJcbiAgICAgIGNvbnN0IHBlcm1pc3Npb25zID0gQmlnSW50KGd1aWxkLnBlcm1pc3Npb25zKVxyXG4gICAgICBjb25zdCBNQU5BR0VfR1VJTEQgPSBCaWdJbnQoMHgyMCkgLy8gMzIgLSBNYW5hZ2UgU2VydmVyIHBlcm1pc3Npb25cclxuICAgICAgY29uc3QgQURNSU5JU1RSQVRPUiA9IEJpZ0ludCgweDgpIC8vIDggLSBBZG1pbmlzdHJhdG9yIHBlcm1pc3Npb25cclxuICAgICAgXHJcbiAgICAgIHJldHVybiBndWlsZC5vd25lciB8fCAocGVybWlzc2lvbnMgJiAoTUFOQUdFX0dVSUxEIHwgQURNSU5JU1RSQVRPUikpICE9PSBCaWdJbnQoMClcclxuICAgIH0pICAgIC8vIENoZWNrIHdoaWNoIGd1aWxkcyBoYXZlIHRoZSBib3QgYnkgbG9va2luZyBmb3IgYXJjaGl2ZWQgY2hhbm5lbHMgb3Igd2F0Y2hlZCBjaGFubmVsc1xyXG4gICAgY29uc3QgZ3VpbGRzV2l0aEJvdCA9IGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICBtYW5hZ2VhYmxlR3VpbGRzLm1hcChhc3luYyAoZ3VpbGQpID0+IHtcclxuICAgICAgICBjb25zdCBbYXJjaGl2ZWRDb3VudCwgd2F0Y2hlZENvdW50XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgIHByaXNtYS5hcmNoaXZlZENoYW5uZWwuY291bnQoeyB3aGVyZTogeyBndWlsZElkOiBndWlsZC5pZCB9IH0pLFxyXG4gICAgICAgICAgcHJpc21hLndhdGNoZWRDaGFubmVsLmNvdW50KHsgd2hlcmU6IHsgZ3VpbGRJZDogZ3VpbGQuaWQgfSB9KVxyXG4gICAgICAgIF0pXHJcblxyXG4gICAgICAgIGNvbnN0IGhhc0JvdCA9IGFyY2hpdmVkQ291bnQgPiAwIHx8IHdhdGNoZWRDb3VudCA+IDBcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLmd1aWxkLFxyXG4gICAgICAgICAgaGFzQm90LFxyXG4gICAgICAgICAgY2FuSW52aXRlOiBndWlsZC5vd25lciB8fCAoQmlnSW50KGd1aWxkLnBlcm1pc3Npb25zKSAmIChCaWdJbnQoMHgyMCkgfCBCaWdJbnQoMHg4KSkpICE9PSBCaWdJbnQoMCksXHJcbiAgICAgICAgICBzdGF0czogaGFzQm90ID8ge1xyXG4gICAgICAgICAgICBhcmNoaXZlZENoYW5uZWxzOiBhcmNoaXZlZENvdW50LFxyXG4gICAgICAgICAgICB3YXRjaGVkQ2hhbm5lbHM6IHdhdGNoZWRDb3VudFxyXG4gICAgICAgICAgfSA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIClcclxuXHJcbiAgICBjb25zdCBmaWx0ZXJlZEd1aWxkcyA9IHdpdGhCb3RPbmx5IFxyXG4gICAgICA/IGd1aWxkc1dpdGhCb3QuZmlsdGVyKGd1aWxkID0+IGd1aWxkLmhhc0JvdClcclxuICAgICAgOiBndWlsZHNXaXRoQm90XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgZ3VpbGRzOiBmaWx0ZXJlZEd1aWxkcyxcclxuICAgICAgdG90YWw6IGZpbHRlcmVkR3VpbGRzLmxlbmd0aFxyXG4gICAgfSlcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZ3VpbGRzOicsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIGd1aWxkcycgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJHRVQiLCJyZXF1ZXN0Iiwic2Vzc2lvbiIsInVzZXIiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJ3aXRoQm90T25seSIsImdldCIsImFjY291bnQiLCJmaW5kRmlyc3QiLCJ3aGVyZSIsInVzZXJJZCIsImlkIiwicHJvdmlkZXIiLCJhY2Nlc3NfdG9rZW4iLCJkaXNjb3JkUmVzcG9uc2UiLCJmZXRjaCIsImhlYWRlcnMiLCJvayIsImNvbnNvbGUiLCJzdGF0dXNUZXh0IiwidXNlckd1aWxkcyIsIm1hbmFnZWFibGVHdWlsZHMiLCJmaWx0ZXIiLCJndWlsZCIsInBlcm1pc3Npb25zIiwiQmlnSW50IiwiTUFOQUdFX0dVSUxEIiwiQURNSU5JU1RSQVRPUiIsIm93bmVyIiwiZ3VpbGRzV2l0aEJvdCIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJhcmNoaXZlZENvdW50Iiwid2F0Y2hlZENvdW50IiwiYXJjaGl2ZWRDaGFubmVsIiwiY291bnQiLCJndWlsZElkIiwid2F0Y2hlZENoYW5uZWwiLCJoYXNCb3QiLCJjYW5JbnZpdGUiLCJzdGF0cyIsImFyY2hpdmVkQ2hhbm5lbHMiLCJ3YXRjaGVkQ2hhbm5lbHMiLCJ1bmRlZmluZWQiLCJmaWx0ZXJlZEd1aWxkcyIsImd1aWxkcyIsInRvdGFsIiwibGVuZ3RoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/guilds/route.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@auth","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fguilds%2Froute&page=%2Fapi%2Fguilds%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fguilds%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();