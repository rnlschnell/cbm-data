-- ============================================
-- SEED DATA FOR CANONICAL VALUES
-- Circuit Board Medics - Leads Intelligence Platform
-- ============================================

-- Clear existing data (optional - comment out if you want to preserve existing)
-- TRUNCATE TABLE canonical_values;

-- ============================================
-- AUTOMOTIVE MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
-- Domestic US
('make', 'Chevrolet', ARRAY['Chevy', 'Chev', 'chevy', 'chevrolet'], 'automotive', 1),
('make', 'Ford', ARRAY['ford', 'FORD'], 'automotive', 2),
('make', 'GMC', ARRAY['gmc', 'G.M.C.'], 'automotive', 3),
('make', 'Dodge', ARRAY['dodge', 'DODGE'], 'automotive', 4),
('make', 'Ram', ARRAY['RAM', 'ram', 'Ram Truck', 'Ram Trucks'], 'automotive', 5),
('make', 'Jeep', ARRAY['jeep', 'JEEP'], 'automotive', 6),
('make', 'Chrysler', ARRAY['chrysler', 'Mopar'], 'automotive', 7),
('make', 'Buick', ARRAY['buick', 'BUICK'], 'automotive', 8),
('make', 'Cadillac', ARRAY['cadillac', 'Caddy', 'caddy'], 'automotive', 9),
('make', 'Lincoln', ARRAY['lincoln', 'LINCOLN'], 'automotive', 10),
('make', 'Pontiac', ARRAY['pontiac', 'PONTIAC'], 'automotive', 11),
('make', 'Saturn', ARRAY['saturn', 'SATURN'], 'automotive', 12),
('make', 'Oldsmobile', ARRAY['oldsmobile', 'Olds', 'olds'], 'automotive', 13),
('make', 'Hummer', ARRAY['hummer', 'HUMMER', 'H2', 'H3'], 'automotive', 14),
('make', 'Mercury', ARRAY['mercury', 'MERCURY'], 'automotive', 15),
('make', 'Plymouth', ARRAY['plymouth', 'PLYMOUTH'], 'automotive', 16),

-- Japanese
('make', 'Toyota', ARRAY['toyota', 'TOYOTA'], 'automotive', 20),
('make', 'Honda', ARRAY['honda', 'HONDA'], 'automotive', 21),
('make', 'Nissan', ARRAY['nissan', 'NISSAN', 'Datsun', 'datsun'], 'automotive', 22),
('make', 'Mazda', ARRAY['mazda', 'MAZDA'], 'automotive', 23),
('make', 'Subaru', ARRAY['subaru', 'SUBARU', 'Subie', 'subie'], 'automotive', 24),
('make', 'Mitsubishi', ARRAY['mitsubishi', 'MITSUBISHI', 'Mitsu', 'mitsu'], 'automotive', 25),
('make', 'Suzuki', ARRAY['suzuki', 'SUZUKI'], 'automotive', 26),
('make', 'Isuzu', ARRAY['isuzu', 'ISUZU'], 'automotive', 27),
('make', 'Lexus', ARRAY['lexus', 'LEXUS'], 'automotive', 28),
('make', 'Acura', ARRAY['acura', 'ACURA'], 'automotive', 29),
('make', 'Infiniti', ARRAY['infiniti', 'INFINITI', 'Infinity', 'infinity'], 'automotive', 30),
('make', 'Scion', ARRAY['scion', 'SCION'], 'automotive', 31),

-- Korean
('make', 'Hyundai', ARRAY['hyundai', 'HYUNDAI', 'Hundai', 'hundai'], 'automotive', 35),
('make', 'Kia', ARRAY['kia', 'KIA'], 'automotive', 36),
('make', 'Genesis', ARRAY['genesis', 'GENESIS'], 'automotive', 37),

-- German
('make', 'BMW', ARRAY['bmw', 'Bimmer', 'bimmer', 'Beemer', 'beemer'], 'automotive', 40),
('make', 'Mercedes-Benz', ARRAY['Mercedes', 'mercedes', 'Benz', 'benz', 'MB', 'Merc', 'merc', 'Mercedes Benz'], 'automotive', 41),
('make', 'Volkswagen', ARRAY['VW', 'vw', 'volkswagen', 'Volks'], 'automotive', 42),
('make', 'Audi', ARRAY['audi', 'AUDI'], 'automotive', 43),
('make', 'Porsche', ARRAY['porsche', 'PORSCHE'], 'automotive', 44),
('make', 'Mini', ARRAY['mini', 'MINI', 'Mini Cooper'], 'automotive', 45),

-- European Other
('make', 'Volvo', ARRAY['volvo', 'VOLVO'], 'automotive', 50),
('make', 'Saab', ARRAY['saab', 'SAAB'], 'automotive', 51),
('make', 'Jaguar', ARRAY['jaguar', 'JAGUAR', 'Jag', 'jag'], 'automotive', 52),
('make', 'Land Rover', ARRAY['Land rover', 'land rover', 'LandRover', 'Range Rover', 'range rover', 'Landrover'], 'automotive', 53),
('make', 'Fiat', ARRAY['fiat', 'FIAT'], 'automotive', 54),
('make', 'Alfa Romeo', ARRAY['Alfa', 'alfa romeo', 'alfa'], 'automotive', 55),
('make', 'Maserati', ARRAY['maserati', 'MASERATI'], 'automotive', 56),
('make', 'Ferrari', ARRAY['ferrari', 'FERRARI'], 'automotive', 57),
('make', 'Lamborghini', ARRAY['lamborghini', 'Lambo', 'lambo'], 'automotive', 58),
('make', 'Bentley', ARRAY['bentley', 'BENTLEY'], 'automotive', 59),
('make', 'Rolls-Royce', ARRAY['Rolls Royce', 'rolls royce', 'Rolls', 'rolls'], 'automotive', 60),
('make', 'Aston Martin', ARRAY['Aston', 'aston martin', 'aston'], 'automotive', 61),

-- Heavy Duty / Commercial
('make', 'Freightliner', ARRAY['freightliner', 'FREIGHTLINER', 'Freight Liner'], 'automotive', 70),
('make', 'Kenworth', ARRAY['kenworth', 'KENWORTH', 'KW', 'kw'], 'automotive', 71),
('make', 'Peterbilt', ARRAY['peterbilt', 'PETERBILT', 'Pete', 'pete'], 'automotive', 72),
('make', 'Mack', ARRAY['mack', 'MACK', 'Mack Truck', 'Mack Trucks'], 'automotive', 73),
('make', 'International', ARRAY['international', 'INTERNATIONAL', 'IH', 'Navistar', 'navistar'], 'automotive', 74),
('make', 'Volvo Trucks', ARRAY['Volvo Truck', 'volvo trucks', 'VNL'], 'automotive', 75),
('make', 'Western Star', ARRAY['western star', 'WesternStar'], 'automotive', 76),

