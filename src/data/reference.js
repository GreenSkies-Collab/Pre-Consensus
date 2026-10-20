/* ===========================================================
   PRE-CONSENSUS — REFERENCE LAYER
   Configuration that is not tabular entity data, so it stays as code:
   role weights, graduated companies, sector lens, map outlines and the
   listed-exposure map. Inlined into the page by build.ps1.

   The entity data — themes, regions, hubs, backers, ventures, positions
   and funding rounds — lives in dataset/*.csv. See dataset/README.md.
   ============================================================ */
/* Weight = how much of a person's finite time the role consumes. */
const ROLE_DEF = {
  ceo:     {w:6, label:"Runs it",      short:"CEO"},
  founder: {w:5, label:"Co-founded it",short:"Founder"},
  chair:   {w:4, label:"Chairs it",    short:"Chair"},
  board:   {w:3, label:"Board seat",   short:"Board"},
  advisor: {w:2, label:"Advises it",   short:"Advisor"},
  capital: {w:1, label:"Capital only", short:"Capital"}
};

const GRADUATED = [
  {n:"SpaceX",       d:"IPO 12 Jun 2026 · ~$1.77T", note:"largest listing in history; absorbed xAI in February"},
  {n:"Cerebras",     d:"IPO 2026 · $66B at open",   note:"first AI-chip listing of the year"},
  {n:"Quantinuum",   d:"Nasdaq Jun 2026 · $15.6B",  note:"quantum's first major listing"},
  {n:"Zhipu AI",     d:"Hong Kong 2026 · ~$80B+",   note:"China's highest-valued model lab"},
  {n:"MiniMax",      d:"Hong Kong 2026",            note:"first Chinese lab to reach self-sustaining operations"},
  {n:"Oklo",         d:"NYSE: OKLO",                note:"Altman-chaired fission developer"}
];

/* ============================================================
   SECTOR LENS
   The themes are organised by thesis, not by industry — which makes
   conventional sectors hard to find. "Biotech" is really spread across
   AI for Science, Longevity, Preventive Health and Neural Interface.
   This is a second, cross-cutting way to read the same board.
   ============================================================ */
const SECTORS = [
  {id:"bio",      name:"Biotech & Health", hue:"#5fd39a",
   themes:["science","longevity","health","neuro"],
   note:"Well represented but never labelled as such — it sits under AI for Science, Longevity, Preventive Health and Neural Interface. Almost all of it is AI-native drug discovery, cell reprogramming or measurement, rather than conventional pharma."},
  {id:"climate",  name:"Climate & Resources", hue:"#8fb339",
   themes:["energy","earth"],
   note:"Fusion, fission, geothermal and storage sit in Energy; minerals, cement, metals and geoengineering sit in Earth Systems. Framed by what it powers rather than by emissions, because that is how this cohort talks about it."},
  {id:"industrial",name:"Industrial & Physical", hue:"#2fb8c9",
   themes:["robotics","mobility","orbital","defense"],
   note:"The atoms half of the board — robots, vehicles, launch and defence. The fastest-growing part by round count."},
  {id:"digital",  name:"Digital & Compute", hue:"#9b8cff",
   themes:["frontier","world","compute","postdigital","software","capital"],
   note:"Models, silicon and the software and financial rails on top of them. Highest capital, lowest emergence."}
];

/* Sectors deliberately absent, with the honest reason. Shown in the UI so a
   gap reads as a finding rather than an oversight. */
const SECTOR_GAPS = [
  ["Agriculture & food","Only a handful of ventures on the board — Tortuga, AgZen, GigaCrop, Wildtype, Loam Bio, Halter. This is a genuine gap and it is mostly real: long cycles, thin margins and commodity pricing make agriculture unattractive to a cohort optimising for software-like returns. Treat its absence as a signal about the investors, not about the sector's importance."],
  ["Education","Effectively nothing. Repeatedly attempted, repeatedly poor returns, and now widely assumed to be absorbed by general-purpose AI rather than by dedicated companies."],
  ["Water & sanitation","Two ventures (Aclarity, Hydroleap). Municipally procured, slow, unglamorous — structurally hostile to venture timelines despite being existential."],
  ["Care & healthcare delivery","Near-absent. The board holds diagnostics and drug discovery but almost no delivery of care, which is where most health spending actually goes."],
  ["Construction & housing","Thin — a few robotics plays only. Regulatory and labour constraints dominate, and software cannot route around them."]
];

