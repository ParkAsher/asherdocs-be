import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
    ) {}

    async createNotification(
        articleId: number,
        senderId: string,
        receiverId: string | null,
        message: string,
    ) {
        const notification = await this.notificationRepository.save({
            senderId,
            receiverId,
            articleId,
            message,
        });

        return notification;
    }
}
