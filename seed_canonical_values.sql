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
('make', 'Chevrolet', ARRAY['Chevy', 'Chev'], 'automotive', 1),
('make', 'Ford', ARRAY[]::TEXT[], 'automotive', 2),
('make', 'GMC', ARRAY['G.M.C.'], 'automotive', 3),
('make', 'Dodge', ARRAY[]::TEXT[], 'automotive', 4),
('make', 'Ram', ARRAY['Ram Truck', 'Ram Trucks'], 'automotive', 5),
('make', 'Jeep', ARRAY[]::TEXT[], 'automotive', 6),
('make', 'Chrysler', ARRAY['Mopar'], 'automotive', 7),
('make', 'Buick', ARRAY[]::TEXT[], 'automotive', 8),
('make', 'Cadillac', ARRAY['Caddy'], 'automotive', 9),
('make', 'Lincoln', ARRAY[]::TEXT[], 'automotive', 10),
('make', 'Pontiac', ARRAY[]::TEXT[], 'automotive', 11),
('make', 'Saturn', ARRAY[]::TEXT[], 'automotive', 12),
('make', 'Oldsmobile', ARRAY['Olds'], 'automotive', 13),
('make', 'Hummer', ARRAY['H2', 'H3'], 'automotive', 14),
('make', 'Mercury', ARRAY[]::TEXT[], 'automotive', 15),
('make', 'Plymouth', ARRAY[]::TEXT[], 'automotive', 16),

-- Japanese
('make', 'Toyota', ARRAY[]::TEXT[], 'automotive', 20),
('make', 'Honda', ARRAY[]::TEXT[], 'automotive', 21),
('make', 'Nissan', ARRAY['Datsun'], 'automotive', 22),
('make', 'Mazda', ARRAY[]::TEXT[], 'automotive', 23),
('make', 'Subaru', ARRAY['Subie'], 'automotive', 24),
('make', 'Mitsubishi', ARRAY['Mitsu'], 'automotive', 25),
('make', 'Suzuki', ARRAY[]::TEXT[], 'automotive', 26),
('make', 'Isuzu', ARRAY[]::TEXT[], 'automotive', 27),
('make', 'Lexus', ARRAY[]::TEXT[], 'automotive', 28),
('make', 'Acura', ARRAY[]::TEXT[], 'automotive', 29),
('make', 'Infiniti', ARRAY['Infinity'], 'automotive', 30),
('make', 'Scion', ARRAY[]::TEXT[], 'automotive', 31),

-- Korean
('make', 'Hyundai', ARRAY['Hundai'], 'automotive', 35),
('make', 'Kia', ARRAY[]::TEXT[], 'automotive', 36),
('make', 'Genesis', ARRAY[]::TEXT[], 'automotive', 37),

-- German
('make', 'BMW', ARRAY['Bimmer', 'Beemer'], 'automotive', 40),
('make', 'Mercedes-Benz', ARRAY['Mercedes', 'Benz', 'MB', 'Merc', 'Mercedes Benz'], 'automotive', 41),
('make', 'Volkswagen', ARRAY['VW', 'Volks'], 'automotive', 42),
('make', 'Audi', ARRAY[]::TEXT[], 'automotive', 43),
('make', 'Porsche', ARRAY[]::TEXT[], 'automotive', 44),
('make', 'Mini', ARRAY['Mini Cooper'], 'automotive', 45),

-- European Other
('make', 'Volvo', ARRAY[]::TEXT[], 'automotive', 50),
('make', 'Saab', ARRAY[]::TEXT[], 'automotive', 51),
('make', 'Jaguar', ARRAY['Jag'], 'automotive', 52),
('make', 'Land Rover', ARRAY['LandRover', 'Range Rover', 'Landrover'], 'automotive', 53),
('make', 'Fiat', ARRAY[]::TEXT[], 'automotive', 54),
('make', 'Alfa Romeo', ARRAY['Alfa'], 'automotive', 55),
('make', 'Maserati', ARRAY[]::TEXT[], 'automotive', 56),
('make', 'Ferrari', ARRAY[]::TEXT[], 'automotive', 57),
('make', 'Lamborghini', ARRAY['Lambo'], 'automotive', 58),
('make', 'Bentley', ARRAY[]::TEXT[], 'automotive', 59),
('make', 'Rolls-Royce', ARRAY['Rolls Royce', 'Rolls'], 'automotive', 60),
('make', 'Aston Martin', ARRAY['Aston'], 'automotive', 61),

-- Heavy Duty / Commercial
('make', 'Freightliner', ARRAY['Freight Liner'], 'automotive', 70),
('make', 'Kenworth', ARRAY['KW'], 'automotive', 71),
('make', 'Peterbilt', ARRAY['Pete'], 'automotive', 72),
('make', 'Mack', ARRAY['Mack Truck', 'Mack Trucks'], 'automotive', 73),
('make', 'International', ARRAY['IH', 'Navistar'], 'automotive', 74),
('make', 'Volvo Trucks', ARRAY['Volvo Truck', 'VNL'], 'automotive', 75),
('make', 'Western Star', ARRAY['WesternStar'], 'automotive', 76),

