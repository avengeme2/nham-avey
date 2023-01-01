import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { fetchData } from './../utils/graphql-fetcher'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  EnhancedDate: any
}

export type AdminCreateCategoryInput = {
  coverImageUrl?: InputMaybe<Scalars['String']>
  iconUrl?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type AdminCreateCategoryOutput = {
  __typename?: 'AdminCreateCategoryOutput'
  category?: Maybe<Category>
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type AdminCreateCityInput = {
  name: Scalars['String']
  nameInKhmer?: InputMaybe<Scalars['String']>
}

export type AdminCreateCityOutput = {
  __typename?: 'AdminCreateCityOutput'
  city?: Maybe<City>
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type AdminCreateRestaurantInput = {
  address?: InputMaybe<Scalars['String']>
  categories?: InputMaybe<Array<Scalars['String']>>
  coverImageUrls?: InputMaybe<Array<Scalars['String']>>
  logoImageUrl?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  vendorIds: Array<Scalars['String']>
}

export type AdminUpdateCategoryInput = {
  categoryId: Scalars['Int']
  coverImageUrl?: InputMaybe<Scalars['String']>
  iconUrl?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type AdminUpdateCategoryOutput = {
  __typename?: 'AdminUpdateCategoryOutput'
  category?: Maybe<Category>
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type AdminUpdateCityInput = {
  cityId: Scalars['Int']
  name?: InputMaybe<Scalars['String']>
  nameInKhmer?: InputMaybe<Scalars['String']>
}

export type AdminUpdateCityOutput = {
  __typename?: 'AdminUpdateCityOutput'
  city?: Maybe<City>
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type AdminUpdateRestaurantInput = {
  address?: InputMaybe<Scalars['String']>
  categories?: InputMaybe<Array<Scalars['String']>>
  coverImageUrls?: InputMaybe<Array<Scalars['String']>>
  logoImageUrl?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  restaurantId: Scalars['Float']
  vendorIds?: InputMaybe<Array<Scalars['String']>>
}

export type AdminUpdateUserInput = {
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  isVerified?: InputMaybe<Scalars['Boolean']>
  lastName?: InputMaybe<Scalars['String']>
  photoURL?: InputMaybe<Scalars['String']>
  roles?: InputMaybe<Array<UserRole>>
  userId: Scalars['String']
}

export type AdminUpdateUserOutput = {
  __typename?: 'AdminUpdateUserOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type AllCategoriesOutput = {
  __typename?: 'AllCategoriesOutput'
  data?: Maybe<Array<Category>>
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type AllCitiesOutput = {
  __typename?: 'AllCitiesOutput'
  data?: Maybe<Array<City>>
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type AllRestaurantsSlugOutput = {
  __typename?: 'AllRestaurantsSlugOutput'
  allCount?: Maybe<Scalars['Int']>
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
  slugs?: Maybe<Array<Scalars['String']>>
}

export type Category = {
  __typename?: 'Category'
  coverImageUrl?: Maybe<Scalars['String']>
  createdAt: Scalars['EnhancedDate']
  iconUrl?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  restaurantCount: Scalars['Int']
  restaurants: Array<Restaurant>
  slug: Scalars['String']
  updatedAt: Scalars['EnhancedDate']
}

export type City = {
  __typename?: 'City'
  createdAt: Scalars['EnhancedDate']
  id: Scalars['ID']
  location?: Maybe<GeoLocation>
  name: Scalars['String']
  nameInKhmer?: Maybe<Scalars['String']>
  restaurantCount: Scalars['Int']
  slug: Scalars['String']
  updatedAt: Scalars['EnhancedDate']
}

export type CoreOutput = {
  __typename?: 'CoreOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type CreateAccountInput = {
  email: Scalars['String']
  firstName?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  photoURL?: InputMaybe<Scalars['String']>
}

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
  user?: Maybe<User>
}

export type CreateDishInput = {
  description: Scalars['String']
  name: Scalars['String']
  options?: InputMaybe<Array<DishOptionInputType>>
  price: Scalars['Int']
  restaurantId: Scalars['Int']
}

export type CreateOrderInput = {
  items?: Array<CreateOrderItemInput>
  restaurantId: Scalars['Int']
}

export type CreateOrderItemInput = {
  dishId: Scalars['Int']
  options?: InputMaybe<Array<OrderItemOptionInputType>>
}

export type CreateOrderOutput = {
  __typename?: 'CreateOrderOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
  orderId?: Maybe<Scalars['Int']>
}

export type CreatePaymentInput = {
  restaurantId: Scalars['Int']
  transactionId: Scalars['String']
}

export type CreatePaymentOutput = {
  __typename?: 'CreatePaymentOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type DeleteAccountOutput = {
  __typename?: 'DeleteAccountOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type Dish = {
  __typename?: 'Dish'
  createdAt: Scalars['EnhancedDate']
  description: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  options?: Maybe<Array<DishOption>>
  photo?: Maybe<Scalars['String']>
  price: Scalars['Int']
  restaurant?: Maybe<Restaurant>
  updatedAt: Scalars['EnhancedDate']
}

export type DishChoice = {
  __typename?: 'DishChoice'
  extra?: Maybe<Scalars['Int']>
  name: Scalars['String']
}

export type DishChoiceInputType = {
  extra?: InputMaybe<Scalars['Int']>
  name: Scalars['String']
}

export type DishOption = {
  __typename?: 'DishOption'
  choices?: Maybe<Array<DishChoice>>
  extra?: Maybe<Scalars['Int']>
  name: Scalars['String']
}

export type DishOptionInputType = {
  choices?: InputMaybe<Array<DishChoiceInputType>>
  extra?: InputMaybe<Scalars['Int']>
  name: Scalars['String']
}

export type DishOutput = {
  __typename?: 'DishOutput'
  dish?: Maybe<Dish>
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type EditOrderInput = {
  id: Scalars['ID']
  status: OrderStatus
}

export type EditOrderOutput = {
  __typename?: 'EditOrderOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type GeoLocation = {
  __typename?: 'GeoLocation'
  createdAt: Scalars['EnhancedDate']
  id: Scalars['ID']
  latitude: Scalars['Float']
  longitude: Scalars['Float']
  updatedAt: Scalars['EnhancedDate']
}

export type GetOrderInput = {
  id: Scalars['ID']
}

export type GetOrderOutput = {
  __typename?: 'GetOrderOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
  order?: Maybe<Order>
}

export type GetOrdersInput = {
  status?: InputMaybe<OrderStatus>
}

export type GetOrdersOutput = {
  __typename?: 'GetOrdersOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
  orders?: Maybe<Array<Order>>
}

export type GetPaymentsOutput = {
  __typename?: 'GetPaymentsOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
  payments?: Maybe<Array<Payment>>
}

export type Image = {
  __typename?: 'Image'
  blurhash?: Maybe<Scalars['String']>
  createdAt: Scalars['EnhancedDate']
  id: Scalars['ID']
  restaurant?: Maybe<Restaurant>
  updatedAt: Scalars['EnhancedDate']
  url: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminCreateAdmin: CreateAccountOutput
  adminCreateCategory: AdminCreateCategoryOutput
  adminCreateCity: AdminCreateCityOutput
  adminCreateDish: DishOutput
  adminCreateRestaurant: RestaurantOutput
  adminDeleteCategory: CoreOutput
  adminDeleteCity: CoreOutput
  adminDeleteDish: CoreOutput
  adminDeleteUser: DeleteAccountOutput
  adminUpdateCategory: AdminUpdateCategoryOutput
  adminUpdateCity: AdminUpdateCityOutput
  adminUpdateDish: DishOutput
  adminUpdateRestaurant: RestaurantOutput
  adminUpdateUser: AdminUpdateUserOutput
  createOrder: CreateOrderOutput
  createPayment: CreatePaymentOutput
  deleteRestaurant: CoreOutput
  driverSignUp: SignUpAccountOutput
  takeOrder: TakeOrderOutput
  updateMe: UpdateProfileOutput
  updateOrder: EditOrderOutput
  vendorCreateDish: DishOutput
  vendorCreateRestaurant: RestaurantOutput
  vendorDeleteDish: CoreOutput
  vendorSignUp: SignUpAccountOutput
  vendorUpdateDish: DishOutput
  vendorUpdateRestaurant: RestaurantOutput
}

export type MutationAdminCreateAdminArgs = {
  input: CreateAccountInput
}

export type MutationAdminCreateCategoryArgs = {
  input: AdminCreateCategoryInput
}

export type MutationAdminCreateCityArgs = {
  input: AdminCreateCityInput
}

export type MutationAdminCreateDishArgs = {
  input: CreateDishInput
}

export type MutationAdminCreateRestaurantArgs = {
  input: AdminCreateRestaurantInput
}

export type MutationAdminDeleteCategoryArgs = {
  id: Scalars['Int']
}

export type MutationAdminDeleteCityArgs = {
  id: Scalars['Int']
}

export type MutationAdminDeleteDishArgs = {
  id: Scalars['Int']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']
}

export type MutationAdminUpdateCategoryArgs = {
  input: AdminUpdateCategoryInput
}

export type MutationAdminUpdateCityArgs = {
  input: AdminUpdateCityInput
}

export type MutationAdminUpdateDishArgs = {
  input: UpdateDishInput
}

export type MutationAdminUpdateRestaurantArgs = {
  input: AdminUpdateRestaurantInput
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
}

export type MutationCreateOrderArgs = {
  input: CreateOrderInput
}

export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput
}

export type MutationDeleteRestaurantArgs = {
  id: Scalars['Int']
}

export type MutationDriverSignUpArgs = {
  input: SignUpAccountInput
}

export type MutationTakeOrderArgs = {
  input: TakeOrderInput
}

export type MutationUpdateMeArgs = {
  input: UpdateProfileInput
}

export type MutationUpdateOrderArgs = {
  input: EditOrderInput
}

export type MutationVendorCreateDishArgs = {
  input: CreateDishInput
}

export type MutationVendorCreateRestaurantArgs = {
  input: VendorCreateRestaurantInput
}

export type MutationVendorDeleteDishArgs = {
  id: Scalars['Int']
}

export type MutationVendorSignUpArgs = {
  input: SignUpAccountInput
}

export type MutationVendorUpdateDishArgs = {
  input: UpdateDishInput
}

export type MutationVendorUpdateRestaurantArgs = {
  input: VendorUpdateRestaurantInput
}

export type OpeningHours = {
  __typename?: 'OpeningHours'
  createdAt: Scalars['EnhancedDate']
  fridayHours?: Maybe<Scalars['String']>
  id: Scalars['ID']
  mondayHours?: Maybe<Scalars['String']>
  saturdayHours?: Maybe<Scalars['String']>
  sundayHours?: Maybe<Scalars['String']>
  thursdayHours?: Maybe<Scalars['String']>
  tuesdayHours?: Maybe<Scalars['String']>
  updatedAt: Scalars['EnhancedDate']
  wednesdayHours?: Maybe<Scalars['String']>
}

export type Order = {
  __typename?: 'Order'
  createdAt: Scalars['EnhancedDate']
  customer?: Maybe<User>
  driver?: Maybe<User>
  id: Scalars['ID']
  items: Array<OrderItem>
  restaurant?: Maybe<Restaurant>
  status: OrderStatus
  total?: Maybe<Scalars['Float']>
  updatedAt: Scalars['EnhancedDate']
}

export type OrderItem = {
  __typename?: 'OrderItem'
  createdAt: Scalars['EnhancedDate']
  dish: Dish
  id: Scalars['ID']
  options?: Maybe<Array<OrderItemOption>>
  updatedAt: Scalars['EnhancedDate']
}

export type OrderItemOption = {
  __typename?: 'OrderItemOption'
  choice?: Maybe<Scalars['String']>
  name: Scalars['String']
}

export type OrderItemOptionInputType = {
  choice?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export enum OrderStatus {
  Cooked = 'Cooked',
  Cooking = 'Cooking',
  Delivered = 'Delivered',
  Pending = 'Pending',
  PickedUp = 'PickedUp',
}

export type OrderUpdatesInput = {
  id: Scalars['ID']
}

export type PaginatedCategoryRestaurantsOutput = {
  __typename?: 'PaginatedCategoryRestaurantsOutput'
  category?: Maybe<Category>
  error?: Maybe<Scalars['String']>
  hasNext?: Maybe<Scalars['Boolean']>
  hasPrevious?: Maybe<Scalars['Boolean']>
  matchedCount?: Maybe<Scalars['Int']>
  ok: Scalars['Boolean']
  pageCount?: Maybe<Scalars['Int']>
  restaurants?: Maybe<Array<Restaurant>>
}

export type PaginatedCityRestaurantsOutput = {
  __typename?: 'PaginatedCityRestaurantsOutput'
  city?: Maybe<City>
  error?: Maybe<Scalars['String']>
  hasNext?: Maybe<Scalars['Boolean']>
  hasPrevious?: Maybe<Scalars['Boolean']>
  matchedCount?: Maybe<Scalars['Int']>
  ok: Scalars['Boolean']
  pageCount?: Maybe<Scalars['Int']>
  restaurants?: Maybe<Array<Restaurant>>
}

export type PaginatedRestaurantsOutput = {
  __typename?: 'PaginatedRestaurantsOutput'
  data?: Maybe<Array<Restaurant>>
  error?: Maybe<Scalars['String']>
  hasNext?: Maybe<Scalars['Boolean']>
  hasPrevious?: Maybe<Scalars['Boolean']>
  matchedCount?: Maybe<Scalars['Int']>
  ok: Scalars['Boolean']
  pageCount?: Maybe<Scalars['Int']>
}

export type PaginatedUsersOutput = {
  __typename?: 'PaginatedUsersOutput'
  data?: Maybe<Array<User>>
  error?: Maybe<Scalars['String']>
  hasNext?: Maybe<Scalars['Boolean']>
  hasPrevious?: Maybe<Scalars['Boolean']>
  matchedCount?: Maybe<Scalars['Int']>
  ok: Scalars['Boolean']
  pageCount?: Maybe<Scalars['Int']>
}

export type PaginationCategoriesOutput = {
  __typename?: 'PaginationCategoriesOutput'
  data?: Maybe<Array<Category>>
  error?: Maybe<Scalars['String']>
  hasNext?: Maybe<Scalars['Boolean']>
  hasPrevious?: Maybe<Scalars['Boolean']>
  matchedCount?: Maybe<Scalars['Int']>
  ok: Scalars['Boolean']
  pageCount?: Maybe<Scalars['Int']>
}

export type PaginationCitiesOutput = {
  __typename?: 'PaginationCitiesOutput'
  data?: Maybe<Array<City>>
  error?: Maybe<Scalars['String']>
  hasNext?: Maybe<Scalars['Boolean']>
  hasPrevious?: Maybe<Scalars['Boolean']>
  matchedCount?: Maybe<Scalars['Int']>
  ok: Scalars['Boolean']
  pageCount?: Maybe<Scalars['Int']>
}

export type Payment = {
  __typename?: 'Payment'
  createdAt: Scalars['EnhancedDate']
  id: Scalars['ID']
  restaurant: Restaurant
  restaurantId: Scalars['Int']
  transactionId: Scalars['String']
  updatedAt: Scalars['EnhancedDate']
  user: User
}

export type Query = {
  __typename?: 'Query'
  adminGetRestaurants: PaginatedRestaurantsOutput
  adminGetUsers: PaginatedUsersOutput
  allCategories: AllCategoriesOutput
  allCities: AllCitiesOutput
  allRestaurantsSlug: AllRestaurantsSlugOutput
  categories: PaginationCategoriesOutput
  cities: PaginationCitiesOutput
  getOrder: GetOrderOutput
  getOrders: GetOrdersOutput
  getPayments: GetPaymentsOutput
  me: User
  myRestaurant: RestaurantOutput
  myRestaurants: PaginatedRestaurantsOutput
  restaurant: RestaurantOutput
  restaurantBySlug: RestaurantOutput
  restaurants: PaginatedRestaurantsOutput
  restaurantsByCategorySlug: PaginatedCategoryRestaurantsOutput
  restaurantsByCitySlug: PaginatedCityRestaurantsOutput
}

export type QueryAdminGetRestaurantsArgs = {
  page?: Scalars['Int']
  q?: InputMaybe<Scalars['String']>
  take?: Scalars['Int']
}

export type QueryAdminGetUsersArgs = {
  page?: Scalars['Int']
  q?: InputMaybe<Scalars['String']>
  role?: InputMaybe<UserRole>
  take?: Scalars['Int']
}

export type QueryAllRestaurantsSlugArgs = {
  take?: InputMaybe<Scalars['Int']>
}

export type QueryCategoriesArgs = {
  page?: Scalars['Int']
  q?: InputMaybe<Scalars['String']>
  take?: Scalars['Int']
}

export type QueryCitiesArgs = {
  page?: Scalars['Int']
  q?: InputMaybe<Scalars['String']>
  take?: Scalars['Int']
}

export type QueryGetOrderArgs = {
  input: GetOrderInput
}

export type QueryGetOrdersArgs = {
  input: GetOrdersInput
}

export type QueryMyRestaurantArgs = {
  id: Scalars['Int']
}

export type QueryMyRestaurantsArgs = {
  page?: Scalars['Int']
  q?: InputMaybe<Scalars['String']>
  take?: Scalars['Int']
}

export type QueryRestaurantArgs = {
  id: Scalars['Int']
}

export type QueryRestaurantBySlugArgs = {
  slug: Scalars['String']
}

export type QueryRestaurantsArgs = {
  page?: Scalars['Int']
  q?: InputMaybe<Scalars['String']>
  take?: Scalars['Int']
}

export type QueryRestaurantsByCategorySlugArgs = {
  page?: Scalars['Int']
  slug: Scalars['String']
  take?: Scalars['Int']
}

export type QueryRestaurantsByCitySlugArgs = {
  page?: Scalars['Int']
  slug: Scalars['String']
  take?: Scalars['Int']
}

export type Restaurant = {
  __typename?: 'Restaurant'
  address?: Maybe<Scalars['String']>
  categories?: Maybe<Array<Category>>
  city?: Maybe<City>
  coverImages?: Maybe<Array<Image>>
  createdAt: Scalars['EnhancedDate']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  isPromoted: Scalars['Boolean']
  location?: Maybe<GeoLocation>
  logoImageUrl?: Maybe<Scalars['String']>
  menu?: Maybe<Array<Dish>>
  name: Scalars['String']
  neighborhood?: Maybe<Scalars['String']>
  openingHours?: Maybe<OpeningHours>
  orders?: Maybe<Array<Order>>
  phone?: Maybe<Scalars['String']>
  promotedUntil?: Maybe<Scalars['EnhancedDate']>
  reviews?: Maybe<Array<Review>>
  slug: Scalars['String']
  street?: Maybe<Scalars['String']>
  updatedAt: Scalars['EnhancedDate']
  vendors: Array<User>
  website?: Maybe<Scalars['String']>
}

export type RestaurantOutput = {
  __typename?: 'RestaurantOutput'
  data?: Maybe<Restaurant>
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type Review = {
  __typename?: 'Review'
  createdAt: Scalars['EnhancedDate']
  customer: User
  id: Scalars['ID']
  name: Scalars['String']
  restaurant: Restaurant
  stars: Scalars['Int']
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['EnhancedDate']
}

export type SignUpAccountInput = {
  email: Scalars['String']
  firstName?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  password: Scalars['String']
  photoURL?: InputMaybe<Scalars['String']>
}

export type SignUpAccountOutput = {
  __typename?: 'SignUpAccountOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
  signInToken?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

export type Subscription = {
  __typename?: 'Subscription'
  cookedOrders: Order
  orderUpdates: Order
  pendingOrders: Order
}

export type SubscriptionOrderUpdatesArgs = {
  input: OrderUpdatesInput
}

export type TakeOrderInput = {
  id: Scalars['ID']
}

export type TakeOrderOutput = {
  __typename?: 'TakeOrderOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type UpdateDishInput = {
  description?: InputMaybe<Scalars['String']>
  dishId: Scalars['Int']
  name?: InputMaybe<Scalars['String']>
  options?: InputMaybe<Array<DishOptionInputType>>
  price?: InputMaybe<Scalars['Int']>
}

export type UpdateProfileInput = {
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  password: Scalars['String']
  photoURL?: InputMaybe<Scalars['String']>
}

export type UpdateProfileOutput = {
  __typename?: 'UpdateProfileOutput'
  error?: Maybe<Scalars['String']>
  ok: Scalars['Boolean']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['EnhancedDate']
  email: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  id: Scalars['ID']
  isVerified: Scalars['Boolean']
  lastName?: Maybe<Scalars['String']>
  orders?: Maybe<Array<Order>>
  payments?: Maybe<Array<Payment>>
  photoURL?: Maybe<Scalars['String']>
  restaurants?: Maybe<Array<Restaurant>>
  rides?: Maybe<Array<Order>>
  roles: Array<UserRole>
  updatedAt: Scalars['EnhancedDate']
}

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
  Driver = 'Driver',
  Vendor = 'Vendor',
}

export type VendorCreateRestaurantInput = {
  address?: InputMaybe<Scalars['String']>
  categories?: InputMaybe<Array<Scalars['String']>>
  logoImageUrl?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type VendorUpdateRestaurantInput = {
  address?: InputMaybe<Scalars['String']>
  categories?: InputMaybe<Array<Scalars['String']>>
  logoImageUrl?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  restaurantId: Scalars['Float']
}

export type FullOrderPartsFragment = {
  __typename?: 'Order'
  id: string
  status: OrderStatus
  total?: number | null
  driver?: { __typename?: 'User'; email: string } | null
  customer?: { __typename?: 'User'; email: string } | null
  restaurant?: { __typename?: 'Restaurant'; name: string } | null
}

export type RestaurantPartsFragment = {
  __typename?: 'Restaurant'
  id: string
  name: string
  address?: string | null
  isPromoted: boolean
  logoImageUrl?: string | null
  coverImages?: Array<{
    __typename?: 'Image'
    blurhash?: string | null
    url: string
  }> | null
  categories?: Array<{
    __typename?: 'Category'
    name: string
    coverImageUrl?: string | null
  }> | null
}

export type CategoryPartsFragment = {
  __typename?: 'Category'
  id: string
  name: string
  coverImageUrl?: string | null
  slug: string
  restaurantCount: number
}

export type DishPartsFragment = {
  __typename?: 'Dish'
  id: string
  name: string
  price: number
  photo?: string | null
  description: string
  options?: Array<{
    __typename?: 'DishOption'
    name: string
    extra?: number | null
    choices?: Array<{
      __typename?: 'DishChoice'
      name: string
      extra?: number | null
    }> | null
  }> | null
}

export type OrderPartsFragment = {
  __typename?: 'Order'
  id: string
  createdAt: any
  total?: number | null
}

export type UserPartsFragment = {
  __typename?: 'User'
  id: string
  firstName?: string | null
  lastName?: string | null
  email: string
  isVerified: boolean
  createdAt: any
  photoURL?: string | null
  roles: Array<UserRole>
}

export type AdminCreateCategoryMutationVariables = Exact<{
  input: AdminCreateCategoryInput
}>

export type AdminCreateCategoryMutation = {
  __typename?: 'Mutation'
  adminCreateCategory: {
    __typename?: 'AdminCreateCategoryOutput'
    error?: string | null
    ok: boolean
    category?: {
      __typename?: 'Category'
      coverImageUrl?: string | null
      createdAt: any
      id: string
      name: string
      restaurantCount: number
      slug: string
      updatedAt: any
    } | null
  }
}

export type AdminCreateRestaurantMutationVariables = Exact<{
  input: AdminCreateRestaurantInput
}>

export type AdminCreateRestaurantMutation = {
  __typename?: 'Mutation'
  adminCreateRestaurant: {
    __typename?: 'RestaurantOutput'
    error?: string | null
    ok: boolean
  }
}

export type AdminDeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type AdminDeleteCategoryMutation = {
  __typename?: 'Mutation'
  adminDeleteCategory: {
    __typename?: 'CoreOutput'
    error?: string | null
    ok: boolean
  }
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminDeleteUserMutation = {
  __typename?: 'Mutation'
  adminDeleteUser: {
    __typename?: 'DeleteAccountOutput'
    error?: string | null
    ok: boolean
  }
}

export type AdminUpdateCategoryMutationVariables = Exact<{
  input: AdminUpdateCategoryInput
}>

export type AdminUpdateCategoryMutation = {
  __typename?: 'Mutation'
  adminUpdateCategory: {
    __typename?: 'AdminUpdateCategoryOutput'
    error?: string | null
    ok: boolean
  }
}

export type AdminUpdateRestaurantMutationVariables = Exact<{
  input: AdminUpdateRestaurantInput
}>

export type AdminUpdateRestaurantMutation = {
  __typename?: 'Mutation'
  adminUpdateRestaurant: {
    __typename?: 'RestaurantOutput'
    error?: string | null
    ok: boolean
  }
}

export type AdminUpdateUserMutationVariables = Exact<{
  input: AdminUpdateUserInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  adminUpdateUser: {
    __typename?: 'AdminUpdateUserOutput'
    error?: string | null
    ok: boolean
  }
}

export type AdminCreateAdminMutationVariables = Exact<{
  input: CreateAccountInput
}>

export type AdminCreateAdminMutation = {
  __typename?: 'Mutation'
  adminCreateAdmin: {
    __typename?: 'CreateAccountOutput'
    ok: boolean
    error?: string | null
    user?: {
      __typename?: 'User'
      id: string
      firstName?: string | null
      lastName?: string | null
      email: string
      isVerified: boolean
      createdAt: any
      photoURL?: string | null
      roles: Array<UserRole>
    } | null
  }
}

export type CreateDishMutationVariables = Exact<{
  input: CreateDishInput
}>

export type CreateDishMutation = {
  __typename?: 'Mutation'
  vendorCreateDish: {
    __typename?: 'DishOutput'
    ok: boolean
    error?: string | null
  }
}

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput
}>

export type CreateOrderMutation = {
  __typename?: 'Mutation'
  createOrder: {
    __typename?: 'CreateOrderOutput'
    ok: boolean
    error?: string | null
    orderId?: number | null
  }
}

export type DeleteRestaurantMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteRestaurantMutation = {
  __typename?: 'Mutation'
  deleteRestaurant: {
    __typename?: 'CoreOutput'
    error?: string | null
    ok: boolean
  }
}

export type EditOrderMutationVariables = Exact<{
  input: EditOrderInput
}>

export type EditOrderMutation = {
  __typename?: 'Mutation'
  updateOrder: {
    __typename?: 'EditOrderOutput'
    ok: boolean
    error?: string | null
  }
}

export type TakeOrderMutationVariables = Exact<{
  input: TakeOrderInput
}>

export type TakeOrderMutation = {
  __typename?: 'Mutation'
  takeOrder: {
    __typename?: 'TakeOrderOutput'
    ok: boolean
    error?: string | null
  }
}

export type UpdateMeMutationVariables = Exact<{
  input: UpdateProfileInput
}>

export type UpdateMeMutation = {
  __typename?: 'Mutation'
  updateMe: {
    __typename?: 'UpdateProfileOutput'
    error?: string | null
    ok: boolean
  }
}

export type AdminGetRestaurantsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  take?: InputMaybe<Scalars['Int']>
}>

export type AdminGetRestaurantsQuery = {
  __typename?: 'Query'
  adminGetRestaurants: {
    __typename?: 'PaginatedRestaurantsOutput'
    error?: string | null
    hasNext?: boolean | null
    hasPrevious?: boolean | null
    matchedCount?: number | null
    ok: boolean
    pageCount?: number | null
    data?: Array<{
      __typename?: 'Restaurant'
      address?: string | null
      logoImageUrl?: string | null
      createdAt: any
      id: string
      isPromoted: boolean
      name: string
      promotedUntil?: any | null
      updatedAt: any
      categories?: Array<{
        __typename?: 'Category'
        restaurantCount: number
        coverImageUrl?: string | null
        createdAt: any
        id: string
        name: string
        slug: string
        updatedAt: any
      }> | null
      coverImages?: Array<{
        __typename?: 'Image'
        blurhash?: string | null
        url: string
      }> | null
      vendors: Array<{
        __typename?: 'User'
        id: string
        firstName?: string | null
        lastName?: string | null
        email: string
        isVerified: boolean
        createdAt: any
        photoURL?: string | null
        roles: Array<UserRole>
      }>
    }> | null
  }
}

export type AdminGetUsersQueryVariables = Exact<{
  role?: InputMaybe<UserRole>
  q?: InputMaybe<Scalars['String']>
  take?: InputMaybe<Scalars['Int']>
  page?: InputMaybe<Scalars['Int']>
}>

export type AdminGetUsersQuery = {
  __typename?: 'Query'
  adminGetUsers: {
    __typename?: 'PaginatedUsersOutput'
    error?: string | null
    hasNext?: boolean | null
    hasPrevious?: boolean | null
    matchedCount?: number | null
    ok: boolean
    pageCount?: number | null
    data?: Array<{
      __typename?: 'User'
      createdAt: any
      firstName?: string | null
      lastName?: string | null
      email: string
      id: string
      roles: Array<UserRole>
      updatedAt: any
      isVerified: boolean
      photoURL?: string | null
    }> | null
  }
}

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type AllCategoriesQuery = {
  __typename?: 'Query'
  allCategories: {
    __typename?: 'AllCategoriesOutput'
    error?: string | null
    ok: boolean
    data?: Array<{
      __typename?: 'Category'
      coverImageUrl?: string | null
      createdAt: any
      id: string
      name: string
      restaurantCount: number
      slug: string
      updatedAt: any
    }> | null
  }
}

export type AllCitiesQueryVariables = Exact<{ [key: string]: never }>

export type AllCitiesQuery = {
  __typename?: 'Query'
  allCities: {
    __typename?: 'AllCitiesOutput'
    ok: boolean
    error?: string | null
    data?: Array<{
      __typename?: 'City'
      createdAt: any
      id: string
      name: string
      nameInKhmer?: string | null
      restaurantCount: number
      slug: string
      updatedAt: any
      location?: {
        __typename?: 'GeoLocation'
        createdAt: any
        id: string
        latitude: number
        longitude: number
        updatedAt: any
      } | null
    }> | null
  }
}

export type AllRestaurantsSlugQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>
}>

export type AllRestaurantsSlugQuery = {
  __typename?: 'Query'
  allRestaurantsSlug: {
    __typename?: 'AllRestaurantsSlugOutput'
    allCount?: number | null
    error?: string | null
    ok: boolean
    slugs?: Array<string> | null
  }
}

export type CategoriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  take?: InputMaybe<Scalars['Int']>
}>

export type CategoriesQuery = {
  __typename?: 'Query'
  categories: {
    __typename?: 'PaginationCategoriesOutput'
    error?: string | null
    hasNext?: boolean | null
    hasPrevious?: boolean | null
    matchedCount?: number | null
    ok: boolean
    pageCount?: number | null
    data?: Array<{
      __typename?: 'Category'
      coverImageUrl?: string | null
      createdAt: any
      id: string
      name: string
      restaurantCount: number
      slug: string
      updatedAt: any
    }> | null
  }
}

export type CitiesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  take?: InputMaybe<Scalars['Int']>
}>

export type CitiesQuery = {
  __typename?: 'Query'
  cities: {
    __typename?: 'PaginationCitiesOutput'
    ok: boolean
    error?: string | null
    hasNext?: boolean | null
    hasPrevious?: boolean | null
    matchedCount?: number | null
    pageCount?: number | null
    data?: Array<{
      __typename?: 'City'
      createdAt: any
      id: string
      name: string
      nameInKhmer?: string | null
      restaurantCount: number
      slug: string
      updatedAt: any
      location?: {
        __typename?: 'GeoLocation'
        createdAt: any
        id: string
        latitude: number
        longitude: number
        updatedAt: any
      } | null
    }> | null
  }
}

export type GetOrderQueryVariables = Exact<{
  input: GetOrderInput
}>

export type GetOrderQuery = {
  __typename?: 'Query'
  getOrder: {
    __typename?: 'GetOrderOutput'
    ok: boolean
    error?: string | null
    order?: {
      __typename?: 'Order'
      id: string
      status: OrderStatus
      total?: number | null
      driver?: { __typename?: 'User'; email: string } | null
      customer?: { __typename?: 'User'; email: string } | null
      restaurant?: { __typename?: 'Restaurant'; name: string } | null
    } | null
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me: {
    __typename?: 'User'
    createdAt: any
    email: string
    firstName?: string | null
    id: string
    isVerified: boolean
    lastName?: string | null
    photoURL?: string | null
    roles: Array<UserRole>
  }
}

export type MyRestaurantsQueryVariables = Exact<{ [key: string]: never }>

export type MyRestaurantsQuery = {
  __typename?: 'Query'
  myRestaurants: {
    __typename?: 'PaginatedRestaurantsOutput'
    ok: boolean
    error?: string | null
    data?: Array<{
      __typename?: 'Restaurant'
      id: string
      name: string
      address?: string | null
      isPromoted: boolean
      logoImageUrl?: string | null
      coverImages?: Array<{
        __typename?: 'Image'
        blurhash?: string | null
        url: string
      }> | null
      categories?: Array<{
        __typename?: 'Category'
        name: string
        coverImageUrl?: string | null
      }> | null
    }> | null
  }
}

export type RestaurantBySlugQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type RestaurantBySlugQuery = {
  __typename?: 'Query'
  restaurantBySlug: {
    __typename?: 'RestaurantOutput'
    error?: string | null
    ok: boolean
    data?: {
      __typename?: 'Restaurant'
      address?: string | null
      createdAt: any
      id: string
      isPromoted: boolean
      logoImageUrl?: string | null
      name: string
      neighborhood?: string | null
      promotedUntil?: any | null
      slug: string
      street?: string | null
      updatedAt: any
      website?: string | null
      categories?: Array<{
        __typename?: 'Category'
        coverImageUrl?: string | null
        createdAt: any
        iconUrl?: string | null
        id: string
        name: string
        restaurantCount: number
        slug: string
        updatedAt: any
      }> | null
      city?: {
        __typename?: 'City'
        createdAt: any
        id: string
        name: string
        nameInKhmer?: string | null
        restaurantCount: number
        slug: string
        updatedAt: any
      } | null
      coverImages?: Array<{
        __typename?: 'Image'
        blurhash?: string | null
        url: string
      }> | null
      location?: {
        __typename?: 'GeoLocation'
        createdAt: any
        id: string
        latitude: number
        longitude: number
        updatedAt: any
      } | null
      menu?: Array<{
        __typename?: 'Dish'
        createdAt: any
        description: string
        id: string
        name: string
        photo?: string | null
        price: number
        updatedAt: any
        options?: Array<{
          __typename?: 'DishOption'
          extra?: number | null
          name: string
          choices?: Array<{
            __typename?: 'DishChoice'
            extra?: number | null
            name: string
          }> | null
        }> | null
      }> | null
      openingHours?: {
        __typename?: 'OpeningHours'
        createdAt: any
        fridayHours?: string | null
        id: string
        mondayHours?: string | null
        saturdayHours?: string | null
        sundayHours?: string | null
        thursdayHours?: string | null
        tuesdayHours?: string | null
        updatedAt: any
        wednesdayHours?: string | null
      } | null
      reviews?: Array<{
        __typename?: 'Review'
        createdAt: any
        id: string
        name: string
        stars: number
        text?: string | null
        updatedAt: any
      }> | null
    } | null
  }
}

export type RestaurantByIdQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type RestaurantByIdQuery = {
  __typename?: 'Query'
  restaurant: {
    __typename?: 'RestaurantOutput'
    error?: string | null
    ok: boolean
    data?: {
      __typename?: 'Restaurant'
      address?: string | null
      createdAt: any
      id: string
      isPromoted: boolean
      logoImageUrl?: string | null
      name: string
      promotedUntil?: any | null
      updatedAt: any
      categories?: Array<{
        __typename?: 'Category'
        coverImageUrl?: string | null
        createdAt: any
        id: string
        name: string
        restaurantCount: number
        slug: string
        updatedAt: any
      }> | null
      coverImages?: Array<{
        __typename?: 'Image'
        url: string
        blurhash?: string | null
      }> | null
      menu?: Array<{
        __typename?: 'Dish'
        createdAt: any
        description: string
        id: string
        name: string
        photo?: string | null
        price: number
        updatedAt: any
        options?: Array<{
          __typename?: 'DishOption'
          extra?: number | null
          name: string
          choices?: Array<{
            __typename?: 'DishChoice'
            extra?: number | null
            name: string
          }> | null
        }> | null
      }> | null
    } | null
  }
}

export type RestaurantsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  take?: InputMaybe<Scalars['Int']>
}>

export type RestaurantsQuery = {
  __typename?: 'Query'
  restaurants: {
    __typename?: 'PaginatedRestaurantsOutput'
    error?: string | null
    hasNext?: boolean | null
    hasPrevious?: boolean | null
    matchedCount?: number | null
    ok: boolean
    pageCount?: number | null
    data?: Array<{
      __typename?: 'Restaurant'
      address?: string | null
      slug: string
      createdAt: any
      id: string
      isPromoted: boolean
      logoImageUrl?: string | null
      name: string
      promotedUntil?: any | null
      updatedAt: any
      coverImages?: Array<{
        __typename?: 'Image'
        url: string
        blurhash?: string | null
      }> | null
      categories?: Array<{
        __typename?: 'Category'
        id: string
        name: string
        coverImageUrl?: string | null
        slug: string
        restaurantCount: number
      }> | null
      menu?: Array<{
        __typename?: 'Dish'
        createdAt: any
        description: string
        id: string
        name: string
        photo?: string | null
        price: number
        updatedAt: any
        options?: Array<{
          __typename?: 'DishOption'
          extra?: number | null
          name: string
          choices?: Array<{
            __typename?: 'DishChoice'
            extra?: number | null
            name: string
          }> | null
        }> | null
      }> | null
    }> | null
  }
}

export type CookedOrdersSubscriptionVariables = Exact<{ [key: string]: never }>

export type CookedOrdersSubscription = {
  __typename?: 'Subscription'
  cookedOrders: {
    __typename?: 'Order'
    id: string
    status: OrderStatus
    total?: number | null
    driver?: { __typename?: 'User'; email: string } | null
    customer?: { __typename?: 'User'; email: string } | null
    restaurant?: { __typename?: 'Restaurant'; name: string } | null
  }
}

export type OrderUpdatesSubscriptionVariables = Exact<{
  input: OrderUpdatesInput
}>

export type OrderUpdatesSubscription = {
  __typename?: 'Subscription'
  orderUpdates: {
    __typename?: 'Order'
    id: string
    status: OrderStatus
    total?: number | null
    driver?: { __typename?: 'User'; email: string } | null
    customer?: { __typename?: 'User'; email: string } | null
    restaurant?: { __typename?: 'Restaurant'; name: string } | null
  }
}

export type PendingOrdersSubscriptionVariables = Exact<{ [key: string]: never }>

export type PendingOrdersSubscription = {
  __typename?: 'Subscription'
  pendingOrders: {
    __typename?: 'Order'
    id: string
    status: OrderStatus
    total?: number | null
    driver?: { __typename?: 'User'; email: string } | null
    customer?: { __typename?: 'User'; email: string } | null
    restaurant?: { __typename?: 'Restaurant'; name: string } | null
  }
}

export const FullOrderPartsFragmentDoc = `
    fragment FullOrderParts on Order {
  id
  status
  total
  driver {
    email
  }
  customer {
    email
  }
  restaurant {
    name
  }
}
    `
export const RestaurantPartsFragmentDoc = `
    fragment RestaurantParts on Restaurant {
  id
  name
  coverImages {
    blurhash
    url
  }
  address
  isPromoted
  logoImageUrl
  categories {
    name
    coverImageUrl
  }
}
    `
export const CategoryPartsFragmentDoc = `
    fragment CategoryParts on Category {
  id
  name
  coverImageUrl
  slug
  restaurantCount
}
    `
export const DishPartsFragmentDoc = `
    fragment DishParts on Dish {
  id
  name
  price
  photo
  description
  options {
    name
    extra
    choices {
      name
      extra
    }
  }
}
    `
export const OrderPartsFragmentDoc = `
    fragment OrderParts on Order {
  id
  createdAt
  total
}
    `
export const UserPartsFragmentDoc = `
    fragment UserParts on User {
  id
  firstName
  lastName
  email
  isVerified
  createdAt
  photoURL
  roles
}
    `
export const AdminCreateCategoryDocument = `
    mutation AdminCreateCategory($input: AdminCreateCategoryInput!) {
  adminCreateCategory(input: $input) {
    category {
      coverImageUrl
      createdAt
      id
      name
      restaurantCount
      slug
      updatedAt
    }
    error
    ok
  }
}
    `
export const useAdminCreateCategoryMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminCreateCategoryMutation,
    TError,
    AdminCreateCategoryMutationVariables,
    TContext
  >,
) =>
  useMutation<
    AdminCreateCategoryMutation,
    TError,
    AdminCreateCategoryMutationVariables,
    TContext
  >(
    ['AdminCreateCategory'],
    (variables?: AdminCreateCategoryMutationVariables) =>
      fetchData<
        AdminCreateCategoryMutation,
        AdminCreateCategoryMutationVariables
      >(AdminCreateCategoryDocument, variables)(),
    options,
  )
export const AdminCreateRestaurantDocument = `
    mutation AdminCreateRestaurant($input: AdminCreateRestaurantInput!) {
  adminCreateRestaurant(input: $input) {
    error
    ok
  }
}
    `
export const useAdminCreateRestaurantMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminCreateRestaurantMutation,
    TError,
    AdminCreateRestaurantMutationVariables,
    TContext
  >,
) =>
  useMutation<
    AdminCreateRestaurantMutation,
    TError,
    AdminCreateRestaurantMutationVariables,
    TContext
  >(
    ['AdminCreateRestaurant'],
    (variables?: AdminCreateRestaurantMutationVariables) =>
      fetchData<
        AdminCreateRestaurantMutation,
        AdminCreateRestaurantMutationVariables
      >(AdminCreateRestaurantDocument, variables)(),
    options,
  )
export const AdminDeleteCategoryDocument = `
    mutation AdminDeleteCategory($id: Int!) {
  adminDeleteCategory(id: $id) {
    error
    ok
  }
}
    `
export const useAdminDeleteCategoryMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminDeleteCategoryMutation,
    TError,
    AdminDeleteCategoryMutationVariables,
    TContext
  >,
) =>
  useMutation<
    AdminDeleteCategoryMutation,
    TError,
    AdminDeleteCategoryMutationVariables,
    TContext
  >(
    ['AdminDeleteCategory'],
    (variables?: AdminDeleteCategoryMutationVariables) =>
      fetchData<
        AdminDeleteCategoryMutation,
        AdminDeleteCategoryMutationVariables
      >(AdminDeleteCategoryDocument, variables)(),
    options,
  )
export const AdminDeleteUserDocument = `
    mutation AdminDeleteUser($userId: String!) {
  adminDeleteUser(userId: $userId) {
    error
    ok
  }
}
    `
export const useAdminDeleteUserMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminDeleteUserMutation,
    TError,
    AdminDeleteUserMutationVariables,
    TContext
  >,
) =>
  useMutation<
    AdminDeleteUserMutation,
    TError,
    AdminDeleteUserMutationVariables,
    TContext
  >(
    ['AdminDeleteUser'],
    (variables?: AdminDeleteUserMutationVariables) =>
      fetchData<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>(
        AdminDeleteUserDocument,
        variables,
      )(),
    options,
  )
export const AdminUpdateCategoryDocument = `
    mutation AdminUpdateCategory($input: AdminUpdateCategoryInput!) {
  adminUpdateCategory(input: $input) {
    error
    ok
  }
}
    `
export const useAdminUpdateCategoryMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminUpdateCategoryMutation,
    TError,
    AdminUpdateCategoryMutationVariables,
    TContext
  >,
) =>
  useMutation<
    AdminUpdateCategoryMutation,
    TError,
    AdminUpdateCategoryMutationVariables,
    TContext
  >(
    ['AdminUpdateCategory'],
    (variables?: AdminUpdateCategoryMutationVariables) =>
      fetchData<
        AdminUpdateCategoryMutation,
        AdminUpdateCategoryMutationVariables
      >(AdminUpdateCategoryDocument, variables)(),
    options,
  )
export const AdminUpdateRestaurantDocument = `
    mutation AdminUpdateRestaurant($input: AdminUpdateRestaurantInput!) {
  adminUpdateRestaurant(input: $input) {
    error
    ok
  }
}
    `
export const useAdminUpdateRestaurantMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminUpdateRestaurantMutation,
    TError,
    AdminUpdateRestaurantMutationVariables,
    TContext
  >,
) =>
  useMutation<
    AdminUpdateRestaurantMutation,
    TError,
    AdminUpdateRestaurantMutationVariables,
    TContext
  >(
    ['AdminUpdateRestaurant'],
    (variables?: AdminUpdateRestaurantMutationVariables) =>
      fetchData<
        AdminUpdateRestaurantMutation,
        AdminUpdateRestaurantMutationVariables
      >(AdminUpdateRestaurantDocument, variables)(),
    options,
  )
