import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` // * path.extname automatically include the dot before the file format
        );
    },
});

const checkFileType = (
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        const error = new Error("Images only!");
        return cb(error);
    }
};

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

router.post("/", upload.single("image"), (req, res) => {
    res.send(path.normalize(req.file.path));
});

export { router as uploadRouter };