-- Diesel Engines
('make', 'Cummins', ARRAY['Cumins'], 'automotive', 80),
('make', 'Duramax', ARRAY['Dura Max'], 'automotive', 81),
('make', 'Powerstroke', ARRAY['Power Stroke'], 'automotive', 82),
('make', 'Detroit Diesel', ARRAY['Detroit', 'DD13', 'DD15', 'DD16'], 'automotive', 83),
('make', 'Caterpillar', ARRAY['CAT', 'Cat'], 'automotive', 84),

-- Equipment / Other
('make', 'John Deere', ARRAY['Deere', 'JD'], 'automotive', 90),
('make', 'Kubota', ARRAY[]::TEXT[], 'automotive', 91),
('make', 'Case IH', ARRAY['Case'], 'automotive', 92),
('make', 'New Holland', ARRAY['NewHolland'], 'automotive', 93),
('make', 'Bobcat', ARRAY[]::TEXT[], 'automotive', 94),

-- Electric Vehicles
('make', 'Tesla', ARRAY[]::TEXT[], 'automotive', 95),
('make', 'Rivian', ARRAY[]::TEXT[], 'automotive', 96),
('make', 'Lucid', ARRAY['Lucid Motors'], 'automotive', 97),
('make', 'Polestar', ARRAY[]::TEXT[], 'automotive', 98);

-- ============================================
-- APPLIANCE MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
-- Major Brands
('make', 'Whirlpool', ARRAY[]::TEXT[], 'appliance', 100),
('make', 'Maytag', ARRAY[]::TEXT[], 'appliance', 101),
('make', 'KitchenAid', ARRAY['Kitchen Aid'], 'appliance', 102),
('make', 'GE', ARRAY['General Electric', 'GE Appliances', 'GE Profile', 'GE Cafe'], 'appliance', 103),
('make', 'Samsung', ARRAY[]::TEXT[], 'appliance', 104),
('make', 'LG', ARRAY['L.G.', 'LG Electronics'], 'appliance', 105),
('make', 'Frigidaire', ARRAY['Fridgidaire'], 'appliance', 106),
('make', 'Electrolux', ARRAY[]::TEXT[], 'appliance', 107),
('make', 'Kenmore', ARRAY[]::TEXT[], 'appliance', 108),
('make', 'Amana', ARRAY[]::TEXT[], 'appliance', 109),
('make', 'Bosch', ARRAY[]::TEXT[], 'appliance', 110),
('make', 'Thermador', ARRAY[]::TEXT[], 'appliance', 111),
('make', 'Sub-Zero', ARRAY['Sub Zero', 'SubZero'], 'appliance', 112),
('make', 'Wolf', ARRAY['Wolf Appliances'], 'appliance', 113),
('make', 'Viking', ARRAY[]::TEXT[], 'appliance', 114),
('make', 'Jenn-Air', ARRAY['Jenn Air', 'JennAir'], 'appliance', 115),
('make', 'Miele', ARRAY[]::TEXT[], 'appliance', 116),
('make', 'Fisher & Paykel', ARRAY['Fisher Paykel', 'F&P'], 'appliance', 117),
('make', 'Dacor', ARRAY[]::TEXT[], 'appliance', 118),
('make', 'Haier', ARRAY[]::TEXT[], 'appliance', 119),
('make', 'Hotpoint', ARRAY[]::TEXT[], 'appliance', 120),
('make', 'Speed Queen', ARRAY['SpeedQueen'], 'appliance', 121),
('make', 'Roper', ARRAY[]::TEXT[], 'appliance', 122),
('make', 'Admiral', ARRAY[]::TEXT[], 'appliance', 123),
('make', 'Magic Chef', ARRAY['MagicChef'], 'appliance', 124),
('make', 'Crosley', ARRAY[]::TEXT[], 'appliance', 125),
('make', 'Estate', ARRAY[]::TEXT[], 'appliance', 126),
('make', 'Inglis', ARRAY[]::TEXT[], 'appliance', 127),
('make', 'Gaggenau', ARRAY[]::TEXT[], 'appliance', 128),
('make', 'Bertazzoni', ARRAY[]::TEXT[], 'appliance', 129),
('make', 'Blomberg', ARRAY[]::TEXT[], 'appliance', 130),
('make', 'Asko', ARRAY[]::TEXT[], 'appliance', 131);