export const AdminUpdateUserDocument = `
    mutation AdminUpdateUser($input: AdminUpdateUserInput!) {
  adminUpdateUser(input: $input) {
    error
    ok
  }
}
    `
export const useAdminUpdateUserMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminUpdateUserMutation,
    TError,
    AdminUpdateUserMutationVariables,
    TContext
  >,
) =>
  useMutation<
    AdminUpdateUserMutation,
    TError,
    AdminUpdateUserMutationVariables,
    TContext
  >(
    ['AdminUpdateUser'],
    (variables?: AdminUpdateUserMutationVariables) =>
      fetchData<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>(
        AdminUpdateUserDocument,
        variables,
      )(),
    options,
  )
export const AdminCreateAdminDocument = `
    mutation AdminCreateAdmin($input: CreateAccountInput!) {
  adminCreateAdmin(input: $input) {
    ok
    error
    user {
      ...UserParts
    }
  }
}
    ${UserPartsFragmentDoc}`
export const useAdminCreateAdminMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminCreateAdminMutation,
    TError,
    AdminCreateAdminMutationVariables,
    TContext
  >,
) =>
  useMutation<
    AdminCreateAdminMutation,
    TError,
    AdminCreateAdminMutationVariables,
    TContext
  >(
    ['AdminCreateAdmin'],
    (variables?: AdminCreateAdminMutationVariables) =>
      fetchData<AdminCreateAdminMutation, AdminCreateAdminMutationVariables>(
        AdminCreateAdminDocument,
        variables,
      )(),
    options,
  )
