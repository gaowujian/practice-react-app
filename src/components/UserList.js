import React from "react";
import UserAPI from "../utils/UserAPI";

function UserList() {
  const users = UserAPI.list();
  return (
    <div>
      {users &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <h4>username:{user.username}</h4>
            </div>
          );
        })}
    </div>
  );
}

export default UserList;
