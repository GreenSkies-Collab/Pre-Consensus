/* ============================================================
   SEEDLINGS — the small end of the board
   Sourced by reading VC portfolio pages directly (they publish them
   openly), then selecting for deep tech and mapping onto the themes.

   These carry deliberately less data than the headline ventures. For
   most, no valuation is public — that is a fact about the companies,
   not a gap in the research, and inventing one would be worse than
   leaving it blank. They contribute to conviction, theme counts and
   the momentum picture, but not to tracked value.

   Compact schema:
     [id, name, theme, tag, stage, m, [funds], hub?]
   `tag` is the portfolio page's own one-line description wherever the
   firm supplied one, lightly normalised.
   ============================================================ */

const FUNDS = [
  {id:"lux",        name:"Lux Capital",       region:"na", vehicle:"$7B AUM · Fund IX $1.5B",
   thesis:"The most literary of the hard-tech funds. Backs founders working at the edge of physics, biology and defence, and has been in Anduril, Varda, Impulse and Physical Intelligence early enough to shape them."},
  {id:"playground", name:"Playground Global", region:"na", vehicle:"$1.2B AUM",
   thesis:"Partners with technical and scientific founders from next-generation compute through engineered biology. Its silicon book — Ayar, d-Matrix, xLight, Snowcap — is the deepest bet on post-NVIDIA hardware anywhere on this board."},
  {id:"eclipse",    name:"Eclipse Ventures",  region:"na", vehicle:"$4B AUM",
   thesis:"Invests exclusively in the physical industries — manufacturing, logistics, construction, defence — on the thesis that the digital economy is done and the atoms economy is the opportunity."},
  {id:"dcvc",       name:"DCVC",              region:"na", vehicle:"$4B AUM",
   thesis:"Backs deep tech aimed at trillion-dollar problems, with an unusually long tail across climate, computational biology and industrial AI. Over four hundred companies, most of them invisible."},
  {id:"root",       name:"Root Ventures",     region:"na", vehicle:"Seed-stage hard tech",
   thesis:"Writes the first cheque into engineering-hard companies — robotics, manufacturing, semiconductors, scientific tooling. The earliest-stage fund here and therefore the best leading indicator of what the larger funds will price in two years."}
];

