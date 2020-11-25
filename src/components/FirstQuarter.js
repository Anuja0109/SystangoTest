import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { useStore } from '../custom-store/store';
import MemoizedAlert from './Alerts';

const FirstQuarter = () => {
  const [globalState, dispatch] = useStore();

  const { positions } = globalState.team;
  const { players } = globalState;

  const history = useHistory();

  // eslint-disable-next-line no-console
  console.log(globalState.team);
  const positionOptions = positions.map((position) => ({
    label: position.title,
    value: position.title,
    key: position.id,
  }));

  const [playerChosen, setPlayerChosen] = useState({});
  const [positionChosen, setPositionChosen] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);

  const playerOptions = players.map((player) => ({
    label: player.firstname,
    value: player.firstname,
    key: player.id,
    playerPositions: player.positions,
  }));

  // func to check & replace the value of player or Position if repeatedly selected again on same select.
  // Bug here.
  // const ifPresent = (items, newObj) => {
  //   const res = items.findIndex((i) => i.key === newObj.key);
  //   console.log(res);
  //   return items.map((pl) => (pl.key !== newObj.key ? pl : newObj));
  // };

  const handlePlayerSelect = (player, key) => {
    const newPlayer = {
      key,
      player,
    };

    setPlayerChosen(newPlayer);
    setSelectedPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };
  // Func to Check if Players are repeating in selectedPlayers
  // eslint-disable-next-line no-shadow
  const isPlayerRepeated = (players) => {
    const valueArr = players.map((player) => {
      return player.player.key;
    });
    const hasDuplicate = valueArr.some((item, idx) => {
      return valueArr.indexOf(item) !== idx;
    });
    // eslint-disable-next-line no-console
    console.log('hasDuplicates', hasDuplicate);
    return hasDuplicate;
  };
  // Func to Check if Positions are repeating in selectedPositions
  // eslint-disable-next-line no-shadow
  const isPositionRepeated = (positions) => {
    const valueArr = positions.map((position) => {
      return position.position.key;
    });
    const hasDuplicate = valueArr.some((item, idx) => {
      return valueArr.indexOf(item) !== idx;
    });
    // eslint-disable-next-line no-console
    console.log('hasDuplicates', hasDuplicate);
    return hasDuplicate;
  };

  // function for merging players & position array with a common Key
  // eslint-disable-next-line no-shadow
  const mergeTwoArraysByKey = (selectedPlayers, selectedPositions) =>
    selectedPlayers.map((itm) => ({
      ...selectedPositions.find((item) => item.key === itm.key && item),
      ...itm,
    }));

  // eslint-disable-next-line no-shadow
  const validate = (selectedPlayers, selectedPositions) => {
    const ifPlayerRepeated = isPlayerRepeated(selectedPlayers);
    const ifPositionRepeated = isPositionRepeated(selectedPositions);
    if (ifPlayerRepeated === false && ifPositionRepeated === false) {
      // eslint-disable-next-line no-shadow
      const newTeamArr = mergeTwoArraysByKey(
        selectedPlayers,
        selectedPositions
      );
      const newTeam = newTeamArr.forEach((el) =>
        // eslint-disable-next-line eqeqeq
        el.player.playerPositions.includes(el.position.key)
      );
      // eslint-disable-next-line no-console
      console.log(newTeam, 'newTeam');
      if (newTeam !== undefined && newTeamArr.length === positions.length)
        setSelectedTeam(newTeamArr);
      else
        dispatch('ADD_ALERT', {
          id: 'VAL',
          msg:
            '*Please Check if Positions selected for players are Included in their preferred Positions.',
          for: 'PlayersPosition',
          classToBeApplied: 'custom-error',
        });
    } else
      dispatch('ADD_ALERT', {
        id: 'REP',
        msg: '*Players & Positions selected should be unique.',
        for: 'PPRepeat',
        classToBeApplied: 'custom-error',
      });
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('playerChosen', playerChosen);
    // eslint-disable-next-line no-console
    console.log('selectedPlayers', selectedPlayers);
    // eslint-disable-next-line no-console
    console.log(positionChosen);
    // eslint-disable-next-line no-console
    console.log('selectedPositions', selectedPositions);
  }, [selectedPositions, selectedPlayers, playerChosen, positionChosen]);

  const handlePositionSelect = (position, key) => {
    const newPosition = {
      key,
      position,
    };
    // eslint-disable-next-line no-console
    console.log(position, key);
    setPositionChosen(newPosition);
    setSelectedPositions(
      (prevPositions) => [...prevPositions, newPosition]
      // prevPositions.map((ps) => (ps.key !== newPosition.key ? ps : newPosition))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(selectedPlayers, selectedPositions);
    console.log('before dispatch', selectedTeam);
    if (selectedTeam !== [] || undefined)
      dispatch('COMPOSE_TEAM', selectedTeam);
    history.push('/team');

    return null;
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(selectedTeam);
  }, [selectedTeam]);

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
                                isSearchable
                                name={`player${i}`}
                                options={playerOptions}
                                value={playerOptions.value}
                                onChange={(e) => handlePlayerSelect(e, i)}
                                onBlur={(e) => e.preventDefault()}
                              />
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
                                name={`position${i}`}
                                options={positionOptions}
                                value={positionOptions.value}
                                onChange={(e) => handlePositionSelect(e, i)}
                                onBlur={(e) => e.preventDefault()}
                              />
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
            <MemoizedAlert />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstQuarter;
