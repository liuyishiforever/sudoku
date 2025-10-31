import upload from '@/utils/upload'

export function uploadAvatar(filePath) {
    return upload({
        url: '/front/common/upload/avatar',
        method: 'post',
        filePath: filePath,
        name: 'file'
    })
}
