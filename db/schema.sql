CREATE TABLE animes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  poster TEXT,
  genres TEXT[],
  type VARCHAR(50),
  hindi_dub BOOLEAN DEFAULT FALSE,
  about_info TEXT,
  qtip_info TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  anime_id INTEGER REFERENCES animes(id) ON DELETE CASCADE,
  episode_number INTEGER,
  title VARCHAR(255),
  abyss_link TEXT,
  filemoon_link TEXT,
  servers TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  anime_id INTEGER REFERENCES animes(id) ON DELETE CASCADE,
  next_episode INTEGER,
  estimated_date TIMESTAMP
);
