import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sharp from 'sharp';

@Injectable()
export class ImageService {
    s3Client: S3Client;

    constructor(private configService: ConfigService) {
        this.s3Client = new S3Client({
            endpoint: this.configService.get<string>('NCP_ENDPOINT'),
            region: this.configService.get<string>('NCP_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('NCP_ACCESS_KEY'),
                secretAccessKey:
                    this.configService.get<string>('NCP_SECRET_KEY'),
            },
        });
    }

    async thumbnailUpload(thumbnail: Express.Multer.File) {
        const bucket = this.configService.get<string>('NCP_BUCKET');

        // resize
        const resizedImageBuffer = await sharp(thumbnail.buffer)
            .resize(800, 500)
            .toBuffer();

        const key = `thumbnail/${Date.now().toString()}-${thumbnail.originalname}`;

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: resizedImageBuffer,
            ACL: 'public-read-write',
        });

        await this.s3Client.send(command);

        return {
            path: `https://kr.object.ncloudstorage.com/${bucket}/${key}`,
        };
    }
}
