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