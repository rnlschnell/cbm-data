-- ============================================
-- ADDITIONAL SEED DATA FROM CBM WEBSITE
-- Circuit Board Medics - Categories & Brands
-- Run AFTER the main seed_canonical_values.sql
-- ============================================

-- ============================================
-- COMMERCIAL VEHICLE MAKES
-- (Some already exist, adding missing ones)
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Blue Bird', ARRAY['blue bird', 'BlueBird', 'bluebird', 'Blue Bird Bus'], 'commercial', 200),
('make', 'PACCAR', ARRAY['paccar', 'PACCAR Inc', 'Paccar'], 'commercial', 201),
('make', 'Sterling Trucks', ARRAY['Sterling', 'sterling', 'STERLING', 'Sterling Truck'], 'commercial', 202),
('make', 'Workhorse', ARRAY['workhorse', 'WORKHORSE', 'Workhorse Group'], 'commercial', 203),
('make', 'Actia', ARRAY['actia', 'ACTIA'], 'commercial', 204)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- CONSTRUCTION EQUIPMENT MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Case Construction', ARRAY['Case', 'case construction', 'CASE', 'Case CE', 'Case Equipment'], 'construction', 210),
('make', 'Komatsu', ARRAY['komatsu', 'KOMATSU'], 'construction', 211),
('make', 'Hitachi Construction', ARRAY['Hitachi', 'hitachi', 'HITACHI', 'Hitachi Construction Machinery'], 'construction', 212),
('make', 'JCB', ARRAY['jcb', 'J.C.B.', 'J C B'], 'construction', 213),
('make', 'Link-Belt', ARRAY['Link Belt', 'link-belt', 'linkbelt', 'LinkBelt', 'LINK-BELT'], 'construction', 214),
('make', 'Denyo', ARRAY['denyo', 'DENYO'], 'construction', 215),
('make', 'Takeuchi', ARRAY['takeuchi', 'TAKEUCHI'], 'construction', 216),
('make', 'Doosan', ARRAY['doosan', 'DOOSAN'], 'construction', 217),
('make', 'Liebherr', ARRAY['liebherr', 'LIEBHERR'], 'construction', 218),
('make', 'Kobelco', ARRAY['kobelco', 'KOBELCO'], 'construction', 219),
('make', 'Volvo Construction', ARRAY['Volvo CE', 'volvo construction', 'Volvo Construction Equipment'], 'construction', 220)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- INDUSTRIAL EQUIPMENT MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Ingersoll Rand', ARRAY['ingersoll rand', 'INGERSOLL RAND', 'IR', 'Ingersoll-Rand'], 'industrial', 230),
('make', 'Trane', ARRAY['trane', 'TRANE', 'Trane Technologies'], 'industrial', 231),
('make', 'FS-Curtis', ARRAY['FS Curtis', 'fs-curtis', 'fscurtis', 'Curtis', 'FS-CURTIS'], 'industrial', 232),
('make', 'First Solar', ARRAY['first solar', 'FirstSolar', 'FIRST SOLAR'], 'industrial', 233),
('make', 'BilJax', ARRAY['biljax', 'BILJAX', 'Bil-Jax', 'Bil Jax'], 'industrial', 234),
('make', 'Carrier', ARRAY['carrier', 'CARRIER', 'Carrier Global'], 'industrial', 235),
('make', 'Lennox', ARRAY['lennox', 'LENNOX'], 'industrial', 236),
('make', 'York', ARRAY['york', 'YORK', 'York HVAC'], 'industrial', 237),
('make', 'Daikin', ARRAY['daikin', 'DAIKIN'], 'industrial', 238),
('make', 'Atlas Copco', ARRAY['atlas copco', 'Atlas-Copco', 'ATLAS COPCO'], 'industrial', 239),
('make', 'Sullair', ARRAY['sullair', 'SULLAIR'], 'industrial', 240),
('make', 'Quincy', ARRAY['quincy', 'QUINCY', 'Quincy Compressor'], 'industrial', 241)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- AGRICULTURE EQUIPMENT MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'AGCO', ARRAY['agco', 'Agco', 'AGCO Corporation'], 'agriculture', 250),
('make', 'Massey Ferguson', ARRAY['massey ferguson', 'MASSEY FERGUSON', 'MF', 'Massey', 'massey'], 'agriculture', 251),
('make', 'Fendt', ARRAY['fendt', 'FENDT'], 'agriculture', 252),
('make', 'Gleaner', ARRAY['gleaner', 'GLEANER'], 'agriculture', 253),
('make', 'Challenger', ARRAY['challenger', 'CHALLENGER', 'Challenger Tractors'], 'agriculture', 254),
('make', 'Claas', ARRAY['claas', 'CLAAS'], 'agriculture', 255),
('make', 'Deutz-Fahr', ARRAY['Deutz Fahr', 'deutz-fahr', 'DEUTZ-FAHR', 'Deutz'], 'agriculture', 256),
('make', 'Kinze', ARRAY['kinze', 'KINZE'], 'agriculture', 257),
('make', 'Versatile', ARRAY['versatile', 'VERSATILE'], 'agriculture', 258),
('make', 'Kubota', ARRAY['kubota', 'KUBOTA'], 'agriculture', 259),
('make', 'Mahindra', ARRAY['mahindra', 'MAHINDRA'], 'agriculture', 260)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- MOTORCYCLE MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Harley-Davidson', ARRAY['Harley Davidson', 'harley-davidson', 'Harley', 'harley', 'HD', 'H-D'], 'motorcycle', 270),
('make', 'Honda Motorcycle', ARRAY['Honda', 'honda motorcycle', 'Honda Powersports'], 'motorcycle', 271),
('make', 'Yamaha Motorcycle', ARRAY['Yamaha', 'yamaha motorcycle', 'Yamaha Motor'], 'motorcycle', 272),
('make', 'Kawasaki Motorcycle', ARRAY['Kawasaki', 'kawasaki motorcycle', 'Kawi', 'kawi'], 'motorcycle', 273),
('make', 'Suzuki Motorcycle', ARRAY['Suzuki', 'suzuki motorcycle'], 'motorcycle', 274),
('make', 'BMW Motorrad', ARRAY['BMW Motorcycle', 'bmw motorcycle', 'BMW Moto', 'Motorrad'], 'motorcycle', 275),
('make', 'Ducati', ARRAY['ducati', 'DUCATI'], 'motorcycle', 276),
('make', 'Triumph', ARRAY['triumph', 'TRIUMPH'], 'motorcycle', 277),
('make', 'Indian Motorcycle', ARRAY['Indian', 'indian motorcycle', 'INDIAN'], 'motorcycle', 278),
('make', 'KTM', ARRAY['ktm', 'K.T.M.'], 'motorcycle', 279)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- POWERSPORTS / ATV / UTV MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Polaris', ARRAY['polaris', 'POLARIS', 'Polaris Industries'], 'powersports', 280),
('make', 'Can-Am', ARRAY['Can Am', 'can-am', 'canam', 'CanAm', 'CAN-AM', 'BRP Can-Am'], 'powersports', 281),
('make', 'Arctic Cat', ARRAY['arctic cat', 'ArcticCat', 'ARCTIC CAT'], 'powersports', 282),
('make', 'Honda Powersports', ARRAY['Honda ATV', 'Honda UTV', 'Honda SxS'], 'powersports', 283),
('make', 'Yamaha Powersports', ARRAY['Yamaha ATV', 'Yamaha UTV', 'Yamaha SxS', 'Yamaha Side by Side'], 'powersports', 284),
('make', 'Kawasaki Powersports', ARRAY['Kawasaki ATV', 'Kawasaki UTV', 'Kawasaki Mule', 'Kawasaki Teryx'], 'powersports', 285),
('make', 'CF Moto', ARRAY['CFMoto', 'cf moto', 'CFMOTO'], 'powersports', 286),
('make', 'Textron', ARRAY['textron', 'TEXTRON', 'Textron Off Road'], 'powersports', 287),
('make', 'Kubota RTV', ARRAY['Kubota UTV', 'kubota rtv'], 'powersports', 288),
('make', 'John Deere Gator', ARRAY['Gator', 'gator', 'JD Gator', 'John Deere UTV'], 'powersports', 289)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- RV / MOTORHOME MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Winnebago', ARRAY['winnebago', 'WINNEBAGO', 'Winnie'], 'rv', 290),
('make', 'Thor', ARRAY['thor', 'THOR', 'Thor Motor Coach', 'Thor Industries'], 'rv', 291),
('make', 'Fleetwood', ARRAY['fleetwood', 'FLEETWOOD', 'Fleetwood RV'], 'rv', 292),
('make', 'Coachmen', ARRAY['coachmen', 'COACHMEN', 'Coachmen RV'], 'rv', 293),
('make', 'Jayco', ARRAY['jayco', 'JAYCO'], 'rv', 294),
('make', 'Forest River', ARRAY['forest river', 'ForestRiver', 'FOREST RIVER'], 'rv', 295),
('make', 'Newmar', ARRAY['newmar', 'NEWMAR'], 'rv', 296),
('make', 'Tiffin', ARRAY['tiffin', 'TIFFIN', 'Tiffin Motorhomes'], 'rv', 297),
('make', 'Monaco', ARRAY['monaco', 'MONACO', 'Monaco RV'], 'rv', 298),
('make', 'Entegra', ARRAY['entegra', 'ENTEGRA', 'Entegra Coach'], 'rv', 299),
('make', 'Prevost', ARRAY['prevost', 'PREVOST', 'Prevost Bus'], 'rv', 300)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- ADDITIONAL AUTOMOTIVE PART TYPES FROM CBM
-- (Verifying our existing data covers these)
-- ============================================

