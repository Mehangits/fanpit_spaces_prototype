import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Use require instead of import to avoid ES module issues
import Razorpay from 'razorpay';

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

interface RazorpayInstance {
  orders: {
    create(options: {
      amount: number;
      currency: string;
      receipt: string;
      payment_capture: number;
    }): Promise<RazorpayOrder>;
  };
  refunds: {
    create(options: {
      payment_id: string;
      amount: number;
    }): Promise<RazorpayRefund>;
  };
}

@Injectable()
export class PaymentsService {
  private razorpay: RazorpayInstance;

  constructor(private configService: ConfigService) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID');
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');

    if (!keyId || !keySecret) {
      throw new Error('Razorpay credentials are not configured');
    }

    this.razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  async createOrder(
    amount: number,
    currency: string = 'INR',
  ): Promise<RazorpayOrder> {
    try {
      const options = {
        amount: amount * 100, // amount in paise
        currency,
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      };

      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Razorpay order creation failed: ${errorMessage}`);
    }
  }

  async verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    signature: string,
  ): Promise<boolean> {
    try {
      const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');

      if (!keySecret) {
        throw new Error('Razorpay key secret is not configured');
      }

      // Use dynamic import for crypto to avoid CommonJS/ES module issues
      const { createHmac } = await import('crypto');

      const hmac = createHmac('sha256', keySecret);
      hmac.update(orderId + '|' + paymentId);
      const generatedSignature = hmac.digest('hex');

      return generatedSignature === signature;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Payment verification failed: ${errorMessage}`);
    }
  }

  async refundPayment(
    paymentId: string,
    amount: number,
  ): Promise<RazorpayRefund> {
    try {
      const refund = await this.razorpay.refunds.create({
        payment_id: paymentId,
        amount: amount * 100,
      });
      return refund;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Razorpay refund failed: ${errorMessage}`);
    }
  }
}