export const CreateDishDocument = `
    mutation createDish($input: CreateDishInput!) {
  vendorCreateDish(input: $input) {
    ok
    error
  }
}
    `
export const useCreateDishMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateDishMutation,
    TError,
    CreateDishMutationVariables,
    TContext
  >,
) =>
  useMutation<
    CreateDishMutation,
    TError,
    CreateDishMutationVariables,
    TContext
  >(
    ['createDish'],
    (variables?: CreateDishMutationVariables) =>
      fetchData<CreateDishMutation, CreateDishMutationVariables>(
        CreateDishDocument,
        variables,
      )(),
    options,
  )
export const CreateOrderDocument = `
    mutation createOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    ok
    error
    orderId
  }
}
    `
export const useCreateOrderMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateOrderMutation,
    TError,
    CreateOrderMutationVariables,
    TContext
  >,
) =>
  useMutation<
    CreateOrderMutation,
    TError,
    CreateOrderMutationVariables,
    TContext
  >(
    ['createOrder'],
    (variables?: CreateOrderMutationVariables) =>
      fetchData<CreateOrderMutation, CreateOrderMutationVariables>(
        CreateOrderDocument,
        variables,
      )(),
    options,
  )
export const DeleteRestaurantDocument = `
    mutation DeleteRestaurant($id: Int!) {
  deleteRestaurant(id: $id) {
    error
    ok
  }
}
    `
