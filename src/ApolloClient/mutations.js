import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                id
                username
                email
            }
        }
    }
`

export const REGISTER = gql`
    mutation register($email: String!, $password: String!, $username: String!){
        register(email: $email, password: $password, username: $username){
            token
            user {
                id
                username
                email
            }
        }
    }
`

export const AUTH = gql`
    mutation {
        auth {
            token
            user {
                id
                username
                email
            }
        }
    }
`

export const ADDROOM = gql`
    mutation addRoom($roomName: String!, $description: String!){
        addRoom(roomName: $roomName, description: $description){
            id
            roomName
            description
        }
    }
`

export const ADDITEM = gql`
    mutation addItem($description: String!, $price: String!, $image: String!, $quantity: String!, $room: ID!, $category: ID!){
        addItem(price: $price, description: $description,image: $image, quantity: $quantity, room: $room, category: $category){
           id
            description
            image
            price
            quantity
            category {
                description
                type
            }
            room {
                id
            }
        }
    }
`
