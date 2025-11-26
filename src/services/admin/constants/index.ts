import { DELETE_SPECIFIC_USER_PARAMS } from "../utils/delete-specific-user";
import { GET_ALL_USERS_PARAMS } from "../utils/get-all-users";

const GET_ALL_USERS = ({
  searchQuery,
  page,
  limit = 10,
}: GET_ALL_USERS_PARAMS) =>
  `/users?q=${searchQuery}&page=${page}&limit=${limit}`;
const DELETE_SPECIFIC_USER = ({ userId }: DELETE_SPECIFIC_USER_PARAMS) =>
  `/users/${userId}`;

const ADMIN_ENDPOINTS = {
  GET_ALL_USERS,
  DELETE_SPECIFIC_USER,
};

export default ADMIN_ENDPOINTS;
