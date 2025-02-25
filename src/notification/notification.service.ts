import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/entities/notification.entity';
import { Repository } from 'typeorm';

const NOTIFICATION_PER_PAGE = 10;

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

    async getHasNewNotifications(id: string) {
        const count = await this.notificationRepository.count({
            where: { receiverId: id, isRead: false },
        });

        return { count, hasNewNotifications: count > 0 };
    }

    async getNotifications(id: string, page: number) {
        const limit = NOTIFICATION_PER_PAGE;

        return await this.notificationRepository.find({
            where: { receiverId: id },
            take: limit,
            skip: (page - 1) * limit,
            order: { createdAt: 'DESC' },
        });
    }

    async setNotificationRead(notificationId: number) {
        return await this.notificationRepository.update(
            { id: notificationId },
            { isRead: true },
        );
    }
}
