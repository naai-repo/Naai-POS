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

export interface ArtistDisplayProps {
  name: string;
  price: number;
  basePrice: number;
  serviceId: string;
  variableId?: string;
  serviceName: string;
  artistId: string;
}

export interface PricingAtomInterface {
  Qty: undefined | number;
  Price: undefined | number;
  GST: undefined | number;
  Disc: undefined | number;
}

export interface SelectedServicesInterface extends ArtistDisplayProps {
  qty: number;
  disc: number;
  tax: number;
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
}
