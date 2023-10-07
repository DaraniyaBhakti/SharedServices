export interface OrderItems {
  id?: string;
  type?: string;
  invoice?: string;
  attributes?: {
    id?: number;
    name?: string;
    order_number?: string;
    order_date?: string;
    order_detail_id?: number;
    product_id?: number;
    quantity?: number;
    price?: string;
    discount_price?: string;
    final_price?: string;
    created_at?: string;
    updated_at?: string;
    order_items: Product[];
    invoice?: string;
  };
}

export interface Product {
  order_item?: {
    id: number;
    order_detail_id: number;
    product_id: number;
    quantity: number;
    price: string;
    discount_price: string;
    final_price: string;
    created_at: string;
    updated_at: string;
  };
  product_details?: {
    data: {
      attributes: {
        product_name: string;
        serial_number: string;
        available_quantity: number;
        price: string;
        product_description: string;
        product_status: string;
        image: string;
        seller_details: {
          data: {
            attributes: {
              activated: boolean;
              email: string;
              first_name: string;
              full_phone_number: string;
            };
          };
        };
      };
    };
  };
}

export interface Login {
  meta?: {
    token?: string;
    refresh_token?: string;
    id?: number;
  };
}