export const useDeleteRestaurantMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    DeleteRestaurantMutation,
    TError,
    DeleteRestaurantMutationVariables,
    TContext
  >,
) =>
  useMutation<
    DeleteRestaurantMutation,
    TError,
    DeleteRestaurantMutationVariables,
    TContext
  >(
    ['DeleteRestaurant'],
    (variables?: DeleteRestaurantMutationVariables) =>
      fetchData<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>(
        DeleteRestaurantDocument,
        variables,
      )(),
    options,
  )
export const EditOrderDocument = `
    mutation editOrder($input: EditOrderInput!) {
  updateOrder(input: $input) {
    ok
    error
  }
}
    `
export const useEditOrderMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    EditOrderMutation,
    TError,
    EditOrderMutationVariables,
    TContext
  >,
) =>
  useMutation<EditOrderMutation, TError, EditOrderMutationVariables, TContext>(
    ['editOrder'],
    (variables?: EditOrderMutationVariables) =>
      fetchData<EditOrderMutation, EditOrderMutationVariables>(
        EditOrderDocument,
        variables,
      )(),
    options,
  )
export const TakeOrderDocument = `
    mutation takeOrder($input: TakeOrderInput!) {
  takeOrder(input: $input) {
    ok
    error
  }
}
    `
export const useTakeOrderMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    TakeOrderMutation,
    TError,
    TakeOrderMutationVariables,
    TContext
  >,
) =>
  useMutation<TakeOrderMutation, TError, TakeOrderMutationVariables, TContext>(
    ['takeOrder'],
    (variables?: TakeOrderMutationVariables) =>
      fetchData<TakeOrderMutation, TakeOrderMutationVariables>(
        TakeOrderDocument,
        variables,
      )(),
    options,
  )
