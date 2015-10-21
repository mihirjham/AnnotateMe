json.extract! annotation, :id, :song_id, :user_id, :start_index, :end_index, :annotation, :snippet, :created_at, :updated_at
json.email annotation.user.email
json.song_name annotation.song.name
