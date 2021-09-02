const userLookupTrigger = (results, dropdownChoice, handleChange) => {
  if (results?.length) {
    return (
      <div className="dropdown input-group mb-3">
        <select
          className="form-select"
          name="dropdownChoice"
          value={dropdownChoice}
          onChange={handleChange}
        >
          <option key="empty" value="empty">
            Returning User?
          </option>
          {results.map((e) => (
            <option key={e.id} value={JSON.stringify(e)}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return <div></div>;
};

const postUser = async (url, data) => {
  return await fetch(`${url}/users`, {
    method: "POST",
    mode: "cors",
    cache: "default",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const emptyForm = (fieldsToEmpty, fn, optionalFn) => {
  Object.keys(fieldsToEmpty).map((e) => {
    return fn({ [e]: "" });
  });
  if (optionalFn) {
    optionalFn("");
  }
};

const searchUserEffect = (url, name, fn, trigger) => {
  const searchUser = () => {
    const encodedURL = encodeURI(url + "/users/?affiliate_name=" + name);
    fetch(encodedURL)
      .then((response) => response.json())
      .then((data) => fn(data));
  };

  if (trigger) {
    return searchUser();
  }
};

const chooseVisit = (e) => {
  let highestNum = 0;
  let chosenVisitObject;
  for (let i = 0; i < e.length; i++){
    if(e[i].id > highestNum){
      highestNum = e[i].id;
      chosenVisitObject = e[i];
    }
  }
  return chosenVisitObject;
}

const dropdownChoiceEffect = (choice, obj, fn) => {
  const chosenUser = JSON.parse(choice);
  //the most recent visit is chosen as the basis for the form autopopulation
  const chosenVisit = chooseVisit(chosenUser.Visits);
  //then, the User's name is added to the object that will be mapped for the form
  chosenVisit.affiliate_name = chosenUser.name;
  return Object.keys(obj).map((e) => {
    return fn({ [e]: chosenVisit[e] });
  });
};

const eraseMessageEffect = (msg, fn) => {
  if (msg.includes("Success")) {
    setTimeout(() => {
      fn("");
    }, 2000);
  } else if (msg.includes("Oops")) {
    setTimeout(() => {
      fn("");
    }, 2000);
  }
};

export {
  userLookupTrigger,
  postUser,
  emptyForm,
  searchUserEffect,
  dropdownChoiceEffect,
  eraseMessageEffect,
};