/* Coarse equirectangular landmass outlines, [lon,lat]. Schematic, not survey-grade —
   enough to locate a hub, deliberately low-fidelity to suit the instrument aesthetic. */
const LAND = [
  [[-168,66],[-160,71],[-140,70],[-125,70],[-110,68],[-95,68],[-85,70],[-75,68],[-62,60],[-55,52],[-65,45],[-70,42],[-75,35],[-81,25],[-84,30],[-90,29],[-97,26],[-105,20],[-115,32],[-125,40],[-125,49],[-135,58],[-150,60],[-165,55]],
  [[-81,8],[-75,10],[-60,11],[-50,0],[-35,-5],[-38,-13],[-48,-25],[-55,-35],[-62,-40],[-65,-55],[-72,-52],[-75,-45],[-71,-30],[-70,-18],[-77,-5]],
  [[-45,60],[-52,68],[-58,72],[-50,78],[-30,82],[-20,76],[-25,70],[-38,65]],
  [[-17,15],[-16,22],[-6,36],[10,37],[25,32],[32,31],[35,23],[43,12],[51,12],[41,-1],[40,-15],[35,-25],[25,-34],[18,-34],[12,-17],[9,4],[0,5],[-8,4],[-13,9]],
  [[-10,36],[-9,43],[2,51],[8,55],[11,58],[20,60],[28,70],[45,68],[60,72],[75,74],[90,76],[105,78],[115,74],[130,72],[145,72],[160,70],[170,66],[178,65],[170,60],[160,58],[150,59],[142,50],[135,44],[130,42],[126,38],[122,32],[120,25],[110,20],[105,10],[100,5],[95,15],[90,22],[88,21],[80,13],[77,8],[72,20],[65,25],[58,25],[50,28],[43,12],[35,23],[32,31],[28,36],[23,40],[16,40],[12,38],[15,37],[12,45],[3,43],[-2,43],[-9,39]],
  [[113,-22],[114,-34],[120,-34],[129,-32],[137,-35],[140,-38],[147,-38],[150,-37],[153,-28],[146,-19],[142,-11],[136,-12],[130,-11],[125,-14],[117,-20]],
  [[130,32],[135,34],[140,36],[142,40],[145,44],[141,45],[138,37],[133,34]],
  [[166,-46],[173,-41],[178,-38],[176,-45],[170,-47]]
];

/* ============================================================
   PUBLIC EXPOSURE MAP
   Which listed instruments carry business exposure to each theme.

   NOT INVESTMENT ADVICE. This is a factual mapping of where a theme
   touches public markets, assembled so a reader can see what is and
   is not reachable. No recommendation, suitability or risk assessment
   is implied. Tickers, AUM and returns are as at the research date and
   go stale fast.

   q = proxy quality 0-5: how faithfully listed markets track the
       PRIVATE thesis on this board. 5 = you can essentially buy it.
       0 = the thesis has no listed representation at all.
   ============================================================ */
