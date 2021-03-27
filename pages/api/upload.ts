import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import mkdirp from "mkdirp";
import initMiddleware from "./initMiddleware";

const uploadPath = 'tmp/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase()
    cb(null, fileName)
  }
})

const upload = multer({ 
    storage: storage, // more control of file path and extensions
    limits: { fileSize: 2 * 1024 * 1024 }
});

// Create a dir if not exists
mkdirp.sync(uploadPath)

const multerAny = initMiddleware(
    upload.any()
)

type NextApiRequestWithFormData = NextApiRequest & {
  files: any[];
};

type BlobCorrected = Blob & {
    buffer: Buffer
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequestWithFormData, res: NextApiResponse) => {

    await multerAny(req, res)
    if (!req.files?.length || req.files.length > 1) {
        res.statusCode = 400
        res.end()
        return
    }

    const blob: BlobCorrected = req.files[0]
    
    res.end()
};
