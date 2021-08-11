import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import MuiDataTable from "mui-datatables";
import { IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import AdminLayout from "../../components/admin/AdminLayout";
export default function Users() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  async function getAllUsers() {
    try {
      const { data } = await axios.get("/api/admin/users");
      setUsers(data);
    } catch (err) {
      setError(err.response.data);
    }
  }
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      getAllUsers();
    } catch (err) {
      setError(err.response.data);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    { name: "name", label: "Name" },

    { name: "role", label: "User Role" },
    { name: "_id", label: "User Id" },
    { name: "email", label: "Email" },

    { name: "createdAt", label: "Created At" },
    {
      name: "Actions",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <IconButton
              onClick={() => {
                handleDeleteUser(users.user[dataIndex]._id);
              }}
            >
              <DeleteForever />
            </IconButton>
          );
        },
      },
    },
  ];
  return (
    <AdminLayout>
      {/* <h1>Users</h1> */}

      {users && (
        <MuiDataTable
          title={"List of Users"}
          columns={columns}
          data={users.user}
        />
      )}
    </AdminLayout>
  );
}
