"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const razorpay_1 = __importDefault(require("razorpay"));
let PaymentsService = class PaymentsService {
    constructor(configService) {
        this.configService = configService;
        const keyId = this.configService.get('RAZORPAY_KEY_ID');
        const keySecret = this.configService.get('RAZORPAY_KEY_SECRET');
        if (!keyId || !keySecret) {
            throw new Error('Razorpay credentials are not configured');
        }
        this.razorpay = new razorpay_1.default({
            key_id: keyId,
            key_secret: keySecret,
        });
    }
    async createOrder(amount, currency = 'INR') {
        try {
            const options = {
                amount: amount * 100,
                currency,
                receipt: `receipt_${Date.now()}`,
                payment_capture: 1,
            };
            const order = await this.razorpay.orders.create(options);
            return order;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Razorpay order creation failed: ${errorMessage}`);
        }
    }
    async verifyPaymentSignature(orderId, paymentId, signature) {
        try {
            const keySecret = this.configService.get('RAZORPAY_KEY_SECRET');
            if (!keySecret) {
                throw new Error('Razorpay key secret is not configured');
            }
            const { createHmac } = await import('crypto');
            const hmac = createHmac('sha256', keySecret);
            hmac.update(orderId + '|' + paymentId);
            const generatedSignature = hmac.digest('hex');
            return generatedSignature === signature;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Payment verification failed: ${errorMessage}`);
        }
    }
    async refundPayment(paymentId, amount) {
        try {
            const refund = await this.razorpay.refunds.create({
                payment_id: paymentId,
                amount: amount * 100,
            });
            return refund;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Razorpay refund failed: ${errorMessage}`);
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map