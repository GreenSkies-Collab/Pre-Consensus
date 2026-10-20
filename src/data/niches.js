/* ============================================================
   NICHE LAYER — the unit of analysis under a theme
   A theme is a sector. A niche is a bet. "Physical AI & Robotics"
   contains robot foundation models, humanoid hardware, warehouse
   automation and surgical robotics — different physics, different
   timelines, different odds. Scoring them together hides every signal.

   Assignment is rule-driven (regex over name + tag + description) with
   explicit overrides, so it keeps working as ventures are added rather
   than needing 200 hand edits.
   ============================================================ */

const NICHES = {
  /* energy */
  "fusion-magnetic":     {n:"Magnetic-confinement fusion",  t:"energy"},
  "fusion-inertial":     {n:"Inertial-confinement fusion",  t:"energy"},
  "smr-fission":         {n:"Small modular fission",        t:"energy"},
  "fuel-cycle":          {n:"Nuclear fuel & enrichment",    t:"energy"},
  "geothermal":          {n:"Enhanced geothermal",          t:"energy"},
  "grid-storage":        {n:"Grid & distributed storage",   t:"energy"},
  "solar-thermal":       {n:"Solar-thermal for datacentres",t:"energy"},

  /* frontier */
  "frontier-closed":     {n:"Closed frontier labs",         t:"frontier"},
  "open-weight":         {n:"Open-weight labs",             t:"frontier"},
  "post-llm":            {n:"Post-LLM architectures",       t:"frontier"},
  "agent-lab":           {n:"Autonomous agent labs",        t:"frontier"},

  /* robotics */
  "robot-foundation":    {n:"Robot foundation models",      t:"robotics"},
  "humanoid-hardware":   {n:"Humanoid hardware",            t:"robotics"},
  "warehouse-automation":{n:"Warehouse & fulfilment robots",t:"robotics"},
  "construction-robots": {n:"Construction robotics",        t:"robotics"},
  "agri-food-robots":    {n:"Agriculture & food robotics",  t:"robotics"},
  "adv-manufacturing":   {n:"Autonomous manufacturing",     t:"robotics"},

  /* defence */
  "autonomous-air":      {n:"Autonomous air systems",       t:"defense"},
  "autonomous-maritime": {n:"Autonomous maritime",          t:"defense"},
  "hypersonics":         {n:"Hypersonics",                  t:"defense"},
  "directed-energy":     {n:"Directed energy",              t:"defense"},
  "ew-spectrum":         {n:"Electromagnetic spectrum",     t:"defense"},
  "defense-logistics":   {n:"Defence logistics & C2",       t:"defense"},
  "counter-uas":         {n:"Counter-drone",                t:"defense"},
  "biosecurity":         {n:"Biosecurity",                  t:"defense"},

  /* longevity */
  "epigenetic-reprog":   {n:"Epigenetic reprogramming",     t:"longevity"},
  "xenotransplant":      {n:"Xenotransplantation",          t:"longevity"},

  /* AI for science */
  "self-driving-lab":    {n:"Self-driving laboratories",    t:"science"},
  "ai-drug-design":      {n:"AI drug design",               t:"science"},
  "protein-design":      {n:"Generative protein design",    t:"science"},
  "rna-editing":         {n:"RNA editing & programmable mRNA",t:"science"},
  "materials-discovery": {n:"AI materials discovery",       t:"science"},
  "sequencing":          {n:"Sequencing & synthesis",       t:"science"},
  "cell-manufacturing":  {n:"Cell therapy manufacturing",   t:"science"},

  /* compute */
  "transformer-asic":    {n:"Transformer-specific silicon", t:"compute"},
  "photonic-interconnect":{n:"Photonic interconnect",       t:"compute"},
  "ai-datacenter":       {n:"AI datacentre build-out",      t:"compute"},
  "gpu-cloud":           {n:"Sovereign & neo-cloud",        t:"compute"},
  "novel-cpu":           {n:"Novel CPU architectures",      t:"compute"},
  "power-delivery":      {n:"Chip power delivery",          t:"compute"},
  "euv-litho":           {n:"EUV lithography supply",       t:"compute"},
  "chip-design-ai":      {n:"AI for chip design",           t:"compute"},

  /* post-digital */
  "thermodynamic":       {n:"Thermodynamic computing",      t:"postdigital"},
  "photonic-quantum":    {n:"Photonic quantum",             t:"postdigital"},
  "trapped-ion":         {n:"Trapped-ion & neutral-atom",   t:"postdigital"},
  "analog-memory":       {n:"Analog in-memory compute",     t:"postdigital"},
  "superconducting":     {n:"Superconducting compute",      t:"postdigital"},
  "quantum-software":    {n:"Quantum algorithms",           t:"postdigital"},

  /* world models */
  "world-sim":           {n:"Interactive world simulation", t:"world"},
  "spatial-intelligence":{n:"Spatial intelligence",         t:"world"},
  "generative-video":    {n:"Generative video",             t:"world"},
  "artificial-engineer": {n:"Artificial general engineer",  t:"world"},

  /* orbital */
  "reusable-launch":     {n:"Reusable launch",              t:"orbital"},
  "in-space-logistics":  {n:"In-space logistics",           t:"orbital"},
  "orbital-manufacturing":{n:"Orbital manufacturing",       t:"orbital"},
  "smallsat":            {n:"Satellite platforms",          t:"orbital"},
  "space-solar":         {n:"Space-based solar power",      t:"orbital"},
  "space-awareness":     {n:"Space domain awareness",       t:"orbital"},

  /* mobility */
  "robotaxi":            {n:"Robotaxi",                     t:"mobility"},
  "autonomous-trucking": {n:"Autonomous trucking",          t:"mobility"},
  "av-licensing":        {n:"Licensed autonomy stacks",     t:"mobility"},
  "evtol":               {n:"eVTOL & flying vehicles",      t:"mobility"},
  "cheap-ev":            {n:"Low-cost electric vehicles",   t:"mobility"},

  /* capital */
  "prediction-markets":  {n:"Prediction markets",           t:"capital"},
  "crypto-banking":      {n:"Banking for the tech economy", t:"capital"},
  "spend-management":    {n:"Corporate spend & payments",   t:"capital"},
  "proof-of-person":     {n:"Proof of personhood",          t:"capital"},

  /* neuro */
  "invasive-bci":        {n:"Implanted electrode BCI",      t:"neuro"},
  "endovascular-bci":    {n:"Endovascular BCI",             t:"neuro"},
  "surface-bci":         {n:"Surface-array BCI",            t:"neuro"},
  "noninvasive-bci":     {n:"Non-invasive interfaces",      t:"neuro"},

  /* earth */
  "ai-exploration":      {n:"AI mineral exploration",       t:"earth"},
  "solar-geoengineering":{n:"Solar geoengineering",         t:"earth"},
  "low-carbon-cement":   {n:"Low-carbon cement",            t:"earth"},
  "battery-materials":   {n:"Battery materials & recycling",t:"earth"},
  "green-metals":        {n:"Fossil-free metals",           t:"earth"},
  "cultivated-food":     {n:"Cultivated food",              t:"earth"},
  "photosynthesis":      {n:"Engineered photosynthesis",    t:"earth"},
  "pfas-water":          {n:"PFAS & water remediation",     t:"earth"},

  /* health */
  "whole-body-imaging":  {n:"Whole-body preventive imaging",t:"health"},
  "continuous-biomarkers":{n:"Continuous biomarkers",       t:"health"},

  /* software */
  "ai-coding":           {n:"AI software engineering",      t:"software"},
  "ai-search":           {n:"AI search & answers",          t:"software"},
  "vertical-ai":         {n:"Vertical professional AI",     t:"software"},
  "customer-agents":     {n:"Customer-facing agents",       t:"software"},
  "ai-security":         {n:"AI security & evaluation",     t:"software"}
};