const SEEDLINGS = [
  /* ---- compute & silicon ---- */
  ["ayar","Ayar Labs","compute","Silicon photonics interconnect for AI systems","Series D",5,["playground"],"sfbay"],
  ["dmatrix","d-Matrix","compute","AI inference acceleration via in-memory compute","Series C",4,["playground"],"sfbay"],
  ["nextsilicon","NextSilicon","compute","CPU and GPU replacement claiming exponential speedup","Series F",5,["playground"],"tlv"],
  ["picojool","PicoJool","compute","Optical fibre replacement inside AI data centres","Seed",1,["playground"]],
  ["powerlattice","PowerLattice","compute","Power delivery chiplet for AI accelerators","Seed",2,["playground"]],
  ["xlight","xLight","compute","Extreme ultraviolet light source for advanced lithography","Series A",2,["playground"],"sfbay"],
  ["vertsemi","Vertical Semiconductor","compute","Gallium nitride power semiconductors","Seed",2,["playground"]],
  ["syenta","Syenta","compute","Chip-to-chip interconnect manufacturing","Seed",1,["playground"]],
  ["oxide","Oxide Computer","compute","Rack-scale servers rebuilt from the firmware up","Series B",3,["eclipse"],"sfbay"],
  ["aheadcomp","AheadComputing","compute","High-performance RISC-V processor cores","Series A",2,["eclipse"]],
  ["radsemi","Radical Semiconductor","compute","Hardware security down to the individual chip","Seed",1,["root"]],
  ["genalpha","Gen Alpha","compute","AI copilots for analog and mixed-signal chip design","Seed",1,["root"]],
  ["quilter","Quilter","compute","Automated design tools for electrical engineers","Series A",2,["root"],"sfbay"],
  ["modal","Modal","compute","Serverless compute built for AI workloads","Series B",3,["lux"],"nyc"],
  ["together","Together AI","compute","Cloud for open-source model training and inference","Series C",4,["lux"],"sfbay"],

  /* ---- post-digital compute ---- */
  ["snowcap","Snowcap Compute","postdigital","Superconducting compute platform","Seed",1,["playground"]],
  ["phasecraft","Phasecraft","postdigital","Quantum algorithms for near-term hardware","Series B",3,["playground"],"lon"],

  /* ---- energy ---- */
  ["alva","Alva Energy","energy","Uprating existing nuclear reactors for more output","Seed",1,["playground"]],
  ["genmatter","General Matter","energy","Domestic uranium enrichment and nuclear fuel supply","Series A",2,["thiel"],"sfbay"],
  ["sizable","Sizable Energy","energy","Ocean-based energy storage","Seed",1,["playground"]],
  ["silanano","Sila Nanotechnologies","energy","Silicon anode materials for next-generation batteries","Series G",6,["lonsdale"],"sfbay"],
  ["crux","Crux","energy","Marketplace automating energy infrastructure finance","Series B",3,["root"],"nyc"],
  ["chargelab","ChargeLab","energy","Software-defined EV charging networks","Series A",2,["root"],"tor"],
  ["amp","AMP Energy","energy","Energy management for electric mobility","Series B",3,["lonsdale"]],

  /* ---- robotics & advanced manufacturing ---- */
  ["bedrock","Bedrock Robotics","robotics","Converts existing construction equipment to autonomous","Series A",2,["eclipse","lonsdale"],"sfbay"],
  ["mytra","Mytra","robotics","Robotic material handling for warehouses","Series B",3,["eclipse"],"sfbay"],
  ["mindrobotics","Mind Robotics","robotics","Industrial robotics platform","Series A",2,["eclipse"]],
  ["brightmachines","Bright Machines","robotics","Software-defined intelligent manufacturing lines","Series C",4,["eclipse"],"sfbay"],
  ["robustai","Robust.AI","robotics","Human-centred warehouse robotics","Series C",4,["playground"],"sfbay"],
  ["generalist","Generalist AI","robotics","Robot foundation models","Series A",2,["lonsdale"],"sfbay"],
  ["dusty","Dusty Robotics","robotics","Automated layout printing on construction sites","Series B",3,["root"],"sfbay"],
  ["seismic","Seismic","robotics","Soft robotic exosuits augmenting worker strength","Series B",3,["root"],"sfbay"],
  ["rubyrobotics","Ruby Robotics","robotics","Robotic tissue preparation and assessment during biopsy","Seed",1,["root"]],
  ["viberobotics","Vibe Robotics","robotics","New programming interfaces for robots","Seed",1,["root"]],
  ["tortuga","Tortuga AgTech","robotics","Autonomous harvesting for high-value produce","Series B",3,["root"],"den"],
  ["stellarpizza","Stellar Pizza","robotics","Fully automated food production","Series A",2,["root"],"la"],
  ["mashgin","Mashgin","robotics","Computer-vision self-checkout","Series B",3,["root"],"sfbay"],
  ["boxbot","Boxbot","robotics","Automated parcel sortation and logistics","Series A",2,["playground"],"sfbay"],
  ["outrider","Outrider","robotics","Autonomous yard operations for distribution logistics","Series D",5,["lonsdale"],"den"],
  ["thruwave","ThruWave","robotics","Millimetre-wave imaging for logistics throughput","Series A",2,["root"],"sea"],
  ["vulcanforms","VulcanForms","robotics","Digital metal manufacturing at industrial scale","Series C",4,["eclipse"],"bos"],
  ["velo3d","Velo3D","robotics","Industrial metal additive manufacturing","Public",7,["playground"],"sfbay"],
  ["instrumental","Instrumental","robotics","AI inspection for mass manufacturing lines","Series C",4,["root"],"sfbay"],
  ["nanotronics","Nanotronics","robotics","AI-driven factory inspection and process control","Series E",5,["thiel"],"nyc"],
  ["sixriver","6 River Systems","robotics","Collaborative warehouse robots","Acquired",6,["eclipse"],"bos"],

  /* ---- defence & autonomy ---- */
  ["hadrian","Hadrian","defense","Autonomous precision-parts factories for space and defence","Series C",4,["lux","thiel"],"la"],
  ["skydio","Skydio","defense","Autonomous drones for defence and infrastructure inspection","Series E",6,["playground"],"sfbay"],
  ["trueanomaly","True Anomaly","defense","Spacecraft and software for orbital space superiority","Series C",4,["eclipse"],"den"],
  ["ursamajor","Ursa Major","defense","Rocket propulsion and solid motors for missile defence","Series E",5,["eclipse"],"den"],
  ["bluewater","Blue Water Autonomy","defense","Unmanned ocean-going warships","Series A",2,["eclipse"],"bos"],
  ["epirus","Epirus","defense","Directed-energy counter-swarm systems","Series D",5,["lonsdale"],"la"],
  ["cx2","CX2","defense","Electromagnetic spectrum warfare","Series A",2,["lonsdale"],"sfbay"],
  ["overland","Overland AI","defense","Autonomy for unmanned ground vehicles","Series B",3,["lonsdale"],"sea"],
  ["gallatin","Gallatin AI","defense","Defence logistics automation","Seed",1,["lonsdale"]],
  ["chaosind","Chaos Industries","defense","Sensing and critical infrastructure defence","Series C",4,["lonsdale"],"la"],
  ["flock","Flock Safety","defense","Networked public-safety cameras and evidence tooling","Series F",6,["thiel"],"atl"],
  ["apolloshield","ApolloShield","defense","Counter-drone airspace protection","Series A",2,["root"]],
  ["valthos","Valthos","defense","AI biosecurity and medical countermeasures","Seed",1,["lux"],"nyc"],
  ["nominal","Nominal","defense","Test and telemetry analysis for mission-critical hardware","Series B",3,["lux","thiel"],"la"],

  /* ---- orbital ---- */
  ["endurosat","EnduroSat","orbital","Modular small satellites and constellation services","Series B",3,["thiel"],"lon"],
  ["kayhan","Kayhan Space","orbital","Collision avoidance and spaceflight operations","Series A",2,["root"],"den"],

  /* ---- AI for science ---- */
  ["genetics1910","1910 Genetics","science","Multimodal AI for small-molecule and biologic discovery","Series B",3,["playground"],"bos"],
  ["atomicai","Atomic AI","science","RNA structure prediction with foundation models","Series A",2,["playground"],"sfbay"],
  ["infinimmune","Infinimmune","science","AI-native antibody discovery from human repertoires","Series A",2,["playground"],"sfbay"],
  ["manifoldbio","Manifold Bio","science","High-throughput in-vivo measurement of protein therapeutics","Series A",2,["playground"],"bos"],
  ["insamo","Insamo","science","Macrocyclic peptide drug discovery","Seed",1,["playground"]],
  ["amberbio","Amber Bio","science","Multi-kilobase RNA editing for genetic disease","Series A",2,["playground"],"sfbay"],
  ["outpace","Outpace Bio","science","Protein switches for programmable cell therapy","Series B",3,["playground"],"sea"],
  ["strandtx","Strand Therapeutics","science","Programmable self-replicating mRNA therapies","Series B",3,["playground"],"bos"],
  ["synthdesign","Synthetic Design Lab","science","Antibody-drug conjugate design platform","Seed",1,["playground"]],
  ["ultima","Ultima Genomics","science","Very low cost high-throughput genome sequencing","Series D",5,["playground"],"sfbay"],
  ["eikon","Eikon Therapeutics","science","Drug discovery by tracking single proteins in live cells","Series D",5,["lux"],"sfbay"],
  ["kallyope","Kallyope","science","Gut-brain axis drug discovery","Series D",5,["lux"],"nyc"],
  ["osmo","Osmo","science","AI that designs and predicts scent molecules","Series A",2,["lux"],"nyc"],
  ["benchling","Benchling","science","R&D cloud for life sciences laboratories","Series F",6,["lux"],"sfbay"],
  ["mammoth","Mammoth Biosciences","science","Next-generation compact CRISPR systems","Series D",5,["lonsdale"],"sfbay"],
  ["bighat","BigHat Biosciences","science","Machine learning plus wet lab for antibody design","Series B",3,["lonsdale"],"sfbay"],
  ["cellares","Cellares","science","Automated cell therapy manufacturing factories","Series C",4,["lonsdale"],"sfbay"],
  ["cellino","Cellino Bio","science","Laser-guided autonomous stem cell editing","Series B",3,["lonsdale"],"bos"],
  ["latentlabs","Latent Labs","science","Generative models making biology programmable","Series A",2,["lonsdale"],"lon"],
  ["octant","Octant Bio","science","Massively parallel drug discovery via synthetic biology","Series B",3,["lonsdale"],"la"],
  ["integratedbio","Integrated Biosciences","science","Optogenetics and ML for age-related disease drug discovery","Series A",2,["root"],"bos"],
  ["unlearn","Unlearn.AI","science","AI digital twins to shrink clinical trial control arms","Series C",4,["lonsdale"],"sfbay"],
  ["modelmed","Model Medicines","science","Generative chemistry for drug acceleration","Seed",1,["lonsdale"]],
  ["instance","Instance","science","Fastest-route DNA synthesis","Seed",1,["root"]],
  ["digichem","Digichem","science","On-demand custom molecule prototyping and manufacture","Seed",1,["root"]],
  ["cambium","Cambium","science","AI platform for advanced materials discovery","Series A",2,["lonsdale"]],
  ["ntopology","nTop","science","Computational design for complex engineered geometry","Series E",5,["root"],"nyc"],
  ["resilience","Resilience","science","Distributed biopharmaceutical manufacturing capacity","Series E",6,["lonsdale"],"la"],

  /* ---- longevity ---- */
  ["egenesis","eGenesis","longevity","Gene-edited porcine organs for human transplant","Series D",5,["lux"],"bos"],

  /* ---- neuro & health ---- */
  ["wisprflow","Wispr Flow","neuro","Neural and voice interfaces for personal computing","Series B",3,["lonsdale"],"sfbay"],
  ["bodyport","Bodyport","health","Cardiac scale and digital biomarkers for heart failure","Series B",3,["playground"],"sfbay"],
  ["nvision","NVision Imaging","health","Hyperpolarised metabolic MRI for early cancer response","Series B",3,["playground"]],
  ["digitaldx","Digital Diagnostics","health","Autonomous AI diagnostics cleared for clinical use","Series C",4,["lonsdale"]],
  ["pathai","PathAI","health","AI-powered pathology and biomarker discovery","Series C",5,["lonsdale"],"bos"],
  ["virta","Virta Health","health","Clinical reversal of type 2 diabetes","Series E",6,["playground"],"sfbay"],
  ["capstan","Capstan Medical","health","Robotic delivery of heart valve implants","Series C",4,["eclipse"],"sfbay"],

  /* ---- earth systems ---- */
  ["elementzero","Element Zero","earth","Renewable metal production without coal","Series A",2,["playground"]],
  ["redwoodmat","Redwood Materials","earth","Battery recycling and domestic critical materials","Series D",6,["eclipse"],"sfbay"],
  ["ideon","Ideon Technologies","earth","Cosmic-ray muon tomography for subsurface discovery","Series B",3,["playground"],"sea"],
  ["gigacrop","GigaCrop","earth","Enzyme engineering to raise photosynthetic efficiency","Seed",1,["playground"]],
  ["solugen","Solugen","earth","Bio-based chemicals replacing petrochemical processes","Series D",5,["thiel"],"aus"],
  ["wildtype","Wildtype","earth","Cultivated seafood grown from cells","Series B",3,["root"],"sfbay"],
  ["aclarity","Aclarity","earth","Destroying PFAS forever chemicals in water and waste","Series A",2,["dcvc"],"bos"],
  ["agzen","AgZen","earth","Real-time control of pesticide and fertiliser deposition","Series A",2,["dcvc"],"bos"],
  ["skycatch","Skycatch","earth","High-resolution 3D mapping of industrial sites","Series C",4,["root"],"sfbay"],

  /* ---- mobility ---- */
  ["appliedintuition","Applied Intuition","mobility","Physical AI tooling for vehicles, defence and heavy industry","Series F",6,["lux"],"sfbay"],
  ["also","Also","mobility","Light electric vehicles spun out of Rivian","Series B",3,["eclipse"],"la"],
  ["sixwheel","SixWheel","mobility","Autonomy and electrification retrofit for long-haul trucking","Seed",1,["root"]],
  ["trucklabs","TruckLabs","mobility","Aerodynamic devices cutting long-haul fuel burn","Series B",3,["root"],"sfbay"],
  ["nautilus","Nautilus Labs","mobility","Real-time route and fuel optimisation for maritime fleets","Series B",3,["root"],"nyc"],
  ["righthook","Righthook","mobility","Simulation and validation for autonomous vehicles","Series A",2,["root"]],

  /* ---- world models ---- */
  ["runway","Runway","world","Generative video and world simulation for production","Series D",5,["lux"],"nyc"],
  ["latenttech","Latent Technology","world","AI-generated lifelike motion for 3D characters","Seed",1,["root"],"lon"],

  /* ---- frontier ---- */
  /* Sakana AI moved to global.js — the Japan research supplied a valuation and full cap table */
  ["adept","Adept","frontier","Agents that operate software to accomplish real tasks","Series B",3,["root"],"sfbay"],
  ["ai21","AI21 Labs","frontier","Israeli foundation-model lab for reading and writing","Series D",5,["lonsdale"],"tlv"],

  /* ---- AI-native software ---- */
  ["cognition","Cognition","software","Devin, the autonomous AI software engineer","Series C",4,["lux","thiel","lonsdale"],"sfbay"],
  ["huggingface","Hugging Face","software","The open platform for models and datasets","Series D",5,["lux"],"nyc"],
  ["appliedcompute","Applied Compute","software","Custom enterprise-specific reinforcement-learned models","Series A",2,["lux"],"sfbay"],
  ["zed","Zed","software","Native, collaborative, high-performance code editor","Series B",3,["root"],"sfbay"],
  ["vercel","Vercel","software","Frontend cloud and deployment platform","Series F",6,["lonsdale"],"sfbay"],
  ["valsai","Vals AI","software","Independent benchmarking and evaluation of generative models","Seed",1,["lonsdale"]],
  ["structify","Structify","software","Turning unstructured sources into training datasets","Seed",1,["lonsdale"]]
];
