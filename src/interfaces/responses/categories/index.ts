export interface IStatus {
  status: boolean;
}

export interface ICategory {
  id: number;
  slug: string;
  name: string;
  description: string;
  createdDate: string;
  active: boolean;
}

export interface ICategoriesList extends ICategory {}

// Нужен, так как в дальнейшеим CategoriesListResponse будет дополнен
export interface IAllCategories extends ICategory {}

// Нужен, так как в дальнейшеим CategoriesListResponse будет дополнен
export interface ICategoryById extends ICategory {}

export interface ICreateCategory {
  slug: string;
  name: string;
  description: string;
  active: boolean;
}

export interface IUpdateCategory extends ICreateCategory {}

export interface IPartialyUpdateCategory {
  slug?: string;
  name?: string;
  description?: string;
  active?: boolean;
}

export interface IUpdateCategoryStatus extends IStatus {}

export interface IDeleteCategoryStatus extends IStatus {}