-- Diesel Engines
('make', 'Cummins', ARRAY['cummins', 'CUMMINS', 'Cumins', 'cumins'], 'automotive', 80),
('make', 'Duramax', ARRAY['duramax', 'DURAMAX', 'Dura Max', 'dura max'], 'automotive', 81),
('make', 'Powerstroke', ARRAY['powerstroke', 'POWERSTROKE', 'Power Stroke', 'power stroke'], 'automotive', 82),
('make', 'Detroit Diesel', ARRAY['detroit diesel', 'Detroit', 'DD13', 'DD15', 'DD16'], 'automotive', 83),
('make', 'Caterpillar', ARRAY['caterpillar', 'CAT', 'Cat', 'cat'], 'automotive', 84),

-- Equipment / Other
('make', 'John Deere', ARRAY['john deere', 'Deere', 'deere', 'JD', 'jd'], 'automotive', 90),
('make', 'Kubota', ARRAY['kubota', 'KUBOTA'], 'automotive', 91),
('make', 'Case IH', ARRAY['Case', 'case', 'case ih', 'CASE'], 'automotive', 92),
('make', 'New Holland', ARRAY['new holland', 'NewHolland'], 'automotive', 93),
('make', 'Bobcat', ARRAY['bobcat', 'BOBCAT'], 'automotive', 94),

-- Electric Vehicles
('make', 'Tesla', ARRAY['tesla', 'TESLA'], 'automotive', 95),
('make', 'Rivian', ARRAY['rivian', 'RIVIAN'], 'automotive', 96),
('make', 'Lucid', ARRAY['lucid', 'LUCID', 'Lucid Motors'], 'automotive', 97),
('make', 'Polestar', ARRAY['polestar', 'POLESTAR'], 'automotive', 98);

-- ============================================
-- APPLIANCE MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
-- Major Brands
('make', 'Whirlpool', ARRAY['whirlpool', 'WHIRLPOOL'], 'appliance', 100),
('make', 'Maytag', ARRAY['maytag', 'MAYTAG'], 'appliance', 101),
('make', 'KitchenAid', ARRAY['kitchenaid', 'Kitchen Aid', 'kitchen aid', 'KITCHENAID'], 'appliance', 102),
('make', 'GE', ARRAY['ge', 'General Electric', 'general electric', 'GE Appliances', 'GE Profile', 'GE Cafe'], 'appliance', 103),
('make', 'Samsung', ARRAY['samsung', 'SAMSUNG'], 'appliance', 104),
('make', 'LG', ARRAY['lg', 'L.G.', 'LG Electronics'], 'appliance', 105),
('make', 'Frigidaire', ARRAY['frigidaire', 'FRIGIDAIRE', 'Fridgidaire', 'fridgidaire'], 'appliance', 106),
('make', 'Electrolux', ARRAY['electrolux', 'ELECTROLUX'], 'appliance', 107),
('make', 'Kenmore', ARRAY['kenmore', 'KENMORE'], 'appliance', 108),
('make', 'Amana', ARRAY['amana', 'AMANA'], 'appliance', 109),
('make', 'Bosch', ARRAY['bosch', 'BOSCH'], 'appliance', 110),
('make', 'Thermador', ARRAY['thermador', 'THERMADOR'], 'appliance', 111),
('make', 'Sub-Zero', ARRAY['Sub Zero', 'sub zero', 'subzero', 'SubZero', 'SUBZERO'], 'appliance', 112),
('make', 'Wolf', ARRAY['wolf', 'WOLF', 'Wolf Appliances'], 'appliance', 113),
('make', 'Viking', ARRAY['viking', 'VIKING'], 'appliance', 114),
('make', 'Jenn-Air', ARRAY['Jenn Air', 'jenn air', 'jennair', 'JennAir', 'JENNAIR'], 'appliance', 115),
('make', 'Miele', ARRAY['miele', 'MIELE'], 'appliance', 116),
('make', 'Fisher & Paykel', ARRAY['Fisher Paykel', 'fisher paykel', 'F&P'], 'appliance', 117),
('make', 'Dacor', ARRAY['dacor', 'DACOR'], 'appliance', 118),
('make', 'Haier', ARRAY['haier', 'HAIER'], 'appliance', 119),
('make', 'Hotpoint', ARRAY['hotpoint', 'HOTPOINT'], 'appliance', 120),
('make', 'Speed Queen', ARRAY['speed queen', 'SpeedQueen'], 'appliance', 121),
('make', 'Roper', ARRAY['roper', 'ROPER'], 'appliance', 122),
('make', 'Admiral', ARRAY['admiral', 'ADMIRAL'], 'appliance', 123),
('make', 'Magic Chef', ARRAY['magic chef', 'MagicChef'], 'appliance', 124),
('make', 'Crosley', ARRAY['crosley', 'CROSLEY'], 'appliance', 125),
('make', 'Estate', ARRAY['estate', 'ESTATE'], 'appliance', 126),
('make', 'Inglis', ARRAY['inglis', 'INGLIS'], 'appliance', 127),
('make', 'Gaggenau', ARRAY['gaggenau', 'GAGGENAU'], 'appliance', 128),
('make', 'Bertazzoni', ARRAY['bertazzoni', 'BERTAZZONI'], 'appliance', 129),
('make', 'Blomberg', ARRAY['blomberg', 'BLOMBERG'], 'appliance', 130),
('make', 'Asko', ARRAY['asko', 'ASKO'], 'appliance', 131);

