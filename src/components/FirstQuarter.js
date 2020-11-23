import React, { useState } from 'react';
import Select from 'react-select';
import { useStore } from '../custom-store/store';

const FirstQuarter = () => {
  const globalState = useStore()[0];

  const { positions } = globalState.team;
  const { players } = globalState;

  const positionOptions = positions.map((position) => ({
    label: position.title,
    value: position.title,
    key: position.id,
  }));

  const [playerChosen, setPlayerChosen] = useState({});
  const [positionChosen, setPositionChosen] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);

  const playerOptions = players.map((player) => ({
    label: player.firstname,
    value: player.firstname,
    key: player.id,
    player,
  }));

  const handlePlayerSelect = (player, key) => {
    const newPlayer = {
      key,
      player,
    };

    setPlayerChosen(newPlayer);
    setSelectedPlayers((previousPlayers) =>
      previousPlayers.filter((p) => {
        if (p.id !== player.id) return [...previousPlayers, newPlayer];

        return previousPlayers;
      })
    );
    // eslint-disable-next-line no-console
    console.log(selectedPlayers);
    // eslint-disable-next-line no-console
    console.log(playerChosen);
  };

  // const validate = (position, player) => {
  //   // const res = player.positions.find(p => p.id === position.id;
  //   if (player) {
  //     // eslint-disable-next-line no-console
  //     console.log(
  //       'validate',
  //       position.position,
  //       player.player.player.positions
  //     );
  //     // const playerPositions = player.player.player.positions;
  //     // const pos = position.position.key;
  //     // const res = playerPositions.find((p) => p.key === pos);
  //     // console.log(res);
  //   }
  // };

  const handlePositionSelect = (position, key) => {
    const newPosition = {
      key,
      position,
    };
    // eslint-disable-next-line no-console
    console.log(position, key);
    setPositionChosen(newPosition);
    // eslint-disable-next-line no-console
    console.log(positionChosen);
    setSelectedPositions((previousPositions) =>
      previousPositions.filter((p) => {
        if (p.id !== position.id) return [...previousPositions, newPosition];

        return previousPositions;
      })
    );
    // eslint-disable-next-line no-console
    console.log(selectedPositions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   // let arr3 = arr1.map((item, i) => Object.assign({}, item, arr2[i]));
  //   // const teamArray = selectedPlayers.map((player, key) => ({
  //   //   ...player,
  //   //   ...selectedPositions[key],
  //   // }));
  //   validate(positionChosen, playerChosen);
  //   // console.log(teamArray);
  // }, [playerChosen, positionChosen]);

  return (
    <div className="add-ui-page d-flex align-item-center justify-content-center w-100">
      <div className="container">
        <div className="row">
          <div className="col-md-9 offset-md-1">
            <form
              className="form-horizontal bg-white add-form w-100 d-inline-block mb-5"
              id="addform"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="form-body d-inline-block w-100 py-3 px-3">
                <table className="custom-table">
                  <tbody>
                    {positions.map((p, i) => (
                      <tr key={p.id} className="custom-tablerow w-100">
                        <td className="custom-td px-3">
                          <div className="form-group">
                            <div className="custom-chossen">
                              <Select
                                className="basic-single"
                                classnameprefix="select.."
                                placeholder="Select Player"
                                // isSearchable={true}
                                name="player"
                                options={playerOptions}
                                value={playerOptions.value}
                                onChange={(e) => handlePlayerSelect(e, i)}
                                onBlur={(e) => e.preventDefault()}
                              />
                              {/* {showError && (
                      <span className="span-error text-danger">
                        Atleast One Position is Required.
                      </span>
                    )} */}
                            </div>
                          </div>
                        </td>
                        <td className="custom-td px-3">
                          <div className="form-group">
                            <div className="custom-chossen">
                              <Select
                                className="basic-single"
                                classnameprefix="select.."
                                placeholder="Select Position"
                                // isSearchable={true}
                                name="position"
                                options={positionOptions}
                                value={positionOptions.value}
                                onChange={(e) => handlePositionSelect(e, i)}
                                onBlur={(e) => e.preventDefault()}
                              />
                              {/* {showError && (
                      <span className="span-error text-danger">
                        Atleast One Position is Required.
                      </span>
                    )} */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
        </div>
      </div>
    </div>
  );
};

export default FirstQuarter;
