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
exports.id = "app/api/settings/route";
exports.ids = ["app/api/settings/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsettings%2Froute&page=%2Fapi%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsettings%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsettings%2Froute&page=%2Fapi%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsettings%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Pramod_Tiwari_Downloads_discord_bot_dashboard_app_api_settings_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/settings/route.ts */ \"(rsc)/./app/api/settings/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/settings/route\",\n        pathname: \"/api/settings\",\n        filename: \"route\",\n        bundlePath: \"app/api/settings/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Pramod Tiwari\\\\Downloads\\\\discord-bot\\\\dashboard\\\\app\\\\api\\\\settings\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Pramod_Tiwari_Downloads_discord_bot_dashboard_app_api_settings_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/settings/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzZXR0aW5ncyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc2V0dGluZ3MlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzZXR0aW5ncyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNQcmFtb2QlMjBUaXdhcmklNUNEb3dubG9hZHMlNUNkaXNjb3JkLWJvdCU1Q2Rhc2hib2FyZCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDUHJhbW9kJTIwVGl3YXJpJTVDRG93bmxvYWRzJTVDZGlzY29yZC1ib3QlNUNkYXNoYm9hcmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3lDO0FBQ3RIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGl2ZW1pbmQtZGFzaGJvYXJkLz84NGQ4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFByYW1vZCBUaXdhcmlcXFxcRG93bmxvYWRzXFxcXGRpc2NvcmQtYm90XFxcXGRhc2hib2FyZFxcXFxhcHBcXFxcYXBpXFxcXHNldHRpbmdzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zZXR0aW5ncy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3NldHRpbmdzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zZXR0aW5ncy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFByYW1vZCBUaXdhcmlcXFxcRG93bmxvYWRzXFxcXGRpc2NvcmQtYm90XFxcXGRhc2hib2FyZFxcXFxhcHBcXFxcYXBpXFxcXHNldHRpbmdzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9zZXR0aW5ncy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsettings%2Froute&page=%2Fapi%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsettings%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/settings/route.ts":
/*!***********************************!*\
  !*** ./app/api/settings/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\nasync function GET() {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // Mock settings data - in a real app, this would come from a database\n        const settings = {\n            general: {\n                botName: \"ArchiveMind\",\n                defaultPrefix: \"!\",\n                timezone: \"UTC\",\n                language: \"en\",\n                theme: \"dark\"\n            },\n            archive: {\n                autoArchiveEnabled: true,\n                retentionDays: 730,\n                compressionEnabled: true,\n                maxFileSize: 25 * 1024 * 1024,\n                allowedFileTypes: [\n                    \".txt\",\n                    \".pdf\",\n                    \".docx\",\n                    \".xlsx\",\n                    \".png\",\n                    \".jpg\",\n                    \".gif\"\n                ]\n            },\n            notifications: {\n                webhookUrl: \"\",\n                discordNotifications: true,\n                emailNotifications: false,\n                archiveCompleteNotify: true,\n                errorNotifications: true\n            },\n            permissions: {\n                adminRoles: [\n                    \"Administrator\",\n                    \"Moderator\"\n                ],\n                viewerRoles: [\n                    \"Member\"\n                ],\n                requirePermission: true\n            },\n            rateLimit: {\n                messagesPerBatch: 50,\n                batchDelay: 5000,\n                maxRetries: 3,\n                backoffMultiplier: 2\n            }\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(settings);\n    } catch (error) {\n        console.error(\"Error fetching settings:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch settings\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PUT(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const settings = await request.json();\n        // Mock settings update - in a real app, this would update the database\n        console.log(\"Updating settings:\", settings);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Settings updated successfully\"\n        });\n    } catch (error) {\n        console.error(\"Error updating settings:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to update settings\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NldHRpbmdzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF1RDtBQUNYO0FBQ0o7QUFFakMsZUFBZUc7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTUgsMkRBQWdCQSxDQUFDQyxrREFBV0E7UUFDbEQsSUFBSSxDQUFDRSxTQUFTO1lBQ1osT0FBT0oscURBQVlBLENBQUNLLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNwRTtRQUVBLHNFQUFzRTtRQUN0RSxNQUFNQyxXQUFXO1lBQ2ZDLFNBQVM7Z0JBQ1BDLFNBQVM7Z0JBQ1RDLGVBQWU7Z0JBQ2ZDLFVBQVU7Z0JBQ1ZDLFVBQVU7Z0JBQ1ZDLE9BQU87WUFDVDtZQUNBQyxTQUFTO2dCQUNQQyxvQkFBb0I7Z0JBQ3BCQyxlQUFlO2dCQUNmQyxvQkFBb0I7Z0JBQ3BCQyxhQUFhLEtBQUssT0FBTztnQkFDekJDLGtCQUFrQjtvQkFBQztvQkFBUTtvQkFBUTtvQkFBUztvQkFBUztvQkFBUTtvQkFBUTtpQkFBTztZQUM5RTtZQUNBQyxlQUFlO2dCQUNiQyxZQUFZO2dCQUNaQyxzQkFBc0I7Z0JBQ3RCQyxvQkFBb0I7Z0JBQ3BCQyx1QkFBdUI7Z0JBQ3ZCQyxvQkFBb0I7WUFDdEI7WUFDQUMsYUFBYTtnQkFDWEMsWUFBWTtvQkFBQztvQkFBaUI7aUJBQVk7Z0JBQzFDQyxhQUFhO29CQUFDO2lCQUFTO2dCQUN2QkMsbUJBQW1CO1lBQ3JCO1lBQ0FDLFdBQVc7Z0JBQ1RDLGtCQUFrQjtnQkFDbEJDLFlBQVk7Z0JBQ1pDLFlBQVk7Z0JBQ1pDLG1CQUFtQjtZQUNyQjtRQUNGO1FBRUEsT0FBT25DLHFEQUFZQSxDQUFDSyxJQUFJLENBQUNHO0lBQzNCLEVBQUUsT0FBT0YsT0FBTztRQUNkOEIsUUFBUTlCLEtBQUssQ0FBQyw0QkFBNEJBO1FBQzFDLE9BQU9OLHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBMkIsR0FDcEM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0Y7QUFFTyxlQUFlOEIsSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLE1BQU1sQyxVQUFVLE1BQU1ILDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBQ2xELElBQUksQ0FBQ0UsU0FBUztZQUNaLE9BQU9KLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxNQUFNQyxXQUFXLE1BQU04QixRQUFRakMsSUFBSTtRQUVuQyx1RUFBdUU7UUFDdkUrQixRQUFRRyxHQUFHLENBQUMsc0JBQXNCL0I7UUFFbEMsT0FBT1IscURBQVlBLENBQUNLLElBQUksQ0FBQztZQUN2Qm1DLFNBQVM7WUFDVEMsU0FBUztRQUNYO0lBQ0YsRUFBRSxPQUFPbkMsT0FBTztRQUNkOEIsUUFBUTlCLEtBQUssQ0FBQyw0QkFBNEJBO1FBQzFDLE9BQU9OLHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBNEIsR0FDckM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoaXZlbWluZC1kYXNoYm9hcmQvLi9hcHAvYXBpL3NldHRpbmdzL3JvdXRlLnRzPzkyYzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJ1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcclxuICAgIGlmICghc2Vzc2lvbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vY2sgc2V0dGluZ3MgZGF0YSAtIGluIGEgcmVhbCBhcHAsIHRoaXMgd291bGQgY29tZSBmcm9tIGEgZGF0YWJhc2VcclxuICAgIGNvbnN0IHNldHRpbmdzID0ge1xyXG4gICAgICBnZW5lcmFsOiB7XHJcbiAgICAgICAgYm90TmFtZTogJ0FyY2hpdmVNaW5kJyxcclxuICAgICAgICBkZWZhdWx0UHJlZml4OiAnIScsXHJcbiAgICAgICAgdGltZXpvbmU6ICdVVEMnLFxyXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxyXG4gICAgICAgIHRoZW1lOiAnZGFyaydcclxuICAgICAgfSxcclxuICAgICAgYXJjaGl2ZToge1xyXG4gICAgICAgIGF1dG9BcmNoaXZlRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICByZXRlbnRpb25EYXlzOiA3MzAsIC8vIDIgeWVhcnNcclxuICAgICAgICBjb21wcmVzc2lvbkVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgbWF4RmlsZVNpemU6IDI1ICogMTAyNCAqIDEwMjQsIC8vIDI1TUJcclxuICAgICAgICBhbGxvd2VkRmlsZVR5cGVzOiBbJy50eHQnLCAnLnBkZicsICcuZG9jeCcsICcueGxzeCcsICcucG5nJywgJy5qcGcnLCAnLmdpZiddXHJcbiAgICAgIH0sXHJcbiAgICAgIG5vdGlmaWNhdGlvbnM6IHtcclxuICAgICAgICB3ZWJob29rVXJsOiAnJyxcclxuICAgICAgICBkaXNjb3JkTm90aWZpY2F0aW9uczogdHJ1ZSxcclxuICAgICAgICBlbWFpbE5vdGlmaWNhdGlvbnM6IGZhbHNlLFxyXG4gICAgICAgIGFyY2hpdmVDb21wbGV0ZU5vdGlmeTogdHJ1ZSxcclxuICAgICAgICBlcnJvck5vdGlmaWNhdGlvbnM6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgcGVybWlzc2lvbnM6IHtcclxuICAgICAgICBhZG1pblJvbGVzOiBbJ0FkbWluaXN0cmF0b3InLCAnTW9kZXJhdG9yJ10sXHJcbiAgICAgICAgdmlld2VyUm9sZXM6IFsnTWVtYmVyJ10sXHJcbiAgICAgICAgcmVxdWlyZVBlcm1pc3Npb246IHRydWVcclxuICAgICAgfSxcclxuICAgICAgcmF0ZUxpbWl0OiB7XHJcbiAgICAgICAgbWVzc2FnZXNQZXJCYXRjaDogNTAsXHJcbiAgICAgICAgYmF0Y2hEZWxheTogNTAwMCxcclxuICAgICAgICBtYXhSZXRyaWVzOiAzLFxyXG4gICAgICAgIGJhY2tvZmZNdWx0aXBsaWVyOiAyXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oc2V0dGluZ3MpXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHNldHRpbmdzOicsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHNldHRpbmdzJyB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQVVQocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcclxuICAgIGlmICghc2Vzc2lvbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgcmVxdWVzdC5qc29uKClcclxuXHJcbiAgICAvLyBNb2NrIHNldHRpbmdzIHVwZGF0ZSAtIGluIGEgcmVhbCBhcHAsIHRoaXMgd291bGQgdXBkYXRlIHRoZSBkYXRhYmFzZVxyXG4gICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIHNldHRpbmdzOicsIHNldHRpbmdzKVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgIG1lc3NhZ2U6ICdTZXR0aW5ncyB1cGRhdGVkIHN1Y2Nlc3NmdWxseSdcclxuICAgIH0pXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHNldHRpbmdzOicsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIHVwZGF0ZSBzZXR0aW5ncycgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJHRVQiLCJzZXNzaW9uIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwic2V0dGluZ3MiLCJnZW5lcmFsIiwiYm90TmFtZSIsImRlZmF1bHRQcmVmaXgiLCJ0aW1lem9uZSIsImxhbmd1YWdlIiwidGhlbWUiLCJhcmNoaXZlIiwiYXV0b0FyY2hpdmVFbmFibGVkIiwicmV0ZW50aW9uRGF5cyIsImNvbXByZXNzaW9uRW5hYmxlZCIsIm1heEZpbGVTaXplIiwiYWxsb3dlZEZpbGVUeXBlcyIsIm5vdGlmaWNhdGlvbnMiLCJ3ZWJob29rVXJsIiwiZGlzY29yZE5vdGlmaWNhdGlvbnMiLCJlbWFpbE5vdGlmaWNhdGlvbnMiLCJhcmNoaXZlQ29tcGxldGVOb3RpZnkiLCJlcnJvck5vdGlmaWNhdGlvbnMiLCJwZXJtaXNzaW9ucyIsImFkbWluUm9sZXMiLCJ2aWV3ZXJSb2xlcyIsInJlcXVpcmVQZXJtaXNzaW9uIiwicmF0ZUxpbWl0IiwibWVzc2FnZXNQZXJCYXRjaCIsImJhdGNoRGVsYXkiLCJtYXhSZXRyaWVzIiwiYmFja29mZk11bHRpcGxpZXIiLCJjb25zb2xlIiwiUFVUIiwicmVxdWVzdCIsImxvZyIsInN1Y2Nlc3MiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/settings/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/discord */ \"(rsc)/./node_modules/next-auth/providers/discord.js\");\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma),\n    providers: [\n        (0,next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: \"1380362496774246572\",\n            clientSecret: \"8JqV5zcdp3YmZUk4PCKqlI1VPTqauiGi\",\n            authorization: {\n                params: {\n                    scope: \"identify email guilds\"\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async session ({ session, user }) {\n            if (session.user) {\n                session.user.id = user.id;\n            }\n            return session;\n        },\n        async signIn ({ user, account, profile }) {\n            // Only allow users who are admins in at least one guild\n            if (account?.provider === \"discord\" && profile) {\n                // You can add additional validation here\n                return true;\n            }\n            return false;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\",\n        error: \"/auth/error\"\n    },\n    session: {\n        strategy: \"database\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ3lEO0FBQ0w7QUFDbkI7QUFFMUIsTUFBTUcsY0FBK0I7SUFDMUNDLFNBQVNILG1FQUFhQSxDQUFDQywyQ0FBTUE7SUFDN0JHLFdBQVc7UUFDVEwsdUVBQWVBLENBQUM7WUFDZE0sVUFBVUMscUJBQTZCO1lBQ3ZDRyxjQUFjSCxrQ0FBaUM7WUFDL0NLLGVBQWU7Z0JBQ2JDLFFBQVE7b0JBQ05DLE9BQU87Z0JBQ1Q7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFQyxJQUFJLEVBQUU7WUFDN0IsSUFBSUQsUUFBUUMsSUFBSSxFQUFFO2dCQUNoQkQsUUFBUUMsSUFBSSxDQUFDQyxFQUFFLEdBQUdELEtBQUtDLEVBQUU7WUFDM0I7WUFDQSxPQUFPRjtRQUNUO1FBQ0EsTUFBTUcsUUFBTyxFQUFFRixJQUFJLEVBQUVHLE9BQU8sRUFBRUMsT0FBTyxFQUFFO1lBQ3JDLHdEQUF3RDtZQUN4RCxJQUFJRCxTQUFTRSxhQUFhLGFBQWFELFNBQVM7Z0JBQzlDLHlDQUF5QztnQkFDekMsT0FBTztZQUNUO1lBQ0EsT0FBTztRQUNUO0lBQ0Y7SUFDQUUsT0FBTztRQUNMSixRQUFRO1FBQ1JLLE9BQU87SUFDVDtJQUNBUixTQUFTO1FBQ1BTLFVBQVU7SUFDWjtBQUNGLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoaXZlbWluZC1kYXNoYm9hcmQvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCBEaXNjb3JkUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9kaXNjb3JkJ1xuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gJ0BhdXRoL3ByaXNtYS1hZGFwdGVyJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi9wcmlzbWEnXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSkgYXMgYW55LFxuICBwcm92aWRlcnM6IFtcbiAgICBEaXNjb3JkUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkRJU0NPUkRfQ0xJRU5UX0lEISxcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuRElTQ09SRF9DTElFTlRfU0VDUkVUISxcbiAgICAgIGF1dGhvcml6YXRpb246IHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgc2NvcGU6ICdpZGVudGlmeSBlbWFpbCBndWlsZHMnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdXNlciB9KSB7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHVzZXIuaWRcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uXG4gICAgfSxcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50LCBwcm9maWxlIH0pIHtcbiAgICAgIC8vIE9ubHkgYWxsb3cgdXNlcnMgd2hvIGFyZSBhZG1pbnMgaW4gYXQgbGVhc3Qgb25lIGd1aWxkXG4gICAgICBpZiAoYWNjb3VudD8ucHJvdmlkZXIgPT09ICdkaXNjb3JkJyAmJiBwcm9maWxlKSB7XG4gICAgICAgIC8vIFlvdSBjYW4gYWRkIGFkZGl0aW9uYWwgdmFsaWRhdGlvbiBoZXJlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2F1dGgvc2lnbmluJyxcbiAgICBlcnJvcjogJy9hdXRoL2Vycm9yJ1xuICB9LFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6ICdkYXRhYmFzZSdcbiAgfVxufSJdLCJuYW1lcyI6WyJEaXNjb3JkUHJvdmlkZXIiLCJQcmlzbWFBZGFwdGVyIiwicHJpc21hIiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiRElTQ09SRF9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJESVNDT1JEX0NMSUVOVF9TRUNSRVQiLCJhdXRob3JpemF0aW9uIiwicGFyYW1zIiwic2NvcGUiLCJjYWxsYmFja3MiLCJzZXNzaW9uIiwidXNlciIsImlkIiwic2lnbkluIiwiYWNjb3VudCIsInByb2ZpbGUiLCJwcm92aWRlciIsInBhZ2VzIiwiZXJyb3IiLCJzdHJhdGVneSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@auth","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsettings%2Froute&page=%2Fapi%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsettings%2Froute.ts&appDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPramod%20Tiwari%5CDownloads%5Cdiscord-bot%5Cdashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();