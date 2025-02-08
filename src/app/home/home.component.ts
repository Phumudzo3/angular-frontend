import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Fix typo,
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  payWithStripe() {
    console.log('Payment process started. Preparing request...'); // Log start message
    const data = new HttpParams({
      fromObject: {
        order: JSON.stringify([
          {
            _id: '6786d4f50d6deec76625653a',
            store_id: '6786d4630d6deec766256532',
            category_id: '678192009b6e820ebdcc6e07',
            sub_category_id: '6782aa76ec82fa36dce623ed',
            product_name: 'livhu restaurant',
            description: 'cotton tshirt',
            sku: 'thre2',
            images: [
              'src\\uploads\\productImages\\1736889588852-355129379Screenshot (37).png',
              'src\\uploads\\productImages\\1736889588864-889553150Screenshot (38).png',
            ],
            price: 500,
            quantity: 5,
            status: true,
          },
        ]),
        deliveryCharge: 20,
      },
    });
    
    this.http
      .post<any>('https://app-dev-juri.onrender.com/api/order/stripeCheckout', data)
      .pipe(take(1))
      .subscribe({
       next: async (session) => {
    try {
        console.log('Payment session created successfully:', session.id); // Log session ID for reference
        const stripe = await loadStripe('pk_test_51O0gq3F71lqZQv1BeofSsRihCVfY63EdQT29fNod5ssZ2A3i3WKqmDjFSgCwJgfFNUuamw9nwez2TD1LAtK8mwcq00kR8VfBBc'); 
        await stripe?.redirectToCheckout({ sessionId: session.id });
        console.log('Redirecting to Stripe checkout...');
    } catch (error) {
        console.error('Error during Stripe redirect:', error);
    }
},

      });
  }
}
