import React, { useState } from "react";
import { ApiServer } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions } from "../../rtk/slices/sessions-slice";
// import DatePicker from "react-multi-date-picker";

function CreateNewSession() {
  const sessions = useSelector((state) => state.sessions);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [newSession, setNewSession] = useState({
    date: formattedDate,
    group: "",
    status: "",
  });

  const handleSessionChange = (field, value) => {
    setNewSession({ ...newSession, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newSession.date && newSession.group && newSession.status) {
      const createSession = async (newSession) => {
        try {
          await toast.promise(axios.post(`${ApiServer}/sessions`, newSession), {
            pending: {
              render: "Adding Session...",
            },
            success: {
              render: "Session added successfully!",
              type: "success",
            },
            // Message and options for the "error" state
            error: {
              render: "Failed to add session!",
              type: "error",
            },
          });

          // Reset Fields
          setNewSession({
            date: formattedDate,
            group: "",
            status: "",
          });
          dispatch(fetchSessions());
          setLoading(false);
        } catch (error) {
          console.error("Error creating session:", error.message);
          setLoading(false);
        }
      };
      await createSession(newSession);
    }
  };

  const labelStyles = { textAlign: "left", marginRight: -150 };
  const formRowStyle = "row align-items-center mb-2";

  return (
    <div>
      {sessions.length > 0 ? (
        <main>
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              <div className="container-md" style={{ width: 400 }}>
                <div className={formRowStyle}>
                  <label className="col" htmlFor="date" style={labelStyles}>
                    Date:
                  </label>
                  <div className="col">
                    <input
                      id="date"
                      type="date"
                      placeholder="Session Date"
                      value={newSession.date}
                      onChange={(e) =>
                        handleSessionChange("date", e.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                </div>

                <div className={formRowStyle}>
                  <label className="col" htmlFor="group" style={labelStyles}>
                    Group:
                  </label>
                  <div className="col">
                    <select
                      id="group"
                      value={newSession.group}
                      onChange={(e) =>
                        handleSessionChange("group", e.target.value)
                      }
                      className="form-select"
                    >
                      <option value="">Select a group</option>
                      <option value="1st Secondary">1st Secondary</option>
                      <option value="2nd Secondary">2nd Secondary</option>
                      <option value="3rd Secondary">3rd Secondary</option>
                      <option value="Speak-E Course">Speak-E Course</option>
                    </select>
                  </div>
                </div>

                <div className={formRowStyle}>
                  <label className="col" htmlFor="status" style={labelStyles}>
                    Status:
                  </label>
                  <div className="col btn-group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="status"
                      id="online"
                      autoComplete="off"
                      checked={newSession.status === "Online"}
                      onChange={() => handleSessionChange("status", "Online")}
                    />
                    <label
                      className={`btn ${
                        newSession.status === "Online"
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      htmlFor="online"
                    >
                      Online
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="status"
                      id="offline"
                      autoComplete="off"
                      checked={newSession.status === "Offline"}
                      onChange={() => handleSessionChange("status", "Offline")}
                    />
                    <label
                      className={`btn ${
                        newSession.status === "Offline"
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      htmlFor="offline"
                    >
                      Face-to-Face
                    </label>
                  </div>
                </div>
                <div className="row mt-3">
                  {loading ? (
                    <>
                      <LoadingSpinner text="Saving Sessions(s)" size={20} />
                    </>
                  ) : (
                    <button
                      className="btn btn-dark"
                      type="submit"
                      // onClick={() => handleSubmit()}
                      disabled={
                        newSession.group && newSession.status ? false : true
                      }
                    >
                      Add Session
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </main>
      ) : (
        <>
          <LoadingSpinner text="Loading" size={30} />
        </>
      )}
    </div>
  );
}

export default CreateNewSession;