export const UpdateMeDocument = `
    mutation UpdateMe($input: UpdateProfileInput!) {
  updateMe(input: $input) {
    error
    ok
  }
}
    `
export const useUpdateMeMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateMeMutation,
    TError,
    UpdateMeMutationVariables,
    TContext
  >,
) =>
  useMutation<UpdateMeMutation, TError, UpdateMeMutationVariables, TContext>(
    ['UpdateMe'],
    (variables?: UpdateMeMutationVariables) =>
      fetchData<UpdateMeMutation, UpdateMeMutationVariables>(
        UpdateMeDocument,
        variables,
      )(),
    options,
  )
export const AdminGetRestaurantsDocument = `
    query AdminGetRestaurants($page: Int, $q: String, $take: Int) {
  adminGetRestaurants(page: $page, q: $q, take: $take) {
    error
    hasNext
    hasPrevious
    matchedCount
    ok
    pageCount
    data {
      address
      logoImageUrl
      categories {
        restaurantCount
        coverImageUrl
        createdAt
        id
        name
        slug
        updatedAt
      }
      coverImages {
        blurhash
        url
      }
      createdAt
      id
      isPromoted
      name
      promotedUntil
      updatedAt
      vendors {
        ...UserParts
      }
    }
  }
}
    ${UserPartsFragmentDoc}`