-- ============================================
-- MARINE MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Mercury Marine', ARRAY['Mercury', 'mercury', 'Merc', 'merc', 'MERCURY'], 'marine', 150),
('make', 'MerCruiser', ARRAY['Mercruiser', 'mercruiser', 'Mer Cruiser'], 'marine', 151),
('make', 'Yamaha Marine', ARRAY['Yamaha', 'yamaha', 'YAMAHA'], 'marine', 152),
('make', 'Honda Marine', ARRAY['Honda', 'honda marine', 'HONDA'], 'marine', 153),
('make', 'Suzuki Marine', ARRAY['Suzuki', 'suzuki marine', 'SUZUKI'], 'marine', 154),
('make', 'Evinrude', ARRAY['evinrude', 'EVINRUDE', 'E-TEC', 'ETEC'], 'marine', 155),
('make', 'Johnson', ARRAY['johnson', 'JOHNSON', 'Johnson Outboards'], 'marine', 156),
('make', 'Volvo Penta', ARRAY['Volvo penta', 'volvo penta', 'VOLVO PENTA', 'Penta'], 'marine', 157),
('make', 'Tohatsu', ARRAY['tohatsu', 'TOHATSU'], 'marine', 158),
('make', 'Mariner', ARRAY['mariner', 'MARINER'], 'marine', 159),
('make', 'OMC', ARRAY['omc', 'O.M.C.', 'Outboard Marine Corporation'], 'marine', 160),
('make', 'Force', ARRAY['force', 'FORCE', 'Force Outboards'], 'marine', 161),
('make', 'Chrysler Marine', ARRAY['Chrysler marine', 'chrysler marine'], 'marine', 162),
('make', 'Sea-Doo', ARRAY['Sea Doo', 'seadoo', 'SeaDoo', 'SEADOO'], 'marine', 163),
('make', 'Kawasaki Marine', ARRAY['Kawasaki', 'kawasaki', 'Jet Ski'], 'marine', 164),
('make', 'Tracker', ARRAY['tracker', 'TRACKER', 'Tracker Marine'], 'marine', 165),
('make', 'Indmar', ARRAY['indmar', 'INDMAR'], 'marine', 166),
('make', 'PCM Marine', ARRAY['PCM', 'pcm marine', 'Pleasurecraft'], 'marine', 167);

-- ============================================
-- PART TYPES - AUTOMOTIVE ELECTRONICS
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
-- Engine/Powertrain Control
('part_type', 'PCM', ARRAY['pcm', 'Powertrain Control Module', 'powertrain control module', 'Engine Computer', 'engine computer', 'ECU', 'ecu', 'Engine Control Unit', 'engine control unit', 'Main Computer', 'main computer'], 'automotive', 1),
('part_type', 'ECM', ARRAY['ecm', 'Engine Control Module', 'engine control module', 'Engine Controller', 'engine controller'], 'automotive', 2),
('part_type', 'TCM', ARRAY['tcm', 'Transmission Control Module', 'transmission control module', 'Transmission Computer', 'transmission computer', 'Trans Module', 'trans module', 'TCU', 'tcu'], 'automotive', 3),
('part_type', 'BCM', ARRAY['bcm', 'Body Control Module', 'body control module', 'Body Computer', 'body computer', 'Body Controller', 'body controller'], 'automotive', 4),

-- Instrument/Display
('part_type', 'Instrument Cluster', ARRAY['instrument cluster', 'Cluster', 'cluster', 'Gauge Cluster', 'gauge cluster', 'Speedometer', 'speedometer', 'Dash Cluster', 'dash cluster', 'IPC', 'ipc', 'IP Cluster', 'Instrument Panel', 'instrument panel', 'Gauges', 'gauges'], 'automotive', 5),
('part_type', 'Radio', ARRAY['radio', 'Head Unit', 'head unit', 'Stereo', 'stereo', 'Infotainment', 'infotainment', 'Navigation', 'navigation', 'Nav Unit', 'nav unit', 'Audio System', 'audio system', 'CD Player', 'cd player', 'Entertainment System', 'Sync', 'MyLink', 'UConnect', 'uconnect'], 'automotive', 6),
('part_type', 'Amplifier', ARRAY['amplifier', 'Amp', 'amp', 'Audio Amp', 'audio amp', 'Subwoofer Amp', 'subwoofer amp', 'Factory Amp', 'factory amp', 'Bose Amp', 'JBL Amp'], 'automotive', 7),
('part_type', 'Display Screen', ARRAY['display screen', 'Touch Screen', 'touch screen', 'LCD Screen', 'lcd screen', 'Info Display', 'info display', 'Center Display', 'center display', 'Navigation Screen', 'navigation screen'], 'automotive', 8),

-- Safety Systems
('part_type', 'ABS Module', ARRAY['abs module', 'ABS', 'abs', 'Anti-lock Brake Module', 'anti-lock brake module', 'EBCM', 'ebcm', 'Electronic Brake Control Module', 'Brake Module', 'brake module', 'ABS Pump', 'abs pump', 'ABS Controller', 'abs controller'], 'automotive', 10),
('part_type', 'Airbag Module', ARRAY['airbag module', 'SRS Module', 'srs module', 'SRS', 'srs', 'Airbag Computer', 'airbag computer', 'Restraint Module', 'restraint module', 'RCM', 'rcm', 'Airbag Control Module', 'airbag control module', 'Airbag ECU', 'Air Bag Module'], 'automotive', 11),
('part_type', 'Steering Angle Sensor', ARRAY['steering angle sensor', 'SAS', 'sas', 'Steering Sensor', 'steering sensor', 'Clock Spring', 'clock spring', 'Clockspring', 'clockspring'], 'automotive', 12),

-- Climate Control
('part_type', 'HVAC Control Module', ARRAY['hvac control module', 'HVAC Module', 'hvac module', 'Climate Control Module', 'climate control module', 'AC Control', 'ac control', 'Heater Control', 'heater control', 'Climate Control', 'climate control', 'ATC Module', 'atc module', 'DATC', 'datc'], 'automotive', 15),
('part_type', 'Blower Motor Resistor', ARRAY['blower motor resistor', 'Blower Resistor', 'blower resistor', 'Fan Resistor', 'fan resistor', 'Heater Resistor', 'heater resistor'], 'automotive', 16),
('part_type', 'Blend Door Actuator', ARRAY['blend door actuator', 'Blend Door', 'blend door', 'HVAC Actuator', 'hvac actuator', 'Mode Door Actuator', 'mode door actuator', 'Temperature Actuator', 'temperature actuator'], 'automotive', 17),

-- Lighting
('part_type', 'Headlight Module', ARRAY['headlight module', 'HID Module', 'hid module', 'Ballast', 'ballast', 'LED Module', 'led module', 'Headlamp Module', 'headlamp module', 'AFS Module', 'afs module', 'Adaptive Headlight Module'], 'automotive', 20),
('part_type', 'Tail Light Assembly', ARRAY['tail light assembly', 'Tail Light', 'tail light', 'Taillight', 'taillight', 'Tail Lamp', 'tail lamp', 'LED Tail Light', 'led tail light', 'Brake Light', 'brake light'], 'automotive', 21),
('part_type', 'Lighting Control Module', ARRAY['lighting control module', 'LCM', 'lcm', 'Light Module', 'light module', 'Exterior Lighting Module', 'exterior lighting module'], 'automotive', 22),

