"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var router = express_1.Router();
exports.uploadRouter = router;
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname) // * path.extname automatically include the dot before the file format
        );
    },
});
var checkFileType = function (file, cb) {
    var filetypes = /jpg|jpeg|png/;
    var extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    var mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        var error = new Error("Images only!");
        return cb(error);
    }
};
var upload = multer_1.default({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
router.post("/", upload.single("image"), function (req, res) {
    res.send(path_1.default.normalize(req.file.path));
});
