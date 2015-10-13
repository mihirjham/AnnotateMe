# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

##songs
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null
album_id        | integer   | foreign key(references album), indexed
release_date    | date      |

##albums
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

##annotations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key(references users), indexed
song_id         | integer   | not null, foreign key(references songs), indexed
snippet         | string    | not null
description     | string    | not null

#Bonus

##artists
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

##songs(changes)
column name     | data type | details
----------------|-----------|-----------------------
artist_id       | integer   | not null, foreign key(references artists), indexed

##follows
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
followable_type | string    | not null, inclusion: ["User", "Artist"]
followable_id   | integer   | not null, indexed: unique(followable_type)