-- Chrysler/Dodge Specific
('part_type', 'TIPM', ARRAY['tipm', 'Totally Integrated Power Module', 'totally integrated power module', 'Integrated Power Module', 'integrated power module', 'TIPM7', 'tipm7', 'Fuse Box', 'Power Distribution', 'power distribution'], 'automotive', 25),
('part_type', 'WIN Module', ARRAY['win module', 'Wireless Ignition Node', 'wireless ignition node', 'WIN', 'win', 'Ignition Module'], 'automotive', 26),
('part_type', 'SKREEM', ARRAY['skreem', 'Sentry Key Remote Entry Module', 'Sentry Key', 'sentry key', 'SKIM', 'skim'], 'automotive', 27),

-- Ford Specific
('part_type', 'FICM', ARRAY['ficm', 'Fuel Injection Control Module', 'fuel injection control module', 'Injector Driver Module', 'injector driver module', 'IDM', 'idm'], 'automotive', 30),
('part_type', 'PATS Module', ARRAY['pats module', 'Passive Anti-Theft System', 'passive anti-theft system', 'PATS', 'pats', 'Anti-Theft Module', 'anti-theft module'], 'automotive', 31),
('part_type', 'GEM Module', ARRAY['gem module', 'Generic Electronic Module', 'generic electronic module', 'GEM', 'gem'], 'automotive', 32),
('part_type', 'SJB', ARRAY['sjb', 'Smart Junction Box', 'smart junction box', 'Junction Box', 'junction box', 'Fuse Junction Box'], 'automotive', 33),

-- GM Specific
('part_type', 'TAC Module', ARRAY['tac module', 'Throttle Actuator Control', 'throttle actuator control', 'TAC', 'tac', 'Electronic Throttle Control', 'electronic throttle control', 'ETC Module', 'etc module'], 'automotive', 35),
('part_type', 'EBCM', ARRAY['ebcm', 'Electronic Brake Control Module', 'electronic brake control module', 'Brake Control Module', 'brake control module'], 'automotive', 36),
('part_type', 'DIC', ARRAY['dic', 'Driver Information Center', 'driver information center', 'Info Center', 'info center', 'Driver Info Display', 'driver info display'], 'automotive', 37),

-- Other Modules
('part_type', 'Transfer Case Module', ARRAY['transfer case module', 'TCCM', 'tccm', 'Transfer Case Control Module', 'transfer case control module', '4WD Module', '4wd module', 'Four Wheel Drive Module', 'AWD Module', 'awd module'], 'automotive', 40),
('part_type', 'Fuel Pump Driver Module', ARRAY['fuel pump driver module', 'FPDM', 'fpdm', 'Fuel Pump Module', 'fuel pump module', 'Fuel Driver', 'fuel driver'], 'automotive', 41),
('part_type', 'Glow Plug Module', ARRAY['glow plug module', 'Glow Plug Controller', 'glow plug controller', 'GPCM', 'gpcm', 'Glow Plug Control Module', 'glow plug control module', 'Glow Module', 'glow module'], 'automotive', 42),
('part_type', 'Parking Assist Module', ARRAY['parking assist module', 'Park Assist', 'park assist', 'PDC Module', 'pdc module', 'Parking Sensor Module', 'parking sensor module', 'Backup Sensor Module', 'backup sensor module'], 'automotive', 43),
('part_type', 'Blind Spot Module', ARRAY['blind spot module', 'BSM', 'bsm', 'Blind Spot Monitor', 'blind spot monitor', 'BLIS Module', 'blis module', 'Side Radar', 'side radar'], 'automotive', 44),
('part_type', 'Lane Departure Module', ARRAY['lane departure module', 'LDW Module', 'ldw module', 'Lane Keep Assist', 'lane keep assist', 'LKA Module', 'lka module'], 'automotive', 45),
('part_type', 'Adaptive Cruise Module', ARRAY['adaptive cruise module', 'ACC Module', 'acc module', 'Radar Module', 'radar module', 'Cruise Control Module', 'cruise control module', 'Distance Sensor', 'distance sensor'], 'automotive', 46),
('part_type', 'Camera Module', ARRAY['camera module', 'Backup Camera', 'backup camera', 'Rear Camera', 'rear camera', 'Surround View', 'surround view', '360 Camera', '360 camera', 'Front Camera', 'front camera'], 'automotive', 47),
('part_type', 'Seat Module', ARRAY['seat module', 'Seat Control Module', 'seat control module', 'Power Seat Module', 'power seat module', 'Memory Seat Module', 'memory seat module', 'Seat ECU', 'seat ecu'], 'automotive', 48),
('part_type', 'Door Module', ARRAY['door module', 'Door Control Module', 'door control module', 'Window Module', 'window module', 'Door Lock Module', 'door lock module', 'DDM', 'ddm', 'PDM', 'pdm'], 'automotive', 49),
('part_type', 'Mirror Module', ARRAY['mirror module', 'Side Mirror Module', 'side mirror module', 'Auto Dim Mirror', 'auto dim mirror', 'Rearview Mirror', 'rearview mirror'], 'automotive', 50),
('part_type', 'Sunroof Module', ARRAY['sunroof module', 'Moonroof Module', 'moonroof module', 'Roof Module', 'roof module'], 'automotive', 51),
('part_type', 'Liftgate Module', ARRAY['liftgate module', 'Tailgate Module', 'tailgate module', 'Power Liftgate', 'power liftgate', 'Hatch Module', 'hatch module'], 'automotive', 52),
('part_type', 'Steering Column Module', ARRAY['steering column module', 'Column Module', 'column module', 'Tilt Telescope Module', 'tilt telescope module', 'CIM', 'cim'], 'automotive', 53),
('part_type', 'Key Fob', ARRAY['key fob', 'Remote', 'remote', 'Keyless Entry', 'keyless entry', 'Smart Key', 'smart key', 'Proximity Key', 'proximity key', 'Key Remote', 'key remote'], 'automotive', 54),
('part_type', 'Immobilizer', ARRAY['immobilizer', 'Immobiliser', 'immobiliser', 'Anti-Theft', 'anti-theft', 'Security Module', 'security module', 'Transponder', 'transponder'], 'automotive', 55),
('part_type', 'Ignition Switch', ARRAY['ignition switch', 'Ignition', 'ignition', 'Key Switch', 'key switch', 'Start Switch', 'start switch', 'Ignition Lock', 'ignition lock'], 'automotive', 56),
('part_type', 'Starter', ARRAY['starter', 'Starter Motor', 'starter motor', 'Starting Motor', 'starting motor'], 'automotive', 57),
('part_type', 'Alternator', ARRAY['alternator', 'Generator', 'generator', 'Alt', 'alt', 'Charging System', 'charging system'], 'automotive', 58),
('part_type', 'Throttle Body', ARRAY['throttle body', 'TB', 'tb', 'Electronic Throttle Body', 'electronic throttle body', 'ETB', 'etb', 'Throttle', 'throttle'], 'automotive', 59),
('part_type', 'Fuel Injector', ARRAY['fuel injector', 'Injector', 'injector', 'Fuel Injectors', 'fuel injectors', 'Injectors', 'injectors'], 'automotive', 60),
('part_type', 'Turbo Actuator', ARRAY['turbo actuator', 'Turbo', 'turbo', 'Turbocharger Actuator', 'turbocharger actuator', 'VGT Actuator', 'vgt actuator', 'Wastegate Actuator', 'wastegate actuator'], 'automotive', 61),
('part_type', 'EGR Valve', ARRAY['egr valve', 'EGR', 'egr', 'Exhaust Gas Recirculation', 'exhaust gas recirculation'], 'automotive', 62),
('part_type', 'DEF Module', ARRAY['def module', 'SCR Module', 'scr module', 'Urea Module', 'urea module', 'DEF Pump', 'def pump', 'AdBlue Module', 'adblue module', 'Diesel Exhaust Fluid', 'diesel exhaust fluid'], 'automotive', 63),
('part_type', 'DPF Module', ARRAY['dpf module', 'Diesel Particulate Filter', 'diesel particulate filter', 'DPF', 'dpf', 'Soot Sensor', 'soot sensor'], 'automotive', 64);

