import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../services/ContactService";

// import imgContact from "../images/C.png";
import Spinner from "../layout/Spinner";

const PhoneDir = () => {

  let [query, setQuery] = useState({
    text: ''
  });

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMassage: ''
  });

  useEffect(async () => {
    try {
      setState({ ...state, loading: true });
      let response = await ContactService.getALLContacts();
      // console.log(response.data);
      setState({
        ...state,
        loading: false,
        contacts: response.data,
        filteredContacts: response.data
      });
    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      })
    }
  }, []);

  // delete contact
  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getALLContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        });
      }
    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      })
    }
  };

  // search contacts
  let searchContacts = (event) => {
    event.preventDefault();
    setQuery({ ...query, text: event.target.value });
    let theContacts = state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setState({
      ...state,
      filteredContacts: theContacts
    });
  };

  let { loading, contacts, filteredContacts, errorMessage } = state;


  return (
    <>
      <section className="contact-search ">
        <div className="container">
          <div className="grid">

            <div className="row text-center">
              <div className="col">
                <p className="h3 fw-bold text-primary" >
                  Contact Manager
                  <Link to="/contacts/add" className="btn btn-danger ms-2">
                    <i className="fa fa-plus-circle me-1" />
                    New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem voluptas officia officiis vero quibusdam ab maiores,
                  quasi tenetur corporis sapiente veniam, ipsa expedita alias
                  amet unde eum quas laboriosam voluptate provident.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <form className="row" onSubmit={searchContacts}>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        // onChange={(e)=>setQuery(e.target.value)}
                        onChange={searchContacts}
                        type="text"
                        className="form-control"
                        placeholder="Search Names..."
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input type="submit" className="btn btn-primary" value="Search" />
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {
        loading ? <Spinner /> : <>

          <section className="conatact-list">
            <div className="container">
              <div className="row">

                {
                  filteredContacts.length > 0 &&
                  filteredContacts.map(contact => {
                    return (
                      <div className="col-md-6" key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row d-flex align-items-center justify-content-around">
                              <div className="col-md-4 me-3 ">
                                <img src={contact.photo} alt="" className="contact-img" />
                              </div>
                              <div className="col-md-6">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name : <span className="fw-bold">{contact.name}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile : <span className="fw-bold">{contact.mobile}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email : <span className="fw-bold">{contact.email}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                  <i className="fa fa-pen" />
                                </Link>
                                <button className="btn btn-danger my-1" onClick={() => clickDelete(contact.id)}>
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }

              </div>
            </div>
          </section>

        </>
      }


    </>
  );
};

export default PhoneDir;
