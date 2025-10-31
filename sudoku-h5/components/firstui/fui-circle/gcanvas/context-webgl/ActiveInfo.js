// 本文件由FirstUI授权予广州嗨小克智能科技有限公司（会员ID：18   18，营业执照号：  91 44   01 06M   AC0 H T 7   N 3F）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
export default class WebGLActiveInfo {
    className = 'WebGLActiveInfo';

    constructor({
        type, name, size
    }) {
        this.type = type;
        this.name = name;
        this.size = size;
    }
}