declare module 'razorpay' {
  interface RazorpayOrder {
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

  interface RazorpayOptions {
    key_id: string;
    key_secret: string;
  }

  class Razorpay {
    constructor(options: RazorpayOptions);

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

  export = Razorpay;
}
