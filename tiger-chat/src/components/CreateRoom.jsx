import React, { useEffect, useState } from "react";
import "../styles/CreateRoom.css";
import { FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import axios from "axios";
import swal from "sweetalert";
import cryptojs from "crypto-js";
const CreateRoom = () => {
  const navigate = useNavigate();
  const [verficationSession, setVerficationSession] = useState(false);
  const [idGenerateRoom, setIdGenerateRoom] = useState(uuid().slice(0, 8));
  const [nameRoom, setNameRoom] = useState("");
  const GenerateIdRoom = () => {
    setIdGenerateRoom(() => {
      return uuid().slice(0, 8);
    });
  };
  const VerficationAndAccess = () => {
    if (nameRoom === "") {
      swal("obligatory", "Field is required", "error");
      return true;
    }
    const VerficationRoom = async () => {
      let res = await axios.post(
        "http://18.118.144.246:5500/room/query",
        { idRoom: idGenerateRoom },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem(
              "idUserSerie"
            )}`,
          },
        }
      );
      if (res.status >= 200 && res.status < 300) {
        return res;
      }
      throw new Error("Something went wrong");
    };
    VerficationRoom()
      .then((res) => {
        if (res.data) {
          if (parseInt(res.data.operation) === 1) {
            swal("Already Exist", "Try again, Generate New ID", "error");
          } else {
            const ndecr = cryptojs.AES.decrypt(
              window.sessionStorage.getItem("name"),
              process.env.REACT_APP_PASS_ENCR
            ).toString(cryptojs.enc.Utf8);
            const CreateNewRoom = async () => {
              let resultat = await axios.post(
                "http://18.118.144.246:5500/room/create",
                { idRoom: idGenerateRoom, name: ndecr, nameRoom: nameRoom },
                {
                  headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem(
                      "idUserSerie"
                    )}`,
                  },
                }
              );
              if (resultat.status >= 200 && resultat.status < 300) {
                return resultat;
              }
              throw new Error("Something went wrong");
            };
            CreateNewRoom()
              .then((resultat) => {
                if (resultat.data) {
                  if (parseInt(resultat.data[0].operation) === 1) {
                    const iRencr = cryptojs.AES.encrypt(
                      idGenerateRoom,
                      process.env.REACT_APP_PASS_ENCR
                    ).toString();
                    window.sessionStorage.setItem("idSessionGeneral", iRencr);
                    swal(
                      "Tiger Chat 🐆",
                      "Successful creation, Start your conversations ✅",
                      "success"
                    );
                    navigate("/RoomChat", { replace: true });
                  } else {
                    swal(
                      "Invalid",
                      "Failed to build or Room Already Exist",
                      "error"
                    );
                  }
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      })
      .catch((e) => {
        console.log(new Error(e));
      });
  };
  useEffect(() => {
    if (
      window.sessionStorage.getItem("idUser") &&
      window.sessionStorage.getItem("idUserSerie") &&
      window.sessionStorage.getItem("name")
    ) {
      setVerficationSession(() => {
        return true;
      });
    } else {
      navigate("/SignIn", { replace: true });
      window.location.reload();
    }
  }, []);
  if (verficationSession) {
    return (
      <>
        <div className="Principale">
          <div className="Room-selection">
            <div className="tigeLogo-and-title">
              <img src={require("../img/logoTiger2.png")} alt="Logo Tiger" />
              <h1>Create Room</h1>
            </div>
            <input
              type="text"
              name="nameRoom"
              maxLength="18"
              onChange={(e) => setNameRoom(() => e.target.value)}
              className="nameRoom"
              placeholder="Enter Name Room"
            />
            <div className="Generate">
              <input
                type="text"
                readOnly
                value={idGenerateRoom}
                name="generateIdRoom"
                className="generateIdRoom"
              />
              <button onClick={GenerateIdRoom} type="button">
                <FaSyncAlt />
              </button>
            </div>
            <button
              type="button"
              onClick={VerficationAndAccess}
              className="createRoom"
            >
              OK
            </button>
          </div>
        </div>
      </>
    );
  }
};
export default CreateRoom;