-- ============================================
-- PART TYPES - APPLIANCE ELECTRONICS
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('part_type', 'Control Board', ARRAY['control board', 'Main Board', 'main board', 'Motherboard', 'motherboard', 'Main Control', 'main control', 'Electronic Control Board', 'electronic control board', 'PCB', 'pcb', 'Circuit Board', 'circuit board', 'Main Control Board', 'main control board'], 'appliance', 100),
('part_type', 'Display Board', ARRAY['display board', 'UI Board', 'ui board', 'User Interface Board', 'user interface board', 'Interface Board', 'interface board', 'Control Panel', 'control panel', 'Touchpad', 'touchpad', 'Display Control', 'display control'], 'appliance', 101),
('part_type', 'Power Board', ARRAY['power board', 'Power Supply Board', 'power supply board', 'PSU Board', 'psu board', 'Power Control Board', 'power control board', 'Power Module', 'power module'], 'appliance', 102),
('part_type', 'Inverter Board', ARRAY['inverter board', 'Inverter', 'inverter', 'VFD', 'vfd', 'Variable Frequency Drive', 'variable frequency drive', 'Motor Inverter', 'motor inverter', 'Compressor Inverter', 'compressor inverter'], 'appliance', 103),
('part_type', 'Motor Control Board', ARRAY['motor control board', 'Motor Board', 'motor board', 'MCU Board', 'mcu board', 'Motor Controller', 'motor controller'], 'appliance', 104),
('part_type', 'Relay Board', ARRAY['relay board', 'Relay Control Board', 'relay control board', 'Power Relay Board', 'power relay board'], 'appliance', 105),
('part_type', 'Timer', ARRAY['timer', 'Mechanical Timer', 'mechanical timer', 'Electronic Timer', 'electronic timer', 'Cycle Timer', 'cycle timer'], 'appliance', 106),
('part_type', 'Thermostat', ARRAY['thermostat', 'Temperature Control', 'temperature control', 'Temp Control', 'temp control', 'Defrost Thermostat', 'defrost thermostat'], 'appliance', 107),
('part_type', 'Temperature Sensor', ARRAY['temperature sensor', 'Temp Sensor', 'temp sensor', 'Thermistor', 'thermistor', 'NTC Sensor', 'ntc sensor', 'RTD', 'rtd'], 'appliance', 108),
('part_type', 'Ice Maker', ARRAY['ice maker', 'Icemaker', 'icemaker', 'Ice Maker Assembly', 'ice maker assembly', 'Ice Machine', 'ice machine', 'Ice Maker Module', 'ice maker module'], 'appliance', 109),
('part_type', 'Compressor', ARRAY['compressor', 'Refrigerator Compressor', 'refrigerator compressor', 'AC Compressor', 'ac compressor', 'Compressor Assembly', 'compressor assembly'], 'appliance', 110),
('part_type', 'Dispenser Control Board', ARRAY['dispenser control board', 'Dispenser Board', 'dispenser board', 'Water Dispenser Board', 'water dispenser board', 'Ice Dispenser Board', 'ice dispenser board'], 'appliance', 111),
('part_type', 'Washer Control Board', ARRAY['washer control board', 'Washer Board', 'washer board', 'Washing Machine Board', 'washing machine board', 'Laundry Control Board', 'laundry control board'], 'appliance', 112),
('part_type', 'Dryer Control Board', ARRAY['dryer control board', 'Dryer Board', 'dryer board', 'Dryer Main Board', 'dryer main board'], 'appliance', 113),
('part_type', 'Dishwasher Control Board', ARRAY['dishwasher control board', 'Dishwasher Board', 'dishwasher board', 'Dishwasher Main Board', 'dishwasher main board'], 'appliance', 114),
('part_type', 'Range Control Board', ARRAY['range control board', 'Oven Control Board', 'oven control board', 'Stove Control Board', 'stove control board', 'Range Board', 'range board', 'Oven Board', 'oven board', 'ERC', 'erc', 'Electronic Range Control', 'electronic range control'], 'appliance', 115),
('part_type', 'Refrigerator Control Board', ARRAY['refrigerator control board', 'Fridge Control Board', 'fridge control board', 'Refrigerator Board', 'refrigerator board', 'Fridge Board', 'fridge board', 'Adaptive Defrost Board', 'adaptive defrost board'], 'appliance', 116),
('part_type', 'Microwave Control Board', ARRAY['microwave control board', 'Microwave Board', 'microwave board', 'Microwave Main Board', 'microwave main board'], 'appliance', 117);