/* Rules run in order over "name · tag · what". First match wins per rule,
   but a venture may collect several niches. Order matters only for clarity. */
const NICHE_RULES = [
  ["fusion-magnetic",   /pulsed[- ]magnetic|tokamak|magnetic[- ]confinement|fusion/i],
  ["fusion-inertial",   /inertial[- ]confinement/i],
  ["smr-fission",       /small modular|modular (fission|reactor)|factory[- ]built fission|compact fast[- ]fission|sodium[- ]cooled/i],
  ["fuel-cycle",        /enrichment|nuclear fuel|HALEU/i],
  ["geothermal",        /geothermal/i],
  ["grid-storage",      /battery|storage|virtual power plant|grid/i],
  ["solar-thermal",     /solar[- ]thermal/i],

  ["post-llm",          /world model|beyond LLM|post[- ]LLM|dead end for real intelligence/i],
  ["open-weight",       /open[- ]weight|open source model|open weights/i],
  ["frontier-closed",   /frontier (model )?lab|superintelligence/i],
  ["agent-lab",         /agent(s)? that|autonomous agent/i],

  ["robot-foundation",  /robot foundation|general(-| )purpose control|shared brain|general policy|robot intelligence|general robot/i],
  ["humanoid-hardware", /humanoid/i],
  ["warehouse-automation",/warehouse|fulfil|parcel|logistics robot|material handling|sortation/i],
  ["construction-robots",/construction/i],
  ["agri-food-robots",  /agricultur|harvest|pesticide|food production|self[- ]checkout|pizza/i],
  ["adv-manufacturing", /autonomous factor|digital manufacturing|additive manufactur|3D print|manufacturing line|factory inspection/i],

  ["autonomous-air",    /autonomous (drone|aircraft)|loitering|UAS|drone/i],
  ["autonomous-maritime",/naval|maritime|unmanned (ship|surface|vessel)|warship/i],
  ["hypersonics",       /hypersonic/i],
  ["directed-energy",   /directed[- ]energy/i],
  ["ew-spectrum",       /electromagnetic spectrum|spectrum warfare/i],
  ["defense-logistics", /defence logistics|defense logistics|command software|Lattice/i],
  ["counter-uas",       /counter[- ]drone|counter[- ]UAS|airspace protection/i],
  ["biosecurity",       /biosecurity|medical countermeasure/i],

  ["epigenetic-reprog", /epigenetic|reprogramming|cellular rejuvenation|reverse.*cellular age/i],
  ["xenotransplant",    /porcine|xenotransplant|organ transplant/i],

  ["self-driving-lab",  /science factor|automated laborator|closed[- ]loop|autonomous laborator/i],
  ["ai-drug-design",    /drug (discovery|design)|small[- ]molecule|therapeutic/i],
  ["protein-design",    /protein|antibody|peptide/i],
  ["rna-editing",       /RNA|mRNA/i],
  ["materials-discovery",/materials (design|discovery|innovation)/i],
  ["sequencing",        /sequencing|DNA synth|genome/i],
  ["cell-manufacturing",/cell therapy manufactur/i],

  ["transformer-asic",  /transformer.*silicon|transformer.*chip|burns the transformer|inference accelerat|in-memory compute/i],
  ["photonic-interconnect",/silicon photonic|optical fibre|photonic|interconnect/i],
  ["ai-datacenter",     /data ?cent(re|er)/i],
  ["gpu-cloud",         /GPU cloud|sovereign AI|neo[- ]cloud|serverless compute/i],
  ["novel-cpu",         /RISC-V|CPU (and|or) GPU replacement|rack[- ]scale server/i],
  ["power-delivery",    /power delivery|power semiconductor|gallium nitride/i],
  ["euv-litho",         /ultraviolet|lithograph/i],
  ["chip-design-ai",    /chip design|electrical engineer|electronic design/i],

  ["thermodynamic",     /thermodynamic/i],
  ["photonic-quantum",  /photonic quantum|million[- ]qubit/i],
  ["trapped-ion",       /trapped ion|neutral atom|annealing/i],
  ["analog-memory",     /analog|brain[- ]inspired/i],
  ["superconducting",   /superconducting/i],
  ["quantum-software",  /quantum algorithm/i],

  ["world-sim",         /world simulation|interactive world|world model/i],
  ["spatial-intelligence",/spatial (intelligence|reasoning)|3D environment/i],
  ["generative-video",  /generative video|video (generation|world)/i],
  ["artificial-engineer",/artificial general engineer/i],

  ["reusable-launch",   /reusab|launch vehicle|rocket/i],
  ["in-space-logistics",/in[- ]space (transport|mobility|logistics)|orbital tug|kick stage/i],
  ["orbital-manufacturing",/microgravity|manufactur.*orbit|orbit.*manufactur/i],
  ["smallsat",          /satellite/i],
  ["space-solar",       /space[- ]based solar|beam.*orbit|solar power from orbit/i],
  ["space-awareness",   /space superiority|space domain|collision avoidance/i],

  ["robotaxi",          /robotaxi|ride[- ]hail|driverless commercial/i],
  ["autonomous-trucking",/trucking|long[- ]haul/i],
  ["av-licensing",      /licen[cs]e.*autonomy|autonomy stack|end[- ]to[- ]end.*driving/i],
  ["evtol",             /eVTOL|flying car|vertical takeoff/i],
  ["cheap-ev",          /electric pickup|light electric vehicle|low[- ]cost.*electric/i],

  ["prediction-markets",/prediction market|event (contract|exchange)/i],
  ["crypto-banking",    /bank/i],
  ["spend-management",  /payments|corporate (card|spend)|spend management/i],
  ["proof-of-person",   /proof of human|proof of person|World ID|iris/i],

  ["invasive-bci",      /implanted (electrode|brain)|removing a section of skull/i],
  ["endovascular-bci",  /blood vessel|catheter|stentrode/i],
  ["surface-bci",       /thin[- ]film|cortical surface/i],
  ["noninvasive-bci",   /non[- ]invasive|ultrasound.*neuron|without.*skull|neural.*interface.*computing/i],

  ["ai-exploration",    /mineral exploration|critical mineral|tomography.*subsurface|subsurface/i],
  ["solar-geoengineering",/geoengineering|stratospheric aerosol/i],
  ["low-carbon-cement", /cement/i],
  ["battery-materials", /battery (material|recycl)/i],
  ["green-metals",      /metal production|fossil[- ]free metal|renewable metal/i],
  ["cultivated-food",   /cultivated (meat|seafood)|animal[- ]free meat/i],
  ["photosynthesis",    /photosynthe/i],
  ["pfas-water",        /PFAS|forever chemical|water.*remediat/i],

  ["whole-body-imaging",/body scan|whole[- ]body|full[- ]body|MRI/i],
  ["continuous-biomarkers",/biomarker|glucose|smart ring|wearable/i],

  ["ai-coding",         /coding|software engineer|code editor/i],
  ["ai-search",         /search|answers instead of links/i],
  ["vertical-ai",       /legal|law firm|pathology|diagnostic/i],
  ["customer-agents",   /customer(-facing)? agent|resolve issues/i],
  ["ai-security",       /security|red[- ]team|vulnerabilit|benchmark|evaluation/i]
];

