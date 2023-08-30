export interface ICategory {
  id: number;
  slug: string;
  name: string;
  description: string;
  createdDate: string;
  active: boolean;
}

export interface ICreateCategory {
  slug: string;
  name: string;
  description: string;
  active?: boolean;
}

export interface IUpdateCategory {
  slug: string;
  name: string;
  description: string;
  active: boolean;
}

export interface IPartialyUpdateCategory {
  slug?: string;
  name?: string;
  description?: string;
  active?: boolean;
}
