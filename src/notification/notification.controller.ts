import {
    Controller,
    Get,
    Patch,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/new')
    async getHasNewNotification(@Request() req) {
        const user = req.user;

        const { id } = user;

        return await this.notificationService.getHasNewNotifications(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getNotifications(@Request() req, @Query('page') page: number) {
        const user = req.user;

        const { id } = user;

        return await this.notificationService.getNotifications(id, page);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/')
    async setNotificationRead(@Query('id') notificationId: number) {
        return await this.notificationService.setNotificationRead(
            notificationId,
        );
    }
}
