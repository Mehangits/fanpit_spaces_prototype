import { ConfigService } from '@nestjs/config';
export interface RazorpayOrder {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
    created_at: number;
}
interface RazorpayRefund {
    id: string;
    amount: number;
    currency: string;
    payment_id: string;
    status: string;
    created_at: number;
}
export declare class PaymentsService {
    private configService;
    private razorpay;
    constructor(configService: ConfigService);
    createOrder(amount: number, currency?: string): Promise<RazorpayOrder>;
    verifyPaymentSignature(orderId: string, paymentId: string, signature: string): Promise<boolean>;
    refundPayment(paymentId: string, amount: number): Promise<RazorpayRefund>;
}
export {};