-- ============================================
-- PART TYPES - MARINE ELECTRONICS
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('part_type', 'Marine ECU', ARRAY['marine ecu', 'Outboard ECU', 'outboard ecu', 'Boat ECU', 'boat ecu', 'Marine Engine Computer', 'marine engine computer', 'Outboard Computer', 'outboard computer'], 'marine', 150),
('part_type', 'Marine Gauge Cluster', ARRAY['marine gauge cluster', 'Boat Gauges', 'boat gauges', 'Marine Gauges', 'marine gauges', 'Outboard Gauges', 'outboard gauges', 'Marine Instrument Cluster', 'marine instrument cluster', 'SmartCraft Gauges', 'smartcraft gauges', 'VesselView', 'vesselview'], 'marine', 151),
('part_type', 'Tilt Trim Module', ARRAY['tilt trim module', 'Tilt Trim', 'tilt trim', 'Power Trim Module', 'power trim module', 'Trim Module', 'trim module', 'PTT Module', 'ptt module', 'Tilt Motor', 'tilt motor'], 'marine', 152),
('part_type', 'Marine Ignition Module', ARRAY['marine ignition module', 'Outboard Ignition', 'outboard ignition', 'Ignition Pack', 'ignition pack', 'Switch Box', 'switch box', 'Power Pack', 'power pack'], 'marine', 153),
('part_type', 'CDI Unit', ARRAY['cdi unit', 'CDI', 'cdi', 'Capacitor Discharge Ignition', 'capacitor discharge ignition', 'CDI Box', 'cdi box', 'Ignition CDI', 'ignition cdi'], 'marine', 154),
('part_type', 'Stator', ARRAY['stator', 'Marine Stator', 'marine stator', 'Outboard Stator', 'outboard stator', 'Charging Stator', 'charging stator'], 'marine', 155),
('part_type', 'Rectifier', ARRAY['rectifier', 'Voltage Regulator', 'voltage regulator', 'Regulator Rectifier', 'regulator rectifier', 'Marine Rectifier', 'marine rectifier'], 'marine', 156),
('part_type', 'Fuel Injector Driver', ARRAY['fuel injector driver', 'EMM', 'emm', 'Engine Management Module', 'engine management module', 'Injector Driver', 'injector driver'], 'marine', 157),
('part_type', 'Shift Module', ARRAY['shift module', 'Shift Actuator', 'shift actuator', 'Shift Interrupt Switch', 'shift interrupt switch', 'DTS Module', 'dts module'], 'marine', 158),
('part_type', 'Marine Stereo', ARRAY['marine stereo', 'Boat Stereo', 'boat stereo', 'Marine Radio', 'marine radio', 'Marine Head Unit', 'marine head unit'], 'marine', 159),
('part_type', 'Depth Finder', ARRAY['depth finder', 'Fish Finder', 'fish finder', 'Sonar', 'sonar', 'Depth Sounder', 'depth sounder', 'Marine Sonar', 'marine sonar'], 'marine', 160),
('part_type', 'GPS Chartplotter', ARRAY['gps chartplotter', 'Chartplotter', 'chartplotter', 'Marine GPS', 'marine gps', 'Navigation System', 'navigation system', 'MFD', 'mfd', 'Multi Function Display', 'multi function display'], 'marine', 161),
('part_type', 'VHF Radio', ARRAY['vhf radio', 'VHF', 'vhf', 'Marine VHF', 'marine vhf', 'Marine Radio', 'marine radio', 'Ship Radio', 'ship radio'], 'marine', 162);

-- ============================================
-- COMMON MODELS (Most Requested)
-- ============================================

-- Ford Models
INSERT INTO canonical_values (type, name, aliases, category, parent_value, display_order) VALUES
('model', 'F-150', ARRAY['F150', 'f150', 'f-150', 'F 150'], 'automotive', 'Ford', 1),
('model', 'F-250', ARRAY['F250', 'f250', 'f-250', 'F 250', 'Super Duty'], 'automotive', 'Ford', 2),
('model', 'F-350', ARRAY['F350', 'f350', 'f-350', 'F 350', 'Super Duty'], 'automotive', 'Ford', 3),
('model', 'F-450', ARRAY['F450', 'f450', 'f-450', 'F 450'], 'automotive', 'Ford', 4),
('model', 'F-550', ARRAY['F550', 'f550', 'f-550', 'F 550'], 'automotive', 'Ford', 5),
('model', 'Mustang', ARRAY['mustang', 'MUSTANG', 'Stang'], 'automotive', 'Ford', 6),
('model', 'Explorer', ARRAY['explorer', 'EXPLORER'], 'automotive', 'Ford', 7),
('model', 'Expedition', ARRAY['expedition', 'EXPEDITION'], 'automotive', 'Ford', 8),
('model', 'Escape', ARRAY['escape', 'ESCAPE'], 'automotive', 'Ford', 9),
('model', 'Edge', ARRAY['edge', 'EDGE'], 'automotive', 'Ford', 10),
('model', 'Fusion', ARRAY['fusion', 'FUSION'], 'automotive', 'Ford', 11),
('model', 'Focus', ARRAY['focus', 'FOCUS'], 'automotive', 'Ford', 12),
('model', 'Ranger', ARRAY['ranger', 'RANGER'], 'automotive', 'Ford', 13),
('model', 'Bronco', ARRAY['bronco', 'BRONCO'], 'automotive', 'Ford', 14),
('model', 'Transit', ARRAY['transit', 'TRANSIT', 'Transit Van'], 'automotive', 'Ford', 15),
('model', 'E-Series', ARRAY['E-150', 'E-250', 'E-350', 'E150', 'E250', 'E350', 'Econoline', 'E Series'], 'automotive', 'Ford', 16),
('model', 'Excursion', ARRAY['excursion', 'EXCURSION'], 'automotive', 'Ford', 17),
('model', 'Taurus', ARRAY['taurus', 'TAURUS'], 'automotive', 'Ford', 18),
('model', 'Crown Victoria', ARRAY['Crown Vic', 'crown victoria', 'crown vic', 'CV'], 'automotive', 'Ford', 19),

