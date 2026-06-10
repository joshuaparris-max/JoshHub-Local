export const ROOMS: Record<string, any> = {
  cargo_bay:{name:'Cargo Bay',desc:'The cavernous cargo bay of Serenity stretches before you. Crates stack along the walls, the Mule sits on its pad, and metal walkways ring the upper level. Bay doors are sealed against the void.',exits:{north:'galley',east:'infirmary',west:'engine_room',up:'crew_bunks',south:'airlock'},items:['pistol','protein_bar'],shipRoom:true},
  engine_room:{name:'Engine Room',desc:"Serenity's heart beats here. The radion-accelerator core hums with warm amber light. Tools hang everywhere and a hammock is strung between pipes. Smells of grease and stubborn hope.",exits:{east:'cargo_bay'},items:['wrench','engine_grease'],shipRoom:true},
  infirmary:{name:'Infirmary',desc:'A clean, well-lit medical bay. Glass cabinets hold medicines and surgical tools. A diagnostic bed sits center, displays dark.',exits:{west:'cargo_bay'},items:['medkit','stethoscope'],shipRoom:true},
  galley:{name:'Galley',desc:'The communal kitchen and dining area. A long scarred table dominates. Smell of rehydrated protein lingers. A faded Blue Sun ad peels from one wall.',exits:{south:'cargo_bay',north:'bridge',east:'passenger_quarters',west:'shuttle_one'},items:['herb_tea'],shipRoom:true},
  bridge:{name:'Bridge',desc:"Serenity's cockpit opens onto the black. The pilot's chair is surrounded by flickering displays and plastic dinosaurs. Stars drift past the windows.",exits:{south:'galley'},items:['dinosaur','cortex_pad'],shipRoom:true},
  crew_bunks:{name:'Crew Bunks',desc:'Narrow corridor lined with ladder-accessed bunks. Personal effects and weapons on walls. The deck vibrates softly with the engine.',exits:{down:'cargo_bay',east:'shuttle_two'},items:['grenade'],shipRoom:true},
  passenger_quarters:{name:'Passenger Quarters',desc:'Simple quarters for paying passengers. Small rooms branch off a sitting area. A bookshelf holds worn volumes.',exits:{west:'galley'},items:['lucky_coin'],shipRoom:true},
  shuttle_one:{name:"Inara's Shuttle",desc:"Draped in silk, scented with incense, warm and refined. A world apart from the rest of Serenity. Beautiful and a little intimidating.",exits:{east:'galley'},items:['fancy_wine'],shipRoom:true},
  shuttle_two:{name:'Shuttle Two',desc:'The second shuttle doubles as overflow storage. Crates and spare equipment fill the space. Emergency supplies stashed in a locker.',exits:{west:'crew_bunks'},items:['spare_parts','lockpick'],shipRoom:true},
  airlock:{name:'Airlock',desc:'The main airlock. Heavy doors separate ship from outside. Status lights glow along the frame.',exits:{north:'cargo_bay'},items:[],shipRoom:true,dynamic:true},
  persephone_docks:{name:'Persephone — Eavesdown Docks',desc:'Bustling docks of Persephone. Ships crowd the pads. Hawkers shout, loaders grunt, the air smells of fuel and street food.',exits:{north:'airlock',east:'persephone_market'},items:[],planet:'persephone'},
  persephone_market:{name:'Persephone — Market',desc:'A sprawling open-air market under patchwork awnings. Anything for sale if you know where to look. Credits talk loudly here.',exits:{west:'persephone_docks'},items:['alliance_ident'],planet:'persephone',shop:true},
  rim_street:{name:'Rim Outpost — Dusty Street',desc:'Sunbaked frontier street on a rim moon with no proper name. Low buildings of scrap and adobe. Horses tied next to hovermules.',exits:{north:'airlock',east:'rim_saloon'},items:[],planet:'rim_outpost'},
  rim_saloon:{name:'Rim Outpost — Saloon',desc:"Dim saloon with a bar of reclaimed hull plating. Locals nurse drinks and suspicion. Cortex screen plays propaganda nobody's watching.",exits:{west:'rim_street'},items:[],planet:'rim_outpost',shop:true},
  relay_entry:{name:'Relay Station — Entry',desc:'Derelict Alliance relay station drifting in the black. Emergency lights flicker red. Air is stale and cold. Claw marks score the walls.',exits:{south:'airlock',north:'relay_control'},items:[],planet:'relay_station',dangerous:true},
  relay_control:{name:'Relay Station — Control Room',desc:'Banks of dead consoles. One terminal blinks weakly. Data cores racked in the far wall. Blue Sun logo stamped on everything.',exits:{south:'relay_entry'},items:['blue_sun_data'],planet:'relay_station',dangerous:true},
  relay_hidden:{name:'Relay Station — Hidden Lab',desc:'Behind a false panel: a small lab. Cryo units line one wall, all empty but one that hisses with fog. Screens show brain scans and equations. This is where they did things to people.',exits:{west:'relay_control'},items:['cryo_sample'],planet:'relay_station',dangerous:true,hidden:true}
};

