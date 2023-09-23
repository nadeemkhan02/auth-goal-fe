import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteUserAPIUrl, getUserListApiUrl } from "../../utils/urls";
import { useNavigate } from "react-router-dom";

const Users = (props) => {
  const [userListData, setUserListData] = useState([]);
  const [isListDataLoading, setIsListDataLoading] = useState(false);
  const [isDeleteListDataLoading, setIsDeleteListDataLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    setIsListDataLoading(true);
    axios
      .get(getUserListApiUrl)
      .then((res) => {
        setUserListData(res.data);
        setIsListDataLoading(false);
      })
      .catch((err) => {
        console.log(err, "error result");
        setIsListDataLoading(false);
      })
      .finally(() => {
        setIsListDataLoading(false);
      });
  };

  const handleEdit = () => {
    // Function to handle Edit action
    console.log("Edit clicked");
  };

  const handleDelete = (id) => {
    setIsDeleteListDataLoading(true);
    axios
      .delete(`${deleteUserAPIUrl}/${id}`)
      .then((res) => {
        setIsDeleteListDataLoading(false);
        getUserData();
      })
      .catch((err) => {
        setIsDeleteListDataLoading(false);
        console.log(err, "error while deleting user!");
      })
      .finally(() => {
        setIsDeleteListDataLoading(false);
      });
  };

  return (
    <div>
      <div className="headingContainer">
        <h2>User List</h2>
        <button onClick={getUserData}>Refresh Data</button>
      </div>
      {isListDataLoading ? (
        <p className="loading-list">Loading...</p>
      ) : userListData?.length > 0 ? (
        <div className="tableWrap">
          <table className="userTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="user-list-table-body">
              {userListData.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/user-details/${item?.id}`);
                    }}
                  >
                    {item?.name}
                  </td>
                  <td>{item?.age}</td>
                  <td>{item?.city}</td>
                  <td className="actions">
                    <button onClick={handleEdit}>Edit</button>
                    <button
                      className="delete"
                      onClick={() => {
                        handleDelete(item?.id);
                      }}
                      disabled={isDeleteListDataLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>No User Data</>
      )}
    </div>
  );
};

export default Users;
