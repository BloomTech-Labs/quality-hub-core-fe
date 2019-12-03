import { gql } from 'apollo-boost';

export const UPDATE_POST = gql`
mutation updatePost(
  $id: ID! 
  $price: Int
  $position: String
 $company: String
  $description: String
  $tagString: String
) {
  updatePost(
    id: $id
    price: $price
    position: $position
    company: $company
    description: $description
    tagString: $tagString
  ) {
    id
    price
    position
    company
    industry{
      name
    }
    description
    tags{
      name
    }
  }
}
`

export const GET_INDUSTRIES = gql `
  query industries{
    name
    id
  }
`