-- Chevrolet Models
('model', 'Silverado', ARRAY['silverado', 'SILVERADO', 'Silverado 1500', 'Silverado 2500', 'Silverado 3500'], 'automotive', 'Chevrolet', 20),
('model', 'Tahoe', ARRAY['tahoe', 'TAHOE'], 'automotive', 'Chevrolet', 21),
('model', 'Suburban', ARRAY['suburban', 'SUBURBAN', 'Burban'], 'automotive', 'Chevrolet', 22),
('model', 'Equinox', ARRAY['equinox', 'EQUINOX'], 'automotive', 'Chevrolet', 23),
('model', 'Traverse', ARRAY['traverse', 'TRAVERSE'], 'automotive', 'Chevrolet', 24),
('model', 'Colorado', ARRAY['colorado', 'COLORADO'], 'automotive', 'Chevrolet', 25),
('model', 'Camaro', ARRAY['camaro', 'CAMARO'], 'automotive', 'Chevrolet', 26),
('model', 'Corvette', ARRAY['corvette', 'CORVETTE', 'Vette', 'vette'], 'automotive', 'Chevrolet', 27),
('model', 'Malibu', ARRAY['malibu', 'MALIBU'], 'automotive', 'Chevrolet', 28),
('model', 'Impala', ARRAY['impala', 'IMPALA'], 'automotive', 'Chevrolet', 29),
('model', 'Cruze', ARRAY['cruze', 'CRUZE'], 'automotive', 'Chevrolet', 30),
('model', 'Trailblazer', ARRAY['trailblazer', 'TRAILBLAZER', 'Trail Blazer'], 'automotive', 'Chevrolet', 31),
('model', 'Avalanche', ARRAY['avalanche', 'AVALANCHE'], 'automotive', 'Chevrolet', 32),
('model', 'Express', ARRAY['express', 'EXPRESS', 'Express Van'], 'automotive', 'Chevrolet', 33),
('model', 'Spark', ARRAY['spark', 'SPARK'], 'automotive', 'Chevrolet', 34),
('model', 'Bolt', ARRAY['bolt', 'BOLT', 'Bolt EV', 'Bolt EUV'], 'automotive', 'Chevrolet', 35),

-- GMC Models
('model', 'Sierra', ARRAY['sierra', 'SIERRA', 'Sierra 1500', 'Sierra 2500', 'Sierra 3500'], 'automotive', 'GMC', 40),
('model', 'Yukon', ARRAY['yukon', 'YUKON', 'Yukon XL', 'Yukon Denali'], 'automotive', 'GMC', 41),
('model', 'Acadia', ARRAY['acadia', 'ACADIA'], 'automotive', 'GMC', 42),
('model', 'Terrain', ARRAY['terrain', 'TERRAIN'], 'automotive', 'GMC', 43),
('model', 'Canyon', ARRAY['canyon', 'CANYON'], 'automotive', 'GMC', 44),
('model', 'Savana', ARRAY['savana', 'SAVANA', 'Savana Van'], 'automotive', 'GMC', 45),
('model', 'Envoy', ARRAY['envoy', 'ENVOY'], 'automotive', 'GMC', 46),

-- Dodge/Ram Models
('model', '1500', ARRAY['Ram 1500', 'ram 1500', 'RAM 1500'], 'automotive', 'Ram', 50),
('model', '2500', ARRAY['Ram 2500', 'ram 2500', 'RAM 2500'], 'automotive', 'Ram', 51),
('model', '3500', ARRAY['Ram 3500', 'ram 3500', 'RAM 3500'], 'automotive', 'Ram', 52),
('model', 'Charger', ARRAY['charger', 'CHARGER'], 'automotive', 'Dodge', 53),
('model', 'Challenger', ARRAY['challenger', 'CHALLENGER'], 'automotive', 'Dodge', 54),
('model', 'Durango', ARRAY['durango', 'DURANGO'], 'automotive', 'Dodge', 55),
('model', 'Journey', ARRAY['journey', 'JOURNEY'], 'automotive', 'Dodge', 56),
('model', 'Grand Caravan', ARRAY['grand caravan', 'Caravan', 'caravan', 'GRAND CARAVAN'], 'automotive', 'Dodge', 57),
('model', 'Dakota', ARRAY['dakota', 'DAKOTA'], 'automotive', 'Dodge', 58),

-- Jeep Models
('model', 'Wrangler', ARRAY['wrangler', 'WRANGLER', 'JK', 'JL', 'TJ', 'YJ'], 'automotive', 'Jeep', 60),
('model', 'Grand Cherokee', ARRAY['grand cherokee', 'GRAND CHEROKEE', 'GC', 'WK', 'WK2', 'WL'], 'automotive', 'Jeep', 61),
('model', 'Cherokee', ARRAY['cherokee', 'CHEROKEE', 'KL', 'XJ'], 'automotive', 'Jeep', 62),
('model', 'Compass', ARRAY['compass', 'COMPASS'], 'automotive', 'Jeep', 63),
('model', 'Patriot', ARRAY['patriot', 'PATRIOT'], 'automotive', 'Jeep', 64),
('model', 'Liberty', ARRAY['liberty', 'LIBERTY', 'KJ', 'KK'], 'automotive', 'Jeep', 65),
('model', 'Gladiator', ARRAY['gladiator', 'GLADIATOR', 'JT'], 'automotive', 'Jeep', 66),
('model', 'Commander', ARRAY['commander', 'COMMANDER', 'XK'], 'automotive', 'Jeep', 67),

-- Toyota Models
('model', 'Camry', ARRAY['camry', 'CAMRY'], 'automotive', 'Toyota', 70),
('model', 'Corolla', ARRAY['corolla', 'COROLLA'], 'automotive', 'Toyota', 71),
('model', 'RAV4', ARRAY['rav4', 'RAV 4', 'Rav4', 'rav 4'], 'automotive', 'Toyota', 72),
('model', 'Tacoma', ARRAY['tacoma', 'TACOMA'], 'automotive', 'Toyota', 73),
('model', 'Tundra', ARRAY['tundra', 'TUNDRA'], 'automotive', 'Toyota', 74),
('model', 'Highlander', ARRAY['highlander', 'HIGHLANDER'], 'automotive', 'Toyota', 75),
('model', '4Runner', ARRAY['4runner', '4 Runner', 'Four Runner', 'FOURRUNNER'], 'automotive', 'Toyota', 76),
('model', 'Prius', ARRAY['prius', 'PRIUS'], 'automotive', 'Toyota', 77),
('model', 'Sienna', ARRAY['sienna', 'SIENNA'], 'automotive', 'Toyota', 78),
('model', 'Sequoia', ARRAY['sequoia', 'SEQUOIA'], 'automotive', 'Toyota', 79),
('model', 'Land Cruiser', ARRAY['land cruiser', 'LAND CRUISER', 'LandCruiser'], 'automotive', 'Toyota', 80),
('model', 'Avalon', ARRAY['avalon', 'AVALON'], 'automotive', 'Toyota', 81),

