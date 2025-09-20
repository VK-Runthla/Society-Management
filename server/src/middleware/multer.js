const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ensure folder exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// folders
const DEST = {
  profile: path.join(__dirname, "../../assets/profile"),
  idProof: path.join(__dirname, "../../assets/idProof"),
  documents: path.join(__dirname, "../../assets/documents"),
};

// storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = DEST[file.fieldname] || DEST.documents;
    ensureDir(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const base = path.basename(file.originalname || "file", ext);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}-${unique}${ext}`);
  },
});

// robust file filter
const ALLOWED_MIME = new Set([
  // images
  "image/jpeg",
  "image/jpg", // some clients use this
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
  "image/heic",
  // docs
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
]);

const ALLOWED_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".bmp",
  ".heic",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
]);

const fileFilter = (req, file, cb) => {
  const mimetype = (file.mimetype || "").toLowerCase();
  const ext = path.extname(file.originalname || "").toLowerCase();

  // accept if:
  // 1) any image/*, or 2) in allowed mime list, or 3) extension is allowed
  if (
    mimetype.startsWith("image/") ||
    ALLOWED_MIME.has(mimetype) ||
    ALLOWED_EXT.has(ext)
  ) {
    return cb(null, true);
  }

  cb(new Error(`Invalid file type: ${mimetype || ext}`), false);
};

// 10 MB per file (tweak as needed)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// fields: keep your existing contract
module.exports = upload.fields([
  { name: "profile", maxCount: 1 }, // image/pdf/doc ok
  { name: "idProof", maxCount: 1 }, // image/pdf/doc ok
  { name: "documents", maxCount: 5 }, // optional extra files
]);
