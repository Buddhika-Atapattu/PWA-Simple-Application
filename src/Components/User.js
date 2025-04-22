import { React, useState, useEffect } from "react";
import Skeleton from "./Skeleton";

export default function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        ).catch((error) => {
          alert("Error fetching data:" + error);
        });
        const data = await response.json();
        setUser(data);
        localStorage.setItem("Users", JSON.stringify(data));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        const collectionData = localStorage.getItem("Users");
        setUser(JSON.parse(collectionData));
      }
    };
    fetchData();
  }, []);

  const tableHeaders = ["ID", "Name", "Username", "Email"];
  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => {
                return (
                  <th key={index} scope="col" className="text-center wrap-text">
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="wrap-text">{user.id}</td>
                  <td className="wrap-text">{user.name}</td>
                  <td className="wrap-text">{user.username}</td>
                  <td className="wrap-text">{user.email}</td>
                </tr>
              );
            })}
            {loading && (
              <tr>
                <td>
                  <Skeleton status={loading} />
                </td>
                <td>
                  <Skeleton status={loading} />
                </td>
                <td>
                  <Skeleton status={loading} />
                </td>
                <td>
                  <Skeleton status={loading} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