-- Power Steering Module (new)
INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('part_type', 'Power Steering Module', ARRAY['power steering module', 'EPS Module', 'eps module', 'Electric Power Steering', 'electric power steering', 'EPAS', 'epas', 'Power Steering Control Module', 'power steering control module', 'Steering Assist Module', 'steering assist module', 'Power Steering', 'power steering'], 'automotive', 65)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- APPLIANCE EQUIPMENT TYPES
-- (These are appliance categories, useful for filtering)
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('part_type', 'Dishwasher Board', ARRAY['dishwasher board', 'Dishwasher Control', 'dishwasher control', 'Dishwasher Module', 'dishwasher module', 'Dishwasher', 'dishwasher'], 'appliance', 120),
('part_type', 'Dryer Board', ARRAY['dryer board', 'Dryer Control', 'dryer control', 'Dryer Module', 'dryer module', 'Dryer', 'dryer'], 'appliance', 121),
('part_type', 'Washer Board', ARRAY['washer board', 'Washer Control', 'washer control', 'Washing Machine Board', 'washing machine board', 'Washing Machine', 'washing machine', 'Washer', 'washer'], 'appliance', 122),
('part_type', 'Refrigerator Board', ARRAY['refrigerator board', 'Fridge Board', 'fridge board', 'Refrigerator Control', 'refrigerator control', 'Refrigerator', 'refrigerator', 'Fridge', 'fridge'], 'appliance', 123),
('part_type', 'Oven Board', ARRAY['oven board', 'Oven Control', 'oven control', 'Range Board', 'range board', 'Stove Board', 'stove board', 'Oven', 'oven', 'Range', 'range', 'Stove', 'stove'], 'appliance', 124),
('part_type', 'Ice Maker Board', ARRAY['ice maker board', 'Ice Maker Control', 'ice maker control', 'Ice Machine Board', 'ice machine board', 'Ice Maker', 'ice maker', 'Icemaker', 'icemaker'], 'appliance', 125)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- UPDATE EXISTING MAKES WITH CBM-SPECIFIC ALIASES
-- ============================================

-- Add "Mopar" as alias for Chrysler (Mopar is their parts brand)
UPDATE canonical_values
SET aliases = array_append(aliases, 'Mopar')
WHERE type = 'make' AND name = 'Chrysler' AND NOT ('Mopar' = ANY(aliases));

UPDATE canonical_values
SET aliases = array_append(aliases, 'mopar')
WHERE type = 'make' AND name = 'Chrysler' AND NOT ('mopar' = ANY(aliases));

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count by type and category:
-- SELECT type, category, COUNT(*) as count
-- FROM canonical_values
-- GROUP BY type, category
-- ORDER BY type, category;

-- List all categories:
-- SELECT DISTINCT category FROM canonical_values ORDER BY category;