-- Honda Models
('model', 'Civic', ARRAY['civic', 'CIVIC'], 'automotive', 'Honda', 85),
('model', 'Accord', ARRAY['accord', 'ACCORD'], 'automotive', 'Honda', 86),
('model', 'CR-V', ARRAY['CRV', 'crv', 'cr-v', 'CR V'], 'automotive', 'Honda', 87),
('model', 'Pilot', ARRAY['pilot', 'PILOT'], 'automotive', 'Honda', 88),
('model', 'Odyssey', ARRAY['odyssey', 'ODYSSEY'], 'automotive', 'Honda', 89),
('model', 'HR-V', ARRAY['HRV', 'hrv', 'hr-v', 'HR V'], 'automotive', 'Honda', 90),
('model', 'Ridgeline', ARRAY['ridgeline', 'RIDGELINE'], 'automotive', 'Honda', 91),
('model', 'Passport', ARRAY['passport', 'PASSPORT'], 'automotive', 'Honda', 92),
('model', 'Fit', ARRAY['fit', 'FIT'], 'automotive', 'Honda', 93),
('model', 'Element', ARRAY['element', 'ELEMENT'], 'automotive', 'Honda', 94),

-- Nissan Models
('model', 'Altima', ARRAY['altima', 'ALTIMA'], 'automotive', 'Nissan', 100),
('model', 'Rogue', ARRAY['rogue', 'ROGUE'], 'automotive', 'Nissan', 101),
('model', 'Sentra', ARRAY['sentra', 'SENTRA'], 'automotive', 'Nissan', 102),
('model', 'Pathfinder', ARRAY['pathfinder', 'PATHFINDER'], 'automotive', 'Nissan', 103),
('model', 'Frontier', ARRAY['frontier', 'FRONTIER'], 'automotive', 'Nissan', 104),
('model', 'Titan', ARRAY['titan', 'TITAN'], 'automotive', 'Nissan', 105),
('model', 'Maxima', ARRAY['maxima', 'MAXIMA'], 'automotive', 'Nissan', 106),
('model', 'Murano', ARRAY['murano', 'MURANO'], 'automotive', 'Nissan', 107),
('model', 'Armada', ARRAY['armada', 'ARMADA'], 'automotive', 'Nissan', 108),
('model', '350Z', ARRAY['350z', '350 Z', 'Z'], 'automotive', 'Nissan', 109),
('model', '370Z', ARRAY['370z', '370 Z'], 'automotive', 'Nissan', 110),
('model', 'GT-R', ARRAY['GTR', 'gtr', 'gt-r', 'GT R'], 'automotive', 'Nissan', 111),

-- BMW Models
('model', '3 Series', ARRAY['3 series', '3-Series', '3-series', '318', '320', '325', '328', '330', '335', '340', 'E36', 'E46', 'E90', 'F30', 'G20'], 'automotive', 'BMW', 115),
('model', '5 Series', ARRAY['5 series', '5-Series', '5-series', '525', '528', '530', '535', '540', '545', '550', 'E39', 'E60', 'F10', 'G30'], 'automotive', 'BMW', 116),
('model', '7 Series', ARRAY['7 series', '7-Series', '7-series', '740', '745', '750', '760', 'E38', 'E65', 'F01', 'G11'], 'automotive', 'BMW', 117),
('model', 'X3', ARRAY['x3', 'X 3'], 'automotive', 'BMW', 118),
('model', 'X5', ARRAY['x5', 'X 5', 'E53', 'E70', 'F15', 'G05'], 'automotive', 'BMW', 119),
('model', 'X7', ARRAY['x7', 'X 7'], 'automotive', 'BMW', 120),

-- Mercedes-Benz Models
('model', 'C-Class', ARRAY['C Class', 'c class', 'C-class', 'C180', 'C200', 'C230', 'C250', 'C280', 'C300', 'C320', 'C350', 'C400', 'C450', 'C63', 'W202', 'W203', 'W204', 'W205'], 'automotive', 'Mercedes-Benz', 125),
('model', 'E-Class', ARRAY['E Class', 'e class', 'E-class', 'E300', 'E320', 'E350', 'E400', 'E450', 'E500', 'E550', 'E63', 'W210', 'W211', 'W212', 'W213'], 'automotive', 'Mercedes-Benz', 126),
('model', 'S-Class', ARRAY['S Class', 's class', 'S-class', 'S430', 'S500', 'S550', 'S560', 'S600', 'S63', 'S65', 'W220', 'W221', 'W222', 'W223'], 'automotive', 'Mercedes-Benz', 127),
('model', 'GLE', ARRAY['gle', 'GLE350', 'GLE450', 'GLE580', 'GLE63', 'ML350', 'ML500', 'ML550', 'ML63', 'M Class', 'M-Class', 'W164', 'W166'], 'automotive', 'Mercedes-Benz', 128),
('model', 'GLC', ARRAY['glc', 'GLC300', 'GLC350', 'GLC43', 'GLC63', 'GLK', 'GLK350'], 'automotive', 'Mercedes-Benz', 129),
('model', 'GLS', ARRAY['gls', 'GLS450', 'GLS550', 'GLS580', 'GLS63', 'GL350', 'GL450', 'GL550', 'GL63', 'GL Class', 'GL-Class', 'X164', 'X166'], 'automotive', 'Mercedes-Benz', 130),

-- Hyundai Models
('model', 'Elantra', ARRAY['elantra', 'ELANTRA'], 'automotive', 'Hyundai', 135),
('model', 'Sonata', ARRAY['sonata', 'SONATA'], 'automotive', 'Hyundai', 136),
('model', 'Tucson', ARRAY['tucson', 'TUCSON'], 'automotive', 'Hyundai', 137),
('model', 'Santa Fe', ARRAY['santa fe', 'SANTA FE', 'SantaFe'], 'automotive', 'Hyundai', 138),
('model', 'Palisade', ARRAY['palisade', 'PALISADE'], 'automotive', 'Hyundai', 139),
('model', 'Kona', ARRAY['kona', 'KONA'], 'automotive', 'Hyundai', 140),

-- Kia Models
('model', 'Optima', ARRAY['optima', 'OPTIMA'], 'automotive', 'Kia', 145),
('model', 'K5', ARRAY['k5', 'K 5'], 'automotive', 'Kia', 146),
('model', 'Sorento', ARRAY['sorento', 'SORENTO'], 'automotive', 'Kia', 147),
('model', 'Sportage', ARRAY['sportage', 'SPORTAGE'], 'automotive', 'Kia', 148),
('model', 'Telluride', ARRAY['telluride', 'TELLURIDE'], 'automotive', 'Kia', 149),
('model', 'Soul', ARRAY['soul', 'SOUL'], 'automotive', 'Kia', 150),
('model', 'Forte', ARRAY['forte', 'FORTE'], 'automotive', 'Kia', 151);

-- ============================================
-- VERIFICATION QUERY
-- ============================================

-- Run this to verify the data was inserted correctly:
-- SELECT type, COUNT(*) as count FROM canonical_values GROUP BY type ORDER BY type;
