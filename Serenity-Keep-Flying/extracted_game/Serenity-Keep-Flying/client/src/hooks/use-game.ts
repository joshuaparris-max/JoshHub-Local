import { useState, useCallback, useEffect, useRef } from 'react';
import { ROOMS, ITEMS, NPCS, INITIAL_STATE, DIALOGUE_TREES, type GameState, type LogEntry } from '@/lib/game-data';

export function useGame() {
  const [state, setState] = useState<GameState>(JSON.parse(JSON.stringify(INITIAL_STATE)));
  const stateRef = useRef(state); // For async access if needed

  // Sync ref
  useEffect(() => { stateRef.current = state; }, [state]);

  const addLog = useCallback((text: string, type: LogEntry['type'] = 'info') => {
    setState(prev => ({
      ...prev,
      log: [...prev.log, { turn: prev.time, text, type }].slice(-100)
    }));
  }, []);

  const getRoom = useCallback(() => ROOMS[state.player.location], [state.player.location]);
  
  const getRoomItems = useCallback(() => {
    const rId = state.player.location;
    const room = ROOMS[rId];
    if (!room) return [];
    
    // Items removed from this room
    const removed = state.removed[rId] || [];
    // Items dropped in this room
    const added = state.roomItems[rId] || [];
    
    return [
      ...(room.items || []).filter((i: string) => !removed.includes(i)),
      ...added
    ];
  }, [state.player.location, state.removed, state.roomItems]);

  const getExits = useCallback(() => {
    const rId = state.player.location;
    const room = ROOMS[rId];
    if (!room) return {};
    
    let exits = { ...room.exits };
    
    // Dynamic exits based on where the ship is docked
    if (rId === 'airlock') {
      if (state.ship.docked === 'persephone') exits.south = 'persephone_docks';
      else if (state.ship.docked === 'rim_outpost') exits.south = 'rim_street';
      else if (state.ship.docked === 'relay_station') exits.south = 'relay_entry';
      else delete exits.south;
    }
    
    if (rId === 'relay_control' && !state.flags.found_lab) delete exits.east;
    
    return exits;
  }, [state.player.location, state.ship.docked, state.flags]);

  const tick = useCallback((amount = 1) => {
    setState(prev => {
      let newState = { ...prev, time: prev.time + amount };
      
      // Quest progression logic
      if (newState.time >= 10 && newState.quests.salvage.status === 'locked') {
        newState.quests.salvage.status = 'available';
        addLog("Incoming wave: New salvage opportunity available.", "accent");
      }

      // Ship strain reduction
      if (newState.ship.strain > 0) newState.ship.strain = Math.max(0, newState.ship.strain - 1);
      
      return newState;
    });
    
    // Random events chance (1 in 5 ticks)
    if (state.time > 0 && state.time % 5 === 0) {
      if (Math.random() < 0.3) triggerRandomEvent();
    }
  }, [state.time]);

  const triggerRandomEvent = useCallback(() => {
    // Simplified random event logic for React port
    const roll = Math.random();
    if (roll < 0.3 && state.ship.heat > 20) {
      addLog("⚠ ALERT: Alliance Patrol detected on long-range scanners.", "accent");
      setState(prev => ({ ...prev, ship: { ...prev.ship, heat: prev.ship.heat + 5 }}));
    } else if (roll < 0.6 && state.ship.strain > 20) {
      addLog("⚠ ALERT: Engine rattle detected. Kaylee looks worried.", "error");
      setState(prev => ({ ...prev, ship: { ...prev.ship, strain: prev.ship.strain + 5 }}));
    }
  }, [state.ship.heat, state.ship.strain, addLog]);

  // --- ACTIONS ---

  const look = useCallback(() => {
    const room = getRoom();
    addLog(`[ ${room.name} ]`, "accent");
    addLog(room.desc);
    
    const items = getRoomItems();
    if (items.length > 0) {
      const names = items.map((id: string) => ITEMS[id]?.name).join(", ");
      addLog(`You see: ${names}`, "info");
    }
    
    const exits = getExits();
    const exitNames = Object.keys(exits).join(", ");
    addLog(`Exits: ${exitNames || "None"}`, "dim");
    
    // List NPCs
    Object.entries(NPCS).forEach(([id, npc]) => {
      if (npc.location === state.player.location) {
        addLog(`${npc.name} is here. ${npc.desc}`, "npc");
      }
    });
  }, [getRoom, getRoomItems, getExits, state.player.location, addLog]);

  const move = useCallback((dir: string) => {
    const exits = getExits();
    if (exits[dir]) {
      setState(prev => ({
        ...prev,
        player: { ...prev.player, location: exits[dir] }
      }));
      tick();
      // We need to defer the look because state updates are async, 
      // but in this hook design we rely on the next render or useEffect.
      // For this simplified version, we'll manually queue the description in a useEffect or just let the user type look.
      // Better:
      setTimeout(() => {
        const nextRoom = ROOMS[exits[dir]];
        addLog(`Moved ${dir} to ${nextRoom.name}.`);
      }, 0);
    } else {
      addLog("You can't go that way.", "error");
    }
  }, [getExits, tick, addLog]);

  const take = useCallback((itemName: string) => {
    const items = getRoomItems();
    const itemId = items.find((id: string) => 
      id === itemName || ITEMS[id].name.toLowerCase().includes(itemName.toLowerCase())
    );

    if (itemId) {
      if (!ITEMS[itemId].takeable) {
        addLog("You can't take that.", "error");
        return;
      }
      
      setState(prev => {
        const rId = prev.player.location;
        const newRemoved = [...(prev.removed[rId] || []), itemId];
        // Also remove from roomItems if it was dropped there
        const newRoomItems = (prev.roomItems[rId] || []).filter((i: string) => i !== itemId);
        
        return {
          ...prev,
          player: { ...prev.player, inventory: [...prev.player.inventory, itemId] },
          removed: { ...prev.removed, [rId]: newRemoved },
          roomItems: { ...prev.roomItems, [rId]: newRoomItems }
        };
      });
      addLog(`Taken: ${ITEMS[itemId].name}`, "success");
      tick();
    } else {
      addLog("You don't see that here.", "error");
    }
  }, [getRoomItems, addLog, tick]);

  const inventory = useCallback(() => {
    if (state.player.inventory.length === 0) {
      addLog("You aren't carrying anything.", "dim");
    } else {
      const names = state.player.inventory.map((id: string) => ITEMS[id].name).join(", ");
      addLog(`Inventory: ${names}`, "info");
      addLog(`Credits: ${state.player.credits} ¤`, "accent");
    }
  }, [state.player.inventory, state.player.credits, addLog]);

  const help = useCallback(() => {
    addLog("COMMANDS:", "accent");
    addLog("  look, l ............. View surroundings");
    addLog("  go [dir] ............ Move (north, south, east, west, up, down)");
    addLog("  take [item] ......... Pick up an item");
    addLog("  talk [npc] .......... Speak with someone");
    addLog("  inv, i .............. Check inventory");
    addLog("  status .............. Check ship and crew status");
    addLog("  wait ................ Pass time");
    addLog("  clear ............... Clear terminal");
  }, [addLog]);

  const talk = useCallback((npcName: string) => {
    const here = Object.entries(NPCS).filter(([id, npc]) => npc.location === stateRef.current.player.location);
    const npcId = here.find(([id, npc]) => 
      id === npcName || npc.name.toLowerCase().includes(npcName.toLowerCase())
    )?.[0];

    if (npcId) {
      if (DIALOGUE_TREES[npcId]) {
        setState(prev => ({
          ...prev,
          dialogue: { npcId, nodeId: 'start' }
        }));
        const node = DIALOGUE_TREES[npcId].start;
        addLog(`${NPCS[npcId].name}: "${node.text}"`, "npc");
      } else {
        addLog(`${NPCS[npcId].name} doesn't have much to say.`, "npc");
      }
    } else {
      addLog("They aren't here.", "error");
    }
  }, [addLog]);

  const handleDialogueChoice = useCallback((choiceIdx: number) => {
    // Logging side effects immediately based on current state
    const currentState = stateRef.current;
    if (!currentState.dialogue) return;

    const { npcId, nodeId } = currentState.dialogue;
    const node = DIALOGUE_TREES[npcId][nodeId];
    const availableOptions = node.options.filter((opt: any) => !opt.condition || opt.condition(currentState));
    const option = availableOptions[choiceIdx];

    if (option) {
      addLog(`> ${option.text}`, "dim");
      
      if (option.action === 'end') {
        setState(prev => ({ ...prev, dialogue: null }));
        addLog("Conversation ended.", "system");
        return;
      }

      const nextNodeId = option.nextNodeId;
      const nextNode = DIALOGUE_TREES[npcId][nextNodeId];

      setState(prev => {
        let nextState = { ...prev };
        if (typeof option.action === 'function') {
          nextState = option.action(nextState);
        }
        return {
          ...nextState,
          dialogue: { npcId, nodeId: nextNodeId }
        };
      });

      addLog(`${NPCS[npcId].name}: "${nextNode.text}"`, "npc");
    } else {
      addLog("Invalid choice.", "error");
    }
  }, [addLog]);

  // Parser
  const parseCommand = useCallback((cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    if (!clean) return;
    
    // Use the latest state from the ref to avoid stale closure issues
    const currentState = stateRef.current;
    
    if (currentState.dialogue) {
      // In dialogue mode, we only accept numbers or end commands
      const choice = parseInt(clean) - 1;
      if (!isNaN(choice) && choice >= 0) {
        handleDialogueChoice(choice);
      } else if (clean === 'end' || clean === 'exit' || clean === 'quit') {
        setState(prev => ({ ...prev, dialogue: null }));
        addLog("Conversation ended.", "system");
      } else {
        addLog("Type the number of your choice, or 'end' to leave.", "error");
      }
      return;
    }

    addLog(`> ${cmd}`, "dim");
    
    const parts = clean.split(' ');
    const verb = parts[0];
    const args = parts.slice(1).join(' ');

    switch (verb) {
      case 'look':
      case 'l':
        look();
        break;
      case 'n':
      case 'north':
        move('north');
        break;
      case 's':
      case 'south':
        move('south');
        break;
      case 'e':
      case 'east':
        move('east');
        break;
      case 'w':
      case 'west':
        move('west');
        break;
      case 'u':
      case 'up':
        move('up');
        break;
      case 'd':
      case 'down':
        move('down');
        break;
      case 'go':
      case 'move':
      case 'walk':
        if (args) move(args);
        else addLog("Go where?", "error");
        break;
      case 'take':
      case 'get':
      case 'grab':
        if (args) take(args);
        else addLog("Take what?", "error");
        break;
      case 'talk':
      case 'speak':
      case 'chat':
        if (args) talk(args);
        else addLog("Talk to who?", "error");
        break;
      case 'i':
      case 'inv':
      case 'inventory':
        inventory();
        break;
      case 'help':
        help();
        break;
      case 'clear':
        setState(prev => ({ ...prev, log: [] }));
        break;
      case 'wait':
        addLog("Time passes...");
        tick();
        break;
      case 'status':
        addLog(`HP: ${state.player.hp}/${state.player.maxHp}`);
        addLog(`Ship Hull: ${state.ship.hull}% | Fuel: ${state.ship.fuel}%`);
        break;
      default:
        addLog("I don't understand that command.", "error");
    }
  }, [look, move, take, talk, handleDialogueChoice, inventory, help, tick, addLog]);

  return {
    gameState: state,
    setGameState: setState,
    parseCommand,
    addLog
  };
}
