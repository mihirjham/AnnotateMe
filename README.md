# AnnotateMe

[link]: #

## Minimum Viable Product

AnnotateMe is a web application inspired by Genius built using Ruby on Rails and
React.js. AnnotateMe allows users to:

- Create an account
- Log In/Log out
- Create, read, edit and delete songs.
- Highlight lines and add complex annotations to the lyrics.
- Search for songs

## Design Docs

* [View Wireframes] [view]
* [DB Schema] [schema]

[view]: ./docs/view.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, User Sessions, Song Model and JSON API

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. I will also set up the
sessions aspect of the website. Before building out the front end,
I will begin by setting up a full JSON API for Songs.

[Details] [phase-one]

### Phase 2: Flux Architecture and Song CRUD

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Song store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Songs `Index`, `IndexItem` and `Form`. At the end of Phase 2,
Songs can be created, read, edited and destroyed in the browser. Songs should
save to the database when the form loses focus or is left idle after editing.
Lastly, while constructing the views I will start building the basic CSS for
styling.

[Details] [phase-two]

### Phase 3: Annotations and Search

Phase 3 adds annotations to the Songs. Annotations belong to a Song and a User.
Create JSON API for Annotations. Users can bring up annotations in a separate
AnnotationsIndex view by searching for their annotations. Searching mechanism
for songs will be implemented as well.

[Details] [phase-three]

### Phase 4: Styling of Annotations

Phase 4 adds the highlighting feature of Genius for annotating the lyrics.

### Phase 5: Seeding and final clean-up

Phase 5 adds seed data, and if needed, refactoring of code.

### Bonus

- Users can follow each other.
- Artists have their own page, and can be followed.
- Searching improvements - can allow to search by artist or song name.
- Add more features to annotations - images, youtube/soundcloud links, etc

[phase-one]: ./phases/phase1.md
[phase-two]: ./phases/phase2.md
[phase-three]: ./phases/phase3.md