-- ============================================
-- MARINE MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Mercury Marine', ARRAY['Mercury', 'Merc'], 'marine', 150),
('make', 'MerCruiser', ARRAY['Mercruiser', 'Mer Cruiser'], 'marine', 151),
('make', 'Yamaha Marine', ARRAY['Yamaha'], 'marine', 152),
('make', 'Honda Marine', ARRAY['Honda'], 'marine', 153),
('make', 'Suzuki Marine', ARRAY['Suzuki'], 'marine', 154),
('make', 'Evinrude', ARRAY['E-TEC', 'ETEC'], 'marine', 155),
('make', 'Johnson', ARRAY['Johnson Outboards'], 'marine', 156),
('make', 'Volvo Penta', ARRAY['Penta'], 'marine', 157),
('make', 'Tohatsu', ARRAY[]::TEXT[], 'marine', 158),
('make', 'Mariner', ARRAY[]::TEXT[], 'marine', 159),
('make', 'OMC', ARRAY['O.M.C.', 'Outboard Marine Corporation'], 'marine', 160),
('make', 'Force', ARRAY['Force Outboards'], 'marine', 161),
('make', 'Chrysler Marine', ARRAY[]::TEXT[], 'marine', 162),
('make', 'Sea-Doo', ARRAY['Sea Doo', 'SeaDoo'], 'marine', 163),
('make', 'Kawasaki Marine', ARRAY['Kawasaki', 'Jet Ski'], 'marine', 164),
('make', 'Tracker', ARRAY['Tracker Marine'], 'marine', 165),
('make', 'Indmar', ARRAY[]::TEXT[], 'marine', 166),
('make', 'PCM Marine', ARRAY['PCM', 'Pleasurecraft'], 'marine', 167);

-- ============================================
-- PART TYPES - AUTOMOTIVE ELECTRONICS
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
-- Engine/Powertrain Control
('part_type', 'PCM', ARRAY['Powertrain Control Module', 'Engine Computer', 'ECU', 'Engine Control Unit', 'Main Computer'], 'automotive', 1),
('part_type', 'ECM', ARRAY['Engine Control Module', 'Engine Controller'], 'automotive', 2),
('part_type', 'TCM', ARRAY['Transmission Control Module', 'Transmission Computer', 'Trans Module', 'TCU'], 'automotive', 3),
('part_type', 'BCM', ARRAY['Body Control Module', 'Body Computer', 'Body Controller'], 'automotive', 4),

-- Instrument/Display
('part_type', 'Instrument Cluster', ARRAY['Cluster', 'Gauge Cluster', 'Speedometer', 'Dash Cluster', 'IPC', 'IP Cluster', 'Instrument Panel', 'Gauges'], 'automotive', 5),
('part_type', 'Radio', ARRAY['Head Unit', 'Stereo', 'Infotainment', 'Navigation', 'Nav Unit', 'Audio System', 'CD Player', 'Entertainment System', 'Sync', 'MyLink', 'UConnect'], 'automotive', 6),
('part_type', 'Amplifier', ARRAY['Amp', 'Audio Amp', 'Subwoofer Amp', 'Factory Amp', 'Bose Amp', 'JBL Amp'], 'automotive', 7),
('part_type', 'Display Screen', ARRAY['Touch Screen', 'Touchscreen', 'LCD Screen', 'Info Display', 'Center Display', 'Navigation Screen'], 'automotive', 8),

-- Safety Systems
('part_type', 'ABS Module', ARRAY['ABS', 'Anti-lock Brake Module', 'EBCM', 'Electronic Brake Control Module', 'Brake Module', 'ABS Pump', 'ABS Controller'], 'automotive', 10),
('part_type', 'Airbag Module', ARRAY['SRS Module', 'SRS', 'Airbag Computer', 'Restraint Module', 'RCM', 'Airbag Control Module', 'Airbag ECU', 'Air Bag Module'], 'automotive', 11),
('part_type', 'Steering Angle Sensor', ARRAY['SAS', 'Steering Sensor', 'Clock Spring', 'Clockspring'], 'automotive', 12),

-- Climate Control
('part_type', 'HVAC Control Module', ARRAY['HVAC Module', 'Climate Control Module', 'AC Control', 'Heater Control', 'Climate Control', 'ATC Module', 'DATC'], 'automotive', 15),
('part_type', 'Blower Motor Resistor', ARRAY['Blower Resistor', 'Fan Resistor', 'Heater Resistor'], 'automotive', 16),
('part_type', 'Blend Door Actuator', ARRAY['Blend Door', 'HVAC Actuator', 'Mode Door Actuator', 'Temperature Actuator'], 'automotive', 17),

-- Lighting
('part_type', 'Headlight Module', ARRAY['HID Module', 'Ballast', 'LED Module', 'Headlamp Module', 'AFS Module', 'Adaptive Headlight Module'], 'automotive', 20),
('part_type', 'Tail Light Assembly', ARRAY['Tail Light', 'Taillight', 'Tail Lamp', 'LED Tail Light', 'Brake Light'], 'automotive', 21),
('part_type', 'Lighting Control Module', ARRAY['LCM', 'Light Module', 'Exterior Lighting Module'], 'automotive', 22),

