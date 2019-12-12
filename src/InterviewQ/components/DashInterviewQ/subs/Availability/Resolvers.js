import { gql } from 'apollo-boost';

export const GET_AVAILABILITIES = gql`
query availabilities ($coach_id: String!){
  availabilitiesByCoach (coach_id: $coach_id){
    id
    year
    month
    day
    start_hour
    start_minute
    isOpen
    recurring
    coach{
      id
    }
  }
  }
  `

  export const CREATE_AVAILABILITY = gql`
  mutation createAvailability(
      $start_hour: Int!
      $start_minute: Int!
      # $coach: String!
      $year: Int!
      $month: Int!
      $day: Int!
      # $isOpen: Boolean!
      $recurring: Boolean!
  ) {
    createAvailability(
      start_hour: $start_hour
      start_minute: $start_minute
      # coach: $coach
      year: $year
      month: $month
      day: $day
      # isOpen: $isOpen
      recurring: $recurring
    ) {
      id
      uniquecheck
      start_hour
      start_minute
      coach{
        id
      }
      year
      month
      day
      # isOpen
      recurring
    }
  }
  `

  export const DELETE_AVAILABILITY = gql`
    mutation deleteAvailability(
      $uniquecheck: String!
    ) { deleteAvailability(
        uniquecheck: $uniquecheck
    ) {
      id
    }
  }
  `

  export const AVAIL_BY_UNIQUE = gql`
    query availabilityByUniquecheck($uniquecheck: String!){
      availabilityByUniquecheck(uniquecheck: $uniquecheck){
        id
      }
    }
  `