/* ============================================================
   NICHE-LEVEL PUBLIC EXPOSURE
   A theme's ticker list is usually too coarse for a niche. Nuclear ETFs
   are not exposure to fusion; quantum stocks are not exposure to
   thermodynamic computing. Where a niche has its own answer it is given
   here; everything else inherits the parent theme's list, clearly marked
   as inherited so the distinction stays visible.

   NOT INVESTMENT ADVICE — same terms as the theme-level map.
   q = 0-5 proxy quality for THIS niche specifically.
   ============================================================ */
const NICHE_EXPOSURE = {
  "fusion-magnetic":{q:0,note:"No listed fusion company exists anywhere. Helion, Commonwealth and Pacific Fusion are private and nuclear ETFs hold fission, which is a different technology on a different timeline. Buying URA is not buying fusion.",pure:[],proxy:[["NNE","Nano Nuclear Energy","adjacent advanced-nuclear sentiment only"]],etf:[]},
  "fusion-inertial":{q:0,note:"Same as magnetic fusion — nothing listed. Pacific Fusion is milestone-funded and private.",pure:[],proxy:[],etf:[]},
  "smr-fission":{q:4,note:"The one genuinely buyable corner of the energy theme. Oklo, NuScale and Nano Nuclear are all listed pure-plays, and NUKZ holds the set.",
    pure:[["OKLO","Oklo","Altman chaired it to the NYSE"],["SMR","NuScale Power","only NRC-certified SMR design"],["NNE","Nano Nuclear Energy",""]],
    proxy:[["CEG","Constellation Energy","datacentre PPAs"],["LEU","Centrus","HALEU fuel"]],
    etf:[["NUKZ","Range Nuclear Renaissance","holds Oklo, NuScale, Nano"]]},
  "thermodynamic":{q:0,note:"Extropic and Normal Computing are private and there is no listed analogue for probabilistic silicon. Quantum ETFs do not contain this — it is a different physics.",pure:[],proxy:[],etf:[]},
  "photonic-quantum":{q:2,note:"PsiQuantum itself is private. The listed quantum names use trapped-ion, annealing or superconducting approaches, so QTUM gives you the sector but not this bet.",
    pure:[],proxy:[["IONQ","IonQ","trapped ion, not photonic"],["QBTS","D-Wave","annealing"]],etf:[["QTUM","Defiance Quantum","sector, not this approach"]]},
  "epigenetic-reprog":{q:0,note:"Retro, Altos, NewLimit and Integrated Biosciences are all private. No listed company does partial reprogramming. Funds marketed as 'longevity' track ageing demographics — insurers and senior housing — which is the opposite trade.",pure:[],proxy:[],etf:[]},
  "self-driving-lab":{q:1,note:"Lila and Periodic are private. Recursion and Schrödinger are the nearest listed names but they are computational drug design, not closed-loop autonomous laboratories.",
    pure:[],proxy:[["RXRX","Recursion","AI drug discovery, not autonomous labs"],["SDGR","Schrödinger","physics-based design"],["TMO","Thermo Fisher","sells the lab automation"]],etf:[]},
  "humanoid-hardware":{q:3,note:"The asymmetry of the board in one line: Figure at $39B is private, while the listed route is Chinese manufacturers actually shipping units. You can buy the volume producer, not the valuation.",
    pure:[["9880.HK","UBTech","listed Chinese humanoid maker"],["TSLA","Tesla","Optimus programme"]],
    proxy:[["6954.T","Fanuc",""],["ABBNY","ABB","robotics division"]],
    etf:[["KOID","Tema Humanoid & Embodied Intelligence",""],["BOTZ","Global X Robotics & AI",""]]},
  "robot-foundation":{q:0,note:"Physical Intelligence, Skild and Generalist are all private. NVIDIA sells the training compute but is not exposure to the control layer itself.",pure:[],proxy:[["NVDA","NVIDIA","sells into it, is not it"]],etf:[]},
  "transformer-asic":{q:1,note:"Etched and MatX are private. Cerebras listed in 2026 but builds wafer-scale general accelerators rather than transformer-only silicon.",
    pure:[],proxy:[["AVGO","Broadcom","custom accelerator programmes"],["NVDA","NVIDIA",""]],etf:[["SMH","VanEck Semiconductor",""]]},
  "space-solar":{q:0,note:"Aetherflux is private and pre-flight. There is no listed space-solar company on any exchange.",pure:[],proxy:[],etf:[]},
  "solar-geoengineering":{q:0,note:"Stardust is private, and deliberately so — there is no investable vehicle for stratospheric aerosol injection, which given the absence of any governing treaty is arguably the point.",pure:[],proxy:[],etf:[]},
  "ai-exploration":{q:2,note:"KoBold's edge is the discovery model, not the ore. You can buy miners; you cannot buy AI-guided exploration.",
    pure:[],proxy:[["FCX","Freeport-McMoRan","copper"],["IVN.TO","Ivanhoe Mines","Africa-weighted like KoBold"],["TECK","Teck Resources",""]],
    etf:[["COPX","Global X Copper Miners",""],["REMX","VanEck Rare Earth",""]]},
  "invasive-bci":{q:0,note:"Neuralink is private. Medtronic's deep brain stimulation is neuromodulation — a different technology solving a different problem.",pure:[],proxy:[["MDT","Medtronic","adjacent, not equivalent"]],etf:[]},
  "noninvasive-bci":{q:0,note:"Merge Labs and Wispr are private. Nothing listed represents non-surgical neural interfaces.",pure:[],proxy:[],etf:[]},
  "prediction-markets":{q:2,note:"Kalshi and Polymarket are both private. ICE is the only listed route — it has committed $2B to Polymarket — and Robinhood now runs event contracts.",
    pure:[],proxy:[["ICE","Intercontinental Exchange","$2B into Polymarket"],["HOOD","Robinhood","event contracts"],["CME","CME Group",""]],etf:[]},
  "reusable-launch":{q:4,note:"The most buyable niche on the board since June 2026. SpaceX listing put the dominant player on Nasdaq; Rocket Lab is the credible number two.",
    pure:[["SPCX","SpaceX","Nasdaq since June 2026"],["RKLB","Rocket Lab","Neutron targeting Q4 2026"]],
    proxy:[],etf:[["UFO","Procure Space",""],["ROKT","SPDR Kensho Final Frontiers",""]]},
  "robotaxi":{q:3,note:"Waymo is the actual winner at $126B and sits inside Alphabet, so GOOGL is the only route and it is heavily diluted. The listed pure-plays are the Chinese operators.",
    pure:[["PONY","Pony.ai",""],["WRD","WeRide",""],["TSLA","Tesla",""]],
    proxy:[["GOOGL","Alphabet","owns Waymo"],["UBER","Uber","demand layer"]],etf:[["DRIV","Global X Autonomous & EV",""]]},
  "open-weight":{q:2,note:"The Chinese open-weight labs became buyable before the American closed ones did — Zhipu and MiniMax both listed in Hong Kong in 2026, while DeepSeek and Moonshot remain private.",
    pure:[["Zhipu","Zhipu AI","Hong Kong listed 2026"],["MiniMax","MiniMax","Hong Kong listed 2026"]],
    proxy:[["NVDA","NVIDIA",""]],etf:[]},
  "ai-coding":{q:2,note:"Cursor at $29.3B and Cognition are private. Microsoft owns GitHub Copilot but it is a rounding error against the rest of the business.",
    pure:[],proxy:[["MSFT","Microsoft","GitHub Copilot"],["NOW","ServiceNow",""]],etf:[["IGV","iShares Expanded Tech-Software",""]]}
};