export const ITEMS: Record<string, any> = {
  wrench:{name:'wrench',desc:'Heavy adjustable wrench. Kaylee approved.',takeable:true,type:'tool'},
  medkit:{name:'medkit',desc:'Standard medical kit. Bandages, painkillers, smoother.',takeable:true,type:'medical'},
  protein_bar:{name:'protein bar',desc:'Compressed protein. Tastes like cardboard dreams.',takeable:true,type:'food',consumable:true},
  pistol:{name:'pistol',desc:'Worn but reliable sidearm. Gets the point across.',takeable:true,type:'weapon',combat_bonus:2},
  compression_coil:{name:'compression coil',desc:'New catalyzer compression coil. Keeps the engine from exploding.',takeable:true,type:'ship_part',cost:200},
  cortex_pad:{name:'cortex pad',desc:'Handheld cortex terminal. Cracked screen but functional.',takeable:true,type:'tool'},
  engine_grease:{name:'engine grease',desc:'Industrial lubricant. Awful smell, miracle worker.',takeable:true,type:'tool'},
  smuggled_goods:{name:'smuggled goods',desc:'Sealed crate marked "Machine Parts." Definitely not machine parts.',takeable:true,type:'contraband',value:300},
  alliance_ident:{name:'Alliance ID',desc:'Forged Alliance ident card. Passable if nobody looks close.',takeable:true,type:'tool',cost:150},
  dinosaur:{name:'toy dinosaur',desc:"One of Wash's stegosauruses. It's seen some things.",takeable:true,type:'trinket'},
  herb_tea:{name:'herb tea',desc:"Book's personal blend. Suspiciously calming.",takeable:true,type:'food',consumable:true},
  lockpick:{name:'lockpick set',desc:'Compact electronic lockpicks. For doors needing persuasion.',takeable:true,type:'tool',cost:60},
  grenade:{name:'grenade',desc:"Frag grenade. Jayne's idea of a greeting card.",takeable:true,type:'weapon',combat_bonus:5},
  fancy_wine:{name:'fancy wine',desc:'Sihnon vintage. Worth more than the ship some days.',takeable:true,type:'trade',value:150},
  spare_parts:{name:'spare parts',desc:'Assorted mechanical bits. Can patch most anything.',takeable:true,type:'ship_part',cost:80},
  lucky_coin:{name:'lucky coin',desc:'Old Earth-That-Was coin. Might be worthless, might be priceless.',takeable:true,type:'trinket',value:50},
  blue_sun_data:{name:'Blue Sun data core',desc:'Encrypted Blue Sun research files. Worth a fortune to the right buyer. Worth dying for to the wrong one.',takeable:true,type:'quest',value:500},
  stethoscope:{name:'stethoscope',desc:"Simon's backup. Medical grade, Core quality.",takeable:true,type:'medical',value:30},
  cryo_sample:{name:'cryo sample',desc:'Neural compound in a cryo vial. Labels reference Project Minotaur. River stares at it like it stares back.',takeable:true,type:'quest',value:800},
  badger_cargo:{name:"Badger's cargo",desc:"Sealed container. Heavy for its size. You were told not to open it.",takeable:true,type:'cargo'},
  medicine:{name:'medicine crate',desc:'Desperately needed medical supplies for rim folk.',takeable:true,type:'cargo',value:200}
};

export const NPCS: Record<string, any> = {
  mal:{name:'Mal',fullName:'Captain Malcolm Reynolds',desc:'The captain. Browncoat, smuggler, reluctant hero. Arms crossed, jaw set, eyes calculating.',location:'bridge'},
  zoe:{name:'Zoe',fullName:'Zoe Washburne',desc:"First mate. Soldier's bearing, calm as deep space. Checking her rifle with practiced ease.",location:'crew_bunks'},
  wash:{name:'Wash',fullName:'Hoban Washburne',desc:"Pilot. Hawaiian shirt, easy grin, dinosaurs on console. Running flight checks.",location:'bridge'},
  kaylee:{name:'Kaylee',fullName:'Kaylee Frye',desc:'Mechanic. Grease-stained coveralls, sunshine smile. One hand inside an engine panel.',location:'engine_room'},
  jayne:{name:'Jayne',fullName:'Jayne Cobb',desc:'The muscle. Big guy, bigger guns. Cleaning a weapon that has a name.',location:'cargo_bay'},
  inara:{name:'Inara',fullName:'Inara Serra',desc:'Companion. Grace incarnate, sharp as a scalpel beneath silk. Arranging incense with deliberate care.',location:'shuttle_one'},
  simon:{name:'Simon',fullName:'Dr. Simon Tam',desc:'The doctor. Core-bred, out of place, devoted beyond reason. Organizing supplies with surgical precision.',location:'infirmary'},
  river:{name:'River',fullName:'River Tam',desc:'Brilliant, broken, dangerous, dancing. Sits cross-legged, eyes seeing things not here yet.',location:'passenger_quarters'},
  book:{name:'Book',fullName:'Shepherd Book',desc:'The preacher. Kind eyes that have seen unkind things. Reading, or pretending to.',location:'galley'},
  badger_contact:{name:'Dobson',fullName:'Dobson',desc:"One of Badger's people. Twitchy, leaning against a crate.",location:'persephone_docks'},
  merchant:{name:'Merchant',fullName:'Old Wen',desc:'Weathered trader with cybernetic eyes and a knack for finding things.',location:'persephone_market'},
  rim_contact:{name:'Patience',fullName:'Patience',desc:'Tough old woman running this settlement. Known to shoot people she owes money to.',location:'rim_street'},
  patron:{name:'Patron',fullName:'Scarred Patron',desc:'Haunted-looking spacer nursing cheap whiskey. Keeps glancing at the door.',location:'rim_saloon'}
};

