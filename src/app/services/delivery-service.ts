import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryDetails } from 'app/entities/delivery-details';
import { Order } from 'app/entities/order';
import { ProductDetails } from 'app/entities/product-details';
import { ProductGroup } from 'app/entities/product-group';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, of } from 'rxjs';
import { Delivery } from '../entities/delivery';
import { FakeDB } from './fakedb';

@Injectable()
export class DeliveryService {
  private static readonly BREAK_LINE = "%0a";
  private static readonly URL: string = "http://localhost:8000";

  constructor(private httpClient: HttpClient, private deviceService: DeviceDetectorService) { }

  listAvaiableDeliveries(): Observable<Delivery[]> {
    //return this.httpClient.get<Delivery[]>(DeliveryService.URL + "/api/deliveries");
    return of(FakeDB.deliveries);
  }

  getDelivery(id: number): Observable<DeliveryDetails> {
    return of(this.details.find(d => d.delivery.id == id));
  }

  whatsappSendMessage(order: Order): void {
    let description: string = "";
    description = "Gostaria de um(a) *" + order.product.name;

    if (order.requiredOption)
      description += " (" + order.requiredOption + ")";

    description += "*" + DeliveryService.BREAK_LINE;

    if (order.optionalItemns.length > 0) {
      description += "Por favor, inclua: " + DeliveryService.BREAK_LINE;
      description += order.optionalItemns.map(opt => opt.name.toLowerCase()).join(DeliveryService.BREAK_LINE);
    }

    if (order.notes)
      description += DeliveryService.BREAK_LINE + "Algumas considerações: _" + order.notes + "_";

    /* window.open("https://api.whatsapp.com/send?phone=5521991701516&text=Bla", 
                "_blank", "toolbar=no,scrollbars=no,resizable=no,top=500,left=500,width=400,height=400"); */
    //window.open("https://web.whatsapp.com/send?phone=5521991701516&text=" + description, "_blank");
    if (this.deviceService.isMobile())
      window.open("https://wa.me/5521991701516?text=" + description, "_blank");
    else
      window.open("https://web.whatsapp.com/send?phone=5521991701516&text=" + description, "_blank");
  }

  getProduct(id: number): Observable<ProductDetails> {
    let delivery = this.details.find(dd => dd.productGroups.find(g => g.products.find(p => p.id == id))).delivery;
    let product = this.allProducts.find(g => g.products.find(p => p.id == id)).products.find(p => p.id == id);
    return of({ delivery: delivery, product: product } as ProductDetails);
  }

  private lunchs: ProductGroup =
    {
      title: "Almoços",
      products: FakeDB.products.lunchs
    };

  private snacks: ProductGroup =
    { title: "Lanches", products: FakeDB.products.snacks };

  private pizzas: ProductGroup =
    { title: "Pizzas", products: FakeDB.products.pizzas };

  private allProducts: ProductGroup[] = Array().concat(this.lunchs, this.pizzas, this.snacks);

  private details: DeliveryDetails[] = [
    { delivery: FakeDB.deliveries[0], productGroups: Array().concat(this.lunchs, this.pizzas) },
    { delivery: FakeDB.deliveries[1], productGroups: Array().concat(this.pizzas) },
    { delivery: FakeDB.deliveries[2], productGroups: Array().concat(this.lunchs) },
    { delivery: FakeDB.deliveries[3], productGroups: Array().concat(this.snacks) },
    { delivery: FakeDB.deliveries[4], productGroups: Array().concat(this.lunchs, this.snacks) }
  ];
}