export const useAdminGetRestaurantsQuery = <
  TData = AdminGetRestaurantsQuery,
  TError = unknown,
>(
  variables?: AdminGetRestaurantsQueryVariables,
  options?: UseQueryOptions<AdminGetRestaurantsQuery, TError, TData>,
) =>
  useQuery<AdminGetRestaurantsQuery, TError, TData>(
    variables === undefined
      ? ['AdminGetRestaurants']
      : ['AdminGetRestaurants', variables],
    fetchData<AdminGetRestaurantsQuery, AdminGetRestaurantsQueryVariables>(
      AdminGetRestaurantsDocument,
      variables,
    ),
    options,
  )
export const AdminGetUsersDocument = `
    query AdminGetUsers($role: UserRole, $q: String, $take: Int, $page: Int) {
  adminGetUsers(role: $role, q: $q, take: $take, page: $page) {
    error
    hasNext
    hasPrevious
    matchedCount
    ok
    pageCount
    data {
      createdAt
      firstName
      lastName
      email
      id
      roles
      updatedAt
      isVerified
      photoURL
    }
  }
}
    `
export const useAdminGetUsersQuery = <
  TData = AdminGetUsersQuery,
  TError = unknown,
>(
  variables?: AdminGetUsersQueryVariables,
  options?: UseQueryOptions<AdminGetUsersQuery, TError, TData>,
) =>
  useQuery<AdminGetUsersQuery, TError, TData>(
    variables === undefined ? ['AdminGetUsers'] : ['AdminGetUsers', variables],
    fetchData<AdminGetUsersQuery, AdminGetUsersQueryVariables>(
      AdminGetUsersDocument,
      variables,
    ),
    options,
  )
