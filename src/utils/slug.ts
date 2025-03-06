import slugify from 'slugify';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export async function generateSlug(title: string, createdAt?: Date) {
    const timestamp = !createdAt
        ? format(new Date(), 'yyMMddHHmmss', { locale: ko })
        : format(createdAt, 'yyMMddHHmmss', { locale: ko });

    const cleanedTitle = title.replace(/[\[\]{}()<>]/g, '').trim();

    const slugifiedTitle = slugify(cleanedTitle, {
        lower: true,
        replacement: '-',
        strict: false,
        remove: /[*+~.()'"!:@?]/g,
    });

    return `${timestamp}-${slugifiedTitle}`;
}
