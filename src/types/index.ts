import { ApolloError } from "@apollo/client"

export interface IApolloRequest<T> {
  data: {[key: string]: T} 
  loading: boolean
  error: ApolloError
}