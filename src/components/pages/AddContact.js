import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../services/ContactService';

const AddContact = () => {

    let navigate = useNavigate();

    let [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errorMessage: ''
    });

    let updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }

    useEffect( async () => {
        try {
           setState({...state, loading: true});
           let response = await ContactService.getGroups();
           setState({
               ...state,
               loading: false,
               groups: response.data
           })
        }
        catch (error) {

        }
    }, []);

    let submitForm = async (event) => {
        event.preventDefault();
        try{
          let response = await ContactService.createContact(state.contact);
          if(response){
              navigate('/phoneDir', {replace: true});
          }
        }
        catch (error) {
            setState({...state, errorMessage: errorMessage});
            navigate('/contacts/add', { replace:false});
        }
    };

    let { loading, contact, groups, errorMessage } = state;

    return (
        <>
           {/* <pre>{JSON.stringify(state.contact)}</pre> */}
            <section className='add-contact'>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success fw-bold">Create Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque rem ipsam ullam quis explicabo officia ad, blanditiis laudantium amet aliquid facere obcaecati. Deserunt provident quod necessitatibus aperiam, quasi itaque quos.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        name="name"
                                        value={contact.name}
                                        onChange={updateInput}
                                        required={true}
                                        type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="photo"
                                        value={contact.photo}
                                        onChange={updateInput}
                                        required={true}
                                        type="text" className="form-control" placeholder="Photo Url" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="mobile"
                                        value={contact.mobile}
                                        onChange={updateInput}
                                        required={true}
                                        type="number" className="form-control" placeholder="Mobile" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="email"
                                        value={contact.email}
                                        onChange={updateInput}
                                        required={true}
                                        type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="company"
                                        value={contact.company}
                                        onChange={updateInput}
                                        required={true}
                                        type="text" className="form-control" placeholder="Company" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="title"
                                        value={contact.title}
                                        onChange={updateInput}
                                        required={true}
                                        type="text" className="form-control" placeholder="Title" />
                                </div>
                                <div className="mb-2">
                                    <select
                                        name="groupId"
                                        value={contact.groupId}
                                        onChange={updateInput}
                                        // required={true}
                                        className='form-control'>
                                        <option value="">Select a Group</option>
                                        {
                                            groups.length > 0 && 
                                               groups.map(group => {
                                                   return(
                                                       <option key={group.id} value={group.id}>{group.name}</option>
                                                   )
                                               })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success" value="Create" />
                                    <Link to={'/phoneDir'} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddContact