-- ============================================
-- ADDITIONAL SEED DATA FROM CBM WEBSITE
-- Circuit Board Medics - Categories & Brands
-- Run AFTER the main seed_canonical_values.sql
-- ============================================

-- ============================================
-- COMMERCIAL VEHICLE MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Blue Bird', ARRAY['BlueBird', 'Blue Bird Bus'], 'commercial', 200),
('make', 'PACCAR', ARRAY['Paccar'], 'commercial', 201),
('make', 'Sterling Trucks', ARRAY['Sterling', 'Sterling Truck'], 'commercial', 202),
('make', 'Workhorse', ARRAY['Workhorse Group'], 'commercial', 203),
('make', 'Actia', ARRAY[]::TEXT[], 'commercial', 204)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- CONSTRUCTION EQUIPMENT MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Case Construction', ARRAY['Case', 'Case CE', 'Case Equipment'], 'construction', 210),
('make', 'Komatsu', ARRAY[]::TEXT[], 'construction', 211),
('make', 'Hitachi Construction', ARRAY['Hitachi', 'Hitachi Construction Machinery'], 'construction', 212),
('make', 'JCB', ARRAY['J.C.B.'], 'construction', 213),
('make', 'Link-Belt', ARRAY['Link Belt', 'LinkBelt'], 'construction', 214),
('make', 'Denyo', ARRAY[]::TEXT[], 'construction', 215),
('make', 'Takeuchi', ARRAY[]::TEXT[], 'construction', 216),
('make', 'Doosan', ARRAY[]::TEXT[], 'construction', 217),
('make', 'Liebherr', ARRAY[]::TEXT[], 'construction', 218),
('make', 'Kobelco', ARRAY[]::TEXT[], 'construction', 219),
('make', 'Volvo Construction', ARRAY['Volvo CE', 'Volvo Construction Equipment'], 'construction', 220)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- INDUSTRIAL EQUIPMENT MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Ingersoll Rand', ARRAY['IR', 'Ingersoll-Rand'], 'industrial', 230),
('make', 'Trane', ARRAY['Trane Technologies'], 'industrial', 231),
('make', 'FS-Curtis', ARRAY['FS Curtis', 'Curtis'], 'industrial', 232),
('make', 'First Solar', ARRAY['FirstSolar'], 'industrial', 233),
('make', 'BilJax', ARRAY['Bil-Jax', 'Bil Jax'], 'industrial', 234),
('make', 'Carrier', ARRAY['Carrier Global'], 'industrial', 235),
('make', 'Lennox', ARRAY[]::TEXT[], 'industrial', 236),
('make', 'York', ARRAY['York HVAC'], 'industrial', 237),
('make', 'Daikin', ARRAY[]::TEXT[], 'industrial', 238),
('make', 'Atlas Copco', ARRAY['Atlas-Copco'], 'industrial', 239),
('make', 'Sullair', ARRAY[]::TEXT[], 'industrial', 240),
('make', 'Quincy', ARRAY['Quincy Compressor'], 'industrial', 241)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- AGRICULTURE EQUIPMENT MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'AGCO', ARRAY['Agco', 'AGCO Corporation'], 'agriculture', 250),
('make', 'Massey Ferguson', ARRAY['MF', 'Massey'], 'agriculture', 251),
('make', 'Fendt', ARRAY[]::TEXT[], 'agriculture', 252),
('make', 'Gleaner', ARRAY[]::TEXT[], 'agriculture', 253),
('make', 'Challenger', ARRAY['Challenger Tractors'], 'agriculture', 254),
('make', 'Claas', ARRAY[]::TEXT[], 'agriculture', 255),
('make', 'Deutz-Fahr', ARRAY['Deutz Fahr', 'Deutz'], 'agriculture', 256),
('make', 'Kinze', ARRAY[]::TEXT[], 'agriculture', 257),
('make', 'Versatile', ARRAY[]::TEXT[], 'agriculture', 258),
('make', 'Kubota', ARRAY[]::TEXT[], 'agriculture', 259),
('make', 'Mahindra', ARRAY[]::TEXT[], 'agriculture', 260)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- MOTORCYCLE MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Harley-Davidson', ARRAY['Harley Davidson', 'Harley', 'HD', 'H-D'], 'motorcycle', 270),
('make', 'Honda Motorcycle', ARRAY['Honda', 'Honda Powersports'], 'motorcycle', 271),
('make', 'Yamaha Motorcycle', ARRAY['Yamaha', 'Yamaha Motor'], 'motorcycle', 272),
('make', 'Kawasaki Motorcycle', ARRAY['Kawasaki', 'Kawi'], 'motorcycle', 273),
('make', 'Suzuki Motorcycle', ARRAY['Suzuki'], 'motorcycle', 274),
('make', 'BMW Motorrad', ARRAY['BMW Motorcycle', 'Motorrad'], 'motorcycle', 275),
('make', 'Ducati', ARRAY[]::TEXT[], 'motorcycle', 276),
('make', 'Triumph', ARRAY[]::TEXT[], 'motorcycle', 277),
('make', 'Indian Motorcycle', ARRAY['Indian'], 'motorcycle', 278),
('make', 'KTM', ARRAY['K.T.M.'], 'motorcycle', 279)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- POWERSPORTS / ATV / UTV MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Polaris', ARRAY['Polaris Industries'], 'powersports', 280),
('make', 'Can-Am', ARRAY['Can Am', 'CanAm', 'BRP Can-Am'], 'powersports', 281),
('make', 'Arctic Cat', ARRAY['ArcticCat'], 'powersports', 282),
('make', 'Honda Powersports', ARRAY['Honda ATV', 'Honda UTV', 'Honda SxS'], 'powersports', 283),
('make', 'Yamaha Powersports', ARRAY['Yamaha ATV', 'Yamaha UTV', 'Yamaha SxS', 'Yamaha Side by Side'], 'powersports', 284),
('make', 'Kawasaki Powersports', ARRAY['Kawasaki ATV', 'Kawasaki UTV', 'Kawasaki Mule', 'Kawasaki Teryx'], 'powersports', 285),
('make', 'CF Moto', ARRAY['CFMoto', 'CFMOTO'], 'powersports', 286),
('make', 'Textron', ARRAY['Textron Off Road'], 'powersports', 287),
('make', 'Kubota RTV', ARRAY['Kubota UTV'], 'powersports', 288),
('make', 'John Deere Gator', ARRAY['Gator', 'JD Gator', 'John Deere UTV'], 'powersports', 289)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- RV / MOTORHOME MAKES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('make', 'Winnebago', ARRAY['Winnie'], 'rv', 290),
('make', 'Thor', ARRAY['Thor Motor Coach', 'Thor Industries'], 'rv', 291),
('make', 'Fleetwood', ARRAY['Fleetwood RV'], 'rv', 292),
('make', 'Coachmen', ARRAY['Coachmen RV'], 'rv', 293),
('make', 'Jayco', ARRAY[]::TEXT[], 'rv', 294),
('make', 'Forest River', ARRAY['ForestRiver'], 'rv', 295),
('make', 'Newmar', ARRAY[]::TEXT[], 'rv', 296),
('make', 'Tiffin', ARRAY['Tiffin Motorhomes'], 'rv', 297),
('make', 'Monaco', ARRAY['Monaco RV'], 'rv', 298),
('make', 'Entegra', ARRAY['Entegra Coach'], 'rv', 299),
('make', 'Prevost', ARRAY['Prevost Bus'], 'rv', 300)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- ADDITIONAL AUTOMOTIVE PART TYPES FROM CBM
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('part_type', 'Power Steering Module', ARRAY['EPS Module', 'Electric Power Steering', 'EPAS', 'Power Steering Control Module', 'Steering Assist Module', 'Power Steering'], 'automotive', 65)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

-- ============================================
-- APPLIANCE EQUIPMENT TYPES
-- ============================================

INSERT INTO canonical_values (type, name, aliases, category, display_order) VALUES
('part_type', 'Dishwasher Board', ARRAY['Dishwasher Control', 'Dishwasher Module', 'Dishwasher'], 'appliance', 120),
('part_type', 'Dryer Board', ARRAY['Dryer Control', 'Dryer Module', 'Dryer'], 'appliance', 121),
('part_type', 'Washer Board', ARRAY['Washer Control', 'Washing Machine Board', 'Washing Machine', 'Washer'], 'appliance', 122),
('part_type', 'Refrigerator Board', ARRAY['Fridge Board', 'Refrigerator Control', 'Refrigerator', 'Fridge'], 'appliance', 123),
('part_type', 'Oven Board', ARRAY['Oven Control', 'Range Board', 'Stove Board', 'Oven', 'Range', 'Stove'], 'appliance', 124),
('part_type', 'Ice Maker Board', ARRAY['Ice Maker Control', 'Ice Machine Board', 'Ice Maker', 'Icemaker'], 'appliance', 125)
ON CONFLICT (type, name) DO UPDATE SET aliases = EXCLUDED.aliases;

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
