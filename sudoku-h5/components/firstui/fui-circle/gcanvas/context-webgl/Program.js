// 本文件由FirstUI授权予广州嗨小克智能科技有限公司（会员ID：1 8  18，营业执照号： 9 1  4  4   0106M A  C0 HT  7N 3 F）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import {getTransferedObjectUUID} from './classUtils';

const name = 'WebGLProgram';

function uuid(id) {
    return getTransferedObjectUUID(name, id);
}

export default class WebGLProgram {
    className = name;

    constructor(id) {
        this.id = id;
    }

    static uuid = uuid;

    uuid() {
        return uuid(this.id);
    }
}