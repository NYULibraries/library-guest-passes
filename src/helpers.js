const guestLookupTrigger = (results, dropdownChoice, handleChange) => {
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

const postVisit = async (url, data) => {
  return await fetch(`${url}/visit`, {
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

const searchVisitorEffect = (url, name, fn, trigger, type) => {
  const searchVisitor = () => {
    const encodedURL = encodeURI(`${url}/name-search/?${type}_name=${name}`);
    fetch(encodedURL)
      .then((response) => response.json())
      .then((data) => fn(data));
  };

  if (trigger) {
    return searchVisitor();
  }
};

const permissionLookupEffect = async (url, name, fn, type) => {
  const encodedURL = encodeURI(`${url}/permission/?${type}_name=${name}`);
  const visitor = await fetch(encodedURL).then((response) => response.json())
  if(visitor.name && visitor.name === name){
    fn(visitor.permission_status);
  } else {
    return 
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
  const chosenGuest = JSON.parse(choice);
  //the most recent visit is chosen as the basis for the form autopopulation
  const chosenVisit = chooseVisit(chosenGuest.Visits);
  //then, the User's name is added to the object that will be mapped for the form
  if(!chosenVisit) return false
  chosenVisit.guest_name = chosenGuest.name;
  chosenVisit.permission_status = chosenGuest.permission_status;
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

const postEditVisitor = async (url, obj, name, status) =>{
  await fetch(`${url}/${obj.typeOfVisitor}/${obj.id}`, {
    method: "PUT",
    mode: "cors",
    cache: "default",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name: name, permission_status: status})
  })
  .then(res => res.text())
  .then(res => console.log(res))
}

export {
  guestLookupTrigger,
  postVisit,
  emptyForm,
  searchVisitorEffect,
  dropdownChoiceEffect,
  eraseMessageEffect,
  postEditVisitor,
  permissionLookupEffect
};
