import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { first } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  message: string = ''; // Holds the message to display

  constructor(private http: HttpClient) {}

  payWithStripe() {
    this.message = 'Processing your payment, please wait...'; // Set initial message

    const data = new HttpParams({
      fromObject: {
        order: JSON.stringify([
          {
            _id: '6786d4f50d6deec76625653a',
            store_id: '6786d4630d6deec766256532',
            category_id: '678192009b6e820ebdcc6e07',
            sub_category_id: '6782aa76ec82fa36dce623ed',
            product_name: 'livhuw',
            description: 'cotton tshirt',
            sku: 'thre2',
            images: ['src\\uploads\\productImages\\1736889588852-355129379Screenshot (37).png'],
            price: 500,
            quantity: 5,
            status: true,
          }
        ]),
        deliveryCharge: 20,
      },
    });

    this.http.post<any>('https://backend-food-app-pz8p.onrender.com/api/order/stripeCheckout', data).pipe(first()).subscribe({
      next: async (session) => {
        const stripe = await loadStripe('pk_test_51O0gq3F71lqZQv1BeofSsRihCVfY63EdQT29fNod5ssZ2A3i3WKqmDjFSgCwJgfFNUuamw9nwez2TD1LAtK8mwcq00kR8VfBBc');
        stripe?.redirectToCheckout({
          sessionId: session.id,
        });
        this.message = ''; // Clear the message when redirection happens
      },
      error: (err) => {
        console.error(err);
        this.message = 'An error occurred during payment. Please try again.'; // Show error message
      },
    });
  }
}