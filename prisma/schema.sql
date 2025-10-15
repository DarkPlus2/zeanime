CREATE TABLE animes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  poster TEXT,
  banner TEXT,
  description TEXT,
  qtip TEXT,
  about TEXT,
  genres TEXT[],
  type VARCHAR(50),
  hindi_dub BOOLEAN DEFAULT FALSE,
  status VARCHAR(32) DEFAULT 'ongoing',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  anime_id INT NOT NULL REFERENCES animes(id) ON DELETE CASCADE,
  season INT DEFAULT 1,
  episode_number INT,
  title VARCHAR(255),
  synopsis TEXT,
  servers JSONB,
  skip_ranges JSONB,
  released_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  anime_id INT NOT NULL REFERENCES animes(id) ON DELETE CASCADE,
  season INT DEFAULT 1,
  episode_number INT,
  planned_release TIMESTAMP,
  estimated_release TIMESTAMP,
  status VARCHAR(32) DEFAULT 'planned',
  notes TEXT
);