-- Chrysler/Dodge Specific
('part_type', 'TIPM', ARRAY['Totally Integrated Power Module', 'Integrated Power Module', 'TIPM7', 'Fuse Box', 'Power Distribution'], 'automotive', 25),
('part_type', 'WIN Module', ARRAY['Wireless Ignition Node', 'WIN', 'Ignition Module'], 'automotive', 26),
('part_type', 'SKREEM', ARRAY['Sentry Key Remote Entry Module', 'Sentry Key', 'SKIM'], 'automotive', 27),

-- Ford Specific
('part_type', 'FICM', ARRAY['Fuel Injection Control Module', 'Injector Driver Module', 'IDM'], 'automotive', 30),
('part_type', 'PATS Module', ARRAY['Passive Anti-Theft System', 'PATS', 'Anti-Theft Module'], 'automotive', 31),
('part_type', 'GEM Module', ARRAY['Generic Electronic Module', 'GEM'], 'automotive', 32),
('part_type', 'SJB', ARRAY['Smart Junction Box', 'Junction Box', 'Fuse Junction Box'], 'automotive', 33),

-- GM Specific
('part_type', 'TAC Module', ARRAY['Throttle Actuator Control', 'TAC', 'Electronic Throttle Control', 'ETC Module'], 'automotive', 35),
('part_type', 'EBCM', ARRAY['Electronic Brake Control Module', 'Brake Control Module'], 'automotive', 36),
('part_type', 'DIC', ARRAY['Driver Information Center', 'Info Center', 'Driver Info Display'], 'automotive', 37),

-- Other Modules
('part_type', 'Transfer Case Module', ARRAY['TCCM', 'Transfer Case Control Module', '4WD Module', 'Four Wheel Drive Module', 'AWD Module'], 'automotive', 40),
('part_type', 'Fuel Pump Driver Module', ARRAY['FPDM', 'Fuel Pump Module', 'Fuel Driver'], 'automotive', 41),
('part_type', 'Glow Plug Module', ARRAY['Glow Plug Controller', 'GPCM', 'Glow Plug Control Module', 'Glow Module'], 'automotive', 42),
('part_type', 'Parking Assist Module', ARRAY['Park Assist', 'PDC Module', 'Parking Sensor Module', 'Backup Sensor Module'], 'automotive', 43),
('part_type', 'Blind Spot Module', ARRAY['BSM', 'Blind Spot Monitor', 'BLIS Module', 'Side Radar'], 'automotive', 44),
('part_type', 'Lane Departure Module', ARRAY['LDW Module', 'Lane Keep Assist', 'LKA Module'], 'automotive', 45),
('part_type', 'Adaptive Cruise Module', ARRAY['ACC Module', 'Radar Module', 'Cruise Control Module', 'Distance Sensor'], 'automotive', 46),
('part_type', 'Camera Module', ARRAY['Backup Camera', 'Rear Camera', 'Surround View', '360 Camera', 'Front Camera'], 'automotive', 47),
('part_type', 'Seat Module', ARRAY['Seat Control Module', 'Power Seat Module', 'Memory Seat Module', 'Seat ECU'], 'automotive', 48),
('part_type', 'Door Module', ARRAY['Door Control Module', 'Window Module', 'Door Lock Module', 'DDM', 'PDM'], 'automotive', 49),
('part_type', 'Mirror Module', ARRAY['Side Mirror Module', 'Auto Dim Mirror', 'Rearview Mirror'], 'automotive', 50),
('part_type', 'Sunroof Module', ARRAY['Moonroof Module', 'Roof Module'], 'automotive', 51),
('part_type', 'Liftgate Module', ARRAY['Tailgate Module', 'Power Liftgate', 'Hatch Module'], 'automotive', 52),
('part_type', 'Steering Column Module', ARRAY['Column Module', 'Tilt Telescope Module', 'CIM'], 'automotive', 53),
('part_type', 'Key Fob', ARRAY['Remote', 'Keyless Entry', 'Smart Key', 'Proximity Key', 'Key Remote'], 'automotive', 54),
('part_type', 'Immobilizer', ARRAY['Immobiliser', 'Anti-Theft', 'Security Module', 'Transponder'], 'automotive', 55),
('part_type', 'Ignition Switch', ARRAY['Ignition', 'Key Switch', 'Start Switch', 'Ignition Lock'], 'automotive', 56),
('part_type', 'Starter', ARRAY['Starter Motor', 'Starting Motor'], 'automotive', 57),
('part_type', 'Alternator', ARRAY['Generator', 'Alt', 'Charging System'], 'automotive', 58),
('part_type', 'Throttle Body', ARRAY['TB', 'Electronic Throttle Body', 'ETB', 'Throttle'], 'automotive', 59),
('part_type', 'Fuel Injector', ARRAY['Injector', 'Fuel Injectors', 'Injectors'], 'automotive', 60),
('part_type', 'Turbo Actuator', ARRAY['Turbo', 'Turbocharger Actuator', 'VGT Actuator', 'Wastegate Actuator'], 'automotive', 61),
('part_type', 'EGR Valve', ARRAY['EGR', 'Exhaust Gas Recirculation'], 'automotive', 62),
('part_type', 'DEF Module', ARRAY['SCR Module', 'Urea Module', 'DEF Pump', 'AdBlue Module', 'Diesel Exhaust Fluid'], 'automotive', 63),
('part_type', 'DPF Module', ARRAY['Diesel Particulate Filter', 'DPF', 'Soot Sensor'], 'automotive', 64);

