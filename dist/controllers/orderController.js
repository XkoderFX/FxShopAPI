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
exports.getOrders = exports.getMyOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.addOrderItems = void 0;
var order_1 = __importDefault(require("../models/order"));
var ServerError_1 = __importDefault(require("./ServerError"));
var addOrderItems = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, Error_1, order, createdOrder;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.user._id;
                _a = req.body, orderItems = _a.orderItems, shippingAddress = _a.shippingAddress, paymentMethod = _a.paymentMethod, itemsPrice = _a.itemsPrice, taxPrice = _a.taxPrice, shippingPrice = _a.shippingPrice, totalPrice = _a.totalPrice;
                if (!(orderItems && orderItems.length == 0)) return [3 /*break*/, 1];
                Error_1 = new ServerError_1.default("no order items", 400);
                next(Error_1);
                return [2 /*return*/];
            case 1:
                order = new order_1.default({
                    user: user,
                    orderItems: orderItems,
                    shippingAddress: shippingAddress,
                    paymentMethod: paymentMethod,
                    itemsPrice: itemsPrice,
                    taxPrice: taxPrice,
                    shippingPrice: shippingPrice,
                    totalPrice: totalPrice,
                });
                return [4 /*yield*/, order.save()];
            case 2:
                createdOrder = _b.sent();
                res.status(201).json(createdOrder);
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addOrderItems = addOrderItems;
var getOrderById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_1.default.findById(req.params.id).populate("user", "name email")];
            case 1:
                order = _a.sent();
                if (order) {
                    res.status(200).json(order);
                }
                else {
                    error = new ServerError_1.default("Order not found", 404);
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrderById = getOrderById;
var updateOrderToPaid = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order, updatedOrder, error, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, order_1.default.findById(req.params.id)];
            case 1:
                order = _a.sent();
                if (!order) return [3 /*break*/, 3];
                order.set("isPaid", true);
                order.set("paidAt", Date.now());
                order.set("paymentResult", {
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.payer.email_address,
                });
                return [4 /*yield*/, order.save()];
            case 2:
                updatedOrder = _a.sent();
                res.status(200).json(updatedOrder);
                return [3 /*break*/, 4];
            case 3:
                error = new ServerError_1.default("Order not found", 404);
                throw error;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateOrderToPaid = updateOrderToPaid;
var updateOrderToDelivered = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order, updatedOrder, error, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, order_1.default.findById(req.params.id)];
            case 1:
                order = _a.sent();
                if (!order) return [3 /*break*/, 3];
                order.set("isDelivered", true);
                order.set("deliveredAt", Date.now());
                return [4 /*yield*/, order.save()];
            case 2:
                updatedOrder = _a.sent();
                res.status(200).json(updatedOrder);
                return [3 /*break*/, 4];
            case 3:
                error = new ServerError_1.default("Order not found", 404);
                throw error;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.log(error_3);
                next(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateOrderToDelivered = updateOrderToDelivered;
var getMyOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                return [4 /*yield*/, order_1.default.find({ user: user._id })];
            case 1:
                orders = _a.sent();
                res.status(200).json(orders);
                return [2 /*return*/];
        }
    });
}); };
exports.getMyOrders = getMyOrders;
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_1.default.find({}).populate("user", "id name")];
            case 1:
                orders = _a.sent();
                res.status(200).json(orders);
                return [2 /*return*/];
        }
    });
}); };
exports.getOrders = getOrders;
