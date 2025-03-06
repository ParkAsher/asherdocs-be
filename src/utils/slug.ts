import slugify from 'slugify';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export async function generateSlug(title: string) {
    const timestamp = format(new Date(), 'yyMMddHHmmss', { locale: ko });

    const cleanedTitle = title.replace(/[\[\]{}()<>]/g, '').trim();

    const slugifiedTitle = slugify(cleanedTitle, {
        lower: true, // 소문자로 변환
        replacement: '-', // 공백을 '-'로 변환
        strict: false, // 한글 유지
        remove: /[*+~.()'"!:@?]/g, // 필요 없는 특수문자 제거
    });

    return `${timestamp}-${slugifiedTitle}`;
}
