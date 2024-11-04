import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sharp from 'sharp';

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

        // 이미지 메타데이터 가져오기 (크기 정보 포함)
        const imageMetadata = await Sharp(thumbnail.buffer).metadata();
        let imageBuffer = thumbnail.buffer;

        // 이미지가 800 x 500 보다 클 때만 리사이즈
        if (imageMetadata.width > 800 || imageMetadata.height > 500) {
            imageBuffer = await Sharp(thumbnail.buffer)
                .resize(800, 500, { fit: 'inside' })
                .toBuffer();
        }

        const key = `thumbnail/${Date.now().toString()}-${thumbnail.originalname}`;

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: imageBuffer,
            ACL: 'public-read-write',
        });

        await this.s3Client.send(command);

        return {
            path: `https://kr.object.ncloudstorage.com/${bucket}/${key}`,
        };
    }

    async imageUpload(image: Express.Multer.File) {
        const bucket = this.configService.get<string>('NCP_BUCKET');

        const key = `article/${Date.now().toString()}-${image.originalname}`;

        const commend = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: image.buffer,
            ACL: 'public-read-write',
        });

        await this.s3Client.send(commend);

        return {
            path: `https://kr.object.ncloudstorage.com/${bucket}/${key}`,
        };
    }
}
