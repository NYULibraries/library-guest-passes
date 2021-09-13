import { useState, useEffect, useReducer } from "react";
import { restrictionList, statusList } from "../tools";
import {
  guestLookupTrigger,
  postVisit,
  emptyForm,
  searchGuestEffect,
  dropdownChoiceEffect,
  eraseMessageEffect,
} from "../helpers";

const backendDomain = `${
  process.env.REACT_APP_BACKEND_FULL_HOST || "http://localhost:5000"
}`;

const Form = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      affiliate_name: "",
      guest_name: "",
      initials: "",
      restrictions: "",
      status: "",
      idtype: "",
      cardexp: "",
      cardissue: "",
      notes: "",
      dropdownChoice: "",
    }
  );

  const [permission, setPermission] = useState("-- enter name for permission status--");
  const [message, setMessage] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [debouncedName, setDebouncedName] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserInput({ [name]: value });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedName(userInput.guest_name);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [userInput.guest_name]);

  useEffect(() => {
    searchGuestEffect(
      backendDomain,
      userInput.guest_name,
      setSearchResults,
      debouncedName
    );
  }, [debouncedName]);

  useEffect(() => {
    const chosenUserData = {
      guest_name: userInput.guest_name,
      initials: userInput.initials,
      restrictions: userInput.restrictions,
      status: userInput.status,
      idtype: userInput.idtype,
      notes: userInput.notes,
    };

    if (userInput.dropdownChoice === "empty") {
      emptyForm(userInput, setUserInput, setSearchResults);
    } else if (userInput.dropdownChoice !== "") {
      dropdownChoiceEffect(
        userInput.dropdownChoice,
        chosenUserData,
        setUserInput
      );
    }
  }, [userInput.dropdownChoice]);

  useEffect(() => {
    eraseMessageEffect(message, setMessage);
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      guest_name: userInput.guest_name,
      affiliate_name: userInput.affiliate_name,
      initials: userInput.initials,
      restrictions: userInput.restrictions,
      status: userInput.status,
      idtype: userInput.idtype,
      cardissue: userInput.cardissue,
      cardexp: userInput.cardexp,
      notes: userInput.notes,
    };

    const response = await postVisit(backendDomain, data);

    if (response.status === 500) {
      setMessage("Oops! Something went wrong. Please fill out all fields.");
    } else {
      setMessage("Success!");
      emptyForm(userInput, setUserInput, setSearchResults);
    }
  };

  return (
    <div id="header">
      <h2>Library Privileges</h2>
      <h3>Passes Form</h3>
      <p>Required fields are marked with an <p style={{ color: "red" }}>&#160;*</p></p>
      <hr />
    <form data-testid="passes-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="form-group">
        <label htmlFor="guest_name">Guest Name<div style={{ color: "red" }}>*</div></label>
        <input
          className="form-control"
          data-testid="form-input"
          name="guest_name"
          id="guest_name"
          value={userInput.guest_name}
          onChange={handleChange}
          aria-required="true"
        />
        <div>
          {guestLookupTrigger(
            searchResults,
            userInput.dropdownChoice,
            handleChange
          )}
        </div>
        <label htmlFor="permission">Permission status</label>
        <p name="permission">{permission}</p>
        <label htmlFor="affiliate_name">Affiliate Name</label>
        <input
          className="form-control"
          data-testid="form-input"
          name="affiliate_name"
          id="affiliate_name"
          value={userInput.affiliate_name}
          onChange={handleChange}
        />
        <label htmlFor="initials">Employee Initials<div style={{ color: "red" }}>*</div></label>
        <input
          className="form-control"
          data-testid="form-input"
          name="initials"
          id="initials"
          value={userInput.initials}
          onChange={handleChange}
          aria-required="true"
        />
        <label htmlFor="idtype">ID Type<div style={{ color: "red" }}>*</div></label>
        <input
          className="form-control"
          data-testid="form-input"
          name="idtype"
          id="idtype"
          value={userInput.idtype}
          onChange={handleChange}
          aria-required="true"
        />
        <label htmlFor="restrictions">Restrictions<div style={{ color: "red" }}>*</div></label>
        <select
          className="form-select"
          name="restrictions"
          id="restrictions"
          value={userInput.restrictions}
          onChange={handleChange}
          aria-required="true"
        >
          {restrictionList.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
        <label htmlFor="status">Status<div style={{ color: "red" }}>*</div></label>
        <select
          className="form-select"
          name="status"
          id="status"
          value={userInput.status}
          onChange={handleChange}
          aria-required="true"
        >
          {statusList.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
        <label htmlFor="cardissue">Card Issued On<div style={{ color: "red" }}>*</div></label>
        <input
          className="form-control"
          data-testid="form-input"
          name="cardissue"
          id="cardissue"
          type="date"
          value={userInput.cardissue}
          onChange={handleChange}
          aria-required="true"
        />
        <label htmlFor="cardexp">Expiration Date<div style={{ color: "red" }}>*</div></label>
        <input
          className="form-control"
          data-testid="form-input"
          name="cardexp"
          id="cardexp"
          type="date"
          value={userInput.cardexp}
          onChange={handleChange}
          aria-required="true"
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          className="form-control"
          data-testid="form-input"
          name="notes"
          id="notes"
          value={userInput.notes}
          onChange={handleChange}
        />
        <div className="btn-group " role="group">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => emptyForm(userInput, setUserInput, setSearchResults)}
          >
            Clear
          </button>
        </div>
        <div className="msgWrap">
          <em name="message" aria-live="assertive">{message}</em>
        </div>
      </div>
    </form>
  </div>
  );
};

export default Form;