export const AllCategoriesDocument = `
    query AllCategories {
  allCategories {
    data {
      coverImageUrl
      createdAt
      id
      name
      restaurantCount
      slug
      updatedAt
    }
    error
    ok
  }
}
    `
export const useAllCategoriesQuery = <
  TData = AllCategoriesQuery,
  TError = unknown,
>(
  variables?: AllCategoriesQueryVariables,
  options?: UseQueryOptions<AllCategoriesQuery, TError, TData>,
) =>
  useQuery<AllCategoriesQuery, TError, TData>(
    variables === undefined ? ['AllCategories'] : ['AllCategories', variables],
    fetchData<AllCategoriesQuery, AllCategoriesQueryVariables>(
      AllCategoriesDocument,
      variables,
    ),
    options,
  )
export const AllCitiesDocument = `
    query AllCities {
  allCities {
    ok
    error
    data {
      createdAt
      id
      location {
        createdAt
        id
        latitude
        longitude
        updatedAt
      }
      name
      nameInKhmer
      restaurantCount
      slug
      updatedAt
    }
  }
}
    `
export const useAllCitiesQuery = <TData = AllCitiesQuery, TError = unknown>(
  variables?: AllCitiesQueryVariables,
  options?: UseQueryOptions<AllCitiesQuery, TError, TData>,
) =>
  useQuery<AllCitiesQuery, TError, TData>(
    variables === undefined ? ['AllCities'] : ['AllCities', variables],
    fetchData<AllCitiesQuery, AllCitiesQueryVariables>(
      AllCitiesDocument,
      variables,
    ),
    options,
  )
export const AllRestaurantsSlugDocument = `
    query AllRestaurantsSlug($take: Int) {
  allRestaurantsSlug(take: $take) {
    allCount
    error
    ok
    slugs
  }
}
    `
export const useAllRestaurantsSlugQuery = <
  TData = AllRestaurantsSlugQuery,
  TError = unknown,
>(
  variables?: AllRestaurantsSlugQueryVariables,
  options?: UseQueryOptions<AllRestaurantsSlugQuery, TError, TData>,
) =>
  useQuery<AllRestaurantsSlugQuery, TError, TData>(
    variables === undefined
      ? ['AllRestaurantsSlug']
      : ['AllRestaurantsSlug', variables],
    fetchData<AllRestaurantsSlugQuery, AllRestaurantsSlugQueryVariables>(
      AllRestaurantsSlugDocument,
      variables,
    ),
    options,
  )
