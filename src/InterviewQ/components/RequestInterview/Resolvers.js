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
    uniquecheck
    coach{
      id
    }
  }
  }
  `

export const CREATE_BOOKING = gql`
  mutation createBooking (
    $year: Int!
    $month: Int!
    $day: Int!
    $hour: Int!
    $minute: Int!
    $coach: String!
    $availabilityA: String!
    $availabilityB: String!
    $pending: Boolean
    $confirmed: Boolean
  ) {
    createBooking(
      year: $year
      month:  $month
      day: $day
      hour: $hour
      minute: $minute
      coach: $coach
      availabilityA: $availabilityA
      availabilityB: $availabilityB
      pending: $pending
      confirmed: $confirmed
    ) {
      id
      year
      month
      day
      hour
      minute
      coach{
        id
      }
      seeker{
        id
      }
      pending
      confirmed
    }
  }
`