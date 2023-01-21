import EditForm from "./EditForm";

import React from "react";
import { useState, useContext } from "react";
import swal from "sweetalert";
import { userContext } from "./UserDetails";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "react-bootstrap/Modal";

const UserDetailsList = () => {
  const userDataForRender = useContext(userContext);

  const [userData, setUserData] = useState(userDataForRender);
  const [likeclicks, setLikeClicks] = useState([]);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (selectedUserForUpdateId) => {
    setShow(true);
    let userForUpdate = userData.filter(
      (user) => user.id === selectedUserForUpdateId
    );
    setSelectedUserForUpdate(userForUpdate[0]);
  };

  //add the id to the array of clicked items if it doesn't exist but if it does exist remove it. this makes sure that double clicking on an item brings it back to normal
  const handleIconClick = (id) => {
    let result = likeclicks.includes(id)
      ? likeclicks.filter((click) => click !== id)
      : [...likeclicks, id];
    setLikeClicks(result);
  };

  const deleteUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Delete this User?",
      icon: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        let updatedDataAfterDelete = userData.filter((item) => {
          return item.id !== id;
        });
        setUserData(updatedDataAfterDelete);
        swal("Deleted!", "Your User file has been deleted!", "success");
      }
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm
            selectedUserForUpdate={selectedUserForUpdate}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>

      {userData.map((item) => {
        return (
          <ul key={item.id}>
            <div className="col">
              <div className="card h-30">
                <img
                  src={`https://avatars.dicebear.com/v2/avataaars/${item.username}.svg?options[mood][]=happy`}
                  className="card-img-top"
                  alt="..."
                />

                <table>
                  <tbody>
                    <tr>
                      <td>
                        <p className="card-title">{item.name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="card-details">
                          <MailOutlineIcon />
                          &nbsp;{item.email}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="card-details">
                          <PhoneEnabledOutlinedIcon />
                          &nbsp;{item.phone}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="card-details">
                          <LanguageOutlinedIcon />
                          &nbsp;{item.website}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="card-footer">
                  <div
                    className="btn-group text-muted footer-buttons"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="like-button"
                      onClick={() => handleIconClick(item.id)}
                    >
                      {likeclicks.includes(item.id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )}
                    </button>

                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => handleShow(item.id)}
                    >
                      <BorderColorOutlinedIcon />
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deleteUser(item.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        );
      })}
    </>
  );
};

export default UserDetailsList;
