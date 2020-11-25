import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../custom-store/store';
import MemoizedAlert from './Alerts';

const AddPlayer = () => {
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    height: null,
  });

  const [selectedPositions, setSelectedPositions] = useState([]);

  // Using global custom-hook store
  const [globalState, dispatch] = useStore();

  const heightRef = useRef(null);

  const { firstname, lastname, height } = state;

  // Method for clearing form after submission
  const clearForm = () => {
    setState({
      firstname: '',
      lastname: '',
      height: null,
    });
    heightRef.current.value = null;
  };

  // Function for validations
  const validate = (player) => {
    // eslint-disable-next-line no-shadow
    const { firstname, lastname, height, positions } = player;

    if (firstname.trim() === '') {
      const alertF = {
        id: 'FNR',
        msg: '*First Name is Required.',
        for: 'firstname',
        classToBeApplied: 'custom-error',
      };
      dispatch('ADD_ALERT', alertF);
    } else dispatch('REMOVE_ALERT', 'FNR');
    if (lastname.trim() === '') {
      const alertL = {
        id: 'LNR',
        msg: '*Last Name is Required.',
        for: 'lastname',
        classToBeApplied: 'custom-error',
      };
      dispatch('ADD_ALERT', alertL);
    } else dispatch('REMOVE_ALERT', 'LNR');

    if (height === null || height < 150) {
      const alertH = {
        id: 'HIR',
        msg: '*Height is Required in cms.',
        for: 'height',
        classToBeApplied: 'custom-error',
      };
      dispatch('ADD_ALERT', alertH);
    } else dispatch('REMOVE_ALERT', 'HIR');

    if (positions === undefined || null) {
      const alertP = {
        id: 'PIR',
        msg: '*Atleast One Position is Required.',
        for: 'position',
        classToBeApplied: 'custom-error',
      };
      dispatch('ADD_ALERT', alertP);
    } else dispatch('REMOVE_ALERT', 'PIR');
  };

  const onInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (position) => {
    setSelectedPositions(position);
  };

  // options for React-select component
  const positionOptions = globalState.team.positions.map((position) => ({
    label: position.title,
    value: position.title,
    key: position.id,
  }));

  const { alerts } = globalState;

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlayer = {
      id: uuidv4(),
      firstname,
      lastname,
      height,
      positions: selectedPositions,
    };
    validate(newPlayer);
    // eslint-disable-next-line no-console
    console.log('alerts', alerts);
    dispatch('ADD_PLAYER', newPlayer);
    clearForm();
  };

  return (
    <div className="add-ui-page d-flex align-item-center justify-content-center w-100">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-2">
            <form
              className="form-horizontal bg-white add-form w-100 d-inline-block mb-5"
              id="addform"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="form-body d-inline-block w-100 py-3 px-3">
                <div className="form-group">
                  <div className="input-box">
                    <input
                      type="text"
                      id="firstname"
                      placeholder="First Name"
                      className="form-control custom-input"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-box">
                    <input
                      type="text"
                      id="lastname"
                      placeholder="Last Name"
                      name="lastname"
                      value={lastname}
                      className="form-control custom-input"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-box">
                    <input
                      type="number"
                      id="height"
                      placeholder="Height"
                      name="height"
                      ref={heightRef}
                      className="form-control custom-input"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-chossen">
                    <Select
                      className="basic-multi-select"
                      classnameprefix="select.."
                      placeholder="Position"
                      isSearchable
                      isClearable
                      isMulti
                      name="position"
                      options={positionOptions}
                      value={positionOptions.value}
                      // defaultValue={{ label: null, value: null }}
                      onChange={handleSelect}
                      onBlur={(e) => e.preventDefault()}
                    />
                  </div>
                </div>
              </div>
              <div className="form-footer p-3 text-center border-top">
                <button
                  type="submit"
                  className="btn btn-theme mx-auto d-block px-5"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 w-100 d-inline-block mt-5">
            <div className="form-body d-inline-block w-100 py-3 px-3">
              <MemoizedAlert />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlayer;