-- ============================================
-- PART TYPES - APPLIANCE ELECTRONICS
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('part_type', 'Control Board', ARRAY['Main Board', 'Motherboard', 'Main Control', 'Electronic Control Board', 'PCB', 'Circuit Board', 'Main Control Board'], 'appliance', 100),
('part_type', 'Display Board', ARRAY['UI Board', 'User Interface Board', 'Interface Board', 'Control Panel', 'Touchpad', 'Display Control'], 'appliance', 101),
('part_type', 'Power Board', ARRAY['Power Supply Board', 'PSU Board', 'Power Control Board', 'Power Module'], 'appliance', 102),
('part_type', 'Inverter Board', ARRAY['Inverter', 'VFD', 'Variable Frequency Drive', 'Motor Inverter', 'Compressor Inverter'], 'appliance', 103),
('part_type', 'Motor Control Board', ARRAY['Motor Board', 'MCU Board', 'Motor Controller'], 'appliance', 104),
('part_type', 'Relay Board', ARRAY['Relay Control Board', 'Power Relay Board'], 'appliance', 105),
('part_type', 'Timer', ARRAY['Mechanical Timer', 'Electronic Timer', 'Cycle Timer'], 'appliance', 106),
('part_type', 'Thermostat', ARRAY['Temperature Control', 'Temp Control', 'Defrost Thermostat'], 'appliance', 107),
('part_type', 'Temperature Sensor', ARRAY['Temp Sensor', 'Thermistor', 'NTC Sensor', 'RTD'], 'appliance', 108),
('part_type', 'Ice Maker', ARRAY['Icemaker', 'Ice Maker Assembly', 'Ice Machine', 'Ice Maker Module'], 'appliance', 109),
('part_type', 'Compressor', ARRAY['Refrigerator Compressor', 'AC Compressor', 'Compressor Assembly'], 'appliance', 110),
('part_type', 'Dispenser Control Board', ARRAY['Dispenser Board', 'Water Dispenser Board', 'Ice Dispenser Board'], 'appliance', 111),
('part_type', 'Washer Control Board', ARRAY['Washer Board', 'Washing Machine Board', 'Laundry Control Board'], 'appliance', 112),
('part_type', 'Dryer Control Board', ARRAY['Dryer Board', 'Dryer Main Board'], 'appliance', 113),
('part_type', 'Dishwasher Control Board', ARRAY['Dishwasher Board', 'Dishwasher Main Board'], 'appliance', 114),
('part_type', 'Range Control Board', ARRAY['Oven Control Board', 'Stove Control Board', 'Range Board', 'Oven Board', 'ERC', 'Electronic Range Control'], 'appliance', 115),
('part_type', 'Refrigerator Control Board', ARRAY['Fridge Control Board', 'Refrigerator Board', 'Fridge Board', 'Adaptive Defrost Board'], 'appliance', 116),
('part_type', 'Microwave Control Board', ARRAY['Microwave Board', 'Microwave Main Board'], 'appliance', 117);

-- ============================================
-- PART TYPES - MARINE ELECTRONICS
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('part_type', 'Marine ECU', ARRAY['Outboard ECU', 'Boat ECU', 'Marine Engine Computer', 'Outboard Computer'], 'marine', 150),
('part_type', 'Marine Gauge Cluster', ARRAY['Boat Gauges', 'Marine Gauges', 'Outboard Gauges', 'Marine Instrument Cluster', 'SmartCraft Gauges', 'VesselView'], 'marine', 151),
('part_type', 'Tilt Trim Module', ARRAY['Tilt Trim', 'Power Trim Module', 'Trim Module', 'PTT Module', 'Tilt Motor'], 'marine', 152),
('part_type', 'Marine Ignition Module', ARRAY['Outboard Ignition', 'Ignition Pack', 'Switch Box', 'Power Pack'], 'marine', 153),
('part_type', 'CDI Unit', ARRAY['CDI', 'Capacitor Discharge Ignition', 'CDI Box', 'Ignition CDI'], 'marine', 154),
('part_type', 'Stator', ARRAY['Marine Stator', 'Outboard Stator', 'Charging Stator'], 'marine', 155),
('part_type', 'Rectifier', ARRAY['Voltage Regulator', 'Regulator Rectifier', 'Marine Rectifier'], 'marine', 156),
('part_type', 'Fuel Injector Driver', ARRAY['EMM', 'Engine Management Module', 'Injector Driver'], 'marine', 157),
('part_type', 'Shift Module', ARRAY['Shift Actuator', 'Shift Interrupt Switch', 'DTS Module'], 'marine', 158),
('part_type', 'Marine Stereo', ARRAY['Boat Stereo', 'Marine Radio', 'Marine Head Unit'], 'marine', 159),
('part_type', 'Depth Finder', ARRAY['Fish Finder', 'Sonar', 'Depth Sounder', 'Marine Sonar'], 'marine', 160),
('part_type', 'GPS Chartplotter', ARRAY['Chartplotter', 'Marine GPS', 'Navigation System', 'MFD', 'Multi Function Display'], 'marine', 161),
('part_type', 'VHF Radio', ARRAY['VHF', 'Marine VHF', 'Ship Radio'], 'marine', 162);