const EXPOSURE = {
  defense:{q:5,note:"The best-covered theme here — but note what you are actually buying. Anduril, Helsing, Saronic and Shield AI are the thesis and all are private. The listed set is incumbent primes plus Palantir, which Thiel has chaired since 2003. SHLD and EUAD come closest in spirit.",
    pure:[["PLTR","Palantir","Thiel chairs it; the origin node of this whole cluster"],["AVAV","AeroVironment","loitering munitions and small UAS"],["KTOS","Kratos","attritable jet drones and targets"],["RHM.DE","Rheinmetall","the European rearmament bellwether"],["LDO.MI","Leonardo","Italian primes, drone and sensor stack"]],
    proxy:[["LMT","Lockheed Martin",""],["RTX","RTX",""],["NOC","Northrop Grumman",""],["LHX","L3Harris",""]],
    etf:[["ITA","iShares US Aerospace & Defense","$13.3B AUM · ~34% 1yr"],["SHLD","Global X Defense Tech","$8.6B AUM · +62% YTD · $3.4B inflows"],["EUAD","Select STOXX Europe Aerospace & Defense","~$1.2B · +73% in 2025, roughly flat YTD"],["XAR","SPDR S&P Aerospace & Defense",""],["PPA","Invesco Aerospace & Defense",""]]},

  compute:{q:5,note:"The most efficiently priced theme on the board, and correspondingly the lowest emergence score. Almost everything is buyable — which is exactly why none of it is cheap. Crusoe and Etched remain private.",
    pure:[["NVDA","NVIDIA","the substrate under most of this board"],["AMD","AMD",""],["AVGO","Broadcom","custom accelerator programmes"],["TSM","TSMC","fabricates nearly all of it"],["ARM","Arm Holdings",""],["CRWV","CoreWeave","GPU cloud, IPO'd Mar 2025"]],
    proxy:[["VRT","Vertiv","datacentre power and cooling"],["SMCI","Super Micro",""],["ANET","Arista Networks",""],["MU","Micron","HBM memory"]],
    etf:[["SMH","VanEck Semiconductor",""],["SOXX","iShares Semiconductor",""],["XSD","SPDR S&P Semiconductor","equal-weighted"],["PSI","Invesco Semiconductors",""]]},

  software:{q:5,note:"The theme where listed analogues genuinely rhyme with the private ones — same buyers, same budgets, same motion. Cursor at $29.3B, Perplexity, Harvey and Sierra are private, but the public cohort is a fair read on the category.",
    pure:[["PLTR","Palantir",""],["NOW","ServiceNow","enterprise agent push"],["CRM","Salesforce","Agentforce"],["SNOW","Snowflake",""],["DDOG","Datadog",""],["APP","AppLovin",""]],
    proxy:[["MSFT","Microsoft","OpenAI stake plus Copilot"],["GOOGL","Alphabet",""]],
    etf:[["IGV","iShares Expanded Tech-Software",""],["ARKW","ARK Next Generation Internet",""],["WCLD","WisdomTree Cloud Computing",""],["AIQ","Global X Artificial Intelligence & Technology",""]]},

  orbital:{q:4,note:"SpaceX listing on 12 June 2026 is the single biggest change to retail access on this entire board — one line now carries Starlink, xAI and the Cursor purchase option. It priced at $135, closed its debut near $161, and traded around $115 in early August. Relativity, Impulse, Varda and Stoke stay private.",
    pure:[["SPCX","SpaceX","NASDAQ since 12 Jun 2026 — largest IPO in history"],["RKLB","Rocket Lab","Neutron targeting Q4 2026"],["ASTS","AST SpaceMobile","direct-to-cell constellation"],["PL","Planet Labs","earth observation"],["LUNR","Intuitive Machines",""],["RDW","Redwire",""]],
    proxy:[["IRDM","Iridium",""],["VSAT","Viasat",""],["SATS","EchoStar","top UFO holding at ~7%"]],
    etf:[["UFO","Procure Space","+31% YTD · +122% 1yr · pure-play tilt"],["ROKT","SPDR S&P Kensho Final Frontiers","+29% YTD · +100% 1yr"],["ARKX","ARK Space Exploration","+11% YTD · +67% 1yr"]]},

  mobility:{q:4,note:"The awkward one. Waymo is the actual winner at $126B and it sits inside Alphabet, so the only route is GOOGL — where it is a rounding error against search. Waabi, Nuro and Wayve are private.",
    pure:[["TSLA","Tesla","FSD and the robotaxi programme"],["AUR","Aurora Innovation","autonomous trucking"],["MBLY","Mobileye",""],["PONY","Pony.ai","China robotaxi"],["WRD","WeRide","China robotaxi"],["UBER","Uber","the demand layer under Waabi and Nuro"]],
    proxy:[["GOOGL","Alphabet","owns Waymo"],["NVDA","NVIDIA","DRIVE platform"],["LAZR","Luminar","lidar"]],
    etf:[["DRIV","Global X Autonomous & Electric Vehicles",""],["IDRV","iShares Self-Driving EV & Tech",""],["KARS","KraneShares Electric Vehicles",""]]},

  capital:{q:4,note:"ICE is the interesting line — it has committed $2B to Polymarket, making it the only listed route into prediction markets. Coinbase and Block are the day jobs of two operators on this board. Stripe, Ramp, Erebor and Kalshi are private.",
    pure:[["COIN","Coinbase","Armstrong's operating company"],["XYZ","Block","Dorsey's operating company"],["HOOD","Robinhood","event contracts and prediction markets"],["ICE","Intercontinental Exchange","$2B committed to Polymarket"],["NU","Nu Holdings",""]],
    proxy:[["CME","CME Group",""],["PYPL","PayPal",""],["V","Visa",""],["MELI","MercadoLibre",""]],
    etf:[["FINX","Global X FinTech",""],["ARKF","ARK Fintech Innovation",""],["IPAY","Amplify Digital Payments",""],["BLOK","Amplify Transformational Data Sharing",""]]},

  energy:{q:4,note:"Read this one carefully. Fission and uranium are richly buyable; fusion is not. Helion at $15.5B, Commonwealth at ~$3B raised and Pacific Fusion have no listed representation whatsoever. Oklo is the only company on the board you can buy directly — and it ran 144% then gave much of it back, which is the risk profile in miniature.",
    pure:[["OKLO","Oklo","Altman chaired it from Y Combinator to the NYSE"],["SMR","NuScale Power","the only NRC-certified SMR design"],["NNE","Nano Nuclear Energy",""],["LEU","Centrus Energy","HALEU enrichment"]],
    proxy:[["CCJ","Cameco","~24% of URA"],["CEG","Constellation Energy","datacentre PPAs"],["VST","Vistra",""],["GEV","GE Vernova",""]],
    etf:[["URA","Global X Uranium","$7.6B AUM · +120% 1yr"],["NUKZ","Range Nuclear Renaissance","$875M · +73% 1yr · holds Oklo, NuScale, Nano"],["NLR","VanEck Uranium & Nuclear","utility-weighted"],["URNM","Sprott Uranium Miners",""]]},

  postdigital:{q:3,note:"Quantum is buyable and thermodynamic computing is not. Extropic and Normal Computing are private with no listed analogue for probabilistic silicon. Note Commerce issued roughly $2B in CHIPS letters of intent to nine quantum firms in May 2026, which is why this cohort moved.",
    pure:[["IONQ","IonQ","trapped ion"],["QNT","Quantinuum","Nasdaq listed Jun 2026 · ~$15.6B"],["RGTI","Rigetti","superconducting"],["QBTS","D-Wave","annealing"],["INFQ","Infleqtion","neutral atom"]],
    proxy:[["IBM","IBM","largest in-house quantum programme"],["HON","Honeywell","spun out Quantinuum"],["GOOGL","Alphabet","Willow"]],
    etf:[["QTUM","Defiance Quantum","crossed $5B AUM · +45% YTD · +86% 1yr"]]},

  robotics:{q:3,note:"An uncomfortable asymmetry. The Western leaders — Figure at $39B, Physical Intelligence, Skild — are all private. The listed route is Chinese manufacturers actually shipping units and Japanese and Swiss industrial arms. You can buy the volume producer, not the valuation.",
    pure:[["TSLA","Tesla","Optimus"],["9880.HK","UBTech","listed Chinese humanoid maker"],["SYM","Symbotic","warehouse automation"],["SERV","Serve Robotics",""]],
    proxy:[["ABBNY","ABB","robotics division"],["6954.T","Fanuc",""],["ROK","Rockwell Automation",""],["6861.T","Keyence",""]],
    etf:[["BOTZ","Global X Robotics & AI","68 holdings · ~30% 1yr"],["ROBO","ROBO Global Robotics","77 equal-weighted · 0.95% ER"],["ARKQ","ARK Autonomous Tech & Robotics","~72% 1yr"],["KOID","Tema Humanoid & Embodied Intelligence",""]]},

  earth:{q:3,note:"You can buy the minerals but not the intelligence. KoBold's edge is the discovery model, not the ore, and no listed company represents AI-guided exploration. Solar geoengineering has no investable vehicle at all — which, given Stardust starts outdoor experiments this year, is arguably the point.",
    pure:[["MP","MP Materials","rare earths"],["ALB","Albemarle","lithium"],["FCX","Freeport-McMoRan","copper"],["IVN.TO","Ivanhoe Mines","copper, Africa-weighted like KoBold"]],
    proxy:[["HEI.DE","Heidelberg Materials","cement, where Fortera sells"],["HOLN.SW","Holcim",""],["TECK","Teck Resources",""]],
    etf:[["COPX","Global X Copper Miners",""],["REMX","VanEck Rare Earth & Strategic Metals",""],["LIT","Global X Lithium & Battery Tech",""],["XME","SPDR S&P Metals & Mining",""]]},

  science:{q:2,note:"A real listed cohort exists, but it is the previous generation — computational drug design and trial software, not the autonomous-laboratory thesis Lila and Periodic are running. Buying RXRX is not buying an AI science factory.",
    pure:[["RXRX","Recursion","AI-driven drug discovery"],["SDGR","Schrödinger","physics-based molecule design"],["TEM","Tempus AI","clinical data and diagnostics"],["ABSI","Absci","generative protein design"],["CERT","Certara","biosimulation"]],
    proxy:[["TMO","Thermo Fisher","lab instruments and automation"],["A","Agilent",""],["ILMN","Illumina",""],["DNA","Ginkgo Bioworks","biofoundry automation"]],
    etf:[["ARKG","ARK Genomic Revolution",""],["IDNA","iShares Genomics Immunology & Healthcare",""]]},

  frontier:{q:2,note:"The biggest pending change on this board. OpenAI and Anthropic have both filed confidentially; until they list, the only Western exposure is through hyperscalers that hold stakes and dilute them enormously. Two Chinese labs, Zhipu and MiniMax, already listed in Hong Kong in 2026 — the open-weight cohort became buyable before the American one did.",
    pure:[["Zhipu","Zhipu AI","Hong Kong listed 2026 · ~$80B+"],["MiniMax","MiniMax","Hong Kong listed 2026"]],
    proxy:[["MSFT","Microsoft","OpenAI stake"],["GOOGL","Alphabet","DeepMind plus an Anthropic stake"],["AMZN","Amazon","Anthropic stake"],["NVDA","NVIDIA","$30B into OpenAI, $10B into Anthropic"]],
    etf:[["CHAT","Roundhill Generative AI & Technology",""],["AIQ","Global X Artificial Intelligence & Technology",""],["IGPT","Invesco AI & Next Gen Software",""],["ARKW","ARK Next Generation Internet",""]]},

  health:{q:2,note:"Neko at $7B, Function, and Oura at a reported ~$11B are all private. The listed cohort is the diagnostics incumbents these companies are explicitly trying to route around — so it is closer to the short side of the thesis than the long.",
    pure:[["HIMS","Hims & Hers","direct-to-consumer diagnostics and treatment"],["DXCM","Dexcom","continuous glucose monitoring"]],
    proxy:[["ABT","Abbott","Lingo consumer biowearables"],["LH","Labcorp",""],["DGX","Quest Diagnostics",""],["ISRG","Intuitive Surgical",""]],
    etf:[["IHI","iShares US Medical Devices",""],["XLV","Health Care Select Sector",""]]},

  world:{q:1,note:"Effectively unbuyable. World Labs, Decart, Odyssey, General Intuition and Bezos's $41B Prometheus are all private with no listed pure-play. The nearest names are simulation-software incumbents these companies may well disrupt rather than represent — exposure to the problem, not the solution.",
    pure:[],
    proxy:[["NVDA","NVIDIA","Omniverse and Cosmos world models"],["U","Unity Software","real-time 3D engine"],["ADSK","Autodesk","led World Labs' $1B round"],["SNPS","Synopsys","absorbed Ansys simulation"]],
    etf:[]},

  neuro:{q:0,note:"No listed representation of any kind. Neuralink at $9B, Merge, Synchron and Precision are all private and none has a public analogue. Medtronic's deep brain stimulation is neuromodulation — a different technology solving a different problem. If you want this theme you cannot have it.",
    pure:[],
    proxy:[["MDT","Medtronic","deep brain stimulation, adjacent not equivalent"],["BSX","Boston Scientific","neuromodulation"],["NVRO","Nevro","spinal cord stimulation"]],
    etf:[["IHI","iShares US Medical Devices","broad devices, no BCI weighting"]]},

  longevity:{q:0,note:"The sharpest finding on this page. The theme scoring highest on operator commitment relative to capital has zero listed exposure. Retro, Altos, NewLimit and Manas are private with no public analogue. And beware the label — funds marketed as 'longevity' track ageing demographics, meaning insurers, senior housing and medical devices. Buying those is not buying cellular reprogramming; it is buying the consequence of not solving it.",
    pure:[],
    proxy:[["XBI","SPDR S&P Biotech","broad biotech, equal-weighted"],["IBB","iShares Biotechnology","broad biotech"]],
    etf:[]}
};
