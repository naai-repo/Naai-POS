import exp from "constants";

export interface title_cardProps {
  title: string;
  navigate: string;
  selectable?: boolean;
  serviceDetails?: extraInfoProps;
  displayModal?: boolean;
  comingSoon?: boolean;
}

export interface BreadcrumbsProps {
  name: string;
  navigate: string;
}

export interface variableProps {
  variableType: string;
  variableName: string;
  variablePrice: number;
  variableCutPrice: number;
  variableTime: number;
  variableId: string;
}
export interface extraInfoProps {
  serviceId: string;
  category: string;
  serviceTitle: string;
  targetGender: string;
  avgTime: number;
  variables: variableProps[];
  basePrice: number;
  cutPrice: number;
  productsUsed: number;
}

export interface HomeProps {
  titles: string[];
  breadcrumbs: BreadcrumbsProps[];
  selectable?: boolean;
  extraInfo?: extraInfoProps[];
  comingSoon?: boolean[];
}


export interface PricingAtomInterface {
  Qty: undefined | number;
  Price: undefined | number;
  GST: undefined | number;
  Disc: undefined | number;
  Amount: undefined | number;
}
export interface ArtistDisplayProps {
  name: string;
  price: number;
  basePrice: number;
  serviceId: string;
  variableId?: string;
  serviceName: string;
  artistId: string;
  membershipId?: string;
  membershipTitle?: string;
  membershipDesc?: string;
  validity_in_days?: number;
  validity_unit?: string;
  membershipCost?: number
}

export interface SelectedServicesInterface extends ArtistDisplayProps {
  qty: number;
  disc: number;
  tax: number;
  amount: number;
  type?: string;
}

export type genderType = "men" | "women" | "unisex" | undefined;

export interface PaymentsInterface {
  id: number;
  type: string;
  amount: number;
  remarks: string;
}

export interface CustomerInfoInterface {
  name: string;
  phoneNumber: string;
  id: string;
  gender: string;
  email: string;
  birthDate: string;
  aniversary: string;
  dues: DuesInterface[];
  membership: Membership | null;
}

export interface DuesInterface {
  bookingId: string;
  salonId: string;
  amount: number;
  bookingDate: Date;
}

export interface HoldDataInterface {
  title: string;
  selectedServices: SelectedServicesInterface[];
  customerInfo: CustomerInfoInterface;
}

export interface CouponInterface {
  id: string;
  code: string;
  discount: number;
  expiryDate: Date;
  salonId: string;
  min_cart_value: number;
  max_value: number;
  isActive: boolean;
  couponDiscount: number;
}

export interface ServiceSelectedInterface {
  cutPrice: number;
  serviceId: string;
  serviceTitle: string;
  avgTime?: number;
  basePrice?: number;
  category?: string;
  productsUsed?: any[];
  targetGender?: string;
  variables?: variableProps[];
  variableCutPrice?: number;
  variableName?: string;
  variablePrice?: number;
  variableTime?: number;
  variableType?: string;
  _id?: string;
  type?: "membership" | "service" | "product";
}

export interface SalonData {
  id: string;
  name: string;
  img: string;
  address: string;
  phoneNumber: number;
  instagram: string;
  taxIncluded: boolean;
}

export interface ProductAndServiceForMembership {
  id: string;
  allotted_count: number;
  discount_type: number;
  discount_type_value: number;
  max_discount_amount: number;
}

export interface Membership {
  id: string;
  name: string;
  salonId: string;
  description: string;
  apply_to: number;
  validity_in_days: number;
  validity_unit: "DAY" | "MONTH" | "YEAR";
  cost: number;
  wallet_amount_credit: number;
  min_bill_amount: number;
  discount_type: number | null;
  discount_type_value: number | null;
  max_discount_amount: number | null;
  all_services_discount_type: number | null;
  all_services_discount_type_value: number | null;
  all_services_include: string[];
  all_services_except: string[];
  all_products_discount_type: number | null;
  all_products_discount_type_value: number | null;
  all_products_include: string[];
  all_products_except: string[];
  minimum_service_cost: number | null; 
  minimum_product_cost: number | null;
  services: ProductAndServiceForMembership[];
  products: ProductAndServiceForMembership[];
  status: boolean;
  all_services_discount_max_count: number | null;
  all_products_discount_max_count: number | null;
}

export interface ServiceCountInterface{
  type_of_discount: string | null;
  customerCount: number;
}