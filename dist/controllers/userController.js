"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.registerUser = exports.authUser = void 0;
var user_1 = __importDefault(require("../models/user"));
var ServerError_1 = __importDefault(require("./ServerError"));
var generateToken_1 = __importDefault(require("../util/generateToken"));
var authUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, error, Error_1, error;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_1.default.findOne({ email: email })];
            case 2:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 4];
                return [4 /*yield*/, user.matchPassword(password)];
            case 3:
                _b = (_c.sent());
                _c.label = 4;
            case 4:
                if (_b) {
                    res.status(200).json({
                        _id: user._id,
                        name: user.name,
                        isAdmin: user.isAdmin,
                        email: user.email,
                        token: generateToken_1.default(user._id),
                    });
                }
                else {
                    error = new ServerError_1.default("email or password is invalid", 401);
                    next(error);
                }
                return [3 /*break*/, 6];
            case 5:
                Error_1 = _c.sent();
                console.log(Error_1);
                error = new ServerError_1.default(Error_1.message, 500);
                next(error);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.authUser = authUser;
var registerUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, doesUserExist, error, user, error, Error_2, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.default.findOne({ email: email })];
            case 2:
                doesUserExist = _b.sent();
                if (doesUserExist) {
                    error = new ServerError_1.default("user already exists", 401);
                    throw error;
                }
                return [4 /*yield*/, user_1.default.create({ name: name, email: email, password: password })];
            case 3:
                user = _b.sent();
                if (user) {
                    res.status(201).json({
                        _id: user._id,
                        name: user.name,
                        isAdmin: user.isAdmin,
                        password: user.password,
                        email: user.email,
                        token: generateToken_1.default(user._id),
                    });
                }
                else {
                    error = new ServerError_1.default("invalid data", 400);
                    throw error;
                }
                return [3 /*break*/, 5];
            case 4:
                Error_2 = _b.sent();
                error = new ServerError_1.default(Error_2.message, Error_2.statusCode || 500);
                next(error);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var getUserProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var request, user, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                request = req;
                return [4 /*yield*/, user_1.default.findById(request.user._id)];
            case 1:
                user = _a.sent();
                if (user) {
                    res.status(200).json({
                        _id: user._id,
                        name: user.name,
                        isAdmin: user.isAdmin,
                        email: user.email,
                    });
                }
                else {
                    error = new ServerError_1.default("User not found", 404);
                    next(error);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getUserProfile = getUserProfile;
var updateUserProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var request, user, updatedUser, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                request = req;
                return [4 /*yield*/, user_1.default.findById(request.user._id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                if (req.body.password) {
                    user.password = req.body.password;
                }
                return [4 /*yield*/, user.save()];
            case 2:
                updatedUser = _a.sent();
                res.status(200).json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    isAdmin: updatedUser.isAdmin,
                    email: updatedUser.email,
                    token: generateToken_1.default(updatedUser._id),
                });
                return [3 /*break*/, 4];
            case 3:
                error = new ServerError_1.default("User not found", 404);
                next(error);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUserProfile = updateUserProfile;
var getUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.find({})];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
// @desc    Delete a user
// @route   DELETE /api/users/:_id
// @access  Private/Admin
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, user_1.default.findByIdAndRemove(id)];
            case 1:
                users = _a.sent();
                res.status(201).json({ message: "User has been deleted successfully" });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
// @desc    Get user by ID
// @route   GET /api/users/:_id
// @access  Private/Admin
var getUserById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, user_1.default.findById(id)];
            case 1:
                user = _a.sent();
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    error = new ServerError_1.default("user not found", 404);
                    next(error);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
// @desc    update a user by ID
// @route   PATCH /api/users/:_id
// @access  Private/Admin
var updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedUser, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.isAdmin = req.body.isAdmin || user.isAdmin;
                if (req.body.password) {
                    user.password = req.body.password;
                }
                return [4 /*yield*/, user.save()];
            case 2:
                updatedUser = _a.sent();
                res.status(200).json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    isAdmin: updatedUser.isAdmin,
                    email: updatedUser.email,
                    token: generateToken_1.default(updatedUser._id),
                });
                return [3 /*break*/, 4];
            case 3:
                error = new ServerError_1.default("User not found", 404);
                next(error);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
