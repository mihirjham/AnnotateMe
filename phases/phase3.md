# Phase 3: Annotations and Search

## Rails
### Models
* Annotation

### Controllers
* Api::AnnotationsController (create, destroy, show, update)

### Views
* api/annotations/show.json.jbuilder

## Flux
### Views (React Components)
* AnnotationItem
* AnnotationForm

### Stores
* Annotations

### Actions
* ApiActions.receiveAllAnnotationsForSong
* ApiActions.receiveAnnotationsForUser
* ApiActions.deleteAnnotation

### ApiUtil
* ApiUtil.fetchAllAnnotationsForSong
* ApiUtil.fetchAllAnnotationsForUser
* ApiUtil.createAnnotation
* ApiUtil.editAnnotation
* ApiUtil.destroyAnnotation

## Gems/Libraries
* Flux Dispatcher