-- ============================================
-- COMMON MODELS (Most Requested)
-- ============================================

-- Ford Models
INSERT INTO canonical_values (type, name, aliases, category, parent_value, display_order) VALUES
('model', 'F-150', ARRAY['F150', 'F 150'], 'automotive', 'Ford', 1),
('model', 'F-250', ARRAY['F250', 'F 250', 'Super Duty'], 'automotive', 'Ford', 2),
('model', 'F-350', ARRAY['F350', 'F 350', 'Super Duty'], 'automotive', 'Ford', 3),
('model', 'F-450', ARRAY['F450', 'F 450'], 'automotive', 'Ford', 4),
('model', 'F-550', ARRAY['F550', 'F 550'], 'automotive', 'Ford', 5),
('model', 'Mustang', ARRAY['Stang'], 'automotive', 'Ford', 6),
('model', 'Explorer', ARRAY[]::TEXT[], 'automotive', 'Ford', 7),
('model', 'Expedition', ARRAY[]::TEXT[], 'automotive', 'Ford', 8),
('model', 'Escape', ARRAY[]::TEXT[], 'automotive', 'Ford', 9),
('model', 'Edge', ARRAY[]::TEXT[], 'automotive', 'Ford', 10),
('model', 'Fusion', ARRAY[]::TEXT[], 'automotive', 'Ford', 11),
('model', 'Focus', ARRAY[]::TEXT[], 'automotive', 'Ford', 12),
('model', 'Ranger', ARRAY[]::TEXT[], 'automotive', 'Ford', 13),
('model', 'Bronco', ARRAY[]::TEXT[], 'automotive', 'Ford', 14),
('model', 'Transit', ARRAY['Transit Van'], 'automotive', 'Ford', 15),
('model', 'E-Series', ARRAY['E-150', 'E-250', 'E-350', 'E150', 'E250', 'E350', 'Econoline'], 'automotive', 'Ford', 16),
('model', 'Excursion', ARRAY[]::TEXT[], 'automotive', 'Ford', 17),
('model', 'Taurus', ARRAY[]::TEXT[], 'automotive', 'Ford', 18),
('model', 'Crown Victoria', ARRAY['Crown Vic', 'CV'], 'automotive', 'Ford', 19),

-- Chevrolet Models
('model', 'Silverado', ARRAY['Silverado 1500', 'Silverado 2500', 'Silverado 3500'], 'automotive', 'Chevrolet', 20),
('model', 'Tahoe', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 21),
('model', 'Suburban', ARRAY['Burban'], 'automotive', 'Chevrolet', 22),
('model', 'Equinox', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 23),
('model', 'Traverse', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 24),
('model', 'Colorado', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 25),
('model', 'Camaro', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 26),
('model', 'Corvette', ARRAY['Vette'], 'automotive', 'Chevrolet', 27),
('model', 'Malibu', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 28),
('model', 'Impala', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 29),
('model', 'Cruze', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 30),
('model', 'Trailblazer', ARRAY['Trail Blazer'], 'automotive', 'Chevrolet', 31),
('model', 'Avalanche', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 32),
('model', 'Express', ARRAY['Express Van'], 'automotive', 'Chevrolet', 33),
('model', 'Spark', ARRAY[]::TEXT[], 'automotive', 'Chevrolet', 34),
('model', 'Bolt', ARRAY['Bolt EV', 'Bolt EUV'], 'automotive', 'Chevrolet', 35),

-- GMC Models
('model', 'Sierra', ARRAY['Sierra 1500', 'Sierra 2500', 'Sierra 3500'], 'automotive', 'GMC', 40),
('model', 'Yukon', ARRAY['Yukon XL', 'Yukon Denali'], 'automotive', 'GMC', 41),
('model', 'Acadia', ARRAY[]::TEXT[], 'automotive', 'GMC', 42),
('model', 'Terrain', ARRAY[]::TEXT[], 'automotive', 'GMC', 43),
('model', 'Canyon', ARRAY[]::TEXT[], 'automotive', 'GMC', 44),
('model', 'Savana', ARRAY['Savana Van'], 'automotive', 'GMC', 45),
('model', 'Envoy', ARRAY[]::TEXT[], 'automotive', 'GMC', 46),

