export interface title_cardProps {
    title: string,
    navigate: string
}

export interface BreadcrumbsProps {
    name: string;
    navigate: string;
}

export interface HomeProps {
    titles: string[];
    breadcrumbs: BreadcrumbsProps[];
  }