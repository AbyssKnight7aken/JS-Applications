## Content

### Home Page (stitic, optional)
### Catalog
### Details
- Edit
- Delete
### Create
### Edit
### Login
### Register
### Bonus:
- Like
- Comments
- Pagination
- Search
- Profile Page
- Custom Catalog

## Architecture
- App entry point (initialize libraries and modules, dispatch navigation)
- Request module
- User session
- Data CRUD
- Views
- Utilities

=============================================================================
1. NPM init and install libraries
2. Analize HTML file and create layout template for nav bar and footer
3. Home template and view
4. Dashboard view and dashboard templates
- copy templates from HTML file
- edit teplates with correct params
- map items from item template to dashboard
- edit get query url
5. Login, Register templates and Logout
- copy template from HTML file
- add form submit handler
- href links and redirects (if any)
- change user checks and user data object based on requirements
- logout redirect based on requirements
6. Details view
- copy template from HTML file
- edit teplate with correct params
- add form submit handlers and href redirects based on requirements
- edit get query url
7. Edit view
- copy template from HTML file
- create form submit handler and add correct values from the item data
- edit query url and redirect (if needed)
8. Create view
- copy template from HTML file
- add form submit handlers and href redirects based on requirements
- edit query url
- change check logic and alerts (if needed)
9. Delete functionality in Edit view
- edit query url and item params (if needed)
- redirect based on requirements
10. ---===BONUS===---
10.1 Like (Buy)