export const INITIAL_STATE = {
  player:{location:'cargo_bay',inventory:[] as string[],credits:100,hp:10,maxHp:10,stats:{charm:2,grit:2,tech:2,stealth:2}},
  ship:{fuel:80,strain:0,hull:100,heat:0,docked:'persephone'},
  time:0,
  rel:{mal:0,zoe:0,wash:0,kaylee:0,jayne:0,inara:0,simon:0,river:0,book:0} as Record<string, number>,
  morale:5,
  quests:{cargo:{status:'available',stage:0},salvage:{status:'locked',stage:0},heist:{status:'locked',stage:0}} as Record<string, {status: string, stage: number}>,
  flags:{} as Record<string, any>,
  log:[{turn:0, text:"Welcome aboard Serenity, Captain.", type: 'system'}] as LogEntry[],
  roomItems:{} as Record<string, string[]>,
  removed:{} as Record<string, string[]>,
  wins:0,
  dialogue: null as { npcId: string, nodeId: string } | null
};

export type GameState = typeof INITIAL_STATE;
export type LogEntry = { turn: number; text: string; type?: 'system' | 'error' | 'success' | 'info' | 'accent' | 'npc' | 'dim' };

export const DIALOGUE_TREES: Record<string, Record<string, any>> = {
  mal: {
    start: {
      text: "Got something on your mind, or just looking to use up my air?",
      options: [
        { text: "Just checking in, Captain.", nextNodeId: "checking_in" },
        { text: "Any jobs on the horizon?", nextNodeId: "jobs", condition: (s: GameState) => s.quests.cargo.status === 'available' },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    checking_in: {
      text: "Well, we're still flying. That's about the best news I got. Get back to your post.",
      options: [{ text: "Yes, sir.", action: 'end' }]
    },
    jobs: {
      text: "Badger's got a load of medical supplies sitting on Persephone. Needs 'em moved to a rim outpost. Quiet-like. You interested?",
      options: [
        { text: "I'll handle it.", nextNodeId: "accept_job", action: (s: any) => ({ ...s, quests: { ...s.quests, cargo: { ...s.quests.cargo, status: 'active' } } }) },
        { text: "Maybe later.", nextNodeId: "start" }
      ]
    },
    accept_job: {
      text: "Good. Talk to Kaylee, make sure the bird's ready for the black. And stay off the Alliance scanners.",
      options: [{ text: "Understood.", action: 'end' }]
    }
  },
  kaylee: {
    start: {
      text: "Hey there! Serenity's purring like a kitten today, mostly. You need something fixed?",
      options: [
        { text: "How's the engine holding up?", nextNodeId: "engine_talk" },
        { text: "Captain sent me. We're heading out soon.", nextNodeId: "prep_talk", condition: (s: GameState) => s.quests.cargo.status === 'active' },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    engine_talk: {
      text: "She's a bit cranky in the third compression coil, but I've got it patched with some grease and a prayer.",
      options: [{ text: "You're a miracle worker.", nextNodeId: "miracle", action: (s: any) => ({ ...s, rel: { ...s.rel, kaylee: (s.rel.kaylee || 0) + 1 } }) }]
    },
    miracle: {
      text: "Aw, stop it. She's the one doing the hard work. I just listen to her.",
      options: [{ text: "See you later, Kaylee.", action: 'end' }]
    },
    prep_talk: {
      text: "Oh! I'll get right on it. Just need to tighten a few things down. We're ready when you are!",
      options: [{ text: "Thanks, Kaylee.", action: 'end' }]
    }
  },
  book: {
    start: {
      text: "A little quiet contemplation is good for the soul, Captain. What can I do for you?",
      options: [
        { text: "Any advice for the road ahead?", nextNodeId: "advice" },
        { text: "Just looking for some tea.", nextNodeId: "tea_talk" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    advice: {
      text: "The path isn't always straight, but as long as you keep your internal compass true, you'll find your way.",
      options: [{ text: "Deep. Thanks, Shepherd.", action: 'end' }]
    },
    tea_talk: {
      text: "It's always steeping. Help yourself. It helps with the nerves.",
      options: [{ text: "I might do that.", action: 'end' }]
    }
  }
};