-- Dodge/Ram Models
('model', '1500', ARRAY['Ram 1500'], 'automotive', 'Ram', 50),
('model', '2500', ARRAY['Ram 2500'], 'automotive', 'Ram', 51),
('model', '3500', ARRAY['Ram 3500'], 'automotive', 'Ram', 52),
('model', 'Charger', ARRAY[]::TEXT[], 'automotive', 'Dodge', 53),
('model', 'Challenger', ARRAY[]::TEXT[], 'automotive', 'Dodge', 54),
('model', 'Durango', ARRAY[]::TEXT[], 'automotive', 'Dodge', 55),
('model', 'Journey', ARRAY[]::TEXT[], 'automotive', 'Dodge', 56),
('model', 'Grand Caravan', ARRAY['Caravan'], 'automotive', 'Dodge', 57),
('model', 'Dakota', ARRAY[]::TEXT[], 'automotive', 'Dodge', 58),

-- Jeep Models
('model', 'Wrangler', ARRAY['JK', 'JL', 'TJ', 'YJ'], 'automotive', 'Jeep', 60),
('model', 'Grand Cherokee', ARRAY['GC', 'WK', 'WK2', 'WL'], 'automotive', 'Jeep', 61),
('model', 'Cherokee', ARRAY['KL', 'XJ'], 'automotive', 'Jeep', 62),
('model', 'Compass', ARRAY[]::TEXT[], 'automotive', 'Jeep', 63),
('model', 'Patriot', ARRAY[]::TEXT[], 'automotive', 'Jeep', 64),
('model', 'Liberty', ARRAY['KJ', 'KK'], 'automotive', 'Jeep', 65),
('model', 'Gladiator', ARRAY['JT'], 'automotive', 'Jeep', 66),
('model', 'Commander', ARRAY['XK'], 'automotive', 'Jeep', 67),

-- Toyota Models
('model', 'Camry', ARRAY[]::TEXT[], 'automotive', 'Toyota', 70),
('model', 'Corolla', ARRAY[]::TEXT[], 'automotive', 'Toyota', 71),
('model', 'RAV4', ARRAY['Rav4', 'RAV 4'], 'automotive', 'Toyota', 72),
('model', 'Tacoma', ARRAY[]::TEXT[], 'automotive', 'Toyota', 73),
('model', 'Tundra', ARRAY[]::TEXT[], 'automotive', 'Toyota', 74),
('model', 'Highlander', ARRAY[]::TEXT[], 'automotive', 'Toyota', 75),
('model', '4Runner', ARRAY['4 Runner', 'Four Runner'], 'automotive', 'Toyota', 76),
('model', 'Prius', ARRAY[]::TEXT[], 'automotive', 'Toyota', 77),
('model', 'Sienna', ARRAY[]::TEXT[], 'automotive', 'Toyota', 78),
('model', 'Sequoia', ARRAY[]::TEXT[], 'automotive', 'Toyota', 79),
('model', 'Land Cruiser', ARRAY['LandCruiser'], 'automotive', 'Toyota', 80),
('model', 'Avalon', ARRAY[]::TEXT[], 'automotive', 'Toyota', 81),

-- Honda Models
('model', 'Civic', ARRAY[]::TEXT[], 'automotive', 'Honda', 85),
('model', 'Accord', ARRAY[]::TEXT[], 'automotive', 'Honda', 86),
('model', 'CR-V', ARRAY['CRV', 'CR V'], 'automotive', 'Honda', 87),
('model', 'Pilot', ARRAY[]::TEXT[], 'automotive', 'Honda', 88),
('model', 'Odyssey', ARRAY[]::TEXT[], 'automotive', 'Honda', 89),
('model', 'HR-V', ARRAY['HRV', 'HR V'], 'automotive', 'Honda', 90),
('model', 'Ridgeline', ARRAY[]::TEXT[], 'automotive', 'Honda', 91),
('model', 'Passport', ARRAY[]::TEXT[], 'automotive', 'Honda', 92),
('model', 'Fit', ARRAY[]::TEXT[], 'automotive', 'Honda', 93),
('model', 'Element', ARRAY[]::TEXT[], 'automotive', 'Honda', 94),

