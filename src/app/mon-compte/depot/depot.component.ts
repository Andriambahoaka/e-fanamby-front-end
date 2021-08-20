import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import {IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';
import { NgxPayPalModule } from 'ngx-paypal';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit {

  constructor() { }
  user=JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
  public payPalConfig ? : IPayPalConfig;

  ngOnInit(): void {
    this.initConfig();

  }

  private initConfig(): void {
    /*
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AXFUgju-dxGSL_Egew98WzMUnXze0FLCgvx_FIf2yFhkUCrLDjOvns0di3fDJfD4GbhutYtnnk7EfEbj',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      //this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
*/  }
}
