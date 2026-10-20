/* ============================================================
   SEED LAYER — 80 verified pre-seed and seed rounds, Jan 2025 – Aug 2026
   Researched 8 August 2026. Stage was the hard filter: anything at
   Series A or later was rejected regardless of interest.

   Same positional schema as global.js, plus:
     raise  round size in $M — used to derive true maturity, because a
            "seed" label now spans $1.1M to $1bn and cannot be trusted
            as an earliness signal on its own
     uni    university or national-lab origin
     grant  public grant money alongside the venture round

   Median seed here is ~$16M against a ~$60M mean. The four mega-seeds
   (Unconventional AI, AMI Labs, Periodic Labs, Merge Labs) already sit
   in data.js/global.js and are NOT repeated here.
   ============================================================ */

const SEEDROUND = [
/* ---------- novel computing, semiconductors, chip tooling ---------- */
["ricursive","Ricursive Intelligence","compute","sfbay","Frontier lab automating advanced chip design, founded by the AlphaChip team","Seed",2,0.75,["sequoia"],{conf:"med",raise:35,note:"$35M seed at a $750M valuation — Sequoia led. Seed by label, Series B by price."}],
["claros","Claros","compute","la","Chip-to-grid power — integrated voltage regulators and an AC/DC gateway for datacentres","Seed",2,0,["gencat"],{conf:"med",raise:30}],
["niobium","Niobium Microsystems","compute","day","Custom ASIC accelerator for fully homomorphic encryption","Seed ext",2,0,[],{conf:"med",raise:23}],
["greatsky","Great Sky","compute","den","Superconducting optoelectronic networks — photonic and superconducting compute combined","Seed",1,0,[],{conf:"med",raise:14,uni:"NIST",note:"Founding team's superconducting-optoelectronic work came out of a decade of NIST research and 20+ papers."}],
["cavilinq","CavilinQ","postdigital","chi","Photonic interconnects linking quantum processors into modular clusters","Seed",1,0,[],{conf:"med",raise:8.8,uni:"University of Chicago",note:"2025 spinout with scientific co-founders at Harvard (Lukin) and UChicago (Bernien)."}],
["boolsi","BoolSi","compute","bos","ML compiler turning ordinary C/C++ into custom FPGA hardware accelerators","Seed",1,0,[],{conf:"med",raise:6}],
["photonqueue","Photon Queue","postdigital","chi","Room-temperature quantum memory for photon storage and synchronisation","Seed",1,0,["playground"],{conf:"med",raise:4,uni:"UIUC",note:"First systems deployed at Sandia National Laboratories and Maryland."}],
["invisix","Invisix","compute","ams","Soft X-ray metrology for advanced semiconductor manufacturing","Seed",2,0,[],{conf:"high",raise:22,uni:"ASML",note:"A CORPORATE spinout, not a university one — incubated inside ASML for over a decade, validated with Intel and imec. Hitachi Ventures led."}],
["cnuic","Cnuic","compute","edi","Reconfigurable light-based photolithography for photonic chip production","Pre-seed",1,0,[],{conf:"med",raise:3}],
["aylight","Aylight","compute","zrh","Chip-scale multiwavelength lasers for AI datacentre optical interconnect","Pre-seed",1,0,[],{conf:"med",raise:5,uni:"ETH Zurich"}],
["pixelphotonics","Pixel Photonics","postdigital","mst","Waveguide-integrated superconducting nanowire single-photon detectors","Seed",1,0,["eustate"],{conf:"high",raise:5.5,st:true,uni:"University of Munster",grant:true,note:"THE most heavily state-co-funded round in this set: €13.5M total including an €8.5M EIC Accelerator award, with SPRIND also on the cap table as an equity investor."}],
["ccraft","CCRAFT","compute","gva","Thin-film lithium niobate photonic chips for AI infrastructure","Seed",1,0,["eustate"],{conf:"med",raise:7.8,st:true,grant:true}],
["chiral","Chiral","compute","zrh","Robotic nanoassembly integrating nanomaterials into semiconductor and quantum devices","Seed",1,0,["eustate"],{conf:"med",raise:12,st:true,grant:true}],
["verticalcompute","Vertical Compute","compute","ams","Vertically integrated memory for AI and high-performance computing","Seed",3,0,["bpifrance","eustate"],{conf:"med",raise:62,st:true,note:"€57M — one of the largest European seeds on record, with Bpifrance and imec participating. Scored as Series B by substance."}],
["zml","ZML","compute","par","Chip-agnostic AI inference runtime","Seed",2,0,["lecun"],{conf:"high",raise:20,note:"Yann LeCun, Solomon Hykes (Docker) and Gabriel Synnaeve invested as individuals."}],
["hyperscalepower","Hyperscale Power","compute","zrh","Intelligent power infrastructure for compute-dense sites","Seed",1,0,[],{conf:"med",raise:5.4}],

/* ---------- fusion, nuclear, energy hardware ---------- */
["criticalenergy","Critical Energy","energy","la","Factory-built modular geothermal turbines derived from rocket engines","Seed",2,0,[],{conf:"med",raise:22}],
["hexium","Hexium","energy","aus","Atomic vapour laser isotope separation for lithium-6/7 fusion fuel","Seed",1,0,[],{conf:"med",raise:8,note:"$12M launch total including ~$4M non-dilutive. Supplies the fuel cycle rather than building a reactor — the same merchant position Kyoto Fusioneering holds."}],
["maritimefusion","Maritime Fusion","energy","sfbay","Low-power-density HTS tokamak for shipping and off-grid power","Seed",1,0,[],{conf:"med",raise:4.5,uni:"Columbia",note:"Paul Graham invested. Sponsored research agreement with Columbia; runs experiments at the DOE's DIII-D National Fusion Facility."}],
["emeraldbattery","Emerald Battery Labs","energy","sea","Sodium-ion battery chemistry as a lithium substitute","Pre-seed",1,0,[],{conf:"low",raise:1.1,uni:"University of Washington",note:"One of only a handful of genuine pre-seed rounds on the board. Operating out of UW CoMotion Labs."}],
["eternafusion","EternaFusion","energy","seo","Tokamak injection current-drive technology for fusion","Seed",1,0,["krstate"],{conf:"med",raise:1.5,st:true}],
["sinergyflow","Sinergy Flow","energy","mil","Sulphur-based flow battery for long-duration storage","Seed",1,0,["eustate"],{conf:"med",raise:7.6,st:true,grant:true,note:"CDP Venture Capital (Italian state) participating."}],
["barocal","Barocal","energy","cam","Solid-state barocaloric cooling and heating to replace vapour compression","Seed",1,0,["gates"],{conf:"med",raise:10,uni:"University of Cambridge",note:"Breakthrough Energy Ventures and Cambridge Enterprise on the cap table."}],
["hadesmining","Hades Mining","earth","mun","Laser drilling for ultra-deep geothermal and critical-mineral extraction","Seed",2,0,["hvcapital"],{conf:"med",raise:16}],

/* ---------- space and launch ---------- */
["luxaeterna","Lux Aeterna","orbital","den","Fully reusable, reentry-survivable satellite bus","Seed",1,0,[],{conf:"med",raise:10,note:"Followed a $4M pre-seed in June 2025."}],
["samaraaero","Samara Aerospace","orbital","sfbay","Ultra-stable satellite bus using actuators built into solar-panel hinges","Seed",1,0,[],{conf:"med",raise:10,uni:"University of Illinois",grant:true}],
["sophiaspace","Sophia Space","orbital","la","Passively cooled compute modules for orbital data centres","Seed",1,0,[],{conf:"med",raise:10,note:"Followed a $3.5M pre-seed. The orbital-datacentre thesis Schmidt is pursuing at Relativity, at seed scale."}],
["orbitalops","Orbital Operations","orbital","la","High-thrust LH2/LOX orbital vehicle for satellite defence","Seed",1,0,[],{conf:"med",raise:8.8}],
["catalyxspace","Catalyx Space","orbital","sfbay","Scheduled reentry and downmass logistics for microgravity manufacturing","Seed",1,0,[],{conf:"med",raise:5.4,note:"The returning half of Varda's thesis, unbundled."}],
["orbitalgpu","Orbital","orbital","sfbay","GPU satellites for on-orbit AI inference; pathfinder demo targeted 2027","Pre-seed",1,0,["andreessen"],{conf:"med",raise:5}],
["arinna","Arinna","orbital","sfbay","Ultrathin transition-metal-dichalcogenide solar cells, ~10x the power density of space panels","Seed",1,0,["gates"],{conf:"med",raise:4,uni:"Stanford",grant:true,note:"NASA and NSF SBIR grants alongside Breakthrough Energy."}],
["junoprop","Juno Propulsion","orbital","sea","Flight-ready rotating detonation rocket engine","Pre-seed",1,0,[],{conf:"med",raise:1.4,uni:"Purdue",grant:true,note:"NASA TechLeap Prize to fly the first rotating detonation engine in orbit. Activate fellowship participant."}],
["pavespace","PAVE Space","orbital","gva","Heavy-lift orbital kickstage for rapid satellite transfer between orbits","Seed",2,0,[],{conf:"med",raise:40,note:"$40M — among the largest European space seeds. Creandum led."}],
["isptech","ISPTech","orbital","mun","Non-toxic in-space chemical propulsion for satellites","Seed",1,0,["eustate"],{conf:"med",raise:6,st:true}],
["appliedatomics","Applied Atomics","orbital","lon","AI-enabled in-space mobility for military and commercial spacecraft","Pre-seed",1,0,["eustate"],{conf:"med",raise:4,st:true,grant:true,note:"UK Space Agency Accelerator and NATO DIANA, with Thales Alenia and Oxford Science Enterprises."}],
["oris","ORiS","orbital","mil","Laser-based wireless power transmission for satellites, drones and lunar missions","Pre-seed",1,0,["eustate"],{conf:"med",raise:4.9,st:true,uni:"Politecnico di Torino",grant:true,note:"NATO DIANA plus a Piedmont regional grant."}],
["moonshotspace","Moonshot Space","orbital","tlv","Electromagnetic accelerator launching cargo to ~8 km/s for orbital and hypersonic test missions","Seed",1,0,[],{conf:"med",raise:12,grant:true,note:"Includes a $1M Israel Innovation Authority grant."}],

/* ---------- defence and dual-use ---------- */
["onodrim","Onodrim Industries","defense","ams","European defence-industrial platform — manufacturing, multi-domain sensing, networked systems","Seed",2,0,["thiel","gencat"],{conf:"high",raise:43,dom:"London",note:"€40M seed co-backed by Founders Fund, Lakestar and General Catalyst — one of Europe's largest defence seeds."}],
["arkenstone","Arkenstone Defense","defense","sfbay","Operating system for government contracting and compliance","Seed",2,0,[],{conf:"low",raise:35,note:"Investors undisclosed."}],
["traysar","Traysar","defense","aus","Subterranean defence — underground strike and infrastructure protection","Seed",2,0,["lux"],{conf:"med",raise:25,note:"Angels include Steve Blank and founders of Anduril and Erebor."}],
["furientis","Furientis","defense","la","Low-cost mass-producible ship-based interceptor missiles, ~$250k per unit","Pre-seed",1,0,[],{conf:"med",raise:5,note:"Repeat founders from Anduril, Erebor and Armada. The cheap-interceptor thesis Castelion is pursuing, one stage earlier."}],
["egide","EGIDE","defense","par","Low-cost electrically propelled drone interceptors plus layered counter-UAS software","Seed",1,0,[],{conf:"med",raise:8.7}],
["twentyfour","Twentyfour Industries","defense","mun","Military drone design and manufacture","Seed",2,0,[],{conf:"med",raise:10.5}],
["mutabletactics","Mutable Tactics","defense","cam","Autonomy letting drone teams operate without one-to-one human control","Pre-seed",1,0,["eustate"],{conf:"med",raise:2.1,st:true,grant:true,note:"UK National Security Strategic Investment Fund; came through Entrepreneur First."}],
["se3labs","SE3 Labs","defense","mun","Spatial AI for autonomous defence — 3D scene understanding and tasking","Seed",1,0,[],{conf:"med",raise:6}],
["agon","Agon","defense","lon","Synthetic battlefield environments for testing and training autonomous defence systems","Seed",2,0,["lux"],{conf:"low",raise:30,note:"$30M is pre-seed and seed COMBINED at launch, not a single round."}],
["sixrobotics","Six Robotics","defense","osl","Collaborative-autonomy and swarm software for unmanned defence systems","Seed",2,0,["eustate"],{conf:"med",raise:13.6,st:true,note:"EIFO, Denmark's state investment fund, participating."}],
["stendr","Stendr","defense","osl","AI-native vertically integrated drone detection and response","Pre-seed",1,0,[],{conf:"med",raise:5.4,note:"Founded by Aleksander Leonard Larsen, Sky Mavis co-founder, redeploying from gaming into defence."}],
["nordicairdefence","Nordic Air Defence","defense","sto","Software-defined low-cost drone interceptor","Pre-seed",1,0,[],{conf:"med",raise:3}],
["tenna","Tenna Systems","defense","tlv","Hardware-free spectrum intelligence — a live map of the electromagnetic battlefield","Seed",2,0,[],{conf:"med",raise:13.5}],
["line5","Line 5","defense","tlv","Battlefield software to remove soldiers from direct risk","Seed",2,0,[],{conf:"med",raise:20,note:"Operator-FOUNDED rather than operator-backed: co-founded by Gigi Levy-Weiss (NFX) and Yiftach Shoolman (Redis)."}],
["rekise","Rekise Marine","defense","blr","Autonomous surface and underwater vessels; XLAUV under the Indian Navy's iDEX programme","Seed",1,0,["kamath"],{conf:"high",raise:9.7,st:true,note:"Nikhil Kamath's NKSquared co-led with Accel — the clearest operator signal in the non-US seed set."}],

/* ---------- robotics and embodied AI ---------- */
["genesisai","Genesis AI","robotics","sfbay","Universal robotics foundation model trained on proprietary physics-engine synthetic data","Seed",3,0,["khosla","schmidt","niel","hongshan"],{conf:"high",raise:105,uni:"Carnegie Mellon",note:"$105M seed — Eclipse and Khosla co-led, with Eric Schmidt and Xavier Niel personally in. Scored as Series B by substance."}],
["proception","Proception","robotics","sfbay","22-degree-of-freedom dexterous robotic hand plus a tactile data-capture glove","Seed",1,0,[],{conf:"med",raise:11}],
["aseonlabs","Aseon Labs","robotics","sfbay","Robotic pit-stop pods that charge, clean and inspect robotaxis","Seed",1,0,[],{conf:"med",raise:10,note:"The service layer under autonomy that nobody else on the board is building."}],
["avatarrobotics","Avatar Robotics","robotics","sfbay","Teleoperation-plus-autonomy humanoids for warehouse and manufacturing work","Seed",1,0,[],{conf:"med",raise:6.5,note:"Henry Ford III among the angels."}],
["anvilrobotics","Anvil Robotics","robotics","sfbay","Open-source modular robot development kits for physical-AI teams","Seed",1,0,[],{conf:"med",raise:5.5}],
["microagi","microagi","robotics","mun","Hardware-agnostic platform fine-tuning robot models on customer operational data","Seed",3,0,[],{conf:"high",raise:55,note:"$55M — Germany's largest seed on record. Scored as Series B by substance."}],
["mowito","Mowito","robotics","blr","Foundation models letting industrial robot arms learn tasks from demonstration","Pre-seed",1,0,[],{conf:"med",raise:3,note:"Soumith Chintala, creator of PyTorch, invested as an angel."}],
["atomjp","Atom","robotics","tok","Bipedal humanoid robots for manufacturing, logistics and transport","Seed",2,0,["jpstate"],{conf:"med",raise:19,st:true,note:"JIC Venture Growth participating. Japan's clearest seed-stage humanoid bet."}],
["configkr","Config","robotics","seo","Robot training-data infrastructure — aiming to be the 'TSMC of robot data'","Seed",2,0,[],{conf:"med",raise:27,uni:"KAIST",note:"Samsung Venture Investment, Hyundai ZER01NE, LG Technology Ventures and SKT America — the Korean industrial complex backing one company."}],
["naturerobots","Nature Robots","robotics","ber","AI autonomy software for agricultural machinery","Seed",1,0,[],{conf:"med",raise:4.3,note:"One of very few agriculture entries on the entire board."}],

/* ---------- AI for science ---------- */
["neocognition","NeoCognition","science","sfbay","Brain-inspired continual-learning architectures; agents that specialise after deployment","Seed",2,0,[],{conf:"med",raise:40,uni:"Ohio State",note:"Angels include Lip-Bu Tan (Intel CEO), Ion Stoica, Dawn Song and Ruslan Salakhutdinov."}],
["autoscience","Autoscience","science","sfbay","Autonomous AI research lab that invents, validates and deploys machine-learning models","Seed",1,0,["gencat"],{conf:"med",raise:14}],
["asteromorph","Asteromorph","science","seo","Scientific superintelligence — AI systems for autonomous scientific discovery","Seed",2,0,["krstate"],{conf:"med",raise:30,st:true,uni:"SNU / KAIST",note:"Korea Development Bank participating."}],
["atomictess","Atomic Tessellator","science","akl","Digital laboratory combining quantum chemistry and AI to design rare-earth-free magnets and alloys","Seed",2,0,["nzstate"],{conf:"low",raise:0,st:true,note:"CURRENCY AMBIGUOUS: ANZ trade press reports 11.3M without stating AUD or NZD. Reported ~$50M post-money. In-Q-Tel participating."}],
["polaron","Polaron","science","lon","AI that reads material microstructure to design batteries, metals and ceramics","Seed",1,0,[],{conf:"med",raise:8,uni:"Imperial College London"}],
["chemt","ChemT Biotechnology","science","sin","Virtual-cell platform simulating cell response to biomanufacturing conditions","Seed",1,0,[],{conf:"low",raise:4}],

/* ---------- synthetic biology, biomanufacturing, therapeutics ---------- */
["serifbio","Serif Biomedicines","science","bos","Chemically modified DNA as a new class of medicine, delivered by lipid nanoparticle","Seed",2,0,[],{conf:"high",raise:50,note:"Flagship Pioneering company creation — funded at $50M from inception."}],
["accipiter","Accipiter Biosciences","science","sea","De novo multifunctional protein therapeutics designed from scratch","Seed",1,0,[],{conf:"med",raise:12.7,uni:"UW Institute for Protein Design",note:"Baker lab lineage; Takeda co-led."}],
["toposbio","Topos Bio","science","sfbay","Foundation model for intrinsically disordered, previously undruggable proteins","Seed",1,0,[],{conf:"med",raise:10.5,note:"Dara Khosrowshahi and Naveen Rao as angels."}],
["strmbio","STRM.BIO","science","bos","Megakaryocyte-derived vesicles for non-viral in vivo gene delivery","Seed 2",1,0,[],{conf:"med",raise:8,grant:true,note:"Holds an $8.4M ARPA-H contract alongside the equity — public money funding the risky half."}],
["ergbio","Erg Bio","earth","sfbay","Low-temperature pretreatment and catalysis turning agricultural waste into sustainable fuel","Seed",1,0,[],{conf:"med",raise:6.5,grant:true,note:"A $1.5M Department of Defense award announced alongside the seed."}],
["fermeate","Fermeate","science","sfbay","Optogenetic light-controlled gene expression raising fermentation yields 60–300%","Seed",1,0,[],{conf:"med",raise:2,uni:"Princeton"}],
["anzen","Anzen Industries","science","lon","Cell-free enzyme biomanufacturing for chemical production","Pre-seed",1,0,[],{conf:"med",raise:2}],
["cellbricks","Cellbricks Therapeutics","science","ber","Biofabricated human tissue implants for reconstructive surgery","Seed",1,0,["eustate"],{conf:"med",raise:7.6,st:true,grant:true,note:"SPRIND directly on the cap table."}],
["immitra","Immitra Bio","science","zrh","In-vivo gene editing platform for scalable genetic therapies","Pre-seed",1,0,["eustate"],{conf:"med",raise:3.1,st:true,grant:true}],
["shanx","ShanX Medtech","health","ams","Direct-from-sample antimicrobial susceptibility testing in about an hour","Seed",2,0,["eustate"],{conf:"high",raise:16,st:true,uni:"TU Eindhoven",grant:true,note:"€15M equity plus an €8.85M European Commission contract."}],
["collimate","CollimateHealth","health","mun","Microbeam radiation therapy — micrometre-scale beams for tumour targeting","Seed",1,0,[],{conf:"med",raise:6.5}],
["neurosoft","Neurosoft Bioelectronics","neuro","gva","Soft thin-film electrode arrays for brain-computer interfaces","Seed",1,0,["eustate"],{conf:"med",raise:7.5,st:true,uni:"EPFL",grant:true,note:"The European entry in a theme otherwise entirely American. EIC-backed."}],

/* ---------- quantum ---------- */
["qfactor","Q-Factor","postdigital","tlv","Neutral-atom quantum computer targeting million-qubit scale","Seed",2,0,[],{conf:"med",raise:24,uni:"Weizmann / Technion",grant:true,note:"Intel Capital and an Israel Innovation Authority grant."}],
["yaqumo","Yaqumo","postdigital","tok","Neutral-atom quantum computers via cold-atom hardware and software co-design","Seed ext",1,0,[],{conf:"low",raise:0,note:"Amount undisclosed — Quantonation did not publish it. Its first Japanese investment."}],
["deteqt","Deteqt","postdigital","syd","Diamond-on-silicon quantum magnetometer chips for GPS-denied navigation","Seed",1,0,["ausstate"],{conf:"med",raise:3.2,st:true,uni:"University of Sydney",note:"Holds an Australian Defence Force contract. The university itself invested via Uniseed."}],
["quantx","QuantX Labs","postdigital","adl","Compact optical atomic clocks for defence, space and critical infrastructure timing","Seed",1,0,[],{conf:"med",raise:5}],
["pqcee","pQCee","postdigital","sin","Quantum-safe post-quantum cryptographic security products","Seed",1,0,["temasek"],{conf:"med",raise:3.9,st:true,note:"SGInnovate co-led."}],
["deeplase","DeepLase Technologies","compute","noi","Specialty optical fibre, high-power fibre lasers and integrated photonics","Seed",1,0,[],{conf:"med",raise:0.7,uni:"IIT Delhi"}],
["airmo","AIRMO","earth","mun","Greenhouse-gas monitoring hardware with a planned lidar satellite mission","Seed",1,0,[],{conf:"med",raise:5.4}]
];