-- Nissan Models
('model', 'Altima', ARRAY[]::TEXT[], 'automotive', 'Nissan', 100),
('model', 'Rogue', ARRAY[]::TEXT[], 'automotive', 'Nissan', 101),
('model', 'Sentra', ARRAY[]::TEXT[], 'automotive', 'Nissan', 102),
('model', 'Pathfinder', ARRAY[]::TEXT[], 'automotive', 'Nissan', 103),
('model', 'Frontier', ARRAY[]::TEXT[], 'automotive', 'Nissan', 104),
('model', 'Titan', ARRAY[]::TEXT[], 'automotive', 'Nissan', 105),
('model', 'Maxima', ARRAY[]::TEXT[], 'automotive', 'Nissan', 106),
('model', 'Murano', ARRAY[]::TEXT[], 'automotive', 'Nissan', 107),
('model', 'Armada', ARRAY[]::TEXT[], 'automotive', 'Nissan', 108),
('model', '350Z', ARRAY['350 Z', 'Z'], 'automotive', 'Nissan', 109),
('model', '370Z', ARRAY['370 Z'], 'automotive', 'Nissan', 110),
('model', 'GT-R', ARRAY['GTR', 'GT R'], 'automotive', 'Nissan', 111),

-- BMW Models
('model', '3 Series', ARRAY['3-Series', '318', '320', '325', '328', '330', '335', '340', 'E36', 'E46', 'E90', 'F30', 'G20'], 'automotive', 'BMW', 115),
('model', '5 Series', ARRAY['5-Series', '525', '528', '530', '535', '540', '545', '550', 'E39', 'E60', 'F10', 'G30'], 'automotive', 'BMW', 116),
('model', '7 Series', ARRAY['7-Series', '740', '745', '750', '760', 'E38', 'E65', 'F01', 'G11'], 'automotive', 'BMW', 117),
('model', 'X3', ARRAY[]::TEXT[], 'automotive', 'BMW', 118),
('model', 'X5', ARRAY['E53', 'E70', 'F15', 'G05'], 'automotive', 'BMW', 119),
('model', 'X7', ARRAY[]::TEXT[], 'automotive', 'BMW', 120),

-- Mercedes-Benz Models
('model', 'C-Class', ARRAY['C Class', 'C180', 'C200', 'C230', 'C250', 'C280', 'C300', 'C320', 'C350', 'C400', 'C450', 'C63', 'W202', 'W203', 'W204', 'W205'], 'automotive', 'Mercedes-Benz', 125),
('model', 'E-Class', ARRAY['E Class', 'E300', 'E320', 'E350', 'E400', 'E450', 'E500', 'E550', 'E63', 'W210', 'W211', 'W212', 'W213'], 'automotive', 'Mercedes-Benz', 126),
('model', 'S-Class', ARRAY['S Class', 'S430', 'S500', 'S550', 'S560', 'S600', 'S63', 'S65', 'W220', 'W221', 'W222', 'W223'], 'automotive', 'Mercedes-Benz', 127),
('model', 'GLE', ARRAY['GLE350', 'GLE450', 'GLE580', 'GLE63', 'ML350', 'ML500', 'ML550', 'ML63', 'M Class', 'M-Class', 'W164', 'W166'], 'automotive', 'Mercedes-Benz', 128),
('model', 'GLC', ARRAY['GLC300', 'GLC350', 'GLC43', 'GLC63', 'GLK', 'GLK350'], 'automotive', 'Mercedes-Benz', 129),
('model', 'GLS', ARRAY['GLS450', 'GLS550', 'GLS580', 'GLS63', 'GL350', 'GL450', 'GL550', 'GL63', 'GL Class', 'GL-Class', 'X164', 'X166'], 'automotive', 'Mercedes-Benz', 130),

-- Hyundai Models
('model', 'Elantra', ARRAY[]::TEXT[], 'automotive', 'Hyundai', 135),
('model', 'Sonata', ARRAY[]::TEXT[], 'automotive', 'Hyundai', 136),
('model', 'Tucson', ARRAY[]::TEXT[], 'automotive', 'Hyundai', 137),
('model', 'Santa Fe', ARRAY['SantaFe'], 'automotive', 'Hyundai', 138),
('model', 'Palisade', ARRAY[]::TEXT[], 'automotive', 'Hyundai', 139),
('model', 'Kona', ARRAY[]::TEXT[], 'automotive', 'Hyundai', 140),

-- Kia Models
('model', 'Optima', ARRAY[]::TEXT[], 'automotive', 'Kia', 145),
('model', 'K5', ARRAY[]::TEXT[], 'automotive', 'Kia', 146),
('model', 'Sorento', ARRAY[]::TEXT[], 'automotive', 'Kia', 147),
('model', 'Sportage', ARRAY[]::TEXT[], 'automotive', 'Kia', 148),
('model', 'Telluride', ARRAY[]::TEXT[], 'automotive', 'Kia', 149),
('model', 'Soul', ARRAY[]::TEXT[], 'automotive', 'Kia', 150),
('model', 'Forte', ARRAY[]::TEXT[], 'automotive', 'Kia', 151);

-- ============================================
-- VERIFICATION QUERY
-- ============================================

-- Run this to verify the data was inserted correctly:
-- SELECT type, COUNT(*) as count FROM canonical_values GROUP BY type ORDER BY type;
