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
  log:[{turn:0, text:"Welcome aboard Serenity, Captain.", type: 'system'}] as {turn:number, text:string, type?: string}[],
  roomItems:{} as Record<string, string[]>,
  removed:{} as Record<string, string[]>,
  wins:0,
  dialogue: null as { npcId: string, nodeId: string } | null
};

export type GameState = typeof INITIAL_STATE;
export type LogEntry = { turn: number; text: string; type?: 'system' | 'error' | 'success' | 'info' | 'accent' | 'npc' | 'dim' };

export const DIALOGUE_TREES: Record<string, Record<string, any>> = {
  jayne: {
    start: {
      text: "Vera's looking a bit dusty. What do you want, Captain? I'm busy.",
      options: [
        { text: "That's a lot of guns for one man, Jayne.", nextNodeId: "guns" },
        { text: "How's the cargo looking?", nextNodeId: "cargo" },
        { text: "Heard about that job on Canton?", nextNodeId: "canton" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    guns: {
      text: "You can never have too many ways to say 'get off my ship'. Besides, Vera's special. She's a Callahan full-bore auto-lock. My favorite.",
      options: [
        { text: "Why name a gun?", nextNodeId: "naming_guns" },
        { text: "I'll leave you to it.", action: 'end' }
      ]
    },
    naming_guns: {
      text: "Because it's easier to talk to 'em than people. They don't talk back, and they're loyal as long as you keep 'em clean.",
      options: [{ text: "Fair point.", action: 'end' }]
    },
    cargo: {
      text: "It's sitting there. Heavy and quiet. Just the way I like it. No Alliance, no Reavers, just credits waiting to happen. Though Badger's stuff is twitchy.",
      options: [
        { text: "Twitchy how?", nextNodeId: "twitchy" },
        { text: "Keep a sharp eye out.", action: 'end' }
      ]
    },
    twitchy: {
      text: "Seal's a bit loose. Smells like... well, like trouble. But trouble pays the bills, don't it?",
      options: [{ text: "Unfortunately.", action: 'end' }]
    },
    canton: {
      text: "Canton? Don't talk to me about Canton. Mudder's paradise. Though they did build a statue of me... long story.",
      options: [{ text: "A statue? Really?", nextNodeId: "statue" }]
    },
    statue: {
      text: "They got the nose wrong. And the eyes. But the hat was spot on. My mom made me a similar one.",
      options: [{ text: "I'd love to see that hat.", action: 'end' }]
    }
  },
  zoe: {
    start: {
      text: "Sir. Ship's quiet. Almost too quiet. You have orders?",
      options: [
        { text: "Just keeping an eye on things, Zoe.", nextNodeId: "checking" },
        { text: "How's Wash doing?", nextNodeId: "wash_talk" },
        { text: "Thinking about the War again?", nextNodeId: "war_talk" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    checking: {
      text: "Right. I'll keep the perimeter secure. Those Alliance patrols are getting bolder. They're scanning more frequently in this sector.",
      options: [
        { text: "Are we flagged?", nextNodeId: "flagged" },
        { text: "Good work, Zoe.", action: 'end' }
      ]
    },
    flagged: {
      text: "We're always flagged, sir. The 'Serenity' name isn't exactly a secret in Alliance databases. We just need to keep our heat low.",
      options: [{ text: "Low heat it is.", action: 'end' }]
    },
    wash_talk: {
      text: "He's playing with his dinosaurs again. But he's got us through every scrap so far. He's the best pilot in the black. I just wish he'd be more careful.",
      options: [
        { text: "He knows what he's doing.", nextNodeId: "wash_skill" },
        { text: "Glad he's on our side.", action: 'end' }
      ]
    },
    wash_skill: {
      text: "He does. It's just... the way he flies. It's like he's dancing with the void. Makes my stomach churn sometimes.",
      options: [{ text: "The dance of the leaf on the wind.", action: 'end' }]
    },
    war_talk: {
      text: "The War ended a long time ago, sir. For most people. For us... the dust never really settled, did it?",
      options: [
        { text: "We're still fighting in our own way.", nextNodeId: "fighting" },
        { text: "Let's focus on the present.", action: 'end' }
      ]
    },
    fighting: {
      text: "Every time we dodge a patrol, we're winning a small battle. It's enough for now.",
      options: [{ text: "It has to be.", action: 'end' }]
    }
  },
  wash: {
    start: {
      text: "I'm a leaf on the wind, watch how I soar. Or, you know, watch how I avoid that giant asteroid. What's up, Cap?",
      options: [
        { text: "Are we on course?", nextNodeId: "course" },
        { text: "Nice dinosaurs.", nextNodeId: "dinosaurs" },
        { text: "How's the 'leaf' feeling today?", nextNodeId: "leaf_talk" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    course: {
      text: "Steady as she goes. If 'steady' means 'screaming through the void at impossible speeds'. We'll be at the next jump point soon. Unless the Alliance decides to throw a party in our way.",
      options: [
        { text: "Any alternate routes?", nextNodeId: "routes" },
        { text: "Keep us flying.", action: 'end' }
      ]
    },
    routes: {
      text: "There's always a back door. Might be a bit bumpy, might involve a nebula that smells like rotten eggs, but we'll get there.",
      options: [{ text: "Bumpy is fine.", action: 'end' }]
    },
    dinosaurs: {
      text: "They keep the navigation console company. This one's a stegosaurus. He's very brave. This one's an allosaurus. He's... well, he's a bit of a jerk.",
      options: [
        { text: "Why is he a jerk?", nextNodeId: "jerk_dino" },
        { text: "Carry on, Wash.", action: 'end' }
      ]
    },
    jerk_dino: {
      text: "He keeps trying to eat the stegosaurus's plastic lunch. It's a whole thing. High drama in the cockpit.",
      options: [{ text: "Better than real drama.", action: 'end' }]
    },
    leaf_talk: {
      text: "The wind is high, and the leaf is... slightly singed from that last atmospheric entry. But we're still soaring!",
      options: [{ text: "Good to hear.", action: 'end' }]
    }
  },
  inara: {
    start: {
      text: "Welcome, Captain. I hope your day is going better than the engine room sounds.",
      options: [
        { text: "Always a pleasure, Inara.", nextNodeId: "pleasure" },
        { text: "Any news from the higher circles?", nextNodeId: "news" },
        { text: "Thinking about Sihnon?", nextNodeId: "sihnon_talk" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    pleasure: {
      text: "You're always welcome here for tea and a moment of peace. Serenity can be... chaotic. Especially when Jayne is cleaning his weapons in the common area.",
      options: [
        { text: "He means well. Mostly.", nextNodeId: "jayne_talk" },
        { text: "Thank you.", action: 'end' }
      ]
    },
    jayne_talk: {
      text: "He's a man of simple needs. It's just that those needs often involve high-caliber explosives.",
      options: [{ text: "True enough.", action: 'end' }]
    },
    news: {
      text: "The Alliance is tightening its grip on the inner planets. They're looking for someone... or something. The chatter in the Companion Guild is filled with whispers of increased surveillance.",
      options: [
        { text: "Looking for us?", nextNodeId: "searching" },
        { text: "We're always careful. Mostly.", action: 'end' }
      ]
    },
    searching: {
      text: "They're looking for anything that doesn't fit their perfect vision of the Core. We certainly qualify.",
      options: [{ text: "A badge of honor.", action: 'end' }]
    },
    sihnon_talk: {
      text: "Sihnon is a beautiful memory. But the black has its own kind of beauty. Though it's much harder to find a good cup of real tea out here.",
      options: [{ text: "We'll find some for you.", action: 'end' }]
    }
  },
  simon: {
    start: {
      text: "Captain. I'm just inventorying the supplies. We're low on anesthetics again. And I'm fairly certain someone used the last of the sterile wipes to clean a boot.",
      options: [
        { text: "How's River doing?", nextNodeId: "river_talk" },
        { text: "Do we have enough for the next job?", nextNodeId: "supplies" },
        { text: "Missing the Core?", nextNodeId: "core_talk" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    river_talk: {
      text: "She's... resting. The dreams are harder lately. I just wish I could do more for her. The things they did to her brain... it's a puzzle I can't quite solve.",
      options: [
        { text: "Keep at it, Doc.", nextNodeId: "encouragement" },
        { text: "You're doing everything you can.", action: 'end' }
      ]
    },
    encouragement: {
      text: "I have to. She's my sister. And she's the only family I have left.",
      options: [{ text: "We're your family now too.", action: 'end' }]
    },
    supplies: {
      text: "If nobody gets shot, we're fine. If they do... well, try not to let them get shot. Especially not in the torso. I'm very low on abdominal sponges.",
      options: [
        { text: "I'll try to keep the bullets on the outside.", nextNodeId: "bullets" },
        { text: "I'll do my best.", action: 'end' }
      ]
    },
    bullets: {
      text: "That would be appreciated. My surgical kit is already working overtime.",
      options: [{ text: "Duly noted.", action: 'end' }]
    },
    core_talk: {
      text: "Sometimes. I miss the clean streets, the order. But then I remember why we left. There's no freedom in that kind of order.",
      options: [{ text: "Freedom is a messy thing.", action: 'end' }]
    }
  },
  river: {
    start: {
      text: "The stars are screaming. Can't you hear them? They're very loud today. They're singing in a key that doesn't exist.",
      options: [
        { text: "What are they saying, River?", nextNodeId: "stars" },
        { text: "You're safe here.", nextNodeId: "safe" },
        { text: "Everything is shiny.", nextNodeId: "shiny" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    stars: {
      text: "Secrets. Wrapped in cold and distance. They know where we're going. They knew before we did. They see the shadows moving in the dark corners of the verse.",
      options: [
        { text: "What shadows?", nextNodeId: "shadows" },
        { text: "Stay strong.", action: 'end' }
      ]
    },
    shadows: {
      text: "Men with blue hands. Two by two. They're looking for the girl in the box. But the girl isn't in a box anymore. She's everywhere.",
      options: [{ text: "We won't let them find you.", action: 'end' }]
    },
    safe: {
      text: "Safe is a relative term. The box is gone, but the shadows are long. But thank you, Captain. Your mind is like an old barn. Dusty, but solid.",
      options: [
        { text: "An old barn?", nextNodeId: "barn" },
        { text: "Anytime.", action: 'end' }
      ]
    },
    barn: {
      text: "Full of tools and memories. And a very stubborn horse.",
      options: [{ text: "I'll take that as a compliment.", action: 'end' }]
    },
    shiny: {
      text: "Shiny as a new-born sun. But watch out for the solar flares. They sting.",
      options: [{ text: "I'll keep my shades on.", action: 'end' }]
    }
  },
  badger_contact: {
    start: {
      text: "Badger sent me. You the one looking for work? Or just hanging around to see if you can catch a case of the Alliance?",
      options: [
        { text: "I'm the Captain. What's the job?", nextNodeId: "job_info" },
        { text: "Badger still owes me for that last run.", nextNodeId: "badger_debt" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    job_info: {
      text: "Med supplies for the rim folk. Discreet. Mal's got the details. Don't make me regret this. Badger doesn't like people who lose his cargo.",
      options: [
        { text: "We don't lose cargo.", nextNodeId: "reliability" },
        { text: "We'll handle it.", action: 'end' }
      ]
    },
    reliability: {
      text: "See that you don't. The Rim is a big place to disappear in, but Badger has a very long reach.",
      options: [{ text: "Understood.", action: 'end' }]
    },
    badger_debt: {
      text: "Badger doesn't 'owe'. He facilitates opportunities. You're lucky he's even talking to you after that mess on Hera.",
      options: [{ text: "Hera wasn't our fault.", action: 'end' }]
    }
  },
  merchant: {
    start: {
      text: "Step closer, Captain! Best prices in the Eavesdown Docks. What do you need? For you, a special price. Only double the market rate!",
      options: [
        { text: "Show me your wares.", nextNodeId: "wares" },
        { text: "Heard any rumors lately?", nextNodeId: "rumors" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    wares: {
      text: "Everything from engine parts to fine Sihnon silks. Credits up front, no questions asked. I even have a few things that aren't strictly legal.",
      options: [
        { text: "The illegal stuff interests me.", nextNodeId: "illegal" },
        { text: "I'll take a look around.", action: 'end' }
      ]
    },
    illegal: {
      text: "Shh! Not so loud. Talk to me in the back later. Some Alliance tech that 'fell' off a transport.",
      options: [{ text: "I'll be there.", action: 'end' }]
    },
    rumors: {
      text: "Alliance is building a new relay station in the Rim. They say it's for communications, but people say it's for something more... listening.",
      options: [{ text: "Interesting.", action: 'end' }]
    }
  },
  rim_contact: {
    start: {
      text: "You're late. The Alliance has been poking around. Hope those supplies are worth the risk. My people are dying out here while you take your sweet time.",
      options: [
        { text: "They're here. Let's get them unloaded.", nextNodeId: "unload" },
        { text: "It's a big verse, Patience.", nextNodeId: "excuses" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    unload: {
      text: "Good. My people need these. Watch your back on the way out. There's a patrol due in an hour.",
      options: [
        { text: "We'll be gone in thirty minutes.", nextNodeId: "speed" },
        { text: "Will do.", action: 'end' }
      ]
    },
    speed: {
      text: "Better make it twenty. They've been eager lately.",
      options: [{ text: "Understood.", action: 'end' }]
    },
    excuses: {
      text: "Excuses don't cure fever. Just get the crates to the warehouse.",
      options: [{ text: "Moving.", action: 'end' }]
    }
  },
  patron: {
    start: {
      text: "Drinking to forget? Or just to survive another day in the black? The whiskey's cheap, but the cost of living is high.",
      options: [
        { text: "Just a traveler passing through.", nextNodeId: "traveler" },
        { text: "You look like you've seen some things.", nextNodeId: "history" },
        { text: "[End Conversation]", action: 'end' }
      ]
    },
    traveler: {
      text: "The Rim is no place for travelers. Only ghosts and those about to become them. If you're smart, you'll jump to the Core and never look back.",
      options: [
        { text: "I'm not known for being smart.", nextNodeId: "stubborn" },
        { text: "I'll keep that in mind.", action: 'end' }
      ]
    },
    stubborn: {
      text: "Few out here are. That's why we're out here.",
      options: [{ text: "Fair enough.", action: 'end' }]
    },
    history: {
      text: "I've seen the sky turn red and the ground turn to ash. I've seen the Alliance promise peace and deliver a grave. You don't want to know what I've seen.",
      options: [{ text: "Maybe not.", action: 'end' }]
    }
  },
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
