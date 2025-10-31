// 本文件由FirstUI授权予广州嗨小克智能科技有限公司（会员ID：1 8 1 8，营业执照号：  91 4   40 1 06M  AC 0 H T  7N  3F）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
export default class WebGLShaderPrecisionFormat {
    className = 'WebGLShaderPrecisionFormat';

    constructor({
        rangeMin, rangeMax, precision
    }) {
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
        this.precision = precision;
    }
}