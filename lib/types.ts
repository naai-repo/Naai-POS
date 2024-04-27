export interface title_cardProps {
  title: string;
  navigate: string;
  selectable?: boolean;
  serviceDetails?: extraInfoProps;
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
}