/* Explicit assignments where the text is ambiguous or wrong. Wins over rules. */
const NICHE_OVERRIDE = {
  helion:["fusion-magnetic"], cfs:["fusion-magnetic"], pacific:["fusion-inertial"],
  valar:["smr-fission"], terrapower:["smr-fission"], oklo:["smr-fission"],
  genmatter:["fuel-cycle"], fervo:["geothermal"], basepower:["grid-storage"],
  silanano:["battery-materials"], exowatt:["solar-thermal"], alva:["smr-fission"],
  sizable:["grid-storage"], crux:["grid-storage"], chargelab:["grid-storage"], amp:["grid-storage"],
  anthropic:["frontier-closed"], openai:["frontier-closed"], ssi:["frontier-closed"],
  tml:["frontier-closed"], deepseek:["open-weight"], moonshot:["open-weight"],
  mistral:["open-weight"], zeroone:["open-weight"], reflection:["open-weight"],
  ami:["post-llm"], sakana:["post-llm"], adept:["agent-lab"], ai21:["frontier-closed"],
  pi:["robot-foundation"], skild:["robot-foundation"], generalist:["robot-foundation"],
  figure:["humanoid-hardware"], unitree:["humanoid-hardware"], agibot:["humanoid-hardware"],
  galbot:["humanoid-hardware"], apptronik:["humanoid-hardware"], onex:["humanoid-hardware"],
  agility:["humanoid-hardware","warehouse-automation"],
  anduril:["defense-logistics","autonomous-air"], helsing:["defense-logistics","autonomous-air"],
  shield:["autonomous-air"], saronic:["autonomous-maritime"], bluewater:["autonomous-maritime"],
  castelion:["hypersonics"], hermeus:["hypersonics"], epirus:["directed-energy"],
  cx2:["ew-spectrum"], overland:["defense-logistics"], gallatin:["defense-logistics"],
  chaosind:["ew-spectrum"], flock:["defense-logistics"], apolloshield:["counter-uas"],
  valthos:["biosecurity"], nominal:["defense-logistics"], hadrian:["adv-manufacturing"],
  palantir:["defense-logistics"], skydio:["autonomous-air"], trueanomaly:["space-awareness"],
  ursamajor:["reusable-launch"],
  retro:["epigenetic-reprog"], altos:["epigenetic-reprog"], newlimit:["epigenetic-reprog"],
  manas:["ai-drug-design"], egenesis:["xenotransplant"], integratedbio:["epigenetic-reprog"],
  lila:["self-driving-lab"], periodic:["self-driving-lab","materials-discovery"],
  isomorphic:["ai-drug-design"], arc:["self-driving-lab"],
  crusoe:["ai-datacenter"], etched:["transformer-asic"], matx:["transformer-asic"],
  unconv:["analog-memory"], nscale:["gpu-cloud"], ayar:["photonic-interconnect"],
  dmatrix:["transformer-asic"], nextsilicon:["novel-cpu"], picojool:["photonic-interconnect"],
  powerlattice:["power-delivery"], xlight:["euv-litho"], vertsemi:["power-delivery"],
  syenta:["photonic-interconnect"], oxide:["novel-cpu"], aheadcomp:["novel-cpu"],
  radsemi:["chip-design-ai"], genalpha:["chip-design-ai"], quilter:["chip-design-ai"],
  modal:["gpu-cloud"], together:["gpu-cloud"],
  extropic:["thermodynamic"], normal:["thermodynamic"], psiquantum:["photonic-quantum"],
  rain:["analog-memory"], snowcap:["superconducting"], phasecraft:["quantum-software"],
  sandboxaq:["quantum-software"],
  prometheus:["artificial-engineer"], worldlabs:["spatial-intelligence"],
  decart:["world-sim"], odyssey:["generative-video"], genintuition:["spatial-intelligence"],
  runway:["generative-video"], latenttech:["generative-video"],
  relativity:["reusable-launch"], impulse:["in-space-logistics"], varda:["orbital-manufacturing"],
  stoke:["reusable-launch"], k2:["smallsat"], aetherflux:["space-solar"],
  endurosat:["smallsat"], kayhan:["space-awareness"],
  waymo:["robotaxi"], waabi:["robotaxi"], nuro:["av-licensing"], wayve:["av-licensing"],
  aeroht:["evtol"], slate:["cheap-ev"], also:["cheap-ev"], sixwheel:["autonomous-trucking"],
  trucklabs:["autonomous-trucking"], righthook:["av-licensing"], appliedintuition:["av-licensing"],
  stripe:["spend-management"], ramp:["spend-management"], erebor:["crypto-banking"],
  polymarket:["prediction-markets"], kalshi:["prediction-markets"], tfh:["proof-of-person"],
  neuralink:["invasive-bci"], merge:["noninvasive-bci"], synchron:["endovascular-bci"],
  precision:["surface-bci"], wisprflow:["noninvasive-bci"],
  kobold:["ai-exploration"], ideon:["ai-exploration"], stardust:["solar-geoengineering"],
  fortera:["low-carbon-cement"], elementzero:["green-metals"], redwoodmat:["battery-materials"],
  wildtype:["cultivated-food"], gigacrop:["photosynthesis"], aclarity:["pfas-water"],
  solugen:["low-carbon-cement"], skycatch:["ai-exploration"], agzen:["photosynthesis"],
  neko:["whole-body-imaging"], function:["continuous-biomarkers"], oura:["continuous-biomarkers"],
  bodyport:["continuous-biomarkers"], nvision:["whole-body-imaging"],
  cursor:["ai-coding"], cognition:["ai-coding"], zed:["ai-coding"],
  perplexity:["ai-search"], harvey:["vertical-ai"], sierra:["customer-agents"],
  xbow:["ai-security"], promptfoo:["ai-security"], valsai:["ai-security"]
};