export const CategoriesDocument = `
    query Categories($page: Int, $q: String, $take: Int) {
  categories(page: $page, q: $q, take: $take) {
    data {
      coverImageUrl
      createdAt
      id
      name
      restaurantCount
      slug
      updatedAt
    }
    error
    hasNext
    hasPrevious
    matchedCount
    ok
    pageCount
  }
}
    `
export const useCategoriesQuery = <TData = CategoriesQuery, TError = unknown>(
  variables?: CategoriesQueryVariables,
  options?: UseQueryOptions<CategoriesQuery, TError, TData>,
) =>
  useQuery<CategoriesQuery, TError, TData>(
    variables === undefined ? ['Categories'] : ['Categories', variables],
    fetchData<CategoriesQuery, CategoriesQueryVariables>(
      CategoriesDocument,
      variables,
    ),
    options,
  )
export const CitiesDocument = `
    query Cities($page: Int, $q: String, $take: Int) {
  cities(page: $page, q: $q, take: $take) {
    ok
    error
    hasNext
    hasPrevious
    matchedCount
    pageCount
    data {
      createdAt
      id
      name
      nameInKhmer
      restaurantCount
      slug
      updatedAt
      location {
        createdAt
        id
        latitude
        longitude
        updatedAt
      }
    }
  }
}
    `
export const useCitiesQuery = <TData = CitiesQuery, TError = unknown>(
  variables?: CitiesQueryVariables,
  options?: UseQueryOptions<CitiesQuery, TError, TData>,
) =>
  useQuery<CitiesQuery, TError, TData>(
    variables === undefined ? ['Cities'] : ['Cities', variables],
    fetchData<CitiesQuery, CitiesQueryVariables>(CitiesDocument, variables),
    options,
  )
export const GetOrderDocument = `
    query GetOrder($input: GetOrderInput!) {
  getOrder(input: $input) {
    ok
    error
    order {
      ...FullOrderParts
    }
  }
}
    ${FullOrderPartsFragmentDoc}`
export const useGetOrderQuery = <TData = GetOrderQuery, TError = unknown>(
  variables: GetOrderQueryVariables,
  options?: UseQueryOptions<GetOrderQuery, TError, TData>,
) =>
  useQuery<GetOrderQuery, TError, TData>(
    ['GetOrder', variables],
    fetchData<GetOrderQuery, GetOrderQueryVariables>(
      GetOrderDocument,
      variables,
    ),
    options,
  )
export const MeDocument = `
    query Me {
  me {
    createdAt
    email
    firstName
    id
    isVerified
    lastName
    photoURL
    roles
  }
}
    `
export const useMeQuery = <TData = MeQuery, TError = unknown>(
  variables?: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>,
) =>
  useQuery<MeQuery, TError, TData>(
    variables === undefined ? ['Me'] : ['Me', variables],
    fetchData<MeQuery, MeQueryVariables>(MeDocument, variables),
    options,
  )
export const MyRestaurantsDocument = `
    query MyRestaurants {
  myRestaurants {
    ok
    error
    data {
      ...RestaurantParts
    }
  }
}
    ${RestaurantPartsFragmentDoc}`
export const useMyRestaurantsQuery = <
  TData = MyRestaurantsQuery,
  TError = unknown,
>(
  variables?: MyRestaurantsQueryVariables,
  options?: UseQueryOptions<MyRestaurantsQuery, TError, TData>,
) =>
  useQuery<MyRestaurantsQuery, TError, TData>(
    variables === undefined ? ['MyRestaurants'] : ['MyRestaurants', variables],
    fetchData<MyRestaurantsQuery, MyRestaurantsQueryVariables>(
      MyRestaurantsDocument,
      variables,
    ),
    options,
  )
export const RestaurantBySlugDocument = `
    query RestaurantBySlug($slug: String!) {
  restaurantBySlug(slug: $slug) {
    error
    ok
    data {
      address
      categories {
        coverImageUrl
        createdAt
        iconUrl
        id
        name
        restaurantCount
        slug
        updatedAt
      }
      city {
        createdAt
        id
        name
        nameInKhmer
        restaurantCount
        slug
        updatedAt
      }
      coverImages {
        blurhash
        url
      }
      createdAt
      id
      isPromoted
      location {
        createdAt
        id
        latitude
        longitude
        updatedAt
      }
      logoImageUrl
      menu {
        createdAt
        description
        id
        name
        options {
          choices {
            extra
            name
          }
          extra
          name
        }
        photo
        price
        updatedAt
      }
      name
      neighborhood
      openingHours {
        createdAt
        fridayHours
        id
        mondayHours
        saturdayHours
        sundayHours
        thursdayHours
        tuesdayHours
        updatedAt
        wednesdayHours
      }
      promotedUntil
      reviews {
        createdAt
        id
        name
        stars
        text
        updatedAt
      }
      slug
      street
      updatedAt
      website
    }
  }
}
    `
export const useRestaurantBySlugQuery = <
  TData = RestaurantBySlugQuery,
  TError = unknown,
>(
  variables: RestaurantBySlugQueryVariables,
  options?: UseQueryOptions<RestaurantBySlugQuery, TError, TData>,
) =>
  useQuery<RestaurantBySlugQuery, TError, TData>(
    ['RestaurantBySlug', variables],
    fetchData<RestaurantBySlugQuery, RestaurantBySlugQueryVariables>(
      RestaurantBySlugDocument,
      variables,
    ),
    options,
  )
export const RestaurantByIdDocument = `
    query RestaurantById($id: Int!) {
  restaurant(id: $id) {
    error
    ok
    data {
      address
      categories {
        coverImageUrl
        createdAt
        id
        name
        restaurantCount
        slug
        updatedAt
      }
      coverImages {
        url
        blurhash
      }
      createdAt
      id
      isPromoted
      logoImageUrl
      menu {
        createdAt
        description
        id
        name
        options {
          choices {
            extra
            name
          }
          extra
          name
        }
        photo
        price
        updatedAt
      }
      name
      promotedUntil
      updatedAt
    }
  }
}
    `
export const useRestaurantByIdQuery = <
  TData = RestaurantByIdQuery,
  TError = unknown,
>(
  variables: RestaurantByIdQueryVariables,
  options?: UseQueryOptions<RestaurantByIdQuery, TError, TData>,
) =>
  useQuery<RestaurantByIdQuery, TError, TData>(
    ['RestaurantById', variables],
    fetchData<RestaurantByIdQuery, RestaurantByIdQueryVariables>(
      RestaurantByIdDocument,
      variables,
    ),
    options,
  )
export const RestaurantsDocument = `
    query Restaurants($page: Int, $q: String, $take: Int) {
  restaurants(page: $page, q: $q, take: $take) {
    error
    hasNext
    hasPrevious
    matchedCount
    ok
    pageCount
    data {
      address
      slug
      coverImages {
        url
        blurhash
      }
      createdAt
      id
      isPromoted
      logoImageUrl
      categories {
        ...CategoryParts
      }
      menu {
        createdAt
        description
        id
        name
        options {
          choices {
            extra
            name
          }
          extra
          name
        }
        photo
        price
        updatedAt
      }
      name
      promotedUntil
      updatedAt
    }
  }
}
    ${CategoryPartsFragmentDoc}`
export const useRestaurantsQuery = <TData = RestaurantsQuery, TError = unknown>(
  variables?: RestaurantsQueryVariables,
  options?: UseQueryOptions<RestaurantsQuery, TError, TData>,
) =>
  useQuery<RestaurantsQuery, TError, TData>(
    variables === undefined ? ['Restaurants'] : ['Restaurants', variables],
    fetchData<RestaurantsQuery, RestaurantsQueryVariables>(
      RestaurantsDocument,
      variables,
    ),
    options,
  )
export const CookedOrdersDocument = `
    subscription cookedOrders {
  cookedOrders {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`
export const OrderUpdatesDocument = `
    subscription orderUpdates($input: OrderUpdatesInput!) {
  orderUpdates(input: $input) {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`
export const PendingOrdersDocument = `
    subscription pendingOrders {
  pendingOrders {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`
