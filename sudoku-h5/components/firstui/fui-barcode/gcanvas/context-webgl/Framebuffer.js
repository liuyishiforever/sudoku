// 本文件由FirstUI授权予广州嗨小克智能科技有限公司（会员ID：1  81 8，营业执照号： 914 40  1     06 MAC 0 H   T7N 3 F）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import {getTransferedObjectUUID} from './classUtils';

const name = 'WebGLFrameBuffer';

function uuid(id) {
    return getTransferedObjectUUID(name, id);
}

export default class WebGLFramebuffer {
    className = name;

    constructor(id) {
        this.id = id;
    }

    static uuid = uuid;

    uuid() {
        return uuid(this.id);
    